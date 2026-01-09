import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError } from "../Utils/error";

function Signup() {
  const navigate = useNavigate();

  const [signupinfo, setSignupinfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupinfo({ ...signupinfo, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupinfo;

    if (!name || !email || !password) {
      return handleError("All fields are required");
    }

    if (name.length < 3) {
      return handleError("Name must be at least 3 characters");
    }

    if (password.length < 6) {
      return handleError("Password must be at least 6 characters");
    }

    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        return handleError(result.message || "Signup failed");
      }

      alert("Signup successful 🎉");
      navigate("/login");
    } catch (error) {
      handleError("Server not running or connection refused");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>Create Account</h2>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={signupinfo.name}
            onChange={handleChange}
            style={input}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signupinfo.email}
            onChange={handleChange}
            style={input}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signupinfo.password}
            onChange={handleChange}
            style={input}
          />

          <button type="submit" style={button}>
            Signup
          </button>
        </form>

        <p style={footerText}>
          Already have an account?{" "}
          <Link to="/login" style={link}>
            Login
          </Link>
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
const title = { textAlign: "center", color: "#ff385c", marginBottom: "20px" };
const input = {
  width: "100%",
  padding: "10px",
  marginTop: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
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
const footerText = { textAlign: "center", marginTop: "15px" };
const link = { color: "#ff385c", fontWeight: "600" };

export default Signup;
