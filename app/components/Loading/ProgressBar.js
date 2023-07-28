import React from "react";

const ProgressBar = () => {
  return (
    <div className="ml-10 h-3 relative max-w-xl rounded-full overflow-hidden bg-slate-200">
      <div
        id="bar"
        className="transition-all ease-out duration-1000 h-full bg-green-500 relative w-3/4"
      ></div>
    </div>
  );
};

export default ProgressBar;
