import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { MapPin, Plus, ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock addresses - in real app, fetch from database
const MOCK_ADDRESSES = [
  {
    id: "1",
    name: "John Doe",
    type: "Home",
    line1: "123 Main Street",
    line2: "Apt 4B",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
    phone: "+1 (555) 123-4567",
    isDefault: true,
  },
  {
    id: "2",
    name: "John Doe",
    type: "Office",
    line1: "456 Business Ave",
    line2: "Floor 12",
    city: "New York",
    state: "NY",
    zip: "10002",
    country: "United States",
    phone: "+1 (555) 987-6543",
    isDefault: false,
  },
];

export default async function AddressesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/account/addresses");
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#f8f8f8] py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3">My Addresses</h1>
          <Breadcrumb items={[{ label: "Account", href: "/account" }, { label: "Addresses" }]} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Link href="/account" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Account
        </Link>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
          <Button className="bg-gray-900 hover:bg-gray-800">
            <Plus className="w-4 h-4 mr-2" />
            Add New Address
          </Button>
        </div>

        {MOCK_ADDRESSES.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_ADDRESSES.map((address) => (
              <div key={address.id} className="border border-gray-200 p-6 relative">
                {address.isDefault && (
                  <span className="absolute top-4 right-4 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    Default
                  </span>
                )}
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-bold text-gray-900">{address.name}</p>
                    <p className="text-sm text-gray-500">{address.type}</p>
                  </div>
                </div>
                <div className="ml-8 text-sm text-gray-600 space-y-1">
                  <p>{address.line1}</p>
                  {address.line2 && <p>{address.line2}</p>}
                  <p>{address.city}, {address.state} {address.zip}</p>
                  <p>{address.country}</p>
                  <p className="pt-2">{address.phone}</p>
                </div>
                <div className="flex gap-4 mt-4 ml-8">
                  <button className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1">
                    <Pencil className="w-3 h-3" /> Edit
                  </button>
                  <button className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1">
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-gray-100">
            <MapPin className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">No addresses saved</h2>
            <p className="text-gray-500 mb-6">Add a shipping address to make checkout faster.</p>
            <Button className="bg-gray-900 hover:bg-gray-800">
              <Plus className="w-4 h-4 mr-2" />
              Add Address
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
