// src/admin/AdminUsers.jsx
import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
// import styles from "../styles/admin.module.css";
import "../styles/users.css"

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "users"),
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setUsers(list);
        setLoading(false);
      },
      (err) => {
        console.error("users onSnapshot", err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  const changeRole = async (uid, newRole) => {
    if (!confirm(`Change role of this user to "${newRole}"?`)) return;
    try {
      await updateDoc(doc(db, "users", uid), { role: newRole });
      alert("Role updated");
    } catch (err) {
      console.error(err);
      alert("Failed to update role");
    }
  };

  const removeUserDoc = async (uid) => {
    if (!confirm("Delete this user document from Firestore? This does not delete from Firebase Authentication.")) return;
    try {
      await deleteDoc(doc(db, "users", uid));
      alert("User doc removed");
    } catch (err) {
      console.error(err);
      alert("Failed to delete user doc");
    }
  };

  return (
  <div className="users-page">
  <div className="users-card">

    {users.map((u) => (
      <div key={u.id} className="user-row">

        <div className="user-info">
          <h3>{u.name ? u.name : "(no name)"}</h3>
          <p>{u.email}</p>
          <p><strong>Role:</strong> {u.role}</p>
        </div>

        <div className="user-actions">
          <select
            className="role-select"
            value={u.role}
            onChange={(e) => updateRole(u.id, e.target.value)}
          >
            <option value="admin">admin</option>
            <option value="user">user</option>
          </select>

          <button className="delete-btn" onClick={() => deleteUser(u.id)}>
            Delete
          </button>
        </div>

      </div>
    ))}

  </div>
</div>

  );
}
