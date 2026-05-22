import React from "react";

const BRANDS = [
  { name: "Nike",      emoji: "✔️" },
  { name: "Samsung",   emoji: "📱" },
  { name: "Apple",     emoji: "🍎" },
  { name: "Adidas",    emoji: "👟" },
  { name: "Sony",      emoji: "🎧" },
  { name: "Zara",      emoji: "👗" },
  { name: "IKEA",      emoji: "🛋️" },
  { name: "Levi's",    emoji: "👖" },
];

export default function BrandsSection() {
  return (
    <section className="py-14 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-400 font-medium uppercase tracking-widest mb-8">
          Trusted brands available on ShopAura
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          {BRANDS.map(({ name, emoji }) => (
            <div
              key={name}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <span className="text-xl">{emoji}</span>
              <span className="text-sm font-bold text-gray-500 group-hover:text-indigo-600 transition-colors">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
