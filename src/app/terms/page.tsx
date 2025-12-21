import Breadcrumb from "@/components/Breadcrumb";
import { siteConfig } from "@/lib/config";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#f8f8f8] py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3">Terms of Service</h1>
          <Breadcrumb items={[{ label: "Terms of Service" }]} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <p className="text-sm text-gray-500 mb-8">Last updated: December 21, 2024</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By accessing and using the {siteConfig.name} website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Use of Website</h2>
            <p className="text-gray-600 mb-4">
              You agree to use this website only for lawful purposes. You are prohibited from:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Violating any applicable laws or regulations</li>
              <li>Infringing on intellectual property rights</li>
              <li>Transmitting harmful or malicious code</li>
              <li>Attempting to gain unauthorized access to our systems</li>
              <li>Using the site for fraudulent purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Products and Pricing</h2>
            <p className="text-gray-600">
              We strive to display accurate product descriptions and pricing. However, we reserve the right to correct any errors and to change or update information at any time without prior notice. All prices are in USD unless otherwise stated.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Orders and Payment</h2>
            <p className="text-gray-600 mb-4">
              By placing an order, you are making an offer to purchase. We reserve the right to refuse or cancel any order for any reason, including:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Product unavailability</li>
              <li>Pricing errors</li>
              <li>Suspected fraud</li>
              <li>Inaccurate order information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Shipping and Delivery</h2>
            <p className="text-gray-600">
              Shipping times are estimates and not guaranteed. We are not responsible for delays caused by carriers, customs, or circumstances beyond our control. Risk of loss passes to you upon delivery to the carrier.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Returns and Refunds</h2>
            <p className="text-gray-600">
              Our return policy allows returns within 30 days of delivery for unworn items in original packaging. Please refer to our Shipping & Returns page for complete details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
            <p className="text-gray-600">
              All content on this website, including text, images, logos, and designs, is the property of {siteConfig.name} and is protected by copyright and trademark laws. You may not reproduce, distribute, or use any content without our written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-600">
              {siteConfig.name} shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products. Our liability is limited to the amount you paid for the product.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">9. Indemnification</h2>
            <p className="text-gray-600">
              You agree to indemnify and hold harmless {siteConfig.name} and its affiliates from any claims, damages, or expenses arising from your violation of these terms or misuse of our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">10. Changes to Terms</h2>
            <p className="text-gray-600">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the website constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
            <p className="text-gray-600">
              For questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-gray-600 mt-2">
              Email: legal@djewno.com<br />
              Address: 123 Jewelry Lane, Diamond District, New York, NY 10001
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
