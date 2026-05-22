import React from "react";
import { Link } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiYoutube,
  FiArrowRight,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

const FOOTER_LINKS = {
  Shop: [
    { label: "New Arrivals",     to: "/shop?filter=new" },
    { label: "Best Sellers",     to: "/shop?filter=best" },
    { label: "Sale & Deals",     to: "/deals" },
    { label: "All Products",     to: "/shop" },
    { label: "Gift Cards",       to: "/gift-cards" },
  ],
  Support: [
    { label: "Help Center",      to: "/help" },
    { label: "Track Order",      to: "/track" },
    { label: "Returns",          to: "/returns" },
    { label: "Shipping Info",    to: "/shipping" },
    { label: "Contact Us",       to: "/contact" },
  ],
  Company: [
    { label: "About Us",         to: "/about" },
    { label: "Careers",          to: "/careers" },
    { label: "Press",            to: "/press" },
    { label: "Blog",             to: "/blog" },
    { label: "Sustainability",   to: "/sustainability" },
  ],
};

const SOCIAL_LINKS = [
  { icon: FiInstagram, href: "#", label: "Instagram" },
  { icon: FiFacebook,  href: "#", label: "Facebook"  },
  { icon: FiTwitter,   href: "#", label: "Twitter"   },
  { icon: FiYoutube,   href: "#", label: "YouTube"   },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="py-16 grid grid-cols-1 gap-10 lg:grid-cols-12">

          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-2 w-fit">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg">
                <HiSparkles className="text-white" size={18} />
              </div>
              <span className="text-xl font-black tracking-tight">
                <span className="text-gradient">Shop</span>
                <span className="text-white">Aura</span>
              </span>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Discover premium products curated just for you. Elevate your lifestyle with our carefully selected collection of fashion, electronics, home & more.
            </p>

            <div className="space-y-3">
              <a href="mailto:hello@shopaura.com" className="flex items-center gap-3 text-sm text-gray-400 hover:text-indigo-400 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-indigo-900 transition-colors">
                  <FiMail size={14} />
                </div>
                hello@shopaura.com
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-3 text-sm text-gray-400 hover:text-indigo-400 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-indigo-900 transition-colors">
                  <FiPhone size={14} />
                </div>
                +1 (234) 567-890
              </a>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <FiMapPin size={14} />
                </div>
                123 Commerce St, NY 10001
              </div>
            </div>

            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-all hover:-translate-y-0.5"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-white font-semibold text-sm mb-4 tracking-wide">{category}</h3>
                <ul className="space-y-2.5">
                  {links.map(({ label, to }) => (
                    <li key={label}>
                      <Link
                        to={to}
                        className="text-sm text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-1 group"
                      >
                        <FiArrowRight
                          size={12}
                          className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                        />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold text-sm mb-4">Stay in the loop</h3>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Get exclusive deals, new arrivals and insider-only discounts.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-2"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-gray-800 border border-gray-700 text-sm text-gray-200 placeholder-gray-500 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
              <button
                type="submit"
                className="btn-primary w-full justify-center !rounded-xl !text-sm"
              >
                Subscribe
                <FiArrowRight size={16} />
              </button>
            </form>
            <p className="text-xs text-gray-600 mt-3">
              No spam. Unsubscribe anytime.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Visa", "Mastercard", "PayPal", "Apple Pay"].map((method) => (
                <span
                  key={method}
                  className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-lg text-xs text-gray-400 font-medium"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} ShopAura. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <Link
                key={item}
                to="#"
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
