import auth from "firebase.init";
import useAdmin from "hooks/useAdmin";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  return (
    <div className="container mx-auto">
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content text-center ">
          {/* <!-- Page content here --> */}

          <div className="flex drawer-opener items-center justify-between mx-2">
            <h2 className="text-3xl text-secondary dark:text-accent my-4">Dashboard</h2>
            <label htmlFor="my-drawer-2" className="btn btn-outline lg:hidden ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </label>
          </div>

          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-fit bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}
            <li> <Link to="/dashboard/my-appointment">My Appointments</Link></li>
            <li> <Link to="/dashboard/reviews">My Reviews</Link> </li>
            {admin && <li><Link to="/dashboard/users">All Users</Link></li>}
            <li><Link to="/dashboard/profile">My Profile</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
