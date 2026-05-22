import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiClock } from "react-icons/fi";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";

const DEALS = [
  {
    id: 1,
    name: "Pro Gaming Headset",
    brand: "SoundX",
    price: 69.99,
    originalPrice: 149.99,
    emoji: "🎮",
    discount: 53,
    gradient: "from-violet-600 to-indigo-700",
    textColor: "text-violet-200",
  },
  {
    id: 2,
    name: "Minimalist Backpack",
    brand: "PackCo",
    price: 49.99,
    originalPrice: 89.99,
    emoji: "🎒",
    discount: 44,
    gradient: "from-emerald-600 to-cyan-700",
    textColor: "text-emerald-200",
  },
  {
    id: 3,
    name: "Yoga Mat Premium",
    brand: "ZenFit",
    price: 29.99,
    originalPrice: 59.99,
    emoji: "🧘",
    discount: 50,
    gradient: "from-orange-500 to-rose-600",
    textColor: "text-orange-200",
  },
];

function CountdownTimer() {
  const [time, setTime] = React.useState({ h: 5, m: 42, s: 17 });

  React.useEffect(() => {
    const id = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="flex items-center gap-2">
      {[pad(time.h), pad(time.m), pad(time.s)].map((unit, i) => (
        <React.Fragment key={i}>
          <div className="bg-white/15 backdrop-blur-sm rounded-lg px-3 py-1.5 text-center min-w-[44px]">
            <span className="text-xl font-black text-white">{unit}</span>
          </div>
          {i < 2 && <span className="text-white font-bold text-lg">:</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function DealsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-rose-500 text-sm font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <HiLightningBolt size={14} />
              Limited Time
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              Flash Deals
            </h2>
            <p className="text-gray-500 mt-2">Grab these offers before they expire!</p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FiClock size={14} />
              Ends in:
            </div>
            <div className="flex items-center gap-2">
              {["05", "42", "17"].map((unit, i) => (
                <React.Fragment key={i}>
                  <div className="bg-gray-900 rounded-lg px-3 py-1.5 text-center min-w-[44px]">
                    <span className="text-xl font-black text-white">{unit}</span>
                  </div>
                  {i < 2 && <span className="text-gray-900 font-bold text-lg">:</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {DEALS.map(({ id, name, brand, price, originalPrice, emoji, discount, gradient, textColor }, i) => (
            <Link
              key={id}
              to={`/product/${id}`}
              className={`group relative bg-gradient-to-br ${gradient} rounded-2xl p-6 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-16 translate-x-10" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full translate-y-10 -translate-x-6" />

              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full mb-2">
                      <HiSparkles size={10} />
                      {discount}% OFF
                    </span>
                    <p className={`text-xs font-semibold ${textColor} uppercase tracking-wider`}>{brand}</p>
                    <h3 className="text-lg font-black text-white mt-0.5">{name}</h3>
                  </div>
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{emoji}</span>
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-black text-white">${price}</span>
                  <span className={`text-sm ${textColor} line-through`}>${originalPrice}</span>
                </div>

                <div className="w-full bg-white/20 rounded-full h-1.5 mb-4">
                  <div className="bg-white h-1.5 rounded-full" style={{ width: "72%" }} />
                </div>
                <p className="text-xs text-white/70 mb-4">72% sold — only a few left!</p>

                <div className="flex items-center gap-2 text-white text-sm font-semibold group-hover:gap-3 transition-all">
                  Grab Deal
                  <FiArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
