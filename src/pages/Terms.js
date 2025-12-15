import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function Terms({ user }) {
  return (
    <div className="min-h-screen bg-obsidian">
      <Navbar user={user} />
      
      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-8 text-center neon-glow" data-testid="terms-title">Terms & Conditions</h1>
          
          <div className="glass p-8 space-y-6">
            <section data-testid="terms-section-1">
              <h2 className="text-2xl font-bold mb-4 text-neon-purple">1. Acceptance of Terms</h2>
              <p className="text-gray-300">
                By accessing and using Vision Key Store, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our service.
              </p>
            </section>
            
            <section data-testid="terms-section-2">
              <h2 className="text-2xl font-bold mb-4 text-neon-purple">2. Key Usage</h2>
              <p className="text-gray-300 mb-2">
                All keys purchased from Vision Key Store are for legitimate use only. We reserve the right to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Ban accounts found to be misusing keys</li>
                <li>Revoke keys that violate fair usage policies</li>
                <li>Suspend access without prior notice for suspicious activity</li>
              </ul>
            </section>
            
            <section data-testid="terms-section-3">
              <h2 className="text-2xl font-bold mb-4 text-neon-purple">3. Refund Policy</h2>
              <p className="text-gray-300">
                No refunds will be issued after a key has been delivered and activated. Refunds may only be processed if:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
                <li>The key was not delivered after successful payment</li>
                <li>Technical issues prevented key delivery</li>
                <li>The key was invalid at the time of delivery</li>
              </ul>
            </section>
            
            <section data-testid="terms-section-4">
              <h2 className="text-2xl font-bold mb-4 text-neon-purple">4. Fair Usage Policy</h2>
              <p className="text-gray-300">
                Users must adhere to fair usage guidelines. Multiple account creation, key reselling, or abuse of our system will result in permanent account suspension without refund.
              </p>
            </section>
            
            <section data-testid="terms-section-5">
              <h2 className="text-2xl font-bold mb-4 text-neon-purple">5. Limitation of Liability</h2>
              <p className="text-gray-300">
                Vision Key Store is not liable for any indirect, incidental, or consequential damages arising from the use of our keys or services. Our liability is limited to the purchase price of the key.
              </p>
            </section>
            
            <section data-testid="terms-section-6">
              <h2 className="text-2xl font-bold mb-4 text-neon-purple">6. Changes to Terms</h2>
              <p className="text-gray-300">
                We reserve the right to modify these terms at any time. Continued use of our service after changes constitutes acceptance of the new terms.
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}