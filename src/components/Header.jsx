import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  Menu, Search, Heart, ShoppingCart, LogIn, Package, MapPin, LayoutDashboard, LogOut,
  Settings, Shield, ChevronDown, X, Tag, Grid3X3, Zap, Filter, Home, Info, Phone, User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { useStoreData } from '../store/useStoreData';
import logo from '../assets/logo.png';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

function AvatarDropdown({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initials = user?.name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'U';

  const items = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Package, label: 'My Orders', path: '/my-orders' },
    { icon: MapPin, label: 'My Addresses', path: '/my-addresses' },
    { icon: Heart, label: 'Wishlist', path: '/wishlist' },
    { icon: Settings, label: 'Account Settings', path: '/account-settings' },
    ...(user?.role === 'admin' ? [{ icon: Shield, label: 'Admin Panel', path: '/admin' }] : []),
  ];

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1.5 group">
        <div className="w-8 h-8 rounded-full bg-brand-orange text-white text-xs font-bold flex items-center justify-center shadow-sm ring-2 ring-orange-200 group-hover:ring-orange-400 transition-all">
          {initials}
        </div>
        <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform hidden md:block ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-11 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-[100]">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-bold text-gray-900 truncate">{user?.name}</p>
            <p className="text-[11px] text-gray-500 truncate">{user?.email}</p>
          </div>
          {items.map(({ icon: Icon, label, path }) => (
            <button key={path} onClick={() => { navigate(path); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-brand-orange transition-colors text-left">
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </button>
          ))}
          <div className="border-t border-gray-100 mt-1">
            <button onClick={() => { onLogout(); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CategoriesDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  const categories = useStoreData(s => s.categories);

  return (
    <div ref={ref} className="relative py-4 -my-4"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}>
      <button className="flex items-center gap-1 text-[14px] lg:text-[15px] font-bold text-gray-700 hover:text-brand-orange transition-colors">
        Shop by Category <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-[100]">
          <button onClick={() => { navigate('/category/all'); setOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-brand-orange hover:bg-orange-50 transition-colors">
            <Grid3X3 className="w-4 h-4" /> All Categories
          </button>
          <div className="border-t border-gray-100 my-1" />
          {categories.map(cat => (
            <button key={cat.id} onClick={() => { navigate(`/category/${cat.id}`); setOpen(false); }}
              className="w-full flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-brand-orange transition-colors">
              {cat.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function OffersDropdown() {
  const [open, setOpen] = useState(false);
  const [offers, setOffers] = useState([]);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BACKEND_URL}/offers/active`)
      .then(r => r.json())
      .then(d => setOffers(d.offers || []))
      .catch(() => {});
  }, []);

  return (
    <div ref={ref} className="relative py-4 -my-4"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}>
      <button className="flex items-center gap-1 text-[14px] lg:text-[15px] font-bold text-gray-700 hover:text-brand-orange transition-colors">
        Offers <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-[100]">
          <button onClick={() => { navigate('/offers'); setOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-brand-orange hover:bg-orange-50 transition-colors">
            <Tag className="w-4 h-4" /> View All Offers
          </button>
          {offers.length > 0 && <div className="border-t border-gray-100 my-1" />}
          {offers.slice(0, 6).map(offer => (
            <button key={offer.id} onClick={() => { navigate(`/offers?id=${offer.id}`); setOpen(false); }}
              className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-orange-50 transition-colors">
              <span className="text-sm font-semibold text-gray-800 truncate">{offer.name || offer.code}</span>
              <span className="text-xs font-bold text-brand-orange ml-2 shrink-0">
                {offer.discount_type === 'flat' ? `₹${offer.discount_percent}` : `${offer.discount_percent}%`} OFF
              </span>
            </button>
          ))}
          {offers.length === 0 && (
            <p className="px-4 py-3 text-xs text-gray-400">No active offers right now</p>
          )}
        </div>
      )}
    </div>
  );
}

function DesktopFullHeader({ cartCount, wishlistCount, token, user, handleLogout }) {
  return (
    <>
      <div className="h-[90px] lg:h-[110px] hidden md:block" />
      <header className="fixed top-0 left-0 z-50 w-full bg-white border-b border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] px-6 md:px-10 lg:px-12 py-2 hidden md:block transition-all duration-300">
        <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between gap-4">

          {/* Navigation Links */}
          <nav className="flex-1 hidden lg:flex items-center justify-start gap-8">
            <Link to="/" className="text-[14px] lg:text-[15px] font-bold text-gray-600 hover:text-brand-orange transition-all relative group">
              Home
              <span className="absolute -bottom-1.5 left-1/2 w-0 h-0.5 bg-brand-orange group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></span>
            </Link>
            <CategoriesDropdown />
            <OffersDropdown />
            <Link to="/about" className="text-[14px] lg:text-[15px] font-bold text-gray-600 hover:text-brand-orange transition-all relative group">
              About
              <span className="absolute -bottom-1.5 left-1/2 w-0 h-0.5 bg-brand-orange group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></span>
            </Link>
            <Link to="/contact" className="text-[14px] lg:text-[15px] font-bold text-gray-600 hover:text-brand-orange transition-all relative group">
              Contact
              <span className="absolute -bottom-1.5 left-1/2 w-0 h-0.5 bg-brand-orange group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></span>
            </Link>
            <Link to="/my-orders" className="text-[14px] lg:text-[15px] font-bold text-gray-600 hover:text-brand-orange transition-all relative group">
              Orders
              <span className="absolute -bottom-1.5 left-1/2 w-0 h-0.5 bg-brand-orange group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></span>
            </Link>
          </nav>

          {/* Centered Logo */}
          <Link to="/" className="shrink-0 flex items-center justify-center mx-4 group lg:mx-0 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-brand-orange/20 rounded-full blur-[30px] group-hover:bg-brand-orange/30 transition-colors pointer-events-none"></div>
            <img src={logo} alt="Logo" className="relative z-10 h-16 md:h-20 lg:h-24 w-auto max-w-[200px] lg:max-w-[280px] object-contain transition-all duration-500 group-hover:scale-105" />
          </Link>

          {/* Right Action Icons & Search */}
          <div className="flex-1 flex items-center justify-end gap-5 lg:gap-8">
            <div className="relative hidden xl:block w-[260px] group">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-brand-orange transition-colors z-10" />
              <input type="text" placeholder="Search products..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim())
                    window.location.href = `/category/all?search=${encodeURIComponent(e.target.value.trim())}`;
                }}
                className="w-full bg-gray-100 hover:bg-gray-200 border border-transparent rounded-full py-2.5 pl-11 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-orange focus:bg-white focus:border-brand-orange/50 transition-all"
              />
            </div>
            
            <div className="flex items-center gap-4 lg:gap-5">
              <Link to="/wishlist" className="relative p-2.5 cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-200 hover:border-brand-orange/40 hover:-translate-y-1 transition-all group">
                <Heart className="w-5 h-5 text-gray-700 group-hover:text-brand-orange transition-colors" strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-brand-orange text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border border-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              
              <Link to="/cart" className="relative p-2.5 cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-200 hover:border-brand-orange/40 hover:-translate-y-1 transition-all group">
                <ShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-brand-orange transition-colors" strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-brand-orange text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border border-white animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              {token ? (
                <div className="ml-2">
                  <AvatarDropdown user={user} onLogout={handleLogout} />
                </div>
              ) : (
                <Link to="/login" className="flex items-center gap-2 text-sm font-bold text-white bg-brand-blue hover:bg-blue-700 px-5 lg:px-6 py-2.5 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all ml-2 group">
                  <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform" /> 
                  <span className="tracking-wide">Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export function Header({ variant = 'default', title, showShare = false }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCatsOpen, setMobileCatsOpen] = useState(false);
  const categories = useStoreData(s => s.categories);
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const wishlistItems = useWishlistStore((state) => state.items);
  const wishlistCount = wishlistItems ? wishlistItems.length : 0;
  const { token, user, logout, addresses } = useAuthStore();
  const handleLogout = () => { logout(); navigate('/'); };

  const primaryAddress = addresses && addresses.length > 0 ? addresses[0] : null;
  const locationText = primaryAddress 
    ? [primaryAddress.line1, primaryAddress.city, primaryAddress.state].filter(Boolean).join(', ')
    : 'Select Location';

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Offers', path: '/offers', icon: Tag },
    { name: 'About Us', path: '/about', icon: Info },
    { name: 'Contact Us', path: '/contact', icon: Phone },
    { name: 'My Orders', path: '/my-orders', icon: Package },
    { name: 'My Profile', path: '/profile', icon: User },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <>
      <DesktopFullHeader cartCount={cartCount} wishlistCount={wishlistCount} token={token} user={user} handleLogout={handleLogout} />

      {/* Mobile */}
      <div className="md:hidden">
        {/* Sidebar overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div key="overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}
          {mobileMenuOpen && (
            <motion.div key="sidebar"
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed top-0 left-0 w-[280px] h-full bg-white/95 backdrop-blur-xl border-r border-gray-100 z-[101] shadow-2xl flex flex-col">

              <div className="p-5 flex flex-col justify-between border-b border-gray-100 bg-orange-50/50 relative">
                <button onClick={() => setMobileMenuOpen(false)} className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-500 bg-white hover:bg-red-50 rounded-full border border-gray-200 transition-colors shadow-sm">
                  <X className="w-5 h-5" />
                </button>
                <img src={logo} alt="Logo" className="h-16 w-auto max-w-[180px] object-contain mb-4 mt-2" />
                {token && user && (
                  <div className="flex items-center gap-3 mt-2 bg-white p-3 rounded-xl shadow-sm border border-orange-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-extrabold text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs font-medium text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>
                )}
              </div>

              <motion.nav variants={containerVariants} initial="hidden" animate="visible"
                className="flex flex-col p-4 gap-1 flex-grow overflow-y-auto">

                {/* Categories accordion */}
                <motion.div variants={itemVariants}>
                  <button onClick={() => setMobileCatsOpen(o => !o)}
                    className="w-full flex items-center justify-between text-gray-900 font-bold text-base py-3.5 px-4 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all">
                    <div className="flex items-center gap-3">
                      <Grid3X3 className="w-5 h-5 text-gray-400" />
                      Shop by Category
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileCatsOpen ? 'rotate-180 text-red-500' : 'text-gray-400'}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileCatsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }} className="overflow-hidden">
                        <div className="ml-5 border-l-2 border-gray-100 pl-4 py-2 space-y-1 mt-1 mb-2">
                          <Link to="/category/all" onClick={() => setMobileMenuOpen(false)}
                            className="block text-sm font-extrabold text-red-500 py-2.5 px-3 rounded-lg hover:bg-red-50 transition-colors">
                            All Categories
                          </Link>
                          {categories.map(cat => (
                            <Link key={cat.id} to={`/category/${cat.id}`} onClick={() => setMobileMenuOpen(false)}
                              className="block text-sm font-medium text-gray-600 py-2.5 px-3 rounded-lg hover:bg-red-50 hover:text-gray-900 transition-colors">
                              {cat.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {navLinks.map(link => (
                  <motion.div key={link.name} variants={itemVariants}>
                    <Link to={link.path} onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-gray-900 font-bold text-base py-3.5 px-4 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all group">
                      <link.icon className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              {!token ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="p-5 border-t border-gray-100 bg-gray-50">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-extrabold py-3.5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    <LogIn className="w-5 h-5" /> Login to Account
                  </Link>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="p-5 border-t border-gray-100 bg-gray-50">
                  <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="flex items-center justify-center gap-2 w-full bg-white text-gray-700 font-extrabold py-3.5 rounded-xl border border-gray-200 shadow-sm hover:text-red-500 hover:border-red-200 transition-all">
                    <LogOut className="w-5 h-5" /> Logout
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="h-[160px] md:hidden" />
        <header className="fixed top-0 left-0 z-50 w-full bg-zesto-gradient text-white border-none rounded-none px-4 py-3 shadow-sm md:hidden">
          <div className="w-full">
            {/* Top Row: Menu, Logo, Icons */}
            <div className="flex items-center justify-between mb-4 relative">
              <div className="flex items-center">
                <button onClick={() => setMobileMenuOpen(true)} className="p-1 -ml-1 text-white">
                  <Menu className="w-6 h-6" strokeWidth={2} />
                </button>
              </div>
              
              {/* Centered Logo for Mobile */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                {/* Glow Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[60px] bg-white blur-[20px] rounded-[100%] pointer-events-none z-0"></div>
                <Link to="/" className="relative z-10 flex items-center justify-center">
                  <img src={logo} alt="Logo" className="h-14 md:h-16 w-auto max-w-[200px] object-contain drop-shadow-[0_0_10px_rgba(255,255,255,1)] scale-[1.3]" />
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <Link to="/wishlist" className="relative p-1 cursor-pointer hover:scale-105 transition-transform text-white">
                  <Heart className="w-6 h-6" strokeWidth={1.5} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <Link to="/cart" className="relative p-1 cursor-pointer hover:scale-105 transition-transform text-white">
                  <ShoppingCart className="w-6 h-6" strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
            
            {/* Middle Row: Search and Filter */}
            <div className="relative mt-2 flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Search products, brands and more.."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim())
                      navigate(`/category/all?search=${encodeURIComponent(e.target.value.trim())}`);
                  }}
                  className="w-full bg-white rounded-full py-3 pl-12 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:outline-none shadow-sm"
                />
              </div>
              <button onClick={() => navigate('/category/all?filter=open')} className="w-11 h-11 shrink-0 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors border border-white/30 text-white">
                <Filter className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
            
            {/* Bottom Row: Location and Coins */}
            <div className="mt-4 flex items-center justify-between gap-3">
              <button onClick={() => navigate(token ? '/my-addresses' : '/login')} className="flex-1 flex items-center justify-between bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 border border-white/50 text-gray-900 shadow-sm overflow-hidden hover:bg-white hover:scale-[1.02] transition-all cursor-pointer">
                <div className="flex items-center gap-2 min-w-0">
                  <MapPin className="w-4 h-4 shrink-0 text-red-500" fill="currentColor" strokeWidth={0} />
                  <span className="text-xs font-bold truncate">{locationText}</span>
                </div>
                <ChevronDown className="w-4 h-4 shrink-0 ml-1 text-gray-500" />
              </button>
              
              <div className="shrink-0 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 border border-white/50 text-gray-900 font-extrabold shadow-sm">
                <div className="bg-yellow-400 rounded-full w-5 h-5 flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-white" strokeWidth={3} fill="currentColor" />
                </div>
                <span className="text-sm">0</span>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
