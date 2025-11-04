import React from "react";
import FullLogo from "../../components/FullLogo";

const TermsOfService = () => {
  return (
    <main className="flex-1">
      <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-24">
        <FullLogo/>
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#ea2a33]">
              Last Updated: August 22, 2025
            </p>
            <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Terms & Conditions
            </h2>
          </div>

          {/* Terms Content */}
          <div className="prose prose-lg max-w-none space-y-8 text-gray-600">
            {/* 1 */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">
                1. Acceptance of Terms
              </h3>
              <p>
                By booking a room, dining, or using any facility at Silver Arcade Premier, 
                you agree to comply with and be bound by these Terms & Conditions. 
                Guests who do not agree should refrain from using our services.
              </p>
            </div>

            {/* 2 */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">2. Reservations</h3>
              <p>
                All reservations are subject to availability and confirmation. 
                Guests must provide accurate details at the time of booking. 
                The hotel reserves the right to cancel unconfirmed or fraudulent reservations.
              </p>
            </div>

            {/* 3 */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">3. Payments</h3>
              <p>
                Payments must be made in accordance with the rates and policies communicated 
                at the time of booking. We accept major payment methods, and a valid ID may be 
                required for verification upon check-in.
              </p>
            </div>

            {/* 4 */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">4. Check-In & Check-Out</h3>
              <p>
                Standard check-in time is 11:00 AM and check-out time is 9:00 AM, unless otherwise agreed.
                Early check-in or late check-out may be subject to additional charges.
              </p>
            </div>

            {/* 5 */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">5. Cancellations & Refunds</h3>
              <p>
                Cancellation and refund policies may vary based on booking type or promotional offer. 
                Please review the cancellation terms during reservation. 
                Refunds, if applicable, will be processed as per our policy.
              </p>
            </div>

            {/* 6 */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">6. Guest Responsibilities</h3>
              <p>
                Guests are expected to respect hotel property and fellow guests. 
                Any damage caused will be charged accordingly. Illegal activities 
                or misconduct may result in immediate eviction without refund.
              </p>
            </div>

            {/* 7 */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">7. Facilities & Services</h3>
              <p>
                Access to certain facilities (e.g., banquet halls, gym, spa, or conference rooms) 
                may be subject to additional terms. The hotel reserves the right to restrict 
                usage during maintenance or special events.
              </p>
            </div>

            {/* 8 */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">8. Liability Disclaimer</h3>
              <p>
                While we strive to provide a safe and comfortable environment, 
                Silver Arcade Premier is not liable for loss of valuables, 
                accidents, or events beyond our control (e.g., natural disasters).
              </p>
            </div>

            {/* 9 */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">9. Policy Changes</h3>
              <p>
                These Terms & Conditions may be updated periodically. 
                Guests are encouraged to review them regularly for changes. 
                Continued use of our services indicates acceptance of the revised terms.
              </p>
            </div>

            {/* 10 */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">10. Governing Law</h3>
              <p>
                These Terms shall be governed by and construed in accordance with 
                the laws of West Bengal, India. Any disputes will fall under the 
                jurisdiction of courts in Malda.
              </p>
            </div>

            {/* 11 */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">11. Contact Us</h3>
              <p>
                For questions regarding these Terms & Conditions, please contact us at{" "}
                <a
                  className="text-[#ea2a33] hover:underline"
                  href="mailto:info@silverarcadepremiere.com"
                >
                  info@silverarcadepremiere.com
                </a>{" "}
                or visit our front desk for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TermsOfService;
