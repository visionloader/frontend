import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { toast } from 'sonner';
import { TrendingUp, Users, Key, Package, Upload, RefreshCw } from 'lucide-react';

export default function AdminDashboard({ user, setUser }) {
  const [stats, setStats] = useState(null);
  const [keys, setKeys] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('stats');
  const [uploadData, setUploadData] = useState({ keys: '', plan_type: 'DAY' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'stats') fetchStats();
    if (activeTab === 'keys') fetchKeys();
    if (activeTab === 'orders') fetchOrders();
    if (activeTab === 'users') fetchUsers();
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/stats`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      toast.error('Failed to load stats');
    }
  };

  const fetchKeys = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/keys`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setKeys(data.keys || []);
    } catch (error) {
      toast.error('Failed to load keys');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/orders`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/users`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadKeys = async (e) => {
    e.preventDefault();
    
    const keysList = uploadData.keys.split('\n').filter(k => k.trim());
    if (keysList.length === 0) {
      toast.error('Please enter at least one key');
      return;
    }
    
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/keys/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          keys: keysList,
          plan_type: uploadData.plan_type
        })
      });
      
      if (response.ok) {
        toast.success(`${keysList.length} keys uploaded successfully`);
        setUploadData({ keys: '', plan_type: 'DAY' });
        fetchKeys();
      } else {
        toast.error('Upload failed');
      }
    } catch (error) {
      toast.error('Network error');
    }
  };

  const revokeKey = async (keyId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/keys/${keyId}/revoke`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      
      if (response.ok) {
        toast.success('Key revoked');
        fetchKeys();
      }
    } catch (error) {
      toast.error('Revoke failed');
    }
  };

  return (
    <div className="min-h-screen bg-obsidian">
      <Navbar user={user} setUser={setUser} />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8 neon-glow" data-testid="admin-title">Admin Dashboard</h1>
          
          <div className="flex gap-4 mb-8 overflow-x-auto" data-testid="admin-tabs">
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-6 py-3 rounded-lg font-bold transition ${activeTab === 'stats' ? 'bg-neon-purple text-white' : 'glass text-gray-400 hover:text-white'}`}
              data-testid="tab-stats"
            >
              Statistics
            </button>
            <button
              onClick={() => setActiveTab('keys')}
              className={`px-6 py-3 rounded-lg font-bold transition ${activeTab === 'keys' ? 'bg-neon-purple text-white' : 'glass text-gray-400 hover:text-white'}`}
              data-testid="tab-keys"
            >
              Keys
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 rounded-lg font-bold transition ${activeTab === 'orders' ? 'bg-neon-purple text-white' : 'glass text-gray-400 hover:text-white'}`}
              data-testid="tab-orders"
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 rounded-lg font-bold transition ${activeTab === 'users' ? 'bg-neon-purple text-white' : 'glass text-gray-400 hover:text-white'}`}
              data-testid="tab-users"
            >
              Users
            </button>
          </div>
          
          {activeTab === 'stats' && stats && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass p-6" data-testid="stat-total-revenue">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-8 h-8 text-neon-purple" />
                    <h3 className="text-lg font-bold">Total Revenue</h3>
                  </div>
                  <p className="text-3xl font-bold text-neon-purple">₹{stats.total_revenue}</p>
                </div>
                
                <div className="glass p-6" data-testid="stat-today-revenue">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-8 h-8 text-neon-cyan" />
                    <h3 className="text-lg font-bold">Today's Revenue</h3>
                  </div>
                  <p className="text-3xl font-bold text-neon-cyan">₹{stats.today_revenue}</p>
                  <p className="text-sm text-gray-400 mt-2">{stats.today_orders} orders</p>
                </div>
                
                <div className="glass p-6" data-testid="stat-total-users">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-8 h-8 text-neon-pink" />
                    <h3 className="text-lg font-bold">Total Users</h3>
                  </div>
                  <p className="text-3xl font-bold text-neon-pink">{stats.total_users}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass p-6" data-testid="stat-active-keys">
                  <div className="flex items-center gap-3 mb-2">
                    <Key className="w-8 h-8 text-neon-cyan" />
                    <h3 className="text-lg font-bold">Active Keys (Sold)</h3>
                  </div>
                  <p className="text-3xl font-bold text-neon-cyan">{stats.active_keys}</p>
                </div>
                
                <div className="glass p-6" data-testid="stat-unused-keys">
                  <div className="flex items-center gap-3 mb-2">
                    <Package className="w-8 h-8 text-neon-purple" />
                    <h3 className="text-lg font-bold">Stock Available</h3>
                  </div>
                  <p className="text-3xl font-bold text-neon-purple">{stats.unused_keys}</p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'keys' && (
            <div>
              <div className="glass-heavy p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Upload className="w-6 h-6" />
                  Upload New Keys
                </h2>
                <form onSubmit={handleUploadKeys} data-testid="upload-keys-form">
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Plan Type</label>
                    <select
                      value={uploadData.plan_type}
                      onChange={(e) => setUploadData({...uploadData, plan_type: e.target.value})}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-neon-purple focus:outline-none"
                      data-testid="upload-plan-type"
                    >
                      <option value="DAY">Day Keys</option>
                      <option value="WEEK">Week Keys</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Keys (one per line)</label>
                    <textarea
                      value={uploadData.keys}
                      onChange={(e) => setUploadData({...uploadData, keys: e.target.value})}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-neon-purple focus:outline-none mono h-32"
                      placeholder="Vision_Day_AtHt8xtY76\nVision_Day_xjdje282Hhd"
                      data-testid="upload-keys-input"
                    />
                  </div>
                  
                  <button type="submit" className="btn-primary" data-testid="upload-keys-submit">
                    Upload Keys
                  </button>
                </form>
              </div>
              
              <div className="glass-heavy p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">All Keys</h2>
                  <button onClick={fetchKeys} className="btn-secondary flex items-center gap-2" data-testid="refresh-keys">
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </button>
                </div>
                
                {loading ? (
                  <p className="text-gray-400">Loading...</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-3 px-4">Key Code</th>
                          <th className="text-left py-3 px-4">Plan</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Upload Date</th>
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {keys.slice(0, 50).map((key, index) => (
                          <tr key={key.id} className="border-b border-white/5" data-testid={`key-row-${index}`}>
                            <td className="py-3 px-4 mono text-sm">{key.key_code}</td>
                            <td className="py-3 px-4">{key.plan_type}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded text-xs ${
                                key.status === 'UNUSED' ? 'bg-green-500/20 text-green-400' :
                                key.status === 'SOLD' ? 'bg-blue-500/20 text-blue-400' :
                                'bg-red-500/20 text-red-400'
                              }`}>
                                {key.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-400">
                              {new Date(key.upload_date).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4">
                              {key.status === 'SOLD' && (
                                <button
                                  onClick={() => revokeKey(key.id)}
                                  className="text-red-400 hover:text-red-300 text-sm"
                                  data-testid={`revoke-key-${index}`}
                                >
                                  Revoke
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div className="glass-heavy p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">All Orders</h2>
                <button onClick={fetchOrders} className="btn-secondary flex items-center gap-2" data-testid="refresh-orders">
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
              </div>
              
              {loading ? (
                <p className="text-gray-400">Loading...</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4">Order ID</th>
                        <th className="text-left py-3 px-4">User ID</th>
                        <th className="text-left py-3 px-4">Plan</th>
                        <th className="text-left py-3 px-4">Amount</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 50).map((order, index) => (
                        <tr key={order.id} className="border-b border-white/5" data-testid={`order-row-${index}`}>
                          <td className="py-3 px-4 mono text-xs">{order.id.slice(0, 8)}...</td>
                          <td className="py-3 px-4 mono text-xs">{order.user_id.slice(0, 8)}...</td>
                          <td className="py-3 px-4">{order.plan_type}</td>
                          <td className="py-3 px-4">₹{order.amount}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-xs ${
                              order.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400' :
                              order.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-400">
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'users' && (
            <div className="glass-heavy p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">All Users</h2>
                <button onClick={fetchUsers} className="btn-secondary flex items-center gap-2" data-testid="refresh-users">
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
              </div>
              
              {loading ? (
                <p className="text-gray-400">Loading...</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4">Username</th>
                        <th className="text-left py-3 px-4">Email</th>
                        <th className="text-left py-3 px-4">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={user.id} className="border-b border-white/5" data-testid={`user-row-${index}`}>
                          <td className="py-3 px-4">{user.username}</td>
                          <td className="py-3 px-4 text-gray-400">{user.email}</td>
                          <td className="py-3 px-4 text-sm text-gray-400">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}