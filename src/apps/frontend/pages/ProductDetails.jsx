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
  const [variantPrice, setVariantPrice] = useState(0);
  const [normalPrice, SetNormalPrice] = useState(0);
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { dispatch } = useCart();

  const [selectedData, setSelectedData] = useState(null);

  const handleSelectedData = (data) => {
    setSelectedData(data);
    // console.log(data);
  };

  const handleAddToCart = () => {
    setIsCartAdding(true);

    const {
      variantId,
      productId,
      productLink,
      selected,
      stockPrice,
      stockQuantity,
      variantDetails,
      productTitle,
    } = selectedData;

    const payload = {
      id: variantId,
      productId,
      handle: productLink,
      title: productTitle || "Product",
      variantId,
      quantity: selectedQuantity,
      price: parseFloat(stockPrice),
      selectedOptions: selected,
      image: product?.images?.[0] || null,
      variantTitle: variantDetails?.title || "",
      compareAtPrice: parseFloat(variantDetails?.compareAtPrice || 0),
      stockQuantity: stockQuantity,
    };

    // console.log(payload); // Final payload for cart
    dispatch({
      type: "ADD_ITEM",
      payload,
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

      // Set default variant (first variant) when product loads
      if (result.variants && result.variants.length > 0) {
        const defaultVariant = result.variants[0];
        // console.log(defaultVariant);
        const selectedOptionsObject = {};
        defaultVariant.selectedOptions.forEach((opt) => {
          selectedOptionsObject[opt.name] = opt.value;
        });
        handleSelectedData({
          variantDetails: defaultVariant,
          variantId: defaultVariant.id,
          productId: result.id,
          productLink: result.handle,
          selected: selectedOptionsObject,
          stockPrice: defaultVariant.price,
          stockQuantity: defaultVariant.quantity,
          productTitle: result?.title || "Product",
        });
      }
    };
    loadProduct();
  }, [handle]);

  if (!product) return <div className="text-center py-10">Loading...</div>;

  const activeVariant = selectedData?.variantDetails || product.variants[0];
  const price = parseFloat(activeVariant?.price || 0);
  const comparePrice = parseFloat(activeVariant?.compareAtPrice || 0);

  const discount =
    comparePrice > price
      ? Math.round(((comparePrice - price) / comparePrice) * 100)
      : 0;

  return (
    <div>
      <Breadcrumb />
      <div className="container mx-auto pt-4 pb-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="relative pt-[80%] overflow-hidden rounded">
            {discount > 0 && (
              <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded z-5">
                -{discount}%
              </span>
            )}
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full rounded absolute top-[50%] left-[50%] translate-[-50%] object-cover object-center h-full"
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
              productId={product.id}
              productSlug={product.handle}
              productName={product.title}
            />
          )}

          <div className="mt-6 flex gap-4">
            <div className="flex gap-2">
              <label
                htmlFor="quantity"
                className="text-sm text-gray-700 dark:text-white flex items-center"
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
