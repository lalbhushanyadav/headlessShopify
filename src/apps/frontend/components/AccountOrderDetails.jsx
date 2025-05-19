import noImage from "../../../assets/no-image.jpg";
const AccountOrderDetails = function () {
  <>
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

    <div className="mt-4 space-y-2">
      <table className="w-full border-collapse table-auto border border-gray-400">
        <tr>
          <th
            width="15%"
            valign="middle"
            className="p-3 border-b border-gray-500 dark:border-gray-300"
          >
            Product Image
          </th>
          <th
            width="40%"
            align="center"
            valign="middle"
            className="p-3 border-b border-gray-500 dark:border-gray-300"
          >
            Product Name
          </th>
          <th
            width="20%"
            align="center"
            valign="middle"
            className="p-3 border-b border-gray-500 dark:border-gray-300"
          >
            Ordered Quntity
          </th>
          <th
            width="25%"
            align="center"
            valign="middle"
            className="p-3 border-b border-gray-500 dark:border-gray-300"
          >
            Product Price
          </th>
        </tr>
        {order.lineItems.edges.map(({ node }, idx) => (
          <tr key={idx}>
            <td
              valign="middle"
              className={`p-3 ${
                idx < order.lineItems.edges.length - 1
                  ? "border-b border-gray-300 dark:border-gray-600"
                  : ""
              }`}
            >
              <figure className="w-25 h-25 rounded overflow-hidden">
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
            </td>
            <td
              align="center"
              valign="middle"
              className={`p-3 ${
                idx < order.lineItems.edges.length - 1
                  ? "border-b border-gray-300 dark:border-gray-600"
                  : ""
              }`}
            >
              <p className="capitalize text-black dark:text-white">
                {node.title}
              </p>
            </td>
            <td
              align="center"
              valign="middle"
              className={`p-3 ${
                idx < order.lineItems.edges.length - 1
                  ? "border-b border-gray-300 dark:border-gray-600"
                  : ""
              }`}
            >
              <p className="text-sm text-gray-600 dark:text-white">
                {node.quantity}
              </p>
            </td>
            <td
              align="center"
              valign="middle"
              className={`p-3 ${
                idx < order.lineItems.edges.length - 1
                  ? "border-b border-gray-300 dark:border-gray-600"
                  : ""
              }`}
            >
              <p className="text-sm text-gray-600 dark:text-white">
                ₹{node.variant.price}{" "}
                {order.totalPriceSet?.shopMoney?.currencyCode}
              </p>
            </td>
          </tr>
        ))}
      </table>
    </div>

    <div className="mt-5 font-semibold">
      Total: ₹{order.totalPriceSet?.shopMoney?.amount}{" "}
      {order.totalPriceSet?.shopMoney?.currencyCode}
    </div>
  </>;
  {
    order.invoiceUrl && (
      <a
        href={order.invoiceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline text-sm mt-1 block"
      >
        View Invoice
      </a>
    );
  }
};

export default AccountOrderDetails;
