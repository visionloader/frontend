import { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Pricing from "@/pages/Pricing";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import UserDashboard from "@/pages/UserDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Refund from "@/pages/Refund";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          setUser(data);
        } else {
          localStorage.removeItem('token');
        }
      })
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-obsidian flex items-center justify-center">
      <div className="text-neon-purple text-xl">Loading...</div>
    </div>;
  }

  const ProtectedRoute = ({ children, adminOnly }) => {
    if (!user) return <Navigate to="/login" />;
    if (adminOnly && !user.is_admin) return <Navigate to="/dashboard" />;
    return children;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/about" element={<About user={user} />} />
          <Route path="/pricing" element={<Pricing user={user} />} />
          <Route path="/register" element={user ? <Navigate to={user.is_admin ? "/admin" : "/dashboard"} /> : <Register setUser={setUser} />} />
          <Route path="/login" element={user ? <Navigate to={user.is_admin ? "/admin" : "/dashboard"} /> : <Login setUser={setUser} />} />
          <Route path="/dashboard" element={<ProtectedRoute><UserDashboard user={user} setUser={setUser} /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminDashboard user={user} setUser={setUser} /></ProtectedRoute>} />
          <Route path="/terms" element={<Terms user={user} />} />
          <Route path="/privacy" element={<Privacy user={user} />} />
          <Route path="/refund" element={<Refund user={user} />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;