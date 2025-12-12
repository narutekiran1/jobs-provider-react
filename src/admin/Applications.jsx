import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";
import "../styles/applications.css";

export default function Applications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const snap = await getDocs(collection(db, "applications"));
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setApplications(list);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const deleteApp = async (id) => {
    try {
      await deleteDoc(doc(db, "applications", id));
      fetchApplications(); // reload
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="applications-page">
      <h2>Applications</h2>

      <div className="applications-list">
        {applications.length === 0 && (
          <p className="empty">No applications found.</p>
        )}

        {applications.map((app) => (
          <div key={app.id} className="application-card">
            <div className="application-info">
              <h3>{app.name || "Unknown Applicant"}</h3>

              <p>
                <strong>Email:</strong> {app.email}
              </p>

              <p>
                <strong>Applied For:</strong> {app.job?.title || "Unknown Job"}
              </p>

              <p>
                <strong>Company:</strong> {app.job?.company}
              </p>

              <p>
                <strong>Location:</strong> {app.job?.location}
              </p>

              <p>
                <strong>Salary:</strong> {app.job?.salary}
              </p>
            </div>

            <button
              className="delete-btn"
              onClick={() => deleteApp(app.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
