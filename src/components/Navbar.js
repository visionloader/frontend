import { Link, useNavigate } from 'react-router-dom';
import { Shield, LogOut, LayoutDashboard } from 'lucide-react';

export const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-heavy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2" data-testid="navbar-logo">
            <Shield className="w-8 h-8 text-neon-purple" />
            <span className="text-2xl font-bold neon-glow">Vision Key</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/" className="text-gray-300 hover:text-white transition" data-testid="nav-home">Home</Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition" data-testid="nav-about">About</Link>
            <Link to="/pricing" className="text-gray-300 hover:text-white transition" data-testid="nav-pricing">Pricing</Link>
            
            {user ? (
              <>
                <Link to={user.is_admin ? "/admin" : "/dashboard"} className="flex items-center gap-2 text-neon-cyan hover:text-neon-purple transition" data-testid="nav-dashboard">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 btn-secondary" data-testid="nav-logout">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary" data-testid="nav-login">Login</Link>
                <Link to="/register" className="btn-primary" data-testid="nav-register">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};