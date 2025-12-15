import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Check, Clock, Zap } from 'lucide-react';

export default function Pricing({ user }) {
  return (
    <div className="min-h-screen bg-obsidian">
      <Navbar user={user} />
      
      <div className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4 text-center neon-glow" data-testid="pricing-title">Choose Your Plan</h1>
          <p className="text-xl text-gray-400 text-center mb-12" data-testid="pricing-subtitle">Select the perfect key duration for your needs</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="glass p-8 card-hover" data-testid="pricing-day-card">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-10 h-10 text-neon-cyan" />
                <h2 className="text-3xl font-bold">Day Key</h2>
              </div>
              
              <div className="mb-6">
                <span className="text-5xl font-bold text-neon-purple">₹200</span>
                <span className="text-gray-400 ml-2">/ 24 hours</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-neon-cyan" />
                  <span>Valid for 24 hours</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-neon-cyan" />
                  <span>Instant delivery</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-neon-cyan" />
                  <span>24/7 support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-neon-cyan" />
                  <span>Perfect for quick access</span>
                </li>
              </ul>
              
              {user ? (
                <Link to="/dashboard" className="btn-primary w-full block text-center" data-testid="pricing-day-buy">
                  Buy Day Key
                </Link>
              ) : (
                <Link to="/register" className="btn-primary w-full block text-center" data-testid="pricing-day-register">
                  Register to Buy
                </Link>
              )}
            </div>
            
            <div className="glass p-8 neon-border card-hover relative" data-testid="pricing-week-card">
              <div className="absolute -top-4 right-4 bg-neon-purple px-4 py-1 rounded-full text-sm font-bold">
                BEST VALUE
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-10 h-10 text-neon-purple" />
                <h2 className="text-3xl font-bold">Week Key</h2>
              </div>
              
              <div className="mb-6">
                <span className="text-5xl font-bold text-neon-purple">₹700</span>
                <span className="text-gray-400 ml-2">/ 7 days</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-neon-purple" />
                  <span>Valid for 7 days</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-neon-purple" />
                  <span>Instant delivery</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-neon-purple" />
                  <span>24/7 priority support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-neon-purple" />
                  <span>Save ₹700 vs daily</span>
                </li>
              </ul>
              
              {user ? (
                <Link to="/dashboard" className="btn-primary w-full block text-center" data-testid="pricing-week-buy">
                  Buy Week Key
                </Link>
              ) : (
                <Link to="/register" className="btn-primary w-full block text-center" data-testid="pricing-week-register">
                  Register to Buy
                </Link>
              )}
            </div>
          </div>
          
          <div className="glass p-8 mt-12 max-w-4xl mx-auto" data-testid="pricing-info">
            <h3 className="text-2xl font-bold mb-4">What's Included</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-neon-cyan mt-1" />
                <span>Secure payment processing</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-neon-cyan mt-1" />
                <span>Instant key delivery</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-neon-cyan mt-1" />
                <span>Copy key with one click</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-neon-cyan mt-1" />
                <span>Real-time expiry tracking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}