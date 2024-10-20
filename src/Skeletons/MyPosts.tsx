import React from "react";

const SkeMyPosts: React.FC = () => {
    return (
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
    );
};

export default SkeMyPosts;
