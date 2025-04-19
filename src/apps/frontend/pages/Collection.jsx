import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import shopifyClient from "../../../api/shopifyClient";
import ThumbnailView from "./ThumbnailView";
import GridView from "./GridView";
import Breadcrumb from "../../../shared/components/Breadcrumbs";

const Collection = () => {
  const { handle } = useParams();
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("titleAsc");
  const [isGridView, setIsGridView] = useState(false);
  const navigate = useNavigate();
  const onClickhandler = (handle) => {
    navigate(`/product/${handle}`);
  };

  // Fetch products by collection handle
  useEffect(() => {
    const loadProducts = async () => {
      const result = await shopifyClient.fetchProductsByCollectionHandle(
        handle
      );
      setProducts(result);
    };
    loadProducts();
  }, [handle]);

  // Sort products based on selected option
  useEffect(() => {
    let sorted = [...products];

    if (sortOption === "priceAsc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceDesc") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortOption === "titleAsc") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "titleDesc") {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    } else {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    setProducts(sorted);
  }, [sortOption]);

  return (
    <div>
      <style>{`
        .grid-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .thumbnail-item {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .thumbnail-item img {
          object-fit: contain;
        }
        .grid-item img {
          object-fit: cover;
        }
      `}</style>
      <Breadcrumb />
      <div className="px-4 md:px-12 py-10 bg-white dark:bg-gray-900">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <select
              className="border rounded px-3 py-2 text-sm"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="titleAsc">Title: A-Z</option>
              <option value="titleDesc">Title: Z-A</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Showing {products.length} of {products.length} results
          </p>
          <div className="flex space-x-2">
            {/* Grid View Button */}
            <button
              className={`p-2  cursor-pointer ${
                isGridView ? "bg-gray-200 dark:bg-gray-800 border rounded" : ""
              }`}
              onClick={() => setIsGridView(true)}
              title="Grid View"
            >
              🔲
            </button>
            {/* List View Button */}
            <button
              className={`p-2  cursor-pointer ${
                !isGridView ? "bg-gray-200 dark:bg-gray-800 border rounded" : ""
              }`}
              onClick={() => setIsGridView(false)}
              title="List View"
            >
              📃
            </button>
          </div>
        </div>
        {/* Display products in grid or list */}
        <div
          className={`grid ${
            isGridView
              ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : "grid-cols-1"
          } gap-6`}
        >
          {products.map((product, index) =>
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
    </div>
  );
};

export default Collection;
