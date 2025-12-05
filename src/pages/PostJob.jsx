import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "jobs"), job);
    alert("Job Posted Successfully!");
    navigate("/admin");
  };

  return (
    <div className="authContainer">
      <h2>Post a Job</h2>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Job Title" onChange={handleChange} required />
        <input name="company" placeholder="Company Name" onChange={handleChange} required />
        <input name="location" placeholder="Job Location" onChange={handleChange} required />
        <input name="salary" placeholder="Salary" onChange={handleChange} required />
        <textarea name="description" placeholder="Job Description" onChange={handleChange} required />

        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default PostJob;
