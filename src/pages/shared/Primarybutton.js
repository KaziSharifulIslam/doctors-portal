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
      className="btn btn-secondary bg-gradient-to-r from-primary to-secondary text-white dark:bg-gradient-to-r dark:from-accent dark:to-accent dark:border-none"
    >
      {children}
    </button>
  );
};

export default Primarybutton;
