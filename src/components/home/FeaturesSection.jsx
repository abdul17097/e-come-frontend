import React from "react";
import {
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiHeadphones,
  FiZap,
  FiGift,
} from "react-icons/fi";

const FEATURES = [
  {
    icon: FiTruck,
    title: "Free Delivery",
    desc: "Free shipping on all orders over $50. Same-day delivery available in select cities.",
    gradient: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50",
  },
  {
    icon: FiShield,
    title: "Secure Payments",
    desc: "Your transactions are protected with 256-bit SSL encryption and fraud detection.",
    gradient: "from-emerald-500 to-green-500",
    bg: "bg-emerald-50",
  },
  {
    icon: FiRefreshCw,
    title: "Easy Returns",
    desc: "Not satisfied? Return any item within 30 days, no questions asked.",
    gradient: "from-violet-500 to-purple-500",
    bg: "bg-violet-50",
  },
  {
    icon: FiHeadphones,
    title: "24/7 Support",
    desc: "Our expert team is always available to help you via chat, email, or phone.",
    gradient: "from-orange-500 to-amber-500",
    bg: "bg-orange-50",
  },
  {
    icon: FiZap,
    title: "Lightning Fast",
    desc: "Optimized checkout in under 60 seconds. Shop faster than ever before.",
    gradient: "from-yellow-500 to-orange-500",
    bg: "bg-yellow-50",
  },
  {
    icon: FiGift,
    title: "Loyalty Rewards",
    desc: "Earn points on every purchase and redeem them for exclusive discounts and gifts.",
    gradient: "from-pink-500 to-rose-500",
    bg: "bg-pink-50",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-indigo-600 text-sm font-semibold uppercase tracking-wider mb-2">
            Why Choose Us
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            Shopping Made{" "}
            <span className="text-gradient">Effortless</span>
          </h2>
          <p className="text-gray-500">
            We're committed to delivering the best shopping experience — fast, secure, and hassle-free.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc, gradient, bg }, i) => (
            <div
              key={title}
              className={`group ${bg} rounded-2xl p-6 border border-white hover:border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={22} className="text-white" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
