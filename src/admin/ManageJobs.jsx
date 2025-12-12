// src/admin/ManageJobs.jsx
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import styles from "../styles/admin.module.css";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [editing, setEditing] = useState(null); // job id or null
  const [form, setForm] = useState({ title: "", company: "", location: "", salary: "", description: "" });
  const jobsRef = collection(db, "jobs");

  useEffect(() => {
    const unsub = onSnapshot(jobsRef, snap => {
      setJobs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, err => {
      console.error("jobs listener", err);
    });
    return () => unsub();
  }, []);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.title) return alert("Title required");
    try {
      await addDoc(jobsRef, {
        ...form,
        salary: form.salary || "",
        createdAt: Date.now()
      });
      setForm({ title: "", company: "", location: "", salary: "", description: "" });
    } catch (err) { console.error(err); alert("Failed to add job"); }
  };

  const startEdit = (job) => {
    setEditing(job.id);
    setForm({ title: job.title || "", company: job.company || "", location: job.location || "", salary: job.salary || "", description: job.description || "" });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "jobs", editing), { ...form });
      setEditing(null);
      setForm({ title: "", company: "", location: "", salary: "", description: "" });
    } catch (err) { console.error(err); alert("Failed to update"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    try { await deleteDoc(doc(db, "jobs", id)); } catch (err) { console.error(err); alert("Failed to delete"); }
  };

  return (
    <div className={styles.manageWrap}>
      <h2>Manage Jobs</h2>

      <div className={styles.formBox}>
        <h3>{editing ? "Edit Job" : "Add Job"}</h3>
        <form onSubmit={editing ? handleUpdate : handleAdd} className={styles.formGrid}>
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
          <input name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
          <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
          <input name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} rows={3} />
          <div className={styles.formActions}>
            {editing ? (
              <>
                <button type="submit" className={styles.btnPrimary}>Update Job</button>
                <button type="button" onClick={() => { setEditing(null); setForm({ title: "", company: "", location: "", salary: "", description: "" }); }} className={styles.btnGhost}>Cancel</button>
              </>
            ) : (
              <button type="submit" className={styles.btnPrimary}>Add Job</button>
            )}
          </div>
        </form>
      </div>

      <div className={styles.listBox}>
        <h3>Existing Jobs</h3>
        <ul className={styles.itemList}>
          {jobs.map(j => (
            <li key={j.id} className={styles.itemRow}>
              <div>
                <strong>{j.title}</strong> - {j.company}
                <div className={styles.meta}>{j.location} • {j.salary && `₹${j.salary}`}</div>
              </div>

              <div className={styles.itemActions}>
                <button onClick={() => startEdit(j)} className={styles.btnSmall}>Edit</button>
                <button onClick={() => handleDelete(j.id)} className={styles.btnDanger}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
