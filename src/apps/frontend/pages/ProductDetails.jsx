import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // assuming you're using React Router
import shopifyClient from "../../../api/shopifyClient";
import { useCart } from "../../../features/cart/context/CartContext";
import Messages from "../../../shared/Utils/Message";
import { useToast } from "../../../core/providers/ToastProvider";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../shared/components/Breadcrumbs";

export default function ProductDetails() {
  const { handle } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [iscartAdding, setIsCartAdding] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const { dispatch } = useCart();

  const handleAddToCart = (product) => {
    setIsCartAdding(1);
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        quantity: selectedQuantity,
        handle: product.handle,
        variantId: product.variantId,
      },
    });
    // setIsCartAdding(0);
    setSelectedQuantity(1); // Optional: reset to 1 after adding
    addToast(Messages.Cart.itemAdded, "success");
    setIsCartAdding(0);
    navigate("/cart");
  };

  useEffect(() => {
    const loadProducts = async () => {
      const result = await shopifyClient.fetchProductByHandle(handle);
      console.log(result);
      setProduct(result);
    };
    loadProducts();
  }, [handle]);

  if (!product) return <div className="text-center py-10">Loading...</div>;

  const variant = product.variants?.edges[0]?.node;
  const price = parseFloat(product.price || 0);
  const comparePrice = parseFloat(product.compareAtPrice || 0);
  const discount =
    comparePrice > price
      ? Math.round(((comparePrice - price) / comparePrice) * 100)
      : 0;
  const quantity = product.quantity || 0;

  return (
    <div>
      <Breadcrumb />
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="relative">
            {discount > 0 && (
              <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">
                -{discount}%
              </span>
            )}
            <img
              src={product.images[0] ? product.images[0] : ""}
              alt={product.title}
              className="w-full rounded"
            />
          </div>
          <div className="flex gap-3 mt-4">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Thumbnail ${i}`}
                className="w-20 h-20 object-cover rounded border"
              />
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div>
          <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>

          <div className="text-red-600 text-xl font-bold">
            ${price.toFixed(2)}
            {comparePrice > price && (
              <span className="text-gray-400 line-through text-base ml-3">
                ${comparePrice.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-gray-600 mt-4">{product.description}</p>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="quantity" className="text-sm text-gray-700">
                Quantity:
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={selectedQuantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 1) {
                    setSelectedQuantity(value);
                  } else {
                    setSelectedQuantity(1);
                  }
                }}
                onKeyDown={(e) => {
                  if (
                    e.key === "ArrowDown" &&
                    parseInt(e.currentTarget.value) <= 1
                  ) {
                    e.preventDefault();
                  }
                }}
                className="w-16 px-2 py-1 border rounded"
              />
            </div>

            <button
              onClick={() => handleAddToCart(product)}
              className={`px-6 py-2 rounded text-white ${
                quantity > 0
                  ? "bg-black hover:bg-gray-800"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={quantity === 0 && selectedQuantity == 0}
            >
              {quantity === 0
                ? "Out of Stock"
                : iscartAdding
                ? "Going to Cart"
                : "Add to Cart"}
            </button>
          </div>

          {/* Categories & Tags */}
          {product.tags.length > 0 && (
            <div className="mt-6 text-sm text-gray-500">
              <div>
                <strong>Tags:</strong> {product.tags.join(", ")}
              </div>
            </div>
          )}

          {/* Social Share Icons (Static for now) */}
          <div className="flex gap-4 mt-6 text-gray-500">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-pinterest"></i>
            <i className="fab fa-linkedin"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
