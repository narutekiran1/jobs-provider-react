// src/admin/ManageUsers.jsx
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import styles from "../styles/admin.module.css";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), snap => {
      setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, err => { console.error("users listen", err); });

    return () => unsub();
  }, []);

  const changeRole = async (uid, newRole) => {
    if (!window.confirm(`Change role to "${newRole}"?`)) return;
    try {
      await updateDoc(doc(db, "users", uid), { role: newRole });
    } catch (err) {
      console.error(err);
      alert("Failed to change role");
    }
  };

  const removeUser = async (uid) => {
    if (!window.confirm("Delete user from Firestore? (This won't remove Auth user)")) return;
    try {
      await deleteDoc(doc(db, "users", uid));
    } catch (err) { console.error(err); alert("Failed to delete user doc"); }
  };

  return (
    <div className={styles.manageWrap}>
      <h2>Manage Users</h2>

      <div className={styles.listBox}>
        <ul className={styles.itemList}>
          {users.map(u => (
            <li key={u.id} className={styles.itemRow}>
              <div>
                <strong>{u.name || "(no name)"}</strong>
                <div className={styles.meta}>{u.email}</div>
              </div>

              <div className={styles.itemActions}>
                <select value={u.role || "user"} onChange={(e) => changeRole(u.id, e.target.value)}>
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>

                <button onClick={() => removeUser(u.id)} className={styles.btnDanger}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
