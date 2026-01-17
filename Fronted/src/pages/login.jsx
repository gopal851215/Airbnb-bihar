import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) return alert(data.message);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    navigate("/");
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input name="email" placeholder="Email" onChange={handleChange} style={styles.input} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} style={styles.input} />
        <button style={styles.button}>Login</button>
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
    width: "320px",
    background: "#fff",
    padding: "25px",
    borderRadius: "14px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: { padding: "10px", borderRadius: "8px", border: "1px solid #ccc" },
  button: {
    padding: "12px",
    background: "#ff385c",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
};
