'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import {
  INITIAL_TRACKED_ORDERS,
  type Product,
  type TrackedOrder,
} from '@/lib/data';
import {
  calculateCartTotals,
  generateOrderCode,
  type CartItem,
  type CartTotals,
} from '@/lib/store-logic';

interface ToastMessage {
  id: number;
  text: string;
}

interface StoreContextValue {
  items: CartItem[];
  totals: CartTotals;
  couponCode: string;
  setCouponCode: (code: string) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  orders: TrackedOrder[];
  placeOrder: (payload: { customerName: string; city: string; total: number; itemsCount: number }) => TrackedOrder;
  toasts: ToastMessage[];
  dismissToast: (id: number) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const CART_STORAGE_KEY = 'sarv_system_cart_v1';
const ORDERS_STORAGE_KEY = 'sarv_system_orders_v1';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [orders, setOrders] = useState<TrackedOrder[]>(INITIAL_TRACKED_ORDERS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          const parsed = JSON.parse(savedCart);
          if (Array.isArray(parsed)) setItems(parsed);
        }
        const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
        if (savedOrders) {
          const parsedOrders = JSON.parse(savedOrders);
          if (Array.isArray(parsedOrders) && parsedOrders.length > 0) {
            setOrders(parsedOrders);
          }
        }
      } catch {
        // Ignore malformed storage
      }
      setHydrated(true);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore quota errors
    }
  }, [items, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // Ignore quota errors
    }
  }, [orders, hydrated]);

  const pushToast = useCallback((text: string) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setToasts((prev) => [...prev.slice(-2), { id, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToCart = useCallback(
    (product: Product, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.product.id === product.id);
        if (existing) {
          return prev.map((i) =>
            i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
          );
        }
        return [...prev, { product, quantity }];
      });
      pushToast(`«${product.name}» به سبد خرید اضافه شد`);
    },
    [pushToast]
  );

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCouponCode('');
  }, []);

  const toggleWishlist = useCallback(
    (productId: string) => {
      setWishlistIds((prev) => {
        const exists = prev.includes(productId);
        pushToast(exists ? 'از علاقه‌مندی‌ها حذف شد' : 'به علاقه‌مندی‌ها اضافه شد');
        return exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      });
    },
    [pushToast]
  );

  const placeOrder = useCallback(
    (payload: { customerName: string; city: string; total: number; itemsCount: number }) => {
      const code = generateOrderCode(Date.now());
      const newOrder: TrackedOrder = {
        code,
        customerName: payload.customerName,
        date: 'امروز — ۱۴۰۵',
        status: 'registered',
        statusLabel: 'ثبت شده — در حال آماده‌سازی',
        total: payload.total,
        itemsCount: payload.itemsCount,
        city: payload.city,
        courier: payload.city.includes('تهران') ? 'پیک اکسپرس سرو سیستم' : 'پست پیشتاز ویژه',
      };
      setOrders((prev) => [newOrder, ...prev]);
      clearCart();
      pushToast(`سفارش شما با کد ${code} ثبت شد`);
      return newOrder;
    },
    [clearCart, pushToast]
  );

  const totals = useMemo(() => calculateCartTotals(items, couponCode), [items, couponCode]);

  const value = useMemo<StoreContextValue>(
    () => ({
      items,
      totals,
      couponCode,
      setCouponCode,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      wishlistIds,
      toggleWishlist,
      orders,
      placeOrder,
      toasts,
      dismissToast,
    }),
    [
      items,
      totals,
      couponCode,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      wishlistIds,
      toggleWishlist,
      orders,
      placeOrder,
      toasts,
      dismissToast,
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used inside StoreProvider');
  }
  return ctx;
}
