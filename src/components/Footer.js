import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="glass mt-20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-neon-purple" />
              <span className="text-xl font-bold">Vision Key</span>
            </div>
            <p className="text-gray-400 text-sm">Secure & Instant Digital Key Access</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-gray-400 hover:text-neon-purple transition text-sm">Home</Link>
              <Link to="/about" className="text-gray-400 hover:text-neon-purple transition text-sm">About</Link>
              <Link to="/pricing" className="text-gray-400 hover:text-neon-purple transition text-sm">Pricing</Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <div className="flex flex-col gap-2">
              <Link to="/terms" className="text-gray-400 hover:text-neon-purple transition text-sm">Terms & Conditions</Link>
              <Link to="/privacy" className="text-gray-400 hover:text-neon-purple transition text-sm">Privacy Policy</Link>
              <Link to="/refund" className="text-gray-400 hover:text-neon-purple transition text-sm">Refund Policy</Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-gray-400 text-sm">support@visionkey.com</p>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Vision Key Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};