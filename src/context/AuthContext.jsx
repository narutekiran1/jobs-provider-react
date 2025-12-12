// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../components/Loader";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [role, setRole] = useState(() => {
    const saved = sessionStorage.getItem("role");
    return saved ? saved : null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const simpleUser = {
          uid: currentUser.uid,
          email: currentUser.email
        };

        setUser(simpleUser);
        sessionStorage.setItem("user", JSON.stringify(simpleUser));

        // Fetch user role from Firestore
        const snap = await getDoc(doc(db, "users", currentUser.uid));
        const userRole = snap.exists() ? snap.data().role : "user";

        setRole(userRole);
        sessionStorage.setItem("role", userRole);

      } else {
        setUser(null);
        setRole(null);
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("role");
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("role");
  };

  if (loading) return <Loader />;

  return (
    <AuthContext.Provider value={{ user, role, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
