// src/admin/AdminDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/admin.module.css";
import ManageJobs from "../admin/ManageJobs";
import ManageUsers from "../admin/ManageUsers";
import Applications from "../admin/Applications";

export default function AdminDashboard() {
  // Small landing that links to sub-pages
  return (
    <div className={styles.adminWrap}>
      <aside className={styles.sidebar}>
        <h2 className={styles.brand}>Admin Panel</h2>
        <nav>
          <ul className={styles.noListStyle}>
            <li>
              <Link to="/admin" className={styles.sideLink}>
                Overview
              </Link>
            </li>
            <li>
              <Link to="/admin/jobs" className={styles.sideLink}>
                Manage Jobs
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className={styles.sideLink}>
                Manage Users
              </Link>
            </li>
            <li>
              <Link to="/admin/applications" className={styles.sideLink}>
                Applications
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className={styles.content}>
        <h1>Admin Dashboard</h1>
        <p className={styles.lead}>
          Use the left menu to manage jobs, users and applications.
        </p>

        <section className={styles.cards}>
          <div className={styles.card}>
            <h3>Posted Jobs</h3>
            <p>Manage all job listings</p>
            <Link to="/admin/jobs" className={styles.cardBtn}>
              Manage Jobs
            </Link>
          </div>

          <div className={styles.card}>
            <h3>Users</h3>
            <p>View and change user roles</p>
            <Link to="/admin/users" className={styles.cardBtn}>
              Manage Users
            </Link>
          </div>

          <div className={styles.card}>
            <h3>Applications</h3>
            <p>See all applications</p>
            <Link to="/admin/applications" className={styles.cardBtn}>
              View Applications
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
