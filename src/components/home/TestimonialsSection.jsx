import React from "react";
import { FiStar, FiCheck } from "react-icons/fi";

const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "Fashion Blogger",
    avatar: "👩‍🦰",
    rating: 5,
    text: "ShopAura has completely transformed how I shop online. The curated selections are spot-on and delivery is always lightning fast. I'm obsessed!",
    verified: true,
    tag: "Fashion",
  },
  {
    name: "Marcus Chen",
    role: "Tech Enthusiast",
    avatar: "👨‍💻",
    rating: 5,
    text: "Found the best deals on electronics here. The product quality is incredible and customer support resolved my query in minutes. 10/10!",
    verified: true,
    tag: "Electronics",
  },
  {
    name: "Aisha Patel",
    role: "Interior Designer",
    avatar: "👩‍🎨",
    rating: 5,
    text: "The home decor collection is stunning! Every piece I've ordered has exceeded my expectations. My clients always ask where I source my items.",
    verified: true,
    tag: "Home & Living",
  },
  {
    name: "James Williams",
    role: "Fitness Coach",
    avatar: "🧑‍🏋️",
    rating: 5,
    text: "Top-quality sports gear at amazing prices. The loyalty points program is fantastic — I've already earned free gear just from my regular purchases!",
    verified: true,
    tag: "Sports",
  },
  {
    name: "Emily Rodriguez",
    role: "Beauty Influencer",
    avatar: "👩‍💄",
    rating: 5,
    text: "The beauty section is a dream. All products are authentic and the skincare recommendations are genuinely helpful. My skin has never looked better!",
    verified: true,
    tag: "Beauty",
  },
  {
    name: "David Kim",
    role: "Startup Founder",
    avatar: "👨‍💼",
    rating: 5,
    text: "Fast delivery, easy returns, and genuinely great prices. I've been a customer for 2 years and ShopAura never disappoints. My go-to for everything.",
    verified: true,
    tag: "All Categories",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-wider mb-2">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Loved by{" "}
            <span className="text-gradient">200,000+</span>
            {" "}Shoppers
          </h2>
          <p className="text-gray-400">
            Don't take our word for it — here's what our community says.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map(({ name, role, avatar, rating, text, verified, tag }, i) => (
            <div
              key={name}
              className="glass rounded-2xl p-6 border border-white/10 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(rating)].map((_, j) => (
                  <FiStar key={j} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-5">
                "{text}"
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl">
                    {avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-white">{name}</p>
                      {verified && (
                        <div className="w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center">
                          <FiCheck size={10} className="text-white" strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">{role}</p>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 bg-white/10 text-gray-400 rounded-full">
                  {tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
          {[
            { label: "Happy Customers", value: "200K+" },
            { label: "Products Sold",   value: "1M+"   },
            { label: "5-Star Reviews",  value: "98%"   },
            { label: "Countries",       value: "45+"   },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-black text-white">{value}</p>
              <p className="text-sm text-gray-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
