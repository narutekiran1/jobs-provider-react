import { useParams } from "react-router-dom";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const ApplyJob = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    resumeUrl: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "applications"), {
      ...form,
      jobId: id,
      userId: user.uid
    });

    alert("Application submitted!");
  };

  return (
    <div className="authContainer">
      <h2>Apply for Job</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="resumeUrl" placeholder="Resume Drive Link" onChange={handleChange} required />

        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyJob;
