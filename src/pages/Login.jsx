import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import styles from "../styles/auth.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // after login
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className={styles.authWrap}>
      <div className={styles.card}>
        <h2>Login</h2>

        <form className={styles.form} onSubmit={handleLogin}>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          {error && <div className={styles.err}>{error}</div>}

          <button type="submit" className={styles.btnPrimary}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
