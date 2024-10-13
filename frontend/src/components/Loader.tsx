// Loader.tsx
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="loader border-4 border-white border-t-transparent rounded-full w-16 h-16 animate-spin"></div>
    </div>
  );
};

export default Loader;
