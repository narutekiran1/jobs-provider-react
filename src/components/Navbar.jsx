import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/navbar.module.css";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar() {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <motion.nav className={styles.nav} initial={{ y: -20 }} animate={{ y: 0 }}>
      <div className={styles.left}>
        <Link to="/" className={styles.brand}>HireHub</Link>
      </div>

      <div className={styles.right}>
        <Link to="/jobs">Jobs</Link>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            {role === "admin" && <Link to="/admin">Admin</Link>}
            <button onClick={handleLogout} className={styles.logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className={styles.cta}>Sign up</Link>
          </>
        )}
      </div>
    </motion.nav>
  );
}
