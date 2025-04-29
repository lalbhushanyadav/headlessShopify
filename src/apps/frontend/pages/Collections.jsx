import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ThumbnailView from "./ThumbnailView";
import GridView from "./GridView";
import Breadcrumb from "../../../shared/components/Breadcrumbs";
import { BsList, BsGrid } from "react-icons/bs";

const Collections = () => {
  const [sortOption, setSortOption] = useState("titleAsc");
  const [isGridView, setIsGridView] = useState(true);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const onClickhandler = (handle) => {
    navigate(`/collection/${handle}`);
  };

  // Fetch all collections
  useEffect(() => {
    const storedCategories = localStorage.getItem("shop_collections");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  const sortedCategories = [...categories].sort((a, b) => {
    if (sortOption === "titleAsc") return a.title.localeCompare(b.title);
    if (sortOption === "titleDesc") return b.title.localeCompare(a.title);
    return 0;
  });

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
              </select>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Showing {sortedCategories.length} of {sortedCategories.length}{" "}
              results
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
                  !isGridView ? "bg-gray-100 dark:bg-gray-400 border rounded" : "bg-gray-200 dark:bg-gray-600"
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
            {sortedCategories.map((category, index) =>
              isGridView ? (
                <GridView
                  key={index}
                  data={category}
                  customHandleEvent={() => onClickhandler(category.handle)}
                  showPrice={false}
                />
              ) : (
                <ThumbnailView
                  key={index}
                  data={category}
                  customHandleEvent={() => onClickhandler(category.handle)}
                  showPrice={false}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
