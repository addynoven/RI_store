import Breadcrumb from "@/components/Breadcrumb";
import { Truck, RotateCcw, Package, Globe } from "lucide-react";

export default function ShippingReturnsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#f8f8f8] py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3">Shipping & Returns</h1>
          <Breadcrumb items={[{ label: "Shipping & Returns" }]} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 bg-[#f8f8f8]">
            <Truck className="w-8 h-8 mx-auto mb-3 text-gray-700" />
            <p className="font-bold text-gray-900">Free Shipping</p>
            <p className="text-sm text-gray-500">Orders over $130</p>
          </div>
          <div className="text-center p-6 bg-[#f8f8f8]">
            <Package className="w-8 h-8 mx-auto mb-3 text-gray-700" />
            <p className="font-bold text-gray-900">Express Delivery</p>
            <p className="text-sm text-gray-500">2-3 business days</p>
          </div>
          <div className="text-center p-6 bg-[#f8f8f8]">
            <RotateCcw className="w-8 h-8 mx-auto mb-3 text-gray-700" />
            <p className="font-bold text-gray-900">30-Day Returns</p>
            <p className="text-sm text-gray-500">Easy returns</p>
          </div>
          <div className="text-center p-6 bg-[#f8f8f8]">
            <Globe className="w-8 h-8 mx-auto mb-3 text-gray-700" />
            <p className="font-bold text-gray-900">Worldwide</p>
            <p className="text-sm text-gray-500">50+ countries</p>
          </div>
        </div>

        {/* Shipping */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Shipping Policy</h2>
          <div className="prose prose-gray max-w-none">
            <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">Processing Time</h3>
            <p className="text-gray-600 mb-4">
              Orders are processed within 1-2 business days. Custom and personalized items may require additional processing time of 3-5 business days.
            </p>

            <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">Domestic Shipping (US)</h3>
            <table className="w-full text-sm mb-6">
              <thead className="bg-[#f8f8f8]">
                <tr>
                  <th className="p-3 text-left">Method</th>
                  <th className="p-3 text-left">Delivery Time</th>
                  <th className="p-3 text-left">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-3">Standard Shipping</td>
                  <td className="p-3">5-7 business days</td>
                  <td className="p-3">$9.99 (Free over $130)</td>
                </tr>
                <tr>
                  <td className="p-3">Express Shipping</td>
                  <td className="p-3">2-3 business days</td>
                  <td className="p-3">$19.99</td>
                </tr>
                <tr>
                  <td className="p-3">Overnight</td>
                  <td className="p-3">Next business day</td>
                  <td className="p-3">$34.99</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">International Shipping</h3>
            <p className="text-gray-600 mb-4">
              We ship to over 50 countries. International shipping rates and delivery times vary by destination. Customs duties and taxes are the responsibility of the recipient.
            </p>
          </div>
        </section>

        {/* Returns */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Return Policy</h2>
          <div className="prose prose-gray max-w-none">
            <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">30-Day Returns</h3>
            <p className="text-gray-600 mb-4">
              We want you to love your purchase. If you&apos;re not completely satisfied, you may return unworn items in their original packaging within 30 days of delivery for a full refund.
            </p>

            <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">Return Process</h3>
            <ol className="list-decimal list-inside text-gray-600 space-y-2 mb-4">
              <li>Contact our customer service to initiate a return</li>
              <li>Receive a prepaid shipping label via email</li>
              <li>Pack items securely in original packaging</li>
              <li>Drop off at any authorized shipping location</li>
              <li>Refund processed within 5-7 business days of receipt</li>
            </ol>

            <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">Non-Returnable Items</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Custom or personalized jewelry</li>
              <li>Items marked as final sale</li>
              <li>Items showing signs of wear</li>
              <li>Items without original packaging</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
