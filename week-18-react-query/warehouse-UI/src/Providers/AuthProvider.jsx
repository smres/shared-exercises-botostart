import { Navigate } from "react-router-dom";

import { getCookie } from "../utils/cookie";

function AuthProvider({ children }) {
  const token = getCookie("token");

  if (!token) return <Navigate to="/login" />;

  return children;
}

export default AuthProvider;
