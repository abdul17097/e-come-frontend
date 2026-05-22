import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiStar, FiArrowRight, FiEye } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

const FILTERS = ["All", "New Arrivals", "Best Sellers", "On Sale", "Top Rated"];

const PRODUCTS = [
  {
    id: 1,
    name: "AirFlow Pro Sneakers",
    brand: "NikeX",
    price: 129.99,
    originalPrice: 179.99,
    rating: 4.8,
    reviews: 2341,
    badge: "Best Seller",
    badgeColor: "bg-amber-500",
    emoji: "👟",
    tag: "Best Sellers",
    gradient: "from-orange-100 to-red-100",
  },
  {
    id: 2,
    name: "Quantum Wireless Buds",
    brand: "SoundCore",
    price: 89.99,
    originalPrice: 149.99,
    rating: 4.9,
    reviews: 1876,
    badge: "New",
    badgeColor: "bg-indigo-600",
    emoji: "🎧",
    tag: "New Arrivals",
    gradient: "from-blue-100 to-indigo-100",
  },
  {
    id: 3,
    name: "Luxe Leather Watch",
    brand: "TimeCraft",
    price: 249.99,
    originalPrice: 349.99,
    rating: 4.7,
    reviews: 943,
    badge: "Sale",
    badgeColor: "bg-rose-500",
    emoji: "⌚",
    tag: "On Sale",
    gradient: "from-amber-100 to-yellow-100",
  },
  {
    id: 4,
    name: "Urban Tote Bag",
    brand: "Craftly",
    price: 59.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 672,
    badge: "Top Pick",
    badgeColor: "bg-emerald-500",
    emoji: "👜",
    tag: "Top Rated",
    gradient: "from-emerald-100 to-teal-100",
  },
  {
    id: 5,
    name: "Silk Blend Blazer",
    brand: "Elara",
    price: 189.99,
    originalPrice: 259.99,
    rating: 4.8,
    reviews: 531,
    badge: "Trending",
    badgeColor: "bg-violet-600",
    emoji: "🧥",
    tag: "Best Sellers",
    gradient: "from-violet-100 to-purple-100",
  },
  {
    id: 6,
    name: "Smart Fitness Band",
    brand: "FitPulse",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviews: 1230,
    badge: "Sale",
    badgeColor: "bg-rose-500",
    emoji: "⌚",
    tag: "On Sale",
    gradient: "from-cyan-100 to-sky-100",
  },
  {
    id: 7,
    name: "Hydra Glow Serum",
    brand: "GlowLab",
    price: 45.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 2100,
    badge: "New",
    badgeColor: "bg-indigo-600",
    emoji: "✨",
    tag: "New Arrivals",
    gradient: "from-pink-100 to-rose-100",
  },
  {
    id: 8,
    name: "Carbon Fiber Wallet",
    brand: "SlimCo",
    price: 34.99,
    originalPrice: 49.99,
    rating: 4.7,
    reviews: 888,
    badge: "Top Rated",
    badgeColor: "bg-emerald-500",
    emoji: "💼",
    tag: "Top Rated",
    gradient: "from-gray-100 to-slate-100",
  },
];

function ProductCard({ product }) {
  const [wishlist, setWishlist] = useState(false);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover shadow-sm">
      <div className={`relative bg-gradient-to-br ${product.gradient} aspect-square flex items-center justify-center overflow-hidden`}>
        <span className="text-7xl group-hover:scale-110 transition-transform duration-500 select-none">
          {product.emoji}
        </span>

        <span className={`absolute top-3 left-3 product-badge text-white ${product.badgeColor}`}>
          {product.badge}
        </span>
        {discount && (
          <span className="absolute top-3 right-3 product-badge bg-white text-rose-600 border border-rose-100">
            -{discount}%
          </span>
        )}

        <div className="absolute inset-x-3 bottom-3 flex gap-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => setWishlist(!wishlist)}
            className={`flex-none w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-md ${
              wishlist
                ? "bg-rose-500 text-white"
                : "bg-white text-gray-600 hover:bg-rose-500 hover:text-white"
            }`}
          >
            <FiHeart size={16} className={wishlist ? "fill-white" : ""} />
          </button>
          <button className="flex-1 bg-gray-900 hover:bg-indigo-600 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md">
            <FiShoppingCart size={15} />
            Add to Cart
          </button>
          <button className="flex-none w-10 h-10 bg-white hover:bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center transition-all shadow-md">
            <FiEye size={16} />
          </button>
        </div>
      </div>

      <div className="p-4">
        <p className="text-[11px] text-indigo-600 font-semibold uppercase tracking-wider mb-1">
          {product.brand}
        </p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-bold text-gray-900 mb-2 hover:text-indigo-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                size={12}
                className={
                  i < Math.floor(product.rating)
                    ? "text-amber-400 fill-amber-400"
                    : "text-gray-200 fill-gray-200"
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 font-medium">
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.tag === activeFilter);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-indigo-600 text-sm font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <HiSparkles size={14} />
              Handpicked
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              Featured Products
            </h2>
            <p className="text-gray-500 mt-2">
              Top picks loved by thousands of customers.
            </p>
          </div>
          <Link
            to="/shop"
            className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors group flex-shrink-0"
          >
            View all products
            <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex-none px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((product, i) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/shop" className="btn-primary text-base !py-3.5 !px-8 !rounded-2xl">
            Explore All Products
            <FiArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
