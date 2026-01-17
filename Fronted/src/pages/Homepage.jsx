import React, { useEffect, useState } from "react";

function Homepage() {
  const [homes, setHomes] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);

    fetch("http://localhost:5000/api/homes")
      .then(res => res.json())
      .then(data => setHomes(data));
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      {user?.role === "host" && <h3>You can add homes from Add Home page</h3>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: "20px" }}>
        {homes.map(home => (
          <div key={home._id} style={{ borderRadius: "10px", overflow: "hidden", boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}>
            {home.image && <img src={`http://localhost:5000/uploads/${home.image}`} style={{ width: "100%", height: "180px", objectFit: "cover" }} />}
            <div style={{ padding: "10px" }}>
              <h3>{home.name}</h3>
              <p>📍 {home.location}</p>
              <p>⭐ {home.rating || "N/A"}</p>
              <p>{home.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Homepage;
