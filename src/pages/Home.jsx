// src/pages/Home.jsx
import { Link } from "react-router-dom";
import styles from "../styles/home.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.navGap} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.title}>HireHub — Find your next job</h1>
          <p className={styles.subtitle}>
            Search thousands of jobs, build your resume and apply quickly.
          </p>

          <div className={styles.ctaRow}>
            <Link to="/jobs" className={styles.btnPrimary}>Browse Jobs</Link>
            <Link to="/profile" className={styles.btnGhost}>Create Profile</Link>
          </div>
        </div>
      </section>

      <section className={styles.featuresWrap}>
        <div className={styles.feature}>
          <h3>Upload Resume</h3>
          <p>Store your resume securely and apply in one click.</p>
        </div>

        <div className={styles.feature}>
          <h3>Company Dashboard</h3>
          <p>Admins can post jobs and view applicants (Admin only).</p>
        </div>
      </section>
    </div>
  );
}
