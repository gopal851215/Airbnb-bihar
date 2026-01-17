import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "guest",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) navigate("/login");
    else alert("Signup failed");
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Create Account</h2>

        <input name="name" placeholder="Full Name" onChange={handleChange} style={styles.input} />
        <input name="email" placeholder="Email" onChange={handleChange} style={styles.input} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} style={styles.input} />

        <select name="role" onChange={handleChange} style={styles.input}>
          <option value="guest">Guest</option>
          <option value="host">Host</option>
        </select>

        <button style={styles.button}>Signup</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f7f7f7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "350px",
    background: "#fff",
    padding: "30px",
    borderRadius: "14px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  title: { textAlign: "center", marginBottom: "10px" },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    background: "#ff385c",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },
};
