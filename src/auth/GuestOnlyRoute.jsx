import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

/** Redirect logged-in users away from login/signup pages. */
export default function GuestOnlyRoute({ children }) {
  const auth = useContext(AuthContext);
  const token = auth?.token || localStorage.getItem("token");
  const hasUser = auth?.user || localStorage.getItem("user");

  if (token || hasUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
