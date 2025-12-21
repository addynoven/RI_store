import Breadcrumb from "@/components/Breadcrumb";
import { siteConfig } from "@/lib/config";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#f8f8f8] py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3">Privacy Policy</h1>
          <Breadcrumb items={[{ label: "Privacy Policy" }]} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <p className="text-sm text-gray-500 mb-8">Last updated: December 21, 2024</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-600">
              At {siteConfig.name}, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <h3 className="text-lg font-bold text-gray-900 mt-4 mb-2">Personal Information</h3>
            <p className="text-gray-600 mb-4">
              When you create an account or make a purchase, we collect:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Name and contact information</li>
              <li>Billing and shipping addresses</li>
              <li>Payment information (processed securely by our payment providers)</li>
              <li>Order history and preferences</li>
            </ul>

            <h3 className="text-lg font-bold text-gray-900 mt-4 mb-2">Automatic Information</h3>
            <p className="text-gray-600">
              We automatically collect certain information when you visit our website, including IP address, browser type, device information, and browsing behavior through cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Information Sharing</h2>
            <p className="text-gray-600">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2">
              <li>Payment processors to complete transactions</li>
              <li>Shipping carriers to deliver your orders</li>
              <li>Service providers who assist our operations</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-600">
              We implement industry-standard security measures including SSL encryption, secure payment processing, and regular security audits to protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-600 mb-2">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Cookies</h2>
            <p className="text-gray-600">
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-gray-600 mt-2">
              Email: privacy@djewno.com<br />
              Address: 123 Jewelry Lane, Diamond District, New York, NY 10001
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
