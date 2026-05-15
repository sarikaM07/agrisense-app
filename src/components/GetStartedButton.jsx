import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

function isLoggedIn(auth) {
  if (auth?.user || auth?.token) return true;
  const token = localStorage.getItem("token");
  return Boolean(token && token !== "null" && token !== "undefined");
}

/** Hero "Get Started" — dashboard if logged in, signup if not. */
export default function GetStartedButton() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const loggedIn = isLoggedIn(auth);

  return (
    <button
      type="button"
      className="hero-btn primary"
      onClick={() => navigate(loggedIn ? "/dashboard" : "/signup")}
    >
      {loggedIn ? "Go to Dashboard" : "Get Started"}
    </button>
  );
}
