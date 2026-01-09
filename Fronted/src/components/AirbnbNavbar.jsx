

import React from "react";
import { Link, useNavigate } from "react-router-dom";

function AirbnbNavbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // redirect to login
  };

  return (
    <header style={headerStyle}>
      <div style={navContainer}>
        <Link to="/" style={logoStyle}>airbnb</Link>

        <div style={navLinks}>
          <Link to="/" style={linkStyle}>Homes</Link>

          {token && (
            <Link to="/addhome" style={linkStyle}>Add Home</Link>,
            <Link to="/favourite">❤️ Favourite</Link>,
            <Link to="/addhome" style={linkStyle}>Add Home</Link>

          )}

          {!token ? (
            <>
              <Link to="/login">
                <button style={loginBtn}>Login</button>
              </Link>

              <Link to="/signup">
                <button style={signupBtn}>Signup</button>
              </Link>
            </>
          ) : (
            <button style={loginBtn} onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </header>
  );
}

/* ===== STYLES ===== */
const headerStyle = {
  position: "fixed",
  top: 0,
  width: "100%",
  backgroundColor: "#fff",
  zIndex: 1000,
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};

const navContainer = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "14px 24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const logoStyle = {
  textDecoration: "none",
  color: "#ff385c",
  fontSize: "24px",
  fontWeight: "700",
};

const navLinks = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const linkStyle = {
  textDecoration: "none",
  color: "#222",
  fontWeight: "500",
};

const loginBtn = {
  padding: "6px 14px",
  borderRadius: "20px",
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
};

const signupBtn = {
  ...loginBtn,
  background: "#ff385c",
  color: "#fff",
  border: "none",
};

export default AirbnbNavbar;
