import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isUser = sessionStorage.getItem("isUser");

  if (!isUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
