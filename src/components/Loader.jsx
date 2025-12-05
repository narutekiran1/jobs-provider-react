import React from "react";
import styles from "../styles/jobs.module.css";

export default function Loader({ small }) {
  return (
    <div className={small ? styles.loaderSmall : styles.loader}>
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
    </div>
  );
}
