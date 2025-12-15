import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function Privacy({ user }) {
  return (
    <div className="min-h-screen bg-obsidian">
      <Navbar user={user} />
      
      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-8 text-center neon-glow" data-testid="privacy-title">Privacy Policy</h1>
          
          <div className="glass p-8 space-y-6">
            <section data-testid="privacy-section-1">
              <h2 className="text-2xl font-bold mb-4 text-neon-cyan">1. Information We Collect</h2>
              <p className="text-gray-300">
                We collect the following information when you register and use our service:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
                <li>Username and email address</li>
                <li>Payment transaction details</li>
                <li>Purchase history and key usage data</li>
                <li>IP address and browser information</li>
              </ul>
            </section>
            
            <section data-testid="privacy-section-2">
              <h2 className="text-2xl font-bold mb-4 text-neon-cyan">2. How We Use Your Information</h2>
              <p className="text-gray-300 mb-2">
                Your information is used to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Process payments and deliver purchased keys</li>
                <li>Provide customer support</li>
                <li>Prevent fraud and abuse</li>
                <li>Improve our services</li>
              </ul>
            </section>
            
            <section data-testid="privacy-section-3">
              <h2 className="text-2xl font-bold mb-4 text-neon-cyan">3. Data Security</h2>
              <p className="text-gray-300">
                We implement industry-standard security measures to protect your personal information. All passwords are encrypted using bcrypt hashing, and payment processing is handled by secure third-party gateways.
              </p>
            </section>
            
            <section data-testid="privacy-section-4">
              <h2 className="text-2xl font-bold mb-4 text-neon-cyan">4. Information Sharing</h2>
              <p className="text-gray-300">
                We do not sell, trade, or share your personal information with third parties except:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
                <li>Payment processors for transaction handling</li>
                <li>Law enforcement if required by law</li>
                <li>Service providers who assist in our operations</li>
              </ul>
            </section>
            
            <section data-testid="privacy-section-5">
              <h2 className="text-2xl font-bold mb-4 text-neon-cyan">5. Cookies</h2>
              <p className="text-gray-300">
                We use cookies and similar technologies to maintain your session and improve user experience. You can control cookie preferences through your browser settings.
              </p>
            </section>
            
            <section data-testid="privacy-section-6">
              <h2 className="text-2xl font-bold mb-4 text-neon-cyan">6. Your Rights</h2>
              <p className="text-gray-300">
                You have the right to access, correct, or delete your personal information. Contact our support team to exercise these rights.
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}