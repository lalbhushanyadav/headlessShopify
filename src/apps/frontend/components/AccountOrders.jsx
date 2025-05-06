import React, { useEffect, useState } from "react";
import noImage from "../../../assets/no-image.jpg";
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
        <ul className="space-y-4">
          {draftOrders.map((order) => (
            <li key={order.id} className="p-4 rounded-md shadow-lg bg-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div>
                  <span className="font-semibold">Name:</span> {order.name}
                </div>{" "}
                |{/* Safely rendering Email */}
                <div>
                  <span className="font-semibold">Email:</span>{" "}
                  {order.email || "Not available"}
                </div>
              </div>

              <div className="mt-4 pb-4 border-b space-y-2">
                {order.lineItems.edges.map(({ node }, idx) => (
                  <div key={idx} className={`flex items-center gap-3`}>
                    <figure className="w-30 h-30 rounded overflow-hidden">
                      {node.variant?.image?.url ? (
                        <img
                          src={node.variant.image.url}
                          alt={node.title}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <img
                          src={noImage}
                          alt="No Image"
                          className="object-cover w-full h-full"
                        />
                      )}
                    </figure>
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
