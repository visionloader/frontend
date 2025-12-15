import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function Refund({ user }) {
  return (
    <div className="min-h-screen bg-obsidian">
      <Navbar user={user} />
      
      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-8 text-center neon-glow" data-testid="refund-title">Refund Policy</h1>
          
          <div className="glass p-8 space-y-6">
            <section data-testid="refund-section-1">
              <h2 className="text-2xl font-bold mb-4 text-neon-pink">1. Refund Eligibility</h2>
              <p className="text-gray-300 mb-2">
                Refunds are only available in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Payment was completed but key was not delivered within 24 hours</li>
                <li>Key delivered was invalid or non-functional</li>
                <li>Duplicate payment was made for the same order</li>
              </ul>
            </section>
            
            <section data-testid="refund-section-2">
              <h2 className="text-2xl font-bold mb-4 text-neon-pink">2. Non-Refundable Situations</h2>
              <p className="text-gray-300 mb-2">
                Refunds will NOT be issued in the following cases:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Key has been successfully delivered and activated</li>
                <li>User changed their mind after purchase</li>
                <li>Key expired due to time lapse</li>
                <li>Account was banned due to violation of terms</li>
              </ul>
            </section>
            
            <section data-testid="refund-section-3">
              <h2 className="text-2xl font-bold mb-4 text-neon-pink">3. Refund Process</h2>
              <p className="text-gray-300 mb-2">
                To request a refund:
              </p>
              <ol className="list-decimal list-inside text-gray-300 space-y-1">
                <li>Contact our support team with your order ID and reason</li>
                <li>Provide payment proof if requested</li>
                <li>Wait for verification (typically 24-48 hours)</li>
                <li>Approved refunds are processed within 5-7 business days</li>
              </ol>
            </section>
            
            <section data-testid="refund-section-4">
              <h2 className="text-2xl font-bold mb-4 text-neon-pink">4. Key Revocation</h2>
              <p className="text-gray-300">
                Upon approval of a refund request, the associated key will be immediately revoked and cannot be used. Any attempt to use a refunded key may result in account suspension.
              </p>
            </section>
            
            <section data-testid="refund-section-5">
              <h2 className="text-2xl font-bold mb-4 text-neon-pink">5. Dispute Resolution</h2>
              <p className="text-gray-300">
                If you have a dispute regarding a refund decision, you may escalate it to our senior support team. Final decisions are made at the sole discretion of Vision Key Store management.
              </p>
            </section>
            
            <section data-testid="refund-section-6">
              <h2 className="text-2xl font-bold mb-4 text-neon-pink">6. Contact Support</h2>
              <p className="text-gray-300">
                For refund requests or questions, please contact: support@visionkey.com
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}