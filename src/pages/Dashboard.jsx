import React, { useEffect, useState } from "react";
import styles from "../styles/dashboard.module.css";
import { useAuth } from "../context/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import JobCard from "../components/JobCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, role } = useAuth();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch applied jobs if user exists (example collection 'applications' with field uid)
    if (!user) return;
    (async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "applications"), where("uid", "==", user.uid));
        const snap = await getDocs(q);
        setAppliedJobs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  return (
    <motion.div className={styles.dashboardWrap} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <header className={styles.header}>
        <h2>Welcome{user ? `, ${user.email.split("@")[0]}` : ""}</h2>
        <div className={styles.controls}>
          {role === "admin" && <Link to="/admin" className={styles.btnGhost}>Admin</Link>}
          <Link to="/profile" className={styles.btnPrimary}>Profile</Link>
        </div>
      </header>

      <section>
        <h3>Your Applications</h3>
        {loading ? <p>Loading...</p> :
          appliedJobs.length ? (
            <div className={styles.grid}>
              {appliedJobs.map(a => <JobCard key={a.id} job={a.job || a} compact />)}
            </div>
          ) : <p>You haven't applied to any jobs yet.</p>
        }
      </section>
    </motion.div>
  );
}
