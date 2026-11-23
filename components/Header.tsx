'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  ShoppingBasket,
  User,
  Menu,
  X,
  Phone,
  Headphones,
  ChevronLeft,
  SlidersHorizontal,
  PackageSearch,
} from 'lucide-react';
import { useStore } from './StoreProvider';
import { CATEGORIES, PRODUCTS } from '@/lib/data';
import { formatToman, toPersianDigits } from '@/lib/store-logic';

const NAV_LINKS = [
  { href: '/shop', label: 'فروشگاه' },
  { href: '/faq', label: 'سوالات متداول' },
  { href: '/about', label: 'درباره ما' },
  { href: '/contact', label: 'تماس با ما' },
  { href: '/blog', label: 'بلاگ' },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { totals, setIsCartOpen, toasts, dismissToast } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [catMenuOpen, setCatMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [accountPhone, setAccountPhone] = useState('');
  const [accountSubmitted, setAccountSubmitted] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setCatMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter((p) => {
        const q = searchQuery.trim().toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.englishName.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.brandLabel.toLowerCase().includes(q)
        );
      }).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchOpen(false);
    router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accountPhone.trim().length >= 10) {
      setAccountSubmitted(true);
    }
  };

  return (
    <>
      <header className="w-full bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 lg:static lg:border-b-0">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-3 lg:pt-4 lg:pb-2">
          {/* Top Row */}
          <div className="flex items-center justify-between gap-3 lg:gap-6">
            {/* Mobile Menu Button + Logo */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="باز کردن منوی اصلی"
                className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 text-[#094532] hover:bg-gray-200 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>

              <Link
                href="/"
                aria-label="صفحه اصلی سرو سیستم"
                className="flex items-center gap-2 shrink-0 group"
              >
                <div className="relative w-14 h-11 sm:w-16 sm:h-12 transition-transform duration-200 group-hover:scale-105">
                  <Image
                    src="/assets/extracted/sarv-logo.png"
                    alt="لوگوی سرو سیستم"
                    fill
                    priority
                    sizes="64px"
                    className="object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Search Bar */}
            <div ref={searchRef} className="hidden md:block flex-1 max-w-md lg:max-w-lg relative">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setSearchOpen(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchOpen(true);
                  }}
                  placeholder="نام محصول، دسته‌بندی..."
                  aria-label="جستجوی محصول"
                  className="w-full h-11 pr-4 pl-11 rounded-full bg-gray-50 border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#094532] focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  aria-label="اجرای جستجو"
                  className="absolute left-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-[#094532] hover:bg-gray-100 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>

              <AnimatePresence>
                {searchOpen && searchQuery.trim().length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.16 }}
                    className="absolute top-13 right-0 left-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 overflow-hidden"
                  >
                    {searchResults.length > 0 ? (
                      <div className="divide-y divide-gray-100">
                        {searchResults.map((item) => (
                          <Link
                            key={item.id}
                            href={`/product/${item.slug}`}
                            onClick={() => setSearchOpen(false)}
                            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                          >
                            <div className="relative w-11 h-11 rounded-lg bg-white border border-gray-100 shrink-0 overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="44px"
                                className="object-contain p-1"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-semibold text-gray-800 truncate">
                                {item.name}
                              </p>
                              <p className="text-xs text-[#ff611a] font-bold mt-0.5 tabular-nums">
                                {formatToman(item.price)} تومان
                              </p>
                            </div>
                          </Link>
                        ))}
                        <button
                          type="button"
                          onClick={handleSearchSubmit}
                          className="w-full py-2.5 text-center text-xs font-semibold text-[#094532] hover:bg-emerald-50/50 transition-colors"
                        >
                          مشاهده همه نتایج برای «{searchQuery}»
                        </button>
                      </div>
                    ) : (
                      <p className="py-5 text-center text-xs text-gray-500">
                        محصولی با عبارت «{searchQuery}» یافت نشد.
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Left Actions: User & Cart Button */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setAccountSubmitted(false);
                  setAccountModalOpen(true);
                }}
                aria-label="حساب کاربری"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors shrink-0"
              >
                <User className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                aria-label="باز کردن سبد خرید"
                className="flex items-center gap-2.5 group cursor-pointer shrink-0"
              >
                <motion.div
                  key={totals.itemCount}
                  initial={{ scale: 0.92 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 20 }}
                  className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#ff611a] group-hover:bg-[#e5500d] text-white flex items-center justify-center shadow-md shadow-orange-500/25 transition-colors"
                >
                  <ShoppingBasket className="w-5 h-5" />
                  {totals.itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-[#094532] text-white text-[11px] font-bold flex items-center justify-center tabular-nums ring-2 ring-white">
                      {toPersianDigits(totals.itemCount)}
                    </span>
                  )}
                </motion.div>
                <div className="hidden sm:flex flex-col items-start text-right leading-tight">
                  <span className="text-xs font-bold text-gray-800 whitespace-nowrap">سبد خرید</span>
                  <span className="text-[11px] font-medium text-gray-500 tabular-nums whitespace-nowrap">
                    {totals.finalTotal > 0 ? `${formatToman(totals.finalTotal)} تومان` : 'خالی است'}
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <form onSubmit={handleSearchSubmit} className="mt-2.5 md:hidden relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="نام محصول، دسته‌بندی..."
              aria-label="جستجو در موبایل"
              className="w-full h-10 pr-4 pl-10 rounded-full bg-gray-100 border border-transparent text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#094532] focus:bg-white transition-all"
            />
            <button
              type="submit"
              aria-label="جستجو"
              className="absolute left-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-gray-500"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Desktop Deep Green Navigation Bar */}
          <nav
            aria-label="منوی اصلی فروشگاه"
            className="hidden lg:flex items-center justify-between mt-3 bg-[#094532] text-white rounded-full px-2.5 py-2 shadow-sm"
          >
            {/* Right: Category Mega Menu Button + Main Nav Links */}
            <div className="flex items-center gap-6">
              <div ref={catRef} className="relative">
                <button
                  type="button"
                  onClick={() => setCatMenuOpen((prev) => !prev)}
                  aria-expanded={catMenuOpen}
                  className="flex items-center gap-2.5 bg-white text-[#094532] hover:bg-gray-50 font-bold text-xs px-4 py-2.5 rounded-full transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>دسته‌بندی محصولات</span>
                </button>

                <AnimatePresence>
                  {catMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.16 }}
                      className="absolute top-13 right-0 w-72 bg-white text-gray-800 rounded-2xl shadow-2xl border border-gray-100 p-2.5 z-50"
                    >
                      <div className="space-y-1">
                        {CATEGORIES.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/shop?category=${cat.slug}`}
                            onClick={() => setCatMenuOpen(false)}
                            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-gray-700 hover:bg-[#f7e6ce]/60 hover:text-[#094532] transition-colors"
                          >
                            <span>{cat.label}</span>
                            <ChevronLeft className="w-4 h-4 text-gray-400" />
                          </Link>
                        ))}
                        <div className="pt-1.5 mt-1.5 border-t border-gray-100">
                          <Link
                            href="/services"
                            onClick={() => setCatMenuOpen(false)}
                            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-[#ff611a] hover:bg-orange-50 transition-colors"
                          >
                            <span>خدمات شبکه و VoIP</span>
                            <ChevronLeft className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-6">
                {NAV_LINKS.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-xs font-medium transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                        active ? 'text-[#ffb68f] font-bold' : 'text-white/90 hover:text-white'
                      }`}
                    >
                      {link.label}
                      {active && (
                        <motion.span
                          layoutId="header-nav-underline"
                          className="absolute bottom-0 right-0 left-0 h-0.5 rounded-full bg-[#ff611a]"
                        />
                      )}
                    </Link>
                  );
                })}
                <Link
                  href="/services"
                  className={`text-xs font-medium transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                    pathname === '/services'
                      ? 'text-[#ffb68f] font-bold'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  خدمات شبکه
                </Link>
              </div>
            </div>

            {/* Left: Support & Contact Phone Numbers matching screenshot */}
            <div className="flex items-center gap-4 pl-3 text-[11px]">
              <a
                href="tel:0216655221"
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
              >
                <div className="text-left leading-tight">
                  <div className="text-[10px] text-white/65">پشتیبانی</div>
                  <div className="font-bold tracking-wider tabular-nums">
                    {toPersianDigits('0216655221')}
                  </div>
                </div>
                <Headphones className="w-4 h-4 text-[#ff8b54]" />
              </a>
              <span className="h-6 w-px bg-white/15" aria-hidden="true" />
              <a
                href="tel:0216655221"
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
              >
                <div className="text-left leading-tight">
                  <div className="text-[10px] text-white/65">تماس با ما</div>
                  <div className="font-bold tracking-wider tabular-nums">
                    {toPersianDigits('0216655221')}
                  </div>
                </div>
                <Phone className="w-4 h-4 text-[#ff8b54]" />
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile RTL Slide-Over Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/45 backdrop-blur-xs"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="absolute top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-[#094532] text-white">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">فروشگاه سرو سیستم</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="بستن منو"
                  className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-5">
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-gray-400 px-2 mb-1.5">صفحات اصلی</p>
                  {[
                    { href: '/', label: 'صفحه اصلی' },
                    ...NAV_LINKS,
                    { href: '/services', label: 'خدمات تخصصی شبکه و VoIP' },
                    { href: '/track-order', label: 'پیگیری سفارش' },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        pathname === item.href
                          ? 'bg-[#094532] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronLeft className="w-4 h-4 opacity-60" />
                    </Link>
                  ))}
                </div>

                <div className="space-y-1 pt-3 border-t border-gray-100">
                  <p className="text-[11px] font-bold text-gray-400 px-2 mb-1.5">دسته‌بندی‌ها</p>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/shop?category=${cat.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-3 py-2 rounded-xl bg-gray-50 hover:bg-[#f7e6ce] text-xs font-medium text-gray-700 text-center transition-colors"
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-xs text-gray-600">
                <span>پشتیبانی سریع:</span>
                <a href="tel:0216655221" className="font-bold text-[#094532] tabular-nums">
                  {toPersianDigits('021-6655221')}
                </a>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Account / Quick Order Tracking Modal */}
      <AnimatePresence>
        {accountModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAccountModalOpen(false)}
              className="absolute inset-0 bg-black/45 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 z-10"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-bold text-gray-900">ورود به حساب کاربری</h2>
                <button
                  type="button"
                  onClick={() => setAccountModalOpen(false)}
                  aria-label="بستن پنجره حساب کاربری"
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {accountSubmitted ? (
                <div className="text-center py-4 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#094532] flex items-center justify-center mx-auto">
                    <User className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-gray-900">کد تأیید پیامکی ارسال شد</p>
                  <p className="text-xs text-gray-500">
                    کد ورود به شماره {toPersianDigits(accountPhone)} ارسال گردید. همچنین می‌توانید
                    وضعیت سفارش‌های خود را مستقیم پیگیری کنید.
                  </p>
                  <div className="flex gap-2 pt-2">
                    <Link
                      href="/track-order"
                      onClick={() => setAccountModalOpen(false)}
                      className="flex-1 py-2.5 rounded-xl bg-[#094532] text-white text-xs font-bold text-center"
                    >
                      پیگیری سفارش
                    </Link>
                    <button
                      type="button"
                      onClick={() => setAccountModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold"
                    >
                      بستن
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleAccountSubmit} className="space-y-4">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    برای دسترسی سریع به سفارش‌ها، گارانتی قطعات و کدهای تخفیف شماره موبایل خود را
                    وارد کنید.
                  </p>
                  <div>
                    <label
                      htmlFor="account-phone-input"
                      className="block text-xs font-semibold text-gray-700 mb-1.5"
                    >
                      شماره موبایل
                    </label>
                    <input
                      id="account-phone-input"
                      type="tel"
                      required
                      value={accountPhone}
                      onChange={(e) => setAccountPhone(e.target.value)}
                      placeholder="09123456789"
                      dir="ltr"
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm text-left focus:outline-none focus:border-[#094532]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full h-11 rounded-xl bg-[#ff611a] hover:bg-[#e5500d] text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    ارسال کد تأیید
                  </button>
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-500">قبلاً خرید کرده‌اید؟</span>
                    <Link
                      href="/track-order"
                      onClick={() => setAccountModalOpen(false)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#094532] hover:underline"
                    >
                      <PackageSearch className="w-4 h-4" />
                      <span>پیگیری سفارش با کد رهگیری</span>
                    </Link>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Feedback Stack */}
      <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2 pointer-events-none max-w-xs sm:max-w-sm">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              className="pointer-events-auto flex items-center justify-between gap-3 bg-[#094532] text-white text-xs font-medium px-4 py-3 rounded-2xl shadow-xl"
            >
              <span>{t.text}</span>
              <button
                type="button"
                onClick={() => dismissToast(t.id)}
                aria-label="بستن اعلان"
                className="text-white/70 hover:text-white shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
