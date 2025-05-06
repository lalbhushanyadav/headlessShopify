import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = ({ type = "carousel", count = 1 }) => {
  const skeletons = [];

  for (let i = 0; i < count; i++) {
    if (type === "homepagecarousel") {
      skeletons.push(
        <div
          key={i}
          className="w-full rounded-lg overflow-hidden shadow flex flex-col md:flex-row items-center justify-center bg-blue-100 px-6 md:px-20 py-10 min-h-[250px]"
        >
          {/* Image */}
          <div className="w-full md:w-1/2 min-h-[200px] flex flex-col md:flex-row items-center justify-center gap-4 mt-10 md:mt-0">
            <Skeleton height={208} width={208} className="rounded-xl" />
          </div>
          {/* Text */}
          <div className="w-full md:w-1/2 text-center md:text-left max-w-xl">
            <p className="text-sm text-gray-600 mb-2">
              <Skeleton width={100} />
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
              <Skeleton width="80%" />
              <Skeleton width="60%" />
            </h1>
            <button className="mt-6 px-8 py-4 border text-lg border-gray-300 text-gray-300 cursor-not-allowed">
              <Skeleton width={100} height={30} />
            </button>
          </div>
        </div>
      );
    }
  }

  return <>{skeletons}</>;
};

export default SkeletonLoader;
