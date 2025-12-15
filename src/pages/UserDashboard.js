import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { toast } from 'sonner';
import { Copy, Key, Clock, CheckCircle, XCircle, ExternalLink } from 'lucide-react';

export default function UserDashboard({ user, setUser }) {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [creating, setCreating] = useState(false);
  const [availableKeys, setAvailableKeys] = useState({ DAY: 0, WEEK: 0 });

  useEffect(() => {
    fetchDashboard();
    fetchAvailableKeys();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/dashboard`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setPurchases(data.purchases || []);
    } catch (error) {
      toast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableKeys = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/keys/available-count`);
      const data = await response.json();
      setAvailableKeys(data);
    } catch (error) {
      console.error('Failed to fetch available keys');
    }
  };

  const handleCopy = (keyCode) => {
    navigator.clipboard.writeText(keyCode);
    toast.success('Key copied to clipboard!');
  };

  const createOrder = async (planType) => {
    setCreating(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ plan_type: planType })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        if (data.payment_url) {
          window.open(data.payment_url, '_blank');
          toast.success('Payment page opened. Complete payment and return here.');
          setSelectedPlan({ orderId: data.id, planType });
        } else {
          toast.error('Failed to create payment link');
        }
      } else {
        toast.error(data.detail || 'Failed to create order');
      }
    } catch (error) {
      toast.error('Network error');
    } finally {
      setCreating(false);
    }
  };

  const verifyPayment = async () => {
    if (!selectedPlan) return;
    
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders/verify/${selectedPlan.orderId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const data = await response.json();
      
      if (data.status === 'COMPLETED') {
        toast.success('Payment verified! Your key is ready.');
        setSelectedPlan(null);
        fetchDashboard();
      } else {
        toast.info('Payment still pending. Please complete payment.');
      }
    } catch (error) {
      toast.error('Verification failed');
    }
  };

  const getTimeRemaining = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diff = expiry - now;
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h remaining`;
    if (hours > 0) return `${hours}h ${minutes}m remaining`;
    return `${minutes}m remaining`;
  };

  return (
    <div className="min-h-screen bg-obsidian">
      <Navbar user={user} setUser={setUser} />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8 neon-glow" data-testid="dashboard-title">My Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="glass p-6 card-hover" data-testid="purchase-day-card">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-8 h-8 text-neon-cyan" />
                <h2 className="text-2xl font-bold">Day Key</h2>
              </div>
              <p className="text-3xl font-bold text-neon-purple mb-2">₹200</p>
              <p className="text-gray-400 mb-4">Valid for 24 hours</p>
              <p className="text-sm text-gray-500 mb-4">Available: {availableKeys.DAY}</p>
              <button
                onClick={() => createOrder('DAY')}
                disabled={creating || availableKeys.DAY === 0}
                className="btn-primary w-full"
                data-testid="buy-day-key"
              >
                {availableKeys.DAY === 0 ? 'Out of Stock' : creating ? 'Processing...' : 'Buy Day Key'}
              </button>
            </div>
            
            <div className="glass p-6 neon-border card-hover" data-testid="purchase-week-card">
              <div className="flex items-center gap-3 mb-4">
                <Key className="w-8 h-8 text-neon-purple" />
                <h2 className="text-2xl font-bold">Week Key</h2>
              </div>
              <p className="text-3xl font-bold text-neon-purple mb-2">₹700</p>
              <p className="text-gray-400 mb-4">Valid for 7 days</p>
              <p className="text-sm text-gray-500 mb-4">Available: {availableKeys.WEEK}</p>
              <button
                onClick={() => createOrder('WEEK')}
                disabled={creating || availableKeys.WEEK === 0}
                className="btn-primary w-full"
                data-testid="buy-week-key"
              >
                {availableKeys.WEEK === 0 ? 'Out of Stock' : creating ? 'Processing...' : 'Buy Week Key'}
              </button>
            </div>
          </div>
          
          {selectedPlan && (
            <div className="glass-heavy p-6 mb-8 border border-neon-purple" data-testid="verify-payment-banner">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Payment Pending</h3>
                  <p className="text-gray-400">Complete payment and verify to receive your key</p>
                </div>
                <button onClick={verifyPayment} className="btn-primary" data-testid="verify-payment-button">
                  Verify Payment
                </button>
              </div>
            </div>
          )}
          
          <div className="glass-heavy p-6">
            <h2 className="text-2xl font-bold mb-6" data-testid="my-keys-title">My Keys</h2>
            
            {loading ? (
              <p className="text-gray-400">Loading...</p>
            ) : purchases.length === 0 ? (
              <p className="text-gray-400" data-testid="no-keys-message">No keys purchased yet. Buy your first key above!</p>
            ) : (
              <div className="space-y-4">
                {purchases.map((purchase, index) => (
                  <div
                    key={purchase.id}
                    className={`glass p-6 rounded-lg ${purchase.status === 'ACTIVE' ? 'border border-neon-cyan' : 'border border-gray-700'}`}
                    data-testid={`key-card-${index}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold">{purchase.plan_type} Key</h3>
                          {purchase.status === 'ACTIVE' ? (
                            <span className="flex items-center gap-1 bg-neon-cyan/20 text-neon-cyan px-3 py-1 rounded-full text-sm" data-testid={`status-active-${index}`}>
                              <CheckCircle className="w-4 h-4" />
                              Active
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm" data-testid={`status-expired-${index}`}>
                              <XCircle className="w-4 h-4" />
                              Expired
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm">
                          Purchased: {new Date(purchase.purchase_date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400 mb-1">Expires:</p>
                        <p className="font-bold text-neon-purple">
                          {getTimeRemaining(purchase.expiry_date)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-black/40 rounded-lg p-4 flex items-center justify-between">
                      <code className="mono text-neon-cyan text-lg" data-testid={`key-code-${index}`}>
                        {purchase.key_code}
                      </code>
                      <button
                        onClick={() => handleCopy(purchase.key_code)}
                        className="btn-secondary flex items-center gap-2"
                        data-testid={`copy-key-${index}`}
                      >
                        <Copy className="w-4 h-4" />
                        Copy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}