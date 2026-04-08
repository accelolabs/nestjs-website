import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AccountProvider } from "./context/AccountContext";
import { useAuth } from "./context/useAuth";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Booking from "./pages/Booking";
import UserDashboard from "./pages/UserDashboard";
import AdminPanel from "./pages/AdminPanel";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "ADMIN") return <Navigate to="/dashboard" replace />;
  return children;
}

export default function App() {
  const basename = import.meta.env.VITE_BASE_PATH || "/";

  return (
    <AuthProvider>
      <AccountProvider>
        <BrowserRouter basename={basename}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
            <Route path="/booking" element={<PrivateRoute><Booking /></PrivateRoute>} />
            <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
          </Routes>
        </BrowserRouter>
      </AccountProvider>
    </AuthProvider>
  );
}
