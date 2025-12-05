import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <Link to="/post-job">➕ Post New Job</Link>
        <Link to="/jobs">📄 View All Jobs</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
