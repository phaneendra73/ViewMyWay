// Skeleton.tsx
import React from "react";

const Skeleton: React.FC<{ width?: string; height?: string; className?: string }> = ({
  width = "100%",
  height = "20px",
  className = ""
}) => {
  return (
    <div
      className={`bg-white   animate-pulse rounded ${className}`}
      style={{ width, height }}
    ></div>
  );
};

export default Skeleton;
