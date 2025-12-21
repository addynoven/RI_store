import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { Package, Heart, User, LogOut, MapPin, CreditCard } from "lucide-react";
import { SignOutButton } from "@/components/SignOutButton";

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/account");
  }

  const menuItems = [
    { icon: Package, label: "Order History", href: "/account/orders", description: "View your past orders" },
    { icon: Heart, label: "Wishlist", href: "/account/wishlist", description: "Products you've saved" },
    { icon: MapPin, label: "Addresses", href: "/account/addresses", description: "Manage shipping addresses" },
    { icon: CreditCard, label: "Payment Methods", href: "/account/payments", description: "Saved payment options" },
    { icon: User, label: "Profile Settings", href: "/account/settings", description: "Update your info" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#f8f8f8] py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3">My Account</h1>
          <Breadcrumb items={[{ label: "Account" }]} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#f8f8f8] p-6">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {session.user.name?.charAt(0) || "U"}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{session.user.name || "User"}</p>
                  <p className="text-sm text-gray-500">{session.user.email}</p>
                </div>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-white rounded transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
                
                <SignOutButton />
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Dashboard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="p-6 border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all group"
                  >
                    <Icon className="w-8 h-8 text-gray-300 group-hover:text-gray-900 transition-colors mb-4" />
                    <h3 className="font-bold text-gray-900 mb-1">{item.label}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </Link>
                );
              })}
            </div>

            {/* Recent Orders Preview */}
            <div className="mt-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
                <Link href="/account/orders" className="text-sm text-red-500 hover:underline">
                  View All
                </Link>
              </div>
              
              <div className="border border-gray-100 p-6 text-center text-gray-400">
                <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No orders yet</p>
                <Link href="/shop" className="text-sm text-red-500 hover:underline mt-2 inline-block">
                  Start Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
