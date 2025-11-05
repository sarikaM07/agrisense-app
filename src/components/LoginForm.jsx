import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import "./LoginForm.css";
import { toast } from "react-hot-toast";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://agrisense-gno8.onrender.com/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      console.log("Login response status:", res.status);

      if (res.status !== 200) {
        const errorData = await res.json();
        console.log("Login error response:", errorData);
        alert("Login failed. Please check your credentials.");
        throw new Error(errorData.message || "Login failed");
      } else {
        const data = await res.json();
        console.log("Login successful response data:", data);
        login(data.token, data.user);
        alert("Login successful!");
        nav("/dashboard");
      }
    } catch (err) {
      console.log(err);
      alert("Login failed. Please try again.");
    }
  }

  return (
    <div className="container">
      {" "}
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2><label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign in</button>
        <p style={{ fontSize: 13, marginTop: 8 }}>
          Use <strong>admin@demo</strong> to sign in as admin (mock)
        </p>
        {" "}
      </form>
      {" "}
    </div>
  );
}
