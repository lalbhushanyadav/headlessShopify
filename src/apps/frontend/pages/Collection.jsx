import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import shopifyClient from "../../../api/shopifyClient";
import CategoryItem from "./CategoryItem";
import Breadcrumb from "../../../shared/components/Breadcrumbs";
const Collection = () => {
  const { handle } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const result = await shopifyClient.fetchProductsByCollectionHandle(
        handle
      );
      setProducts(result);
    };
    loadProducts();
  }, [handle]);

  return (
    <div>
      <Breadcrumb />
      <div className="px-4 md:px-12 py-10 bg-white dark:bg-gray-900">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <select className="border rounded px-3 py-2 text-sm">
              <option>Default</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Showing {products.length} of 144 results
          </p>
          <div className="flex space-x-2">
            <button className="p-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              🔲
            </button>
            <button className="p-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              📃
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <CategoryItem key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
