// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, role, loading, logout } = useAuth();

  if (loading) return null;

  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <Link to="/" style={styles.logo}>JobPortal</Link>

      {/* Middle Links */}
      <div style={styles.links}>
        <Link to="/jobs" style={styles.link}>Jobs</Link>

        {user && role === "admin" && (
          <Link to="/admin" style={styles.link}>Admin</Link>
        )}

        {user && (
          <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        )}
      </div>

      {/* Right Buttons */}
      <div style={styles.actions}>
        {!user ? (
          <>
            {/* Admin Login Added Here */}
            <Link to="/admin-login" style={styles.adminBtn}>
              Admin Login
            </Link>

            <Link to="/login" style={styles.loginBtn}>Login</Link>
            <Link to="/register" style={styles.registerBtn}>Register</Link>
          </>
        ) : (
          <button onClick={logout} style={styles.adminBtn}>Logout</button>
        )}
      </div>
    </nav>
  );
}

// Styling
const styles = {
  navbar: {
    width: "95%",
    padding: "15px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #e5e5e5",
    backgroundColor: "#ffffff",
    position: "sticky",
    top: 0,
    zIndex: 1000
  },

  logo: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#06b6d4",
    textDecoration: "none",
  },

  links: {
    display: "flex",
    gap: "30px",
    alignItems: "center",
  },

  link: {
    fontSize: "18px",
    color: "#333",
    textDecoration: "none",
    fontWeight: 500,
  },

  actions: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },

  adminBtn: {
    padding: "6px 16px",
    border: "1px solid #9333ea",
    borderRadius: "6px",
    color: "#9333ea",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: 500,
  },

  loginBtn: {
    padding: "6px 16px",
    border: "1px solid #0ea5e9",
    borderRadius: "6px",
    color: "#0ea5e9",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: 500,
  },

  registerBtn: {
    padding: "6px 16px",
    backgroundColor: "#0ea5e9",
    borderRadius: "6px",
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: 500,
  },

  logoutBtn: {
    padding: "6px 16px",
    backgroundColor: "#ef4444",
    borderRadius: "6px",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 500,
  },
};
