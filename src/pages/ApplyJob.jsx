// src/pages/ApplyJob.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/jobs.module.css";

const ApplyJob = () => {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", resumeUrl: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadJob = async () => {
      const snap = await getDoc(doc(db, "jobs", id));
      if (snap.exists()) setJob({ id: snap.id, ...snap.data() });
    };
    loadJob();
  }, [id]);

  useEffect(() => {
    if (!loading && !user) {
      // If user navigated here without login, redirect to login
      navigate("/login");
    } else if (user) {
      setForm(f => ({ ...f, name: user.displayName || "", email: user.email || "" }));
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");

    setSubmitting(true);
    try {
      await addDoc(collection(db, "applications"), {
        ...form,
        jobId: id,
        userId: user.uid,
        job: job || null,           // optional full job snapshot (helps dashboard UI)
        appliedAt: Date.now()
      });
      // success
      alert("Application submitted!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  if (!job) return <p className={styles.center}>Loading job...</p>;

  return (
    <div className={styles.applyWrap}>
      <div className={styles.jobDetail}>
        <h2>{job.title}</h2>
        <p><strong>{job.company}</strong> • {job.location}</p>
       <p style={{ marginTop: "10px", lineHeight: "1.6" }}>{job.description}</p>

      </div>

      <form className={styles.applyForm} onSubmit={handleSubmit}>
        <h3>Application Form</h3>

        <input name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required  placeholder="Enter name"/>
        <input name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required placeholder="Enter email" />
        <input name="resumeUrl" value={form.resumeUrl} onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })} required placeholder="Enter resume url" />

        <button type="submit" className={styles.applyBtn} disabled={submitting}>
          {submitting ? "Applying..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default ApplyJob;
