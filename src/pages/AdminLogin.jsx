// src/pages/AdminLogin.jsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;

      // Fetch role from Firestore
      const snap = await getDoc(doc(db, "users", user.uid));
      if (!snap.exists()) return setError("No admin account found");

      const data = snap.data();

      if (data.role !== "admin") {
        return setError("Access denied — This is not an admin account");
      }

      navigate("/admin");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={styles.page}>
      <form style={styles.box} onSubmit={handleAdminLogin}>
        <h2 style={styles.title}>Admin Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
}

// INLINE CSS
const styles = {
  page: {
    width: "100%",
    height: "88vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f8fafc",
  },

  box: {
    width: "400px",
    padding: "35px",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  title: {
    fontSize: "26px",
    fontWeight: 700,
    textAlign: "center",
    marginBottom: "10px",
  },

  error: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "10px",
    borderRadius: "6px",
    textAlign: "center",
    fontSize: "14px",
  },

  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    fontSize: "16px",
    outline: "none",
  },

  button: {
    padding: "12px",
    borderRadius: "6px",
    background: "#0ea5e9",
    color: "white",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    border: "none",
  },
};
