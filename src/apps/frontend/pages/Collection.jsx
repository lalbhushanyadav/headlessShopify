import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import shopifyClient from "../../../api/shopifyClient";
import ThumbnailView from "./ThumbnailView";
import GridView from "./GridView";
import Breadcrumb from "../../../shared/components/Breadcrumbs";
import { BsList, BsGrid } from "react-icons/bs";
import SectionDescription from "../components/SectionDescription";
const Collection = () => {
  const { handle } = useParams();
  const [products, setProducts] = useState([]);
  const [description, setDescription] = useState("");
  const [sortOption, setSortOption] = useState("titleAsc");
  const [isGridView, setIsGridView] = useState(true);
  const [subCollections, setSubCollections] = useState([]);
  const navigate = useNavigate();

  const onClickhandler = (handle) => {
    navigate(`/product/${handle}`);
  };

  useEffect(() => {
    const getChildrenBySlug = async () => {
      //   console.log("Handle:", handle);
      const collections = JSON.parse(localStorage.getItem("shop_collections"));
      if (!collections) return;

      const match = collections.find(
        (collection) => collection.handle === handle
      );
      setSubCollections(match?.children || []);
    };

    getChildrenBySlug();
  }, [handle]);

  // Fetch products by collection handle
  useEffect(() => {
    const loadProducts = async () => {
      const result = await shopifyClient.fetchProductsByCollectionHandle(
        handle
      );
      setProducts(result.products || []);
      setDescription(result.description || "");
    };
    loadProducts();
  }, [handle]);

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "priceAsc") {
      return a.price - b.price;
    } else if (sortOption === "priceDesc") {
      return b.price - a.price;
    } else if (sortOption === "titleAsc") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "titleDesc") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  return (
    <div>
      <style>{`
        .grid-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .thumbnail-item img {
          object-fit: contain;
        }
        .grid-item img {
          object-fit: cover;
        }
      `}</style>

      <Breadcrumb />

      <div className="container mx-auto px-4">
        <div className="mb-6 text-gray-700 dark:text-gray-300">
          {description}
        </div>
        {subCollections.length > 0 && (
          <SectionDescription sections={subCollections} isCarousel={true} />
        )}
        {sortedProducts.length > 0 && (
          <div className="py-10">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              {/* Sort Dropdown */}
              <div className="flex items-center space-x-2">
                <select
                  className="border border-gray-500 text-black dark:text-white rounded px-3 py-2 text-sm"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="titleAsc">Title: A-Z</option>
                  <option value="titleDesc">Title: Z-A</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                </select>
              </div>

              {/* Product Count */}
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Showing {sortedProducts.length} of {sortedProducts.length}{" "}
                results
              </p>

              {/* View Toggle Buttons */}
              <div className="flex space-x-2">
                <button
                  className={`p-2 cursor-pointer border border-gray-700 rounded ${
                    isGridView
                      ? "bg-gray-100 dark:bg-gray-400 border-black"
                      : "bg-gray-200 dark:bg-gray-600"
                  }`}
                  onClick={() => setIsGridView(true)}
                  title="Grid View"
                >
                  <BsGrid />
                </button>
                <button
                  className={`p-2 cursor-pointer border border-gray-700 rounded ${
                    !isGridView
                      ? "bg-gray-100 dark:bg-gray-400 border-black"
                      : "bg-gray-200 dark:bg-gray-600"
                  }`}
                  onClick={() => setIsGridView(false)}
                  title="List View"
                >
                  <BsList />
                </button>
              </div>
            </div>

            {/* Product List */}
            <div
              className={`grid ${
                isGridView
                  ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  : "grid-cols-1"
              } gap-6`}
            >
              {sortedProducts.map((product, index) =>
                isGridView ? (
                  <GridView
                    key={index}
                    data={product}
                    customHandleEvent={() => onClickhandler(product.handle)}
                    showPrice={true}
                  />
                ) : (
                  <ThumbnailView
                    key={index}
                    data={product}
                    customHandleEvent={() => onClickhandler(product.handle)}
                    showPrice={true}
                  />
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
