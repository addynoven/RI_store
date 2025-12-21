"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Check } from "lucide-react";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    firstName: session?.user?.name?.split(" ")[0] || "",
    lastName: session?.user?.name?.split(" ")[1] || "",
    email: session?.user?.email || "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [saved, setSaved] = useState(false);

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/login?callbackUrl=/account/settings");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#f8f8f8] py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3">Profile Settings</h1>
          <Breadcrumb items={[{ label: "Account", href: "/account" }, { label: "Settings" }]} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-2xl">
        <Link href="/account" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Account
        </Link>

        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 mb-6 flex items-center gap-2">
            <Check className="w-5 h-5" />
            Settings saved successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Info */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
          </div>

          {/* Password */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Change Password</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Email Preferences</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm text-gray-600">Order updates and shipping notifications</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm text-gray-600">Promotional emails and exclusive offers</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-gray-600">Product recommendations based on my activity</span>
              </label>
            </div>
          </div>

          <Button type="submit" className="bg-gray-900 hover:bg-gray-800 py-6 px-8">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}
