import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Shield, Zap, Lock, Clock } from 'lucide-react';

export default function Home({ user }) {
  return (
    <div className="min-h-screen bg-obsidian">
      <Navbar user={user} />
      
      <div className="relative pt-24">
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1535391879778-3bae11d29a24?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwyfHxjeWJlcnB1bmslMjBjaXR5JTIwbmlnaHQlMjBza3lsaW5lJTIwZnV0dXJpc3RpY3xlbnwwfHx8fDE3NjU3NzQ2OTR8MA&ixlib=rb-4.1.0&q=85')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)'
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-20">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 neon-glow" data-testid="hero-title">
              Official Key Store
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8" data-testid="hero-subtitle">
              Secure & Instant Access to Digital Keys
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/pricing" className="btn-primary skew-button" data-testid="hero-buy-now">
                Buy Now
              </Link>
              <Link to="/about" className="btn-secondary" data-testid="hero-learn-more">
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="glass p-8 card-hover" data-testid="plan-day">
              <div className="text-neon-cyan mb-4">
                <Clock className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-bold mb-2">1 Day Key</h3>
              <p className="text-4xl font-bold text-neon-purple mb-4">₹200</p>
              <p className="text-gray-400 mb-6">Perfect for short-term access</p>
              <Link to="/pricing" className="btn-primary w-full block text-center" data-testid="plan-day-buy">
                Purchase Day Key
              </Link>
            </div>
            
            <div className="glass p-8 neon-border card-hover" data-testid="plan-week">
              <div className="text-neon-purple mb-4">
                <Zap className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-bold mb-2">1 Week Key</h3>
              <p className="text-4xl font-bold text-neon-purple mb-4">₹700</p>
              <p className="text-gray-400 mb-6">Best value for extended use</p>
              <Link to="/pricing" className="btn-primary w-full block text-center" data-testid="plan-week-buy">
                Purchase Week Key
              </Link>
            </div>
          </div>
          
          <div className="glass-heavy p-12 rounded-lg">
            <h2 className="text-4xl font-bold text-center mb-12" data-testid="features-title">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center" data-testid="feature-instant">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-neon-purple/20">
                  <Zap className="w-8 h-8 text-neon-purple" />
                </div>
                <h3 className="text-xl font-bold mb-2">Instant Delivery</h3>
                <p className="text-gray-400">Keys delivered immediately after payment verification</p>
              </div>
              
              <div className="text-center" data-testid="feature-secure">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-neon-cyan/20">
                  <Shield className="w-8 h-8 text-neon-cyan" />
                </div>
                <h3 className="text-xl font-bold mb-2">100% Secure</h3>
                <p className="text-gray-400">Bank-grade encryption for all transactions</p>
              </div>
              
              <div className="text-center" data-testid="feature-support">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-neon-pink/20">
                  <Lock className="w-8 h-8 text-neon-pink" />
                </div>
                <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                <p className="text-gray-400">Always here to help with any issues</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}