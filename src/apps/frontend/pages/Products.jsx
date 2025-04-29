import { useEffect, useState } from "react";
import shopifyClient from "../../../api/shopifyClient";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../shared/components/Breadcrumbs";
import ThumbnailView from "./ThumbnailView";
import GridView from "./GridView";
import { BsList, BsGrid } from "react-icons/bs";

export default function Products() {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState("titleAsc");
  const [isGridView, setIsGridView] = useState(true);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const loadProducts = async () => {
      const result = await shopifyClient.fetchProducts();
      console.log(result);
      setProducts(result);
    };
    loadProducts();
  }, []);
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "titleAsc") return a.title.localeCompare(b.title);
    if (sortOption === "titleDesc") return b.title.localeCompare(a.title);
    if (sortOption === "priceAsc") return a.price - b.price; // Sorting by price ascending
    if (sortOption === "priceDesc") return b.price - a.price; // Sorting by price descending
    return 0;
  });

  const onClickhandler = (handle) => {
    navigate(`/product/${handle}`);
  };

  return (
    <div>
      <Breadcrumb />
      <div className="container mx-auto px-4">
      <div className="py-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
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
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Showing {sortedProducts.length} of {sortedProducts.length} results
          </p>
          <div className="flex space-x-2">
            <button
              className={`p-2 cursor-pointer border border-gray-700 ${
                isGridView ? "bg-gray-100 dark:bg-gray-400 border rounded" : "bg-gray-200 dark:bg-gray-600"
              }`}
              onClick={() => setIsGridView(true)}
              title="Grid View"
            >
               <BsGrid />
            </button>
            <button
              className={`p-2 cursor-pointer border border-gray-700 ${
                !isGridView ? "bbg-gray-100 dark:bg-gray-400 border rounded" : "bg-gray-200 dark:bg-gray-600"
              }`}
              onClick={() => setIsGridView(false)}
              title="List View"
            >
              <BsList />
            </button>
          </div>
        </div>

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
      </div>
    </div>
  );
}
