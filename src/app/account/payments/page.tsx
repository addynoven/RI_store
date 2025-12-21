import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { CreditCard, Plus, ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock payment methods - in real app, fetch from payment provider
const MOCK_PAYMENTS = [
  {
    id: "1",
    type: "visa",
    last4: "4242",
    expiry: "12/26",
    isDefault: true,
  },
  {
    id: "2",
    type: "mastercard",
    last4: "8888",
    expiry: "03/25",
    isDefault: false,
  },
];

const CARD_ICONS: Record<string, string> = {
  visa: "https://img.icons8.com/color/48/visa.png",
  mastercard: "https://img.icons8.com/color/48/mastercard.png",
  amex: "https://img.icons8.com/color/48/amex.png",
};

export default async function PaymentsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/account/payments");
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#f8f8f8] py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3">Payment Methods</h1>
          <Breadcrumb items={[{ label: "Account", href: "/account" }, { label: "Payment Methods" }]} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Link href="/account" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Account
        </Link>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Saved Cards</h2>
          <Button className="bg-gray-900 hover:bg-gray-800">
            <Plus className="w-4 h-4 mr-2" />
            Add New Card
          </Button>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 p-4 mb-6 text-sm text-blue-700">
          <p>🔒 Your payment information is securely stored with our payment provider. We never store your full card details.</p>
        </div>

        {MOCK_PAYMENTS.length > 0 ? (
          <div className="space-y-4">
            {MOCK_PAYMENTS.map((card) => (
              <div key={card.id} className="border border-gray-200 p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img 
                    src={CARD_ICONS[card.type] || CARD_ICONS.visa} 
                    alt={card.type} 
                    className="h-8" 
                  />
                  <div>
                    <p className="font-bold text-gray-900 capitalize">
                      {card.type} •••• {card.last4}
                    </p>
                    <p className="text-sm text-gray-500">Expires {card.expiry}</p>
                  </div>
                  {card.isDefault && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      Default
                    </span>
                  )}
                </div>
                <div className="flex gap-4">
                  {!card.isDefault && (
                    <button className="text-sm text-gray-500 hover:text-gray-900">
                      Set as Default
                    </button>
                  )}
                  <button className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1">
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-gray-100">
            <CreditCard className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">No payment methods saved</h2>
            <p className="text-gray-500 mb-6">Add a card to make checkout faster.</p>
            <Button className="bg-gray-900 hover:bg-gray-800">
              <Plus className="w-4 h-4 mr-2" />
              Add Card
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
