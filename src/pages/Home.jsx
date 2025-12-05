import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/jobs.module.css";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.main
      className={styles.homeWrap}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className={styles.hero}>
        <h1>HireHub — Find your next job</h1>
        <p>Search thousands of jobs, build your resume and apply quickly.</p>
        <div className={styles.ctaRow}>
          <Link to="/jobs" className={styles.btnPrimary}>Browse Jobs</Link>
          <Link to="/register" className={styles.btnGhost}>Create Profile</Link>
        </div>
      </section>

      <section className={styles.features}>
        <article>
          <h3>Upload Resume</h3>
          <p>Store your resume securely and apply in one click.</p>
        </article>
        <article>
          <h3>Saved Jobs</h3>
          <p>Keep a list of jobs you want to revisit later.</p>
        </article>
        <article>
          <h3>Company Dashboard</h3>
          <p>Admins can post jobs and view applicants.</p>
        </article>
      </section>
    </motion.main>
  );
}
