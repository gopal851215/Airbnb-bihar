import React from "react";
import { Link, useNavigate } from "react-router-dom";

function AirbnbNavbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logo}>Airbnb</Link>

      <nav style={styles.nav}>
        <Link to="/">Homes</Link>

        {user?.role === "host" && (
          <Link to="/addhome">Add Home</Link>
        )}

        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default AirbnbNavbar;

const styles = {
  header: {
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    boxShadow: "0 2px 5px #ccc",
  },
  logo: { fontWeight: "700", color: "#ff385c" },
  nav: { display: "flex", gap: "10px" },
};
