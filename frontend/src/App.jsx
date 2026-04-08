import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AccountProvider } from "./context/AccountContext";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Booking from "./pages/Booking";
import UserDashboard from "./pages/UserDashboard";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <AccountProvider>
        <BrowserRouter basename="/web_labs/src-why/demo">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
            <Route path="/booking" element={<PrivateRoute><Booking /></PrivateRoute>} />
          </Routes>
        </BrowserRouter>
      </AccountProvider>
    </AuthProvider>
  );
}
