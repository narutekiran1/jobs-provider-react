import React, { useState, useEffect } from "react";
import styles from "../styles/dashboard.module.css";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({ name: "", headline: "", resume: "" });
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoading(true);
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) setProfile(snap.data());
      setLoading(false);
    })();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    try {
      let resumeUrl = profile.resume;
      if (file) {
        const storeRef = ref(storage, `resumes/${user.uid}_${Date.now()}_${file.name}`);
        await uploadBytes(storeRef, file);
        resumeUrl = await getDownloadURL(storeRef);
      }
      await updateDoc(doc(db, "users", user.uid), { ...profile, resume: resumeUrl });
      alert("Profile updated");
    } catch (err) {
      console.error(err);
      alert("Failed to update");
    }
  };

  if (loading) return <p className={styles.center}>Loading profile...</p>;

  return (
    <div className={styles.profileWrap}>
      <h2>Your Profile</h2>
      <label>Name</label>
      <input value={profile.name || ""} onChange={e => setProfile({ ...profile, name: e.target.value })} />

      <label>Headline</label>
      <input value={profile.headline || ""} onChange={e => setProfile({ ...profile, headline: e.target.value })} />

      <label>Resume (upload new to replace)</label>
      <input type="file" accept=".pdf,.doc,.docx" onChange={e => setFile(e.target.files[0])} />

      {profile.resume && (
        <p>Saved resume: <a href={profile.resume} target="_blank" rel="noreferrer">View</a></p>
      )}

      <button onClick={handleSave} className={styles.btnPrimary}>Save Profile</button>
    </div>
  );
}
