import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { getAllProductsPublic } from "../../services/productService";

const DEFAULT_STYLES = [
  { emoji: "👗", gradient: "from-pink-500 to-rose-600", bg: "from-pink-50 to-rose-50", border: "border-pink-100" },
  { emoji: "📱", gradient: "from-blue-500 to-cyan-600", bg: "from-blue-50 to-cyan-50", border: "border-blue-100" },
  { emoji: "🛋️", gradient: "from-amber-500 to-orange-600", bg: "from-amber-50 to-orange-50", border: "border-amber-100" },
  { emoji: "🏋️", gradient: "from-emerald-500 to-green-600", bg: "from-emerald-50 to-green-50", border: "border-emerald-100" },
  { emoji: "💄", gradient: "from-violet-500 to-purple-600", bg: "from-violet-50 to-purple-50", border: "border-violet-100" },
  { emoji: "⌚", gradient: "from-indigo-500 to-blue-600", bg: "from-indigo-50 to-blue-50", border: "border-indigo-100" },
  { emoji: "📦", gradient: "from-gray-500 to-slate-600", bg: "from-gray-50 to-slate-50", border: "border-gray-100" }
];

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllProductsPublic();
        if (response.success && response.data.products) {
          const products = response.data.products;
          const categoryCounts = {};
          products.forEach(p => {
            if (p.category) {
              categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
            }
          });
          
          const realCategories = Object.keys(categoryCounts).map((catName, index) => {
            const style = DEFAULT_STYLES[index % DEFAULT_STYLES.length];
            return {
              name: catName,
              desc: `Explore ${catName}`,
              emoji: style.emoji,
              count: `${categoryCounts[catName]} item${categoryCounts[catName] > 1 ? 's' : ''}`,
              gradient: style.gradient,
              bg: style.bg,
              border: style.border,
              to: `/shop?category=${catName}`,
            };
          });
          setCategories(realCategories);
        }
      } catch (error) {
        console.error("Failed to fetch products for categories", error);
      }
    };
    fetchCategories();
  }, []);

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
          {categories.map(({ name, desc, emoji, count, gradient, bg, border, to }, i) => (
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
