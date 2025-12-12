import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import "../styles/dashbord.css";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loadingApps, setLoadingApps] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      setApplications([]);
      setLoadingApps(false);
      return;
    }

    setLoadingApps(true);
    const q = query(
      collection(db, "applications"),
      where("userId", "==", user.uid)
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setApplications(list);
        setLoadingApps(false);
      },
      (err) => {
        console.error("applications listener error", err);
        setLoadingApps(false);
      }
    );

    return () => unsub();
  }, [user, loading]);

  if (loading || loadingApps) return <p>Loading dashboard...</p>;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Your Applications</h2>

      {applications.length === 0 ? (
        <p className="no-apps">You have not applied to any jobs yet.</p>
      ) : (
        <ul className="application-list">
          {applications.map((a) => (
            <li className="application-item" key={a.id}>
              <div className="app-job-title">
                {a.job?.title || "Job ID: " + a.jobId}
              </div>

              <div className="app-job-id">
                Company: {a.job?.company || "Unknown"}
              </div>

              <div className="app-date">
                Applied on:{" "}
                {a.appliedAt
                  ? new Date(a.appliedAt).toLocaleString()
                  : "Unknown date"}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
