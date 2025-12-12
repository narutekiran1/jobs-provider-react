import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import ApplyJob from "./pages/ApplyJob";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import AdminLogin from "./pages/AdminLogin";
import { useAuth } from "./context/AuthContext";
import AdminUsers from "./admin/AdminUsers";
import AdminJobs from "./admin/AdminJobs";
import Applications from "./admin/Applications";

export default function App() {
  const { role } = useAuth(); // ensures re-render when admin logs in

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />

        {/* USER PROTECTED ROUTES */}
        <Route
          path="/apply/:id"
          element={
            <ProtectedRoute>
              <ApplyJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        {/* ADMIN LOGIN */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* ADMIN PROTECTED ROUTES */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/jobs"
          element={
            <AdminRoute>
              <AdminJobs />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/applications"
          element={
            <AdminRoute>
              <Applications />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
