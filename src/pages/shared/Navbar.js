import auth from "firebase.init";
import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
console.log(user);
  const menuItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li tabIndex="0">
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/appointment">Appointment</Link>
      </li>
      <li>
        <Link to="/reviews">Reviews</Link>
      </li>
      <li>
        <Link to="/contact-us">Contact Us</Link>
      </li>
      {!user && (
        <li>
          <Link className="btn btn-outline btn-secondary login-btn" to="/login">
            Login
          </Link>
        </li>
      )}
    </>
  );
  return (
    <div className="container mx-auto">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link className="font-bold text-3xl" to="/">
            Doctors Portal
          </Link>
        </div>
        <div className="flex-none gap-2">
          {/* desktop menu  */}
          <div className="navbar hidden lg:flex">
            <ul className="menu menu-horizontal p-0">{menuItems}</ul>
          </div>
          <div className="dropdown dropdown-end">
            <label
              tabIndex="0"
              className="btn swap-on btn-ghost btn-circle lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>

            <ul
              tabIndex="0"
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              {menuItems}
            </ul>
          </div>
          {/* profile menu  */}
          {user && (
            <div className="dropdown dropdown-end">
              <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary">
                  <img
                    src={
                      user.photoURL
                        ? user.photoURL
                        : `https://api.lorem.space/image/face?hash=33791`
                    }
                    alt=""
                  />
                </div>
              </label>
              <ul
                tabIndex="0"
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                {user.displayName && (
                  <li>
                    <a href="#!" className="justify-between">
                     { user?.displayName}
                    </a>
                  </li>
                )}
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  {user && (
                    <button
                      className=""
                      onClick={() => {
                        signOut(auth);
                        navigate("/");
                      }}
                    >
                      Log Out
                    </button>
                  )}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
