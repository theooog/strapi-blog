import React from "react";

const Hamburger = (props) => {
  return (
    <div {...props}>
      <svg viewBox="0 0 100 80" width="40" height="40">
        <rect width="100" height="20" rx="10"></rect>
        <rect y="30" width="100" height="20" rx="10"></rect>
        <rect y="60" width="100" height="20" rx="10"></rect>
      </svg>
    </div>
  );
};

export default Hamburger;
