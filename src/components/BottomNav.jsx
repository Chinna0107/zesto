import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, Package, CircleUserRound, ShoppingCart } from 'lucide-react';
import { cn } from '../utils/cn';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';

export function BottomNav() {
  const { token } = useAuthStore();
  const location = useLocation();
  const cartItems = useCartStore((state) => state.items);
  const cartItemCount = cartItems?.reduce((acc, item) => acc + (item.qty || 1), 0) || 0;

  const tabs = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Shop', icon: LayoutGrid, path: '/category/all' },
    { name: 'Cart', icon: ShoppingCart, path: '/cart' },
    { name: 'Orders', icon: Package, path: '/my-orders' },
    { name: 'Account', icon: CircleUserRound, path: token ? '/dashboard' : '/login' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-100 pb-safe z-50 transition-all shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-end h-[60px] px-2 relative pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            tab.name === 'Shop by Category' ? location.pathname.startsWith('/category') :
            tab.name === 'Cart' ? location.pathname === '/cart' :
            tab.name === 'Orders' ? location.pathname === '/my-orders' :
            tab.name === 'Account' ? ['/dashboard', '/profile', '/my-addresses', '/account-settings', '/login'].includes(location.pathname) :
            location.pathname === tab.path;

          return (
            <NavLink key={tab.name} to={tab.path}
              className={cn(
                'flex flex-col items-center justify-end w-full h-full space-y-1 transition-all duration-300 relative z-10',
                isActive ? 'text-brand-blue' : 'text-gray-500 hover:text-gray-900'
              )}>
              <div className="p-1 relative">
                <Icon className={cn('w-6 h-6 transition-transform duration-300', isActive ? 'scale-110' : '')} strokeWidth={isActive ? 2 : 1.5} />
                {tab.name === 'Cart' && cartItemCount > 0 && (
                  <span className="absolute top-0 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-orange text-[9px] font-bold text-white shadow-sm ring-1 ring-white">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{tab.name}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

