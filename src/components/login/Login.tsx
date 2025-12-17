import React, { useState } from "react";
import { loginUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await loginUser({ email, password });

      // save user to localStorage
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Login Successful!");

      // redirect to home or admin
      navigate("/");
    } catch (error: any) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-wrapper">
      <img src="/img/login-1.png" className="login-top-img" />
      <img src="/img/login-2.png" className="login-bottom-img" />

      <div className="login-box">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Login to continue</p>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Enter your password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Continue Button */}
        <button className="login-btn" onClick={handleLogin}>
          Continue
        </button>

        <div className="login-divider">
          <span>OR</span>
        </div>

        <button className="google-btn">
          {/* google svg */}
          Continue with Google
        </button>
      </div>
    </div>
  );
}
