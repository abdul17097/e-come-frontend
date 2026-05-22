import React, { useState } from "react";
import { FiArrowRight, FiMail, FiCheck } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

export default function NewsletterSection() {
  const [email, setEmail]       = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-20 translate-x-20" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-16 -translate-x-10" />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
          </div>

          <div className="relative px-8 py-16 sm:px-16 text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <HiSparkles size={16} />
              Exclusive Member Deals
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tight">
              Get 20% Off Your
              <br />
              <span className="text-indigo-200">First Order</span>
            </h2>

            <p className="text-indigo-200 max-w-md mx-auto mb-10 leading-relaxed">
              Join our community and be the first to know about new arrivals, flash sales, and exclusive member-only perks.
            </p>

            {submitted ? (
              <div className="flex items-center justify-center gap-3 bg-white/20 backdrop-blur-sm text-white rounded-2xl px-6 py-4 max-w-sm mx-auto">
                <div className="w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiCheck size={18} strokeWidth={3} />
                </div>
                <div className="text-left">
                  <p className="font-semibold">You're in! 🎉</p>
                  <p className="text-sm text-indigo-200">Check your inbox for your discount code.</p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-md mx-auto"
              >
                <div className="relative flex-1">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300" size={18} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-white/15 backdrop-blur-sm border border-white/20 text-white placeholder-indigo-300 rounded-2xl pl-11 pr-4 py-4 text-sm outline-none focus:bg-white/25 focus:border-white/40 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-white text-indigo-700 font-bold text-sm rounded-2xl px-6 py-4 hover:bg-indigo-50 transition-all hover:-translate-y-0.5 hover:shadow-xl flex items-center justify-center gap-2 flex-shrink-0"
                >
                  Subscribe
                  <FiArrowRight size={16} />
                </button>
              </form>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-indigo-200">
              {["No spam, ever", "Unsubscribe anytime", "Exclusive deals"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <FiCheck size={14} className="text-emerald-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
