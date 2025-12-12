import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import styles from "../styles/jobs.module.css"; // keep same import

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      const snapshot = await getDocs(collection(db, "jobs"));
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJobs(list);
    };
    fetchJobs();
  }, []);

  const handleApply = (jobId) => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        alert("Please login to apply");
        return navigate("/login");
      }
      navigate(`/apply/${jobId}`);
    });
  };

  return (
    <div className={styles.jobsPage}>
      <div className={styles.jobsHeader}>
        <h2>Open Positions</h2>
      </div>

      {jobs.length === 0 ? (
        <div className={styles.center}>
          <p>No jobs available</p>
        </div>
      ) : (
        <div className={styles.jobsGrid}>
          {jobs.map(job => (
            <div key={job.id} className={styles.jobCard}>
              
              {/* LEFT SIDE */}
              <div className={styles.jobMain}>
                <h4>{job.title}</h4>
                <div className={styles.company}>{job.company}</div>
                <div className={styles.location}>{job.location}</div>
              </div>

              {/* RIGHT SIDE */}
              <div className={styles.jobMeta}>
                <div className={styles.salary}>₹{job.salary}</div>
                <button
                  className={styles.applyBtn}
                  onClick={() => handleApply(job.id)}
                >
                  Apply Now
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
