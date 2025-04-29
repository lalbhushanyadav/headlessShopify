import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import shopifyClient from "../../../api/shopifyClient";
import { useCart } from "../../../features/cart/context/CartContext";
import Messages from "../../../shared/Utils/Message";
import { useToast } from "../../../core/providers/ToastProvider";
import Breadcrumb from "../../../shared/components/Breadcrumbs";
import ProductSwatches from "./ProductSwatches.jsx";

export default function ProductDetails() {
  const { handle } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [iscartAdding, setIsCartAdding] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { dispatch } = useCart();

  const [selectedData, setSelectedData] = useState(null);

  const handleSelectedData = (data) => {
    setSelectedData(data);
    console.log(data);
  };

  const handleAddToCart = () => {
    const variant = product.variants[selectedVariantIndex];
    setIsCartAdding(true);

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: `${product.id}_${variant.id}`,
        productId: product.id,
        handle: product.handle,
        title: product.title,
        variantId: variant.id,
        quantity: selectedQuantity,
        price: parseFloat(variant.price),
        selectedOptions: variant.selectedOptions,
        image: product.images[0],
      },
    });

    setSelectedQuantity(1);
    addToast(Messages.Cart.itemAdded, "success");
    setIsCartAdding(false);
    navigate("/cart");
  };

  useEffect(() => {
    const loadProduct = async () => {
      const result = await shopifyClient.fetchProductByHandle(handle);
      setProduct(result);
    };
    loadProduct();
  }, [handle]);

  if (!product) return <div className="text-center py-10">Loading...</div>;

  const variant = product.variants[selectedVariantIndex];
  const price = parseFloat(variant?.price || 0);
  const comparePrice = parseFloat(variant?.compareAtPrice || 0);
  const discount =
    comparePrice > price
      ? Math.round(((comparePrice - price) / comparePrice) * 100)
      : 0;

  return (
    <div>
      <Breadcrumb />
      <div className="container mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="relative pt-[100%] overflow-hidden rounded">
            {discount > 0 && (
              <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded z-5">
                -{discount}%
              </span>
            )}
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full rounded absolute top-[50%] left-[50%] translate-[-50%]"
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

        <div>
          <h1 className="text-2xl font-semibold mb-2 text-black dark:text-white">
            {product.title}
          </h1>

          <div className="text-red-600 text-xl font-bold">
            ${price.toFixed(2)}
            {comparePrice > price && (
              <span className="text-gray-400 dark:text-gray-200 line-through text-base ml-3">
                ${comparePrice.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-gray-600 dark:text-white mt-4">
            {product.description}
          </p>

          {product.options.length >= 1 && (
            <ProductSwatches
              options={product.options}
              combinations={product.variants}
              onSelectionChange={handleSelectedData}
            />
          )}

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label
                htmlFor="quantity"
                className="text-sm text-gray-700 dark:text-white"
              >
                Quantity:
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={selectedQuantity}
                onChange={(e) => {
                  const val = Math.max(1, parseInt(e.target.value));
                  setSelectedQuantity(val);
                }}
                className="w-16 px-2 py-1 border rounded border-black dark:border-white text-black dark:text-white"
              />
            </div>

            <button
              onClick={handleAddToCart}
              className={`px-6 py-2 rounded text-white ${
                selectedData?.stockQuantity > 0
                  ? "bg-black hover:bg-gray-800"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={selectedData?.stockQuantity < 1}
            >
              {selectedData?.stockQuantity < 1
                ? "Out of Stock"
                : iscartAdding
                ? "Going to Cart"
                : "Add to Cart"}
            </button>
          </div>

          {product.tags.length > 0 && (
            <div className="mt-6 text-sm text-gray-500">
              <strong>Tags:</strong> {product.tags.join(", ")}
            </div>
          )}

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
