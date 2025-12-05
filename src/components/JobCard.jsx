import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/jobs.module.css";
import { motion } from "framer-motion";

export default function JobCard({ job, compact }) {
  if (!job) return null;
  return (
    <motion.article
      className={compact ? styles.jobCardCompact : styles.jobCard}
      whileHover={{ scale: 1.02 }}
    >
      <div className={styles.jobMain}>
        <h4>{job.title}</h4>
        <p className={styles.company}>{job.company} • {job.location || "Remote"}</p>
      </div>

      <div className={styles.jobMeta}>
        <span className={styles.salary}>{job.salary || "—"}</span>
        <Link to={`/apply/${job.id}`} className={styles.applyBtn}>View / Apply</Link>
      </div>
    </motion.article>
  );
}
