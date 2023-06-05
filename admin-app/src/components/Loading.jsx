import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-gray-900 text-white z-50">
      <FontAwesomeIcon icon={faSpinner} spin size="5x" />
      <p className="mt-4">Please Wait...</p>
    </div>
  );
};

export default Loading;
