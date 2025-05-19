import React, { useEffect, useState } from "react";

const AccountOrders = () => {
  const [draftOrders, setDraftOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInAccessToken = localStorage.getItem("accessToken");
    const sessionData = localStorage.getItem("session_data");

    if (loggedInAccessToken && sessionData) {
      const parsedSession = JSON.parse(sessionData);
      const customerEmail = parsedSession?.user?.email;

      if (customerEmail) {
        const getDraftOrders = async (email) => {
          try {
            const response = await fetch(
              `${
                import.meta.env.VITE_BACKEND_URL
              }get-draft-orders?email=${encodeURIComponent(email)}`
            );
            const data = await response.json();
            setDraftOrders(data.draftOrders || []);
          } catch (error) {
            console.error("Error fetching draft orders:", error);
          } finally {
            setLoading(false);
          }
        };

        getDraftOrders(customerEmail);
      } else {
        setLoading(false);
        console.warn("Email not found in session data");
      }
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <p>Loading your orders...</p>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Your Draft Orders</h1>
      {draftOrders.length === 0 ? (
        <p>No draft orders found.</p>
      ) : (
        <table className="w-full">
          <tr>
            <th
              width="15%"
              valign="middle"
              className="p-3 border-b border-gray-500 dark:border-gray-300"
            >
              Name
            </th>
            <th
              width="15%"
              valign="middle"
              className="p-3 border-b border-gray-500 dark:border-gray-300"
            >
              Email
            </th>
            <th
              width="15%"
              valign="middle"
              className="p-3 border-b border-gray-500 dark:border-gray-300"
            >
              Total Order Quantity
            </th>
            <th
              width="15%"
              valign="middle"
              className="p-3 border-b border-gray-500 dark:border-gray-300"
            >
              Action
            </th>
          </tr>
          {draftOrders.map((order, i) => (
            <tr>
              <td
                key={i}
                valign="middle"
                align="center"
                className="p-3 border-b border-gray-300 dark:border-gray-600"
              >
                {order.name}
              </td>
              <td
                key={i}
                valign="middle"
                align="center"
                className="p-3 border-b border-gray-300 dark:border-gray-600"
              >
                {order.email || "Not available"}
              </td>
              <td
                key={i}
                valign="middle"
                align="center"
                className="p-3 border-b border-gray-300 dark:border-gray-600"
              >
                {order.lineItems.edges.reduce(
                  (sum, edge) => sum + edge.node.quantity,
                  0
                )}
              </td>
              <td
                key={i}
                valign="middle"
                align="center"
                className="p-3 border-b border-gray-300 dark:border-gray-600"
              >
                <a
                  href="#"
                  className="bg-blue-900 hover:bg-blue-200 hover:text-blue-900 text-white transition-all duration-300 ease-in-out px-3 py-2 rounded shadow cursor-pointer text-xs"
                >
                  Order Details
                </a>
              </td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
};

export default AccountOrders;
