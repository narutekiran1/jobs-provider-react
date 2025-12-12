// src/admin/AdminJobs.jsx
import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import styles from "../styles/admin.module.css";

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // form state
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  // load jobs realtime
  useEffect(() => {
    const q = collection(db, "jobs");
    const unsub = onSnapshot(
      q,
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setJobs(list);
        setLoading(false);
      },
      (err) => {
        console.error("jobs onSnapshot error:", err);
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: "",
      company: "",
      location: "",
      salary: "",
      description: "",
    });
  };

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.title || !form.company) return alert("Title and company required");
    try {
      await addDoc(collection(db, "jobs"), {
        ...form,
        salary: form.salary || "",
        createdAt: Date.now(),
        createdAtTS: serverTimestamp(),
      });
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Failed to add job");
    }
  };

  const startEdit = (job) => {
    setEditingId(job.id);
    setForm({
      title: job.title || "",
      company: job.company || "",
      location: job.location || "",
      salary: job.salary || "",
      description: job.description || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingId) return;
    try {
      await updateDoc(doc(db, "jobs", editingId), {
        ...form,
        updatedAt: Date.now(),
      });
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Failed to update job");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this job? This action cannot be undone.")) return;
    try {
      await deleteDoc(doc(db, "jobs", id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className={styles.manageWrap}>
      <h2>Manage Jobs</h2>

      <div className={styles.formBox}>
        <h3>{editingId ? "Edit Job" : "Add New Job"}</h3>

        <form
          className={styles.formGrid}
          onSubmit={editingId ? handleUpdate : handleAdd}
        >
          <input
            name="title"
            placeholder="Job title (eg. Frontend Developer)"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            name="company"
            placeholder="Company (eg. TCS)"
            value={form.company}
            onChange={handleChange}
            required
          />
          <input
            name="location"
            placeholder="Location (eg. Bangalore)"
            value={form.location}
            onChange={handleChange}
          />
          <input
            name="salary"
            placeholder="Salary (eg. 6 LPA)"
            value={form.salary}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Short job description (max 300 chars)"
            value={form.description}
            onChange={handleChange}
            rows={3}
          />

          <div className={styles.formActions}>
            {editingId ? (
              <>
                <button type="submit" className={styles.btnPrimary}>
                  Update Job
                </button>
                <button
                  type="button"
                  className={styles.btnGhost}
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button type="submit" className={styles.btnPrimary}>
                Add Job
              </button>
            )}
          </div>
        </form>
      </div>

      <div className={styles.listBox}>
        <h3>Existing Jobs ({jobs.length})</h3>

        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          <ul className={styles.itemList}>
            {jobs.map((j) => (
              <li key={j.id} className={styles.itemRow}>
                <div>
                  <strong>{j.title}</strong> - {j.company}
                  <div className={styles.meta}>
                    {j.location} • {j.salary ? `₹${j.salary}` : "Salary N/A"}
                  </div>
                  {j.description && (
                    <div style={{ marginTop: 8, color: "#374151" }}>
                      {j.description}
                    </div>
                  )}
                </div>

                <div className={styles.itemActions}>
                  <button
                    onClick={() => startEdit(j)}
                    className={styles.btnSmall}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(j.id)}
                    className={styles.btnDanger}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
