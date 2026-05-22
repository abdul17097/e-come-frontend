import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  selectCurrentUser,
  selectIsAuthenticated,
  selectIsAdmin,
  logout,
} from "../../store/slices/authSlice";
import { logoutUser } from "../../services/authService";
import {
  FiShoppingCart,
  FiSearch,
  FiMenu,
  FiX,
  FiUser,
  FiHeart,
  FiLogOut,
  FiSettings,
  FiPackage,
  FiChevronDown,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

const NAV_LINKS = [
  { label: "Home",       to: "/" },
  { label: "Shop",       to: "/shop" },
  { label: "Categories", to: "/categories" },
  { label: "Deals",      to: "/deals" },
  { label: "About",      to: "/about" },
];

export default function Navbar() {
  const dispatch        = useDispatch();
  const navigate        = useNavigate();
  const location        = useLocation();
  const user            = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin         = useSelector(selectIsAdmin);

  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [userMenuOpen,  setUserMenuOpen]  = useState(false);
  const [searchOpen,    setSearchOpen]    = useState(false);
  const [searchQuery,   setSearchQuery]   = useState("");
  const [scrolled,      setScrolled]      = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const isActive = (to) => location.pathname === to;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 border-b border-gray-100"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">

            <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:shadow-indigo-300 transition-shadow">
                <HiSparkles className="text-white" size={18} />
              </div>
              <span className="text-xl font-black tracking-tight">
                <span className="text-gradient">Shop</span>
                <span className="text-gray-900">Aura</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(to)
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all"
                aria-label="Search"
              >
                <FiSearch size={20} />
              </button>

              <Link
                to="/wishlist"
                className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all hidden sm:flex"
                aria-label="Wishlist"
              >
                <FiHeart size={20} />
              </Link>

              <Link
                to="/cart"
                className="relative p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all"
                aria-label="Cart"
              >
                <FiShoppingCart size={20} />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-indigo-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              </Link>

              {isAuthenticated ? (
                <div className="relative hidden sm:block">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all border border-gray-200"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
                      {user?.name?.[0]?.toUpperCase() ?? "U"}
                    </div>
                    <span className="text-sm font-medium text-gray-700 max-w-[80px] truncate">
                      {user?.name?.split(" ")[0]}
                    </span>
                    <FiChevronDown
                      size={14}
                      className={`text-gray-400 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in">
                      <div className="px-4 py-2.5 border-b border-gray-100 mb-1">
                        <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                      </div>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 transition-colors font-medium"
                        >
                          <FiSettings size={15} />
                          Admin Panel
                        </Link>
                      )}
                      <Link
                        to="/orders"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        <FiPackage size={15} />
                        My Orders
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        <FiUser size={15} />
                        Profile
                      </Link>
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                        >
                          <FiLogOut size={15} />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-primary !py-2 !px-4 !text-sm !rounded-lg"
                  >
                    Get started
                  </Link>
                </div>
              )}

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-all lg:hidden"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-72 bg-white shadow-2xl flex flex-col animate-fade-in">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <span className="font-black text-lg">
                <span className="text-gradient">Shop</span>
                <span className="text-gray-900">Aura</span>
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            {isAuthenticated && (
              <div className="px-5 py-4 bg-indigo-50 border-b border-indigo-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold">
                    {user?.name?.[0]?.toUpperCase() ?? "U"}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
              </div>
            )}

            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
              {NAV_LINKS.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive(to)
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {label}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  <FiSettings size={16} />
                  Admin Panel
                </Link>
              )}
            </nav>

            <div className="px-4 py-4 border-t border-gray-100 space-y-2">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-50 text-red-500 text-sm font-medium hover:bg-red-100 transition-colors"
                >
                  <FiLogOut size={16} />
                  Sign out
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="w-full flex items-center justify-center py-3 px-4 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-primary w-full justify-center !rounded-xl"
                  >
                    Get started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
            <form onSubmit={handleSearch} className="flex items-center gap-3 p-4">
              <FiSearch className="text-gray-400 flex-shrink-0" size={20} />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands, categories…"
                className="flex-1 text-base text-gray-900 placeholder-gray-400 outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
              >
                <FiX size={18} />
              </button>
            </form>
            <div className="border-t border-gray-100 px-4 py-3">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {["Sneakers", "Headphones", "Watches", "Bags", "Sunglasses"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                      navigate(`/shop?search=${tag}`);
                      setSearchOpen(false);
                    }}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg text-sm text-gray-600 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="h-16 lg:h-18" />
    </>
  );
}
