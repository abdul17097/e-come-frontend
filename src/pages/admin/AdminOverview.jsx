import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/slices/authSlice";
import {
  FiUsers,
  FiShoppingBag,
  FiTrendingUp,
  FiSettings,
  FiBox,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const stats = [
  { label: "Total Users",  value: "1,284",  icon: FiUsers,       color: "from-violet-500 to-purple-600" },
  { label: "Total Orders", value: "3,620",  icon: FiShoppingBag, color: "from-cyan-500 to-blue-600"     },
  { label: "Revenue",      value: "$48.2K", icon: FiTrendingUp,  color: "from-emerald-500 to-green-600" },
  { label: "Products",     value: "540",    icon: FiBox,         color: "from-amber-500 to-orange-500"  },
];

export default function AdminOverview() {
  const user = useSelector(selectCurrentUser);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-400 mt-1">
          Welcome back, {user?.name ?? "Admin"}. Here's what's happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-2xl bg-gray-900 border border-gray-800 p-5 flex items-center gap-4 hover:border-gray-600 transition-colors"
          >
            <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
              <Icon size={20} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-sm text-gray-400">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { label: "Manage Users",    icon: FiUsers,    desc: "View, edit, or remove users",     link: "/admin/users" },
          { label: "Manage Products", icon: FiBox,      desc: "Add, update, or delete products", link: "/admin/products" },
          { label: "Settings",        icon: FiSettings, desc: "Platform configuration",          link: "/admin/settings" },
        ].map(({ label, icon: Icon, desc, link }) => (
          <Link
            to={link}
            key={label}
            className="block text-left rounded-2xl bg-gray-900 border border-gray-800 p-5 hover:border-indigo-500 hover:bg-gray-800 transition-all group"
          >
            <Icon size={22} className="text-indigo-400 mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-semibold text-white">{label}</p>
            <p className="text-sm text-gray-400 mt-1">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
