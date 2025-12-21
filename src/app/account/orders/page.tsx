import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { Package, ArrowLeft } from "lucide-react";

// Mock orders - in real app, fetch from database
const MOCK_ORDERS = [
  {
    id: "DJ12345",
    date: "2024-12-15",
    status: "Delivered",
    total: 259.97,
    items: [
      { name: "Sterling Silver Heart Locket Necklace", quantity: 1, price: 43.99 },
      { name: "Diamond Solitaire Engagement Ring", quantity: 1, price: 215.98 },
    ],
  },
  {
    id: "DJ12344",
    date: "2024-12-01",
    status: "Shipped",
    total: 156.50,
    items: [
      { name: "Crystal Chandelier Earrings", quantity: 1, price: 156.50 },
    ],
  },
];

export default async function OrdersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/account/orders");
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#f8f8f8] py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3">Order History</h1>
          <Breadcrumb items={[{ label: "Account", href: "/account" }, { label: "Orders" }]} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Link href="/account" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Account
        </Link>

        {MOCK_ORDERS.length > 0 ? (
          <div className="space-y-6">
            {MOCK_ORDERS.map((order) => (
              <div key={order.id} className="border border-gray-100 p-6">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4 pb-4 border-b border-gray-100">
                  <div>
                    <p className="font-bold text-gray-900">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">Placed on {order.date}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                      order.status === "Delivered" ? "bg-green-100 text-green-700" :
                      order.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {order.status}
                    </span>
                    <p className="font-bold text-gray-900 mt-2">${order.total.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name} x{item.quantity}</span>
                      <span className="text-gray-900">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">When you place an order, it will appear here.</p>
            <Link href="/shop" className="text-red-500 hover:underline">
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
