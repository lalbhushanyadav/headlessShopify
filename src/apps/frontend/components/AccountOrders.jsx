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
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Draft Orders</h1>
      {draftOrders.length === 0 ? (
        <p>No draft orders found.</p>
      ) : (
        <ul className="space-y-4">
          {draftOrders.map(({ node: order }) => (
            <li key={order.id} className="border p-4 rounded-md shadow-sm">
              <div className="font-semibold">Name: {order.name}</div>
              {/* Safely rendering Email */}
              <div className="text-sm text-gray-500">
                Email: {order.email || "Not available"}
              </div>

              <div className="mt-2 space-y-2">
                {order.lineItems.edges.map(({ node }, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    {node.variant?.image?.url && (
                      <img
                        src={node.variant.image.url}
                        alt={node.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div>
                      <p>{node.title}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {node.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        Price: ₹{node.variant.price}{" "}
                        {order.totalPriceSet?.shopMoney?.currencyCode}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2 font-semibold">
                Total: ₹{order.totalPriceSet?.shopMoney?.amount}{" "}
                {order.totalPriceSet?.shopMoney?.currencyCode}
              </div>

              {order.invoiceUrl && (
                <a
                  href={order.invoiceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm mt-1 block"
                >
                  View Invoice
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AccountOrders;
