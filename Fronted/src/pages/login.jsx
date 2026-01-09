import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError } from "../Utils/error";

function Login() {
  const navigate = useNavigate(); // for redirect

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("All fields are required");
    }

    try {
      const url = "http://localhost:5000/auth/login"; // make sure backend is running
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      console.log("Login Response:", result);

      if (!response.ok) {
        return handleError(result.message || "Login failed");
      }

      // Save JWT token in localStorage
      localStorage.setItem("token", result.token);

      // ✅ Redirect to home page after login
      navigate("/"); 

    } catch {
      handleError("Server not running or connection refused");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={{ textAlign: "center", color: "#ff385c" }}>Welcome Back</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginInfo.email}
            onChange={handleChange}
            style={input}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginInfo.password}
            onChange={handleChange}
            style={input}
          />

          <button type="submit" style={button}>Login</button>
        </form>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Don’t have an account?{" "}
          <Link to="/signup" style={{ color: "#ff385c" }}>Signup</Link>
        </p>
      </div>
    </div>
  );
}

/* ===== Styles ===== */
const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f7f7f7",
};

const card = {
  background: "#fff",
  padding: "30px",
  borderRadius: "12px",
  width: "350px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
};

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const button = {
  width: "100%",
  padding: "12px",
  marginTop: "20px",
  borderRadius: "25px",
  border: "none",
  background: "#ff385c",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
};

export default Login;
// const handleLogin = async (e) => {
//   e.preventDefault();

//   const { email, password } = loginInfo;
//   if (!email || !password) return handleError("All fields are required");

//   try {
//     const response = await fetch("http://localhost:5000/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       return handleError(result.message || "Login failed");
//     }

//     localStorage.setItem("token", result.token);
//     navigate("/apphome");

//   } catch {
//     handleError("Server not running");
//   }
// };
