import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-800" />
    </div>
  );
};

export default LoadingSpinner;