import React, { useEffect, useState } from "react";

function Homepage() {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/homes")
      .then((res) => res.json())
      .then((data) => setHomes(data));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Available Homes</h2>

      <div style={styles.grid}>
        {homes.map((home) => (
          <div key={home._id} style={styles.card}>
            {home.image && (
              <img
                src={`http://localhost:5000/uploads/${home.image}`}
                alt={home.name}
                style={styles.image}
              />
            )}
            <div style={styles.content}>
              <h3 style={styles.title}>{home.name}</h3>
              <p style={styles.location}>📍 {home.location}</p>
              <p style={styles.rating}>⭐ {home.rating || "N/A"}</p>
              <p style={styles.description}>{home.description}</p>
              <button style={styles.button}>Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    minHeight: "100vh",
    padding: "30px",
    background: "#f7f7f7",
  },
  heading: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "28px",
    fontWeight: "600",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },
  content: {
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "600",
  },
  location: {
    fontSize: "14px",
    color: "#555",
  },
  rating: {
    fontSize: "14px",
    color: "#ff385c",
    fontWeight: "600",
  },
  description: {
    fontSize: "13px",
    color: "#777",
    marginTop: "5px",
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#ff385c",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default Homepage;
