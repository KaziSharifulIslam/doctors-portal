import auth from "firebase.init";
import { signOut } from "firebase/auth";
import useAdmin from "hooks/useAdmin";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "./Loading";

const RequireAdmin = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user);
  const location = useLocation();
  if (loading || adminLoading) return <Loading />;
  if (!user || !admin) {
      signOut(auth);
    return <Navigate to="/login" state={{ from: location }}></Navigate>;
  }
  return children;
};

export default RequireAdmin;
