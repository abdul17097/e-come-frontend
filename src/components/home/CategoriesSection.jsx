import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const CATEGORIES = [
  {
    name: "Fashion",
    desc: "Clothing & Apparel",
    emoji: "👗",
    count: "12K+ items",
    gradient: "from-pink-500 to-rose-600",
    bg: "from-pink-50 to-rose-50",
    border: "border-pink-100",
    to: "/shop?category=fashion",
  },
  {
    name: "Electronics",
    desc: "Gadgets & Devices",
    emoji: "📱",
    count: "8K+ items",
    gradient: "from-blue-500 to-cyan-600",
    bg: "from-blue-50 to-cyan-50",
    border: "border-blue-100",
    to: "/shop?category=electronics",
  },
  {
    name: "Home & Living",
    desc: "Decor & Furniture",
    emoji: "🛋️",
    count: "6K+ items",
    gradient: "from-amber-500 to-orange-600",
    bg: "from-amber-50 to-orange-50",
    border: "border-amber-100",
    to: "/shop?category=home",
  },
  {
    name: "Sports",
    desc: "Fitness & Outdoors",
    emoji: "🏋️",
    count: "4K+ items",
    gradient: "from-emerald-500 to-green-600",
    bg: "from-emerald-50 to-green-50",
    border: "border-emerald-100",
    to: "/shop?category=sports",
  },
  {
    name: "Beauty",
    desc: "Skincare & Makeup",
    emoji: "💄",
    count: "5K+ items",
    gradient: "from-violet-500 to-purple-600",
    bg: "from-violet-50 to-purple-50",
    border: "border-violet-100",
    to: "/shop?category=beauty",
  },
  {
    name: "Accessories",
    desc: "Bags, Watches & More",
    emoji: "⌚",
    count: "9K+ items",
    gradient: "from-indigo-500 to-blue-600",
    bg: "from-indigo-50 to-blue-50",
    border: "border-indigo-100",
    to: "/shop?category=accessories",
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-indigo-600 text-sm font-semibold uppercase tracking-wider mb-2">
              Browse
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              Shop by Category
            </h2>
            <p className="text-gray-500 mt-2 max-w-md">
              Explore our wide range of categories and find exactly what you're looking for.
            </p>
          </div>
          <Link
            to="/categories"
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors group"
          >
            View all
            <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map(({ name, desc, emoji, count, gradient, bg, border, to }, i) => (
            <Link
              key={name}
              to={to}
              className={`group relative bg-gradient-to-br ${bg} border ${border} rounded-2xl p-5 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up`}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-2xl">{emoji}</span>
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-0.5">{name}</h3>
              <p className="text-[11px] text-gray-500 mb-1">{desc}</p>
              <span className={`text-[10px] font-semibold bg-gradient-to-r ${gradient} bg-clip-text`} style={{ WebkitTextFillColor: "transparent" }}>
                {count}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600"
          >
            View all categories <FiArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
