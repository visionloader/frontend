import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Eye, EyeOff, Shield } from 'lucide-react';

export default function Login({ setUser }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        toast.success('Login successful!');
        
        if (data.user.is_admin) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        toast.error(data.detail || 'Login failed');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="max-w-md mx-auto px-4">
          <div className="glass-heavy p-8 rounded-lg" data-testid="login-form">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-neon-purple/20 flex items-center justify-center">
                <Shield className="w-8 h-8 text-neon-purple" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-2 text-center neon-glow" data-testid="login-title">Welcome Back</h1>
            <p className="text-gray-400 text-center mb-8">Login to access your keys</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-neon-purple focus:outline-none transition"
                  placeholder="Enter your email"
                  required
                  data-testid="login-email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-neon-purple focus:outline-none transition"
                    placeholder="Enter your password"
                    required
                    data-testid="login-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    data-testid="toggle-password"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
                data-testid="login-submit"
              >
                {loading ? 'Logging in...' : 'Login Securely'}
              </button>
              
              <p className="text-center text-gray-400">
                Don't have an account?{' '}
                <a href="/register" className="text-neon-purple hover:text-neon-pink transition" data-testid="login-register-link">
                  Register here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}