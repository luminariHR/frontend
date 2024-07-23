import ClipLoader from "react-spinners/ClipLoader.js";
import React from "react";

export const LoadingPage = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <ClipLoader
        color={"#5d5bd4"}
        size={100}
        loading={true}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
