import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { selectCurrentUser, logout } from "../../store/slices/authSlice";
import { logoutUser } from "../../services/authService";
import { toast } from "react-toastify";
import {
  FiUsers,
  FiShoppingBag,
  FiSettings,
  FiLogOut,
  FiBox,
  FiHome,
} from "react-icons/fi";

const sidebarLinks = [
  { label: "Dashboard", path: "/admin", icon: FiHome },
  { label: "Products", path: "/admin/products", icon: FiBox },
  { label: "Users", path: "/admin/users", icon: FiUsers },
  { label: "Orders", path: "/admin/orders", icon: FiShoppingBag },
  { label: "Settings", path: "/admin/settings", icon: FiSettings },
];

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  console.log("admin dashboard:", user);

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
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col hidden md:flex sticky top-0 h-screen">
        <div className="p-6 border-b border-gray-800 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-900/50">
            A
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            Admin Panel
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarLinks.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={label}
              to={path}
              end={path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  isActive
                    ? "bg-indigo-600/10 text-indigo-400"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`
              }
            >
              <Icon size={20} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center">
              {user?.name?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.name || "Admin User"}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {user?.email || "admin@example.com"}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all font-medium"
          >
            <FiLogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen max-w-full overflow-hidden">
        {/* Mobile Header (visible only on small screens) */}
        <header className="md:hidden border-b border-gray-800 bg-gray-900 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-lg tracking-tight">
              Admin Panel
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-400"
          >
            <FiLogOut size={20} />
          </button>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
