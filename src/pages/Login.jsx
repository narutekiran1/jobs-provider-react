import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import styles from "../styles/auth.module.css";

const Login = () => {
  const [mode, setMode] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Update email/password when mode changes
  useEffect(() => {
    if (mode === "admin") {
      setEmail("admin@hirehub.com");
      setPassword("Admin@123");
    } else {
      setEmail("");
      setPassword("");
    }
  }, [mode]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const snap = await getDoc(doc(db, "users", res.user.uid));
      const role = snap.data()?.role || "user";

      if (mode === "admin" && role !== "admin") {
        setError("You are not authorized as Admin");
        return;
      }

      if (role === "admin") navigate("/admin");
      else navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2>{mode === "admin" ? "Admin Login" : "User Login"}</h2>

        {/* Toggle */}
        <div className={styles.toggle}>
          <button
            className={mode === "user" ? styles.active : ""}
            onClick={() => setMode("user")}
          >
            User Login
          </button>
          <button
            className={mode === "admin" ? styles.active : ""}
            onClick={() => setMode("admin")}
          >
            Admin Login
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <div className={styles.authField}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.authField}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.authBtn}>
            {mode === "admin" ? "Login as Admin" : "Login as User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
