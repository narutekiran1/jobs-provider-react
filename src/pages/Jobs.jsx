import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      const querySnapshot = await getDocs(collection(db, "jobs"));
      const jobsArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setJobs(jobsArray);
    };

    fetchJobs();
  }, []);

  return (
    <div className="jobsContainer">
      <h2>Open Positions</h2>

      {jobs.length === 0 ? (
        <p>No jobs available yet.</p>
      ) : (
        jobs.map(job => (
          <div key={job.id} className="jobCard">
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>₹{job.salary}</p>

            <button onClick={() => navigate(`/apply/${job.id}`)}>
              Apply Now
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Jobs;
