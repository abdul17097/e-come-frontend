import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiShoppingBag, FiStar } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-float delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-sm font-medium animate-fade-in-up">
              <HiSparkles size={16} className="text-indigo-400" />
              New Collection 2025 — Just Dropped
            </div>

            <div className="space-y-4 animate-fade-in-up delay-100">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
                Shop with
                <br />
                <span className="text-gradient">Style &</span>
                <br />
                <span className="text-white">Confidence</span>
              </h1>
              <p className="text-lg text-gray-400 max-w-md leading-relaxed">
                Discover thousands of premium products curated just for you. From fashion to tech — find everything that elevates your lifestyle.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-200">
              <Link to="/shop" className="btn-primary text-base !py-3.5 !px-7 !rounded-2xl">
                Shop Now
                <FiArrowRight size={18} />
              </Link>
              <Link to="/categories" className="btn-outline !border-gray-600 !text-gray-300 hover:!border-indigo-500 hover:!text-white hover:!bg-indigo-500/10 text-base !py-3.5 !px-7 !rounded-2xl">
                Browse Categories
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-2 animate-fade-in-up delay-300">
              <div className="text-center">
                <p className="text-2xl font-black text-white">50K+</p>
                <p className="text-xs text-gray-500 mt-0.5">Products</p>
              </div>
              <div className="w-px h-10 bg-gray-800" />
              <div className="text-center">
                <p className="text-2xl font-black text-white">200K+</p>
                <p className="text-xs text-gray-500 mt-0.5">Happy Customers</p>
              </div>
              <div className="w-px h-10 bg-gray-800" />
              <div className="text-center">
                <p className="text-2xl font-black text-white">4.9★</p>
                <p className="text-xs text-gray-500 mt-0.5">Avg Rating</p>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center items-center animate-fade-in delay-200">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 to-violet-600/30 rounded-3xl blur-2xl scale-110" />

              <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-3xl p-8 glass border border-white/10 aspect-square flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full">
                  {[
                    { emoji: "👟", label: "Sneakers",    color: "from-orange-500/20 to-red-500/20",    border: "border-orange-500/20" },
                    { emoji: "⌚", label: "Watches",     color: "from-blue-500/20 to-cyan-500/20",     border: "border-blue-500/20" },
                    { emoji: "🎧", label: "Audio",       color: "from-violet-500/20 to-purple-500/20", border: "border-violet-500/20" },
                    { emoji: "👜", label: "Accessories", color: "from-pink-500/20 to-rose-500/20",     border: "border-pink-500/20" },
                  ].map(({ emoji, label, color, border }, i) => (
                    <Link
                      to="/shop"
                      key={label}
                      className={`bg-gradient-to-br ${color} border ${border} rounded-2xl p-5 flex flex-col items-center justify-center gap-2 hover:scale-105 transition-transform cursor-pointer animate-fade-in-up`}
                      style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                    >
                      <span className="text-4xl">{emoji}</span>
                      <span className="text-xs text-gray-300 font-medium">{label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="absolute -top-4 -right-4 glass border border-white/10 rounded-2xl px-4 py-3 shadow-xl animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
                    <FiShoppingBag size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">New Order</p>
                    <p className="text-xs text-white font-semibold">+128 today</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 glass border border-white/10 rounded-2xl px-4 py-3 shadow-xl animate-float delay-200">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    {["🧑", "👩", "👨"].map((face, i) => (
                      <div key={i} className="w-7 h-7 rounded-full bg-gray-600 border-2 border-gray-800 flex items-center justify-center text-sm">
                        {face}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} size={10} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">2,400+ reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
    </section>
  );
}
