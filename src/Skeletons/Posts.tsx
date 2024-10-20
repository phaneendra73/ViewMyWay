import React from "react";

const SkePosts: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen text-white">
      {/* Sidebar Skeleton */}
      <div className="fixed lg:sticky top-0 lg:top-20 left-0 lg:left-auto w-4/5 lg:w-1/5 border border-gray-800 shadow-sm shadow-white rounded-lg p-5 h-screen mt-20 lg:mt-0 bg-black animate-pulse">
        <button className="lg:hidden absolute top-4 right-4 text-white bg-gray-600 h-8 w-24 rounded" />
        <div className="mb-10">
          <h2 className="h-6 bg-white rounded w-3/4 mb-4"></h2> {/* Sidebar Title */}
          <ul className="flex flex-wrap gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <li key={index} className="h-8 bg-white rounded w-full mb-2"></li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-grow p-8 lg:p-16 mt-20 lg:mt-0 bg-black">
        <button className="lg:hidden mb-4 text-white h-8 w-24 rounded bg-gray-600" />
        <h1 className="h-8 bg-white rounded w-1/3 mb-6"></h1> {/* Main Title */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="flex flex-col gap-4 bg-black border border-stone-800 rounded-lg p-4 animate-pulse" key={index}>
              <div className="flex items-center space-x-2">
                <p className="h-8 w-8 bg-white rounded-full"></p> {/* Placeholder for Author Initial */}
                <p className="h-4 bg-white rounded w-1/2"></p> {/* Placeholder for Author Name */}
              </div>

              {/* Title and Image Skeleton */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="h-16 w-16 bg-white rounded-lg"></div> {/* Placeholder for Image */}
                <span className="h-6 bg-white rounded w-3/4"></span> {/* Placeholder for Title */}
              </div>

              {/* Content Skeleton */}
              <p className="h-4 bg-white rounded w-full mb-2"></p> {/* Placeholder for Content */}

              {/* Read More Button Skeleton */}
              <div className="flex justify-between items-center">
                <div className="h-4 bg-white rounded w-1/4"></div> {/* Placeholder for Read Time */}
                <div className="h-8 w-24 bg-white rounded"></div> {/* Placeholder for Read More Button */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkePosts;
