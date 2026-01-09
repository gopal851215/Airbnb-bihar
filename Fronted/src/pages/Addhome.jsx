import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Addhome() {
  const navigate = useNavigate();

  const [home, setHome] = useState({
    name: "",
    location: "",
    description: "",
    rating: "",
  });

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setHome({ ...home, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return alert("Login required");

    const formData = new FormData();
    Object.keys(home).forEach((key) =>
      formData.append(key, home[key])
    );
    if (photo) formData.append("photo", photo);

    const res = await fetch("http://localhost:5000/api/homes", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) return alert(data.message || "Error");

    alert("🏠 Home added successfully");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Add New Home</h2>

        <input
          name="name"
          placeholder="Home Name"
          value={home.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="location"
          placeholder="Location"
          value={home.location}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="rating"
          type="number"
          placeholder="Rating (1–5)"
          value={home.rating}
          onChange={handleChange}
          style={styles.input}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={home.description}
          onChange={handleChange}
          style={styles.textarea}
        />

        <input type="file" onChange={handleFileChange} />

        {preview && (
          <img src={preview} alt="preview" style={styles.preview} />
        )}

        <button type="submit" style={styles.button}>
          ➕ Add Home
        </button>
      </form>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f7f7f7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "380px",
    background: "#fff",
    padding: "25px",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  title: {
    textAlign: "center",
    marginBottom: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    minHeight: "80px",
  },
  preview: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#ff385c",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Addhome;
