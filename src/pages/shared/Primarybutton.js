import React from "react";

const Primarybutton = ({children}) => {
  return (
    <button className="btn btn-secondary bg-gradient-to-r from-primary to-secondary text-white">
      {children}
    </button>
  );
};

export default Primarybutton;
