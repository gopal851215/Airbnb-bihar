import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Addhome() {
  const navigate = useNavigate();
  const [home, setHome] = useState({ name: "", location: "", description: "", rating: "" });
  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => setHome({ ...home, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setPhoto(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token || user.role !== "host") return alert("Unauthorized");

    const formData = new FormData();
    Object.keys(home).forEach((key) => formData.append(key, home[key]));
    if (photo) formData.append("photo", photo);

    const res = await fetch("http://localhost:5000/api/homes", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) return alert(data.message || "Error");
    alert("Home added!");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "50px auto", display: "flex", flexDirection: "column", gap: "10px" }}>
      <h2>Add Home</h2>
      <input name="name" placeholder="Home Name" onChange={handleChange} required />
      <input name="location" placeholder="Location" onChange={handleChange} />
      <input name="rating" type="number" placeholder="Rating" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange} />
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Add Home</button>
    </form>
  );
}

export default Addhome;
