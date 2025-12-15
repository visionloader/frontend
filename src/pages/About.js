import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Shield, Award, Users } from 'lucide-react';

export default function About({ user }) {
  return (
    <div className="min-h-screen bg-obsidian">
      <Navbar user={user} />
      
      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-8 text-center neon-glow" data-testid="about-title">About Vision Key</h1>
          
          <div className="glass p-8 mb-8" data-testid="about-intro">
            <p className="text-lg text-gray-300 mb-4">
              Vision Key Store is your trusted source for secure digital key access. We've been serving our customers since 2018, providing instant and reliable key delivery for various services.
            </p>
            <p className="text-lg text-gray-300">
              Our mission is to make digital access simple, secure, and instant. With thousands of satisfied customers, we continue to set the standard for digital key distribution.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass p-6 text-center" data-testid="stat-secure">
              <Shield className="w-12 h-12 text-neon-purple mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">100% Secure</h3>
              <p className="text-gray-400">All transactions encrypted</p>
            </div>
            
            <div className="glass p-6 text-center" data-testid="stat-experience">
              <Award className="w-12 h-12 text-neon-cyan mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Since 2018</h3>
              <p className="text-gray-400">Years of trusted service</p>
            </div>
            
            <div className="glass p-6 text-center" data-testid="stat-customers">
              <Users className="w-12 h-12 text-neon-pink mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">10,000+</h3>
              <p className="text-gray-400">Satisfied customers</p>
            </div>
          </div>
          
          <div className="glass p-8" data-testid="about-trust">
            <h2 className="text-3xl font-bold mb-6">Why Keys Are Safe</h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-neon-purple mt-1 flex-shrink-0" />
                <span>All keys are verified and tested before being added to our inventory</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-neon-cyan mt-1 flex-shrink-0" />
                <span>Secure payment processing through trusted payment gateways</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-neon-pink mt-1 flex-shrink-0" />
                <span>Instant delivery to your dashboard upon payment confirmation</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-neon-purple mt-1 flex-shrink-0" />
                <span>24/7 customer support for any issues or questions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}