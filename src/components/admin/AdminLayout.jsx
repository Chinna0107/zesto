import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, Package, BarChart3, LogOut, Shield, Users, Menu, X, ImageIcon, Tag, Layers, UserPlus, UserCircle, Wallet, Store, HeadphonesIcon, CreditCard, Percent, Megaphone, ClipboardList, TrendingUp } from "lucide-react";
import logo from '../../assets/logo.png';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { href: "/admin/orders", label: "Orders", icon: <ShoppingBag className="w-4 h-4" /> },
  { href: "/admin/customers", label: "Customers", icon: <Users className="w-4 h-4" /> },
  { href: "/admin/products", label: "Products", icon: <Package className="w-4 h-4" /> },
  { href: "/admin/categories", label: "Categories", icon: <Layers className="w-4 h-4" /> },
  { href: "/admin/banners", label: "Banners", icon: <ImageIcon className="w-4 h-4" /> },
  { href: "/admin/coupons", label: "Coupons", icon: <Tag className="w-4 h-4" /> },
  { href: "/admin/reports", label: "Reports", icon: <BarChart3 className="w-4 h-4" /> },
  { href: "/admin/profits", label: "Profits", icon: <TrendingUp className="w-4 h-4" /> },
  { href: "/admin/offers", label: "Offers", icon: <Percent className="w-4 h-4" /> },
  { href: "/admin/advertisements", label: "Advertisements", icon: <Megaphone className="w-4 h-4" /> },
];

export function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [admin, setAdmin] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // For now, mock admin data if no actual auth is setup to avoid blocking
    const token = localStorage.getItem("token");
    if (!token) {
      // Mocking admin login for demo purposes based on requirements
      setAdmin({ name: "Admin User", email: "admin@zesto.com" });
      return;
    }

    fetch(`${BACKEND_URL}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => {
        if (!d.user || d.user.role !== "admin") { navigate("/"); return; }
        setAdmin(d.user);
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!admin) return (
    <div className="min-h-screen bg-brand-cream-light flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-brand-orange/20 border-t-brand-orange rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-cream-light flex">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-brand-orange/10 px-4 py-3 flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Zesto" className="h-8 object-contain mix-blend-multiply" />
          <span className="font-bold text-lg"><span className="text-blue-600">Zes</span><span className="text-brand-orange">to</span> <span className="text-sm font-normal text-gray-500">Admin</span></span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-brand-orange">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-white border-r border-brand-orange/10 flex flex-col fixed h-full z-50 transition-transform shadow-[4px_0_24px_rgba(254,102,3,0.02)] ${
        mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
        <div className="p-5 border-b border-brand-orange/10">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Zesto" className="h-10 object-contain mix-blend-multiply" />
            <div>
              <p className="font-bold text-xl tracking-tight leading-none"><span className="text-blue-600">Zes</span><span className="text-brand-orange">to</span></p>
              <div className="flex items-center gap-1 mt-1">
                <Shield className="w-3 h-3 text-brand-orange" />
                <p className="text-brand-orange text-[10px] font-sans font-semibold">Admin Panel</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-b border-brand-orange/10 bg-brand-orange/5">
          <p className="font-sans font-semibold text-brand-orange text-sm truncate">{admin.name}</p>
          <p className="text-brand-orange/60 text-[10px] font-sans truncate">{admin.email}</p>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {NAV.map((item) => (
            <Link key={item.href} to={item.href} onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-sans font-medium transition-all duration-200 ${
                pathname === item.href ? "bg-gradient-to-r from-brand-orange to-orange-400 text-white shadow-md shadow-brand-orange/20 scale-[1.02]" : "text-gray-600 hover:text-brand-orange hover:bg-brand-orange/5 hover:scale-[1.02]"
              }`}>
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-brand-orange/10">
          <button onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-sans font-medium text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors w-full">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 md:ml-64 p-4 sm:p-6 pt-16 md:pt-6 min-w-0">
        {children}
      </main>
    </div>
  );
}
