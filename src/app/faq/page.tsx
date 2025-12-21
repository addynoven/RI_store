"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { ChevronDown } from "lucide-react";

const FAQ_SECTIONS = [
  {
    title: "Orders & Shipping",
    questions: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping takes 5-7 business days. Express shipping is 2-3 business days. International orders may take 7-14 business days.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location.",
      },
      {
        q: "How can I track my order?",
        a: "Once your order ships, you'll receive an email with a tracking number. You can also track your order in your account dashboard.",
      },
      {
        q: "Is shipping free?",
        a: "Yes! We offer free standard shipping on all orders over $130 within the US.",
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    questions: [
      {
        q: "What is your return policy?",
        a: "We offer a 30-day return policy on all unworn items in original packaging. Custom or personalized items are final sale.",
      },
      {
        q: "How do I return an item?",
        a: "Contact our customer service to initiate a return. We'll provide a prepaid shipping label and instructions.",
      },
      {
        q: "When will I receive my refund?",
        a: "Refunds are processed within 5-7 business days after we receive your return. It may take additional time for your bank to process.",
      },
    ],
  },
  {
    title: "Product Care",
    questions: [
      {
        q: "How should I care for my jewelry?",
        a: "Store jewelry separately in soft pouches. Avoid exposure to chemicals, perfumes, and water. Clean with a soft, lint-free cloth.",
      },
      {
        q: "Do you offer repairs?",
        a: "Yes, we offer complimentary repairs for manufacturing defects within 1 year. Contact us for other repair services.",
      },
    ],
  },
  {
    title: "Payment & Security",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, and Google Pay.",
      },
      {
        q: "Is my payment information secure?",
        a: "Absolutely. We use industry-standard SSL encryption and never store your full credit card details.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#f8f8f8] py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3">
            Frequently Asked Questions
          </h1>
          <Breadcrumb items={[{ label: "FAQ" }]} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="space-y-10">
          {FAQ_SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2>
              <div className="space-y-2">
                {section.questions.map((item, idx) => {
                  const id = `${section.title}-${idx}`;
                  const isOpen = openItems.includes(id);
                  return (
                    <div key={id} className="border border-gray-100">
                      <button
                        onClick={() => toggleItem(id)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900">{item.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-[#f8f8f8] text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-500 mb-4">Can&apos;t find the answer you&apos;re looking for?</p>
          <a
            href="/contact"
            className="inline-block bg-gray-900 text-white px-6 py-3 hover:bg-gray-800 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
