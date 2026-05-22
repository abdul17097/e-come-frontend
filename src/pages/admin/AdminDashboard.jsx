import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectCurrentUser,
  logout,
} from "../../store/slices/authSlice";
import { logoutUser } from "../../services/authService";
import { toast } from "react-toastify";
import {
  FiUsers,
  FiShoppingBag,
  FiTrendingUp,
  FiSettings,
  FiLogOut,
  FiBox,
} from "react-icons/fi";

const stats = [
  { label: "Total Users",  value: "1,284",  icon: FiUsers,       color: "from-violet-500 to-purple-600" },
  { label: "Total Orders", value: "3,620",  icon: FiShoppingBag, color: "from-cyan-500 to-blue-600"     },
  { label: "Revenue",      value: "$48.2K", icon: FiTrendingUp,  color: "from-emerald-500 to-green-600" },
  { label: "Products",     value: "540",    icon: FiBox,         color: "from-amber-500 to-orange-500"  },
];

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user     = useSelector(selectCurrentUser);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
    } finally {
      dispatch(logout());
      toast.info("Logged out successfully.");
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 bg-gray-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-900">
            A
          </div>
          <span className="font-semibold text-lg tracking-tight">Admin Panel</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-400">
            Signed in as{" "}
            <span className="text-white font-medium">{user?.name ?? "Admin"}</span>
          </div>
          <button
            id="admin-logout"
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors"
          >
            <FiLogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-400 mt-1">
            Welcome back, {user?.name}. Here's what's happening today.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="rounded-2xl bg-gray-900 border border-gray-800 p-5 flex items-center gap-4 hover:border-gray-600 transition-colors"
            >
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                <Icon size={20} />
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
            { label: "Manage Users",    icon: FiUsers,    desc: "View, edit, or remove users"      },
            { label: "Manage Products", icon: FiBox,      desc: "Add, update, or delete products"  },
            { label: "Settings",        icon: FiSettings, desc: "Platform configuration"           },
          ].map(({ label, icon: Icon, desc }) => (
            <button
              key={label}
              className="text-left rounded-2xl bg-gray-900 border border-gray-800 p-5 hover:border-indigo-500 hover:bg-gray-800 transition-all group"
            >
              <Icon size={22} className="text-indigo-400 mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-semibold">{label}</p>
              <p className="text-sm text-gray-400 mt-1">{desc}</p>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
