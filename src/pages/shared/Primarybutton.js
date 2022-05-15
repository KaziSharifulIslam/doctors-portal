import React from "react";
import { useNavigate } from "react-router-dom";

const Primarybutton = ({ children, go }) => {
  const navigate = useNavigate();
  const navigateTo = () => {
    if (go) navigate(`${go}`);
  };
  return (
    <button
      onClick={navigateTo}
      className="btn btn-secondary bg-gradient-to-r from-primary to-secondary text-white"
    >
      {children}
    </button>
  );
};

export default Primarybutton;
