"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Send, Check } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#f8f8f8] py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3">Contact Us</h1>
          <Breadcrumb items={[{ label: "Contact" }]} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Have a question about our jewelry or need help with an order? 
                We&apos;d love to hear from you. Our team is here to help.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#f8f8f8] rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Our Showroom</h3>
                  <p className="text-sm text-gray-500">
                    123 Jewelry Lane, Diamond District<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#f8f8f8] rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Phone</h3>
                  <p className="text-sm text-gray-500">1-844-916-0521</p>
                  <p className="text-xs text-gray-400">Toll-free within US</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#f8f8f8] rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Email</h3>
                  <p className="text-sm text-gray-500">support@djewno.com</p>
                  <p className="text-xs text-gray-400">We reply within 24 hours</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#f8f8f8] rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Hours</h3>
                  <p className="text-sm text-gray-500">
                    Mon - Fri: 9:00 AM - 8:00 PM<br />
                    Sat - Sun: 10:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#f8f8f8] p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500 mb-6">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                  <Button onClick={() => setSubmitted(false)} variant="outline">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Your Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="bg-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="bg-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="bg-gray-900 hover:bg-gray-800 py-6 px-8"
                      disabled={loading}
                    >
                      {loading ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-16">
          <div className="bg-[#f8f8f8] h-[400px] flex items-center justify-center">
            <div className="text-center text-gray-400">
              <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Map would be embedded here</p>
              <p className="text-sm">(Google Maps API integration)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
