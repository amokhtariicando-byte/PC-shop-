'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { PRODUCTS, BRANDS } from '@/lib/data';
import { filterAndSortProducts, toPersianDigits } from '@/lib/store-logic';
import ProductCard from '@/components/ProductCard';

const SHOP_CATEGORIES = [
  { id: 'all', label: 'همه محصولات' },
  { id: 'gaming', label: 'لوازم گیمینگ' },
  { id: 'computer', label: 'قطعات کامپیوتر' },
  { id: 'laptop', label: 'لپ‌تاپ و نمایشگر' },
  { id: 'network', label: 'شبکه و تجهیزات شبکه' },
  { id: 'storage', label: 'هارد و حافظه' },
  { id: 'accessories', label: 'تجهیزات جانبی' },
  { id: 'audio', label: 'هدفون و اسپیکر' },
  { id: 'stock', label: 'محصولات استوک' },
];

const SORT_OPTIONS = [
  { id: 'newest', label: 'جدیدترین' },
  { id: 'popular', label: 'پرفروش‌ترین' },
  { id: 'price-asc', label: 'ارزان‌ترین' },
  { id: 'price-desc', label: 'گران‌ترین' },
  { id: 'discount', label: 'بیشترین تخفیف' },
] as const;

export default function ShopCatalogClient() {
  const searchParams = useSearchParams();
  const key = searchParams.toString();

  return (
    <ShopCatalogInner
      key={key}
      initialCategory={searchParams.get('category') || 'all'}
      initialBrand={searchParams.get('brand') || 'all'}
      initialQuery={searchParams.get('q') || ''}
      initialDiscounted={searchParams.get('discount') === '1'}
    />
  );
}

function ShopCatalogInner({
  initialCategory,
  initialBrand,
  initialQuery,
  initialDiscounted,
}: {
  initialCategory: string;
  initialBrand: string;
  initialQuery: string;
  initialDiscounted: boolean;
}) {
  const [category, setCategory] = useState(initialCategory);
  const [brand, setBrand] = useState(initialBrand);
  const [query, setQuery] = useState(initialQuery);
  const [onlyDiscounted, setOnlyDiscounted] = useState(initialDiscounted);
  const [sortBy, setSortBy] = useState<(typeof SORT_OPTIONS)[number]['id']>('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredProducts = useMemo(
    () =>
      filterAndSortProducts(PRODUCTS, {
        category,
        brand,
        query,
        onlyDiscounted,
        sortBy,
      }),
    [category, brand, query, onlyDiscounted, sortBy]
  );

  const resetFilters = () => {
    setCategory('all');
    setBrand('all');
    setQuery('');
    setOnlyDiscounted(false);
    setSortBy('newest');
  };

  const hasActiveFilters =
    category !== 'all' || brand !== 'all' || query.trim() !== '' || onlyDiscounted;

  const FilterPanel = (
    <div className="space-y-6">
      {/* Search inside shop */}
      <div>
        <label htmlFor="shop-search" className="block text-xs font-extrabold text-gray-800 mb-2">
          جستجو در فروشگاه
        </label>
        <div className="relative">
          <input
            id="shop-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="نام محصول یا برند..."
            className="w-full h-10 pr-3.5 pl-9 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:border-[#094532] focus:bg-white"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-xs font-extrabold text-gray-800 mb-2.5">دسته‌بندی‌ها</h3>
        <div className="space-y-1">
          {SHOP_CATEGORIES.map((c) => {
            const active = category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={`w-full text-right px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#094532] text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="text-xs font-extrabold text-gray-800 mb-2.5">برندهای منتخب</h3>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setBrand('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              brand === 'all'
                ? 'bg-[#ff611a] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            همه
          </button>
          {BRANDS.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setBrand(b.slug)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                brand === b.slug
                  ? 'bg-[#ff611a] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {b.persianName}
            </button>
          ))}
        </div>
      </div>

      {/* Discount Toggle */}
      <label className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#fbf4e9] cursor-pointer">
        <span className="text-xs font-bold text-gray-800">فقط محصولات تخفیف‌دار</span>
        <input
          type="checkbox"
          checked={onlyDiscounted}
          onChange={(e) => setOnlyDiscounted(e.target.checked)}
          className="w-4 h-4 accent-[#ff611a] rounded"
        />
      </label>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={resetFilters}
          className="w-full py-2.5 rounded-xl border border-gray-200 hover:border-gray-400 text-xs font-bold text-gray-600 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>حذف همه فیلترها</span>
        </button>
      )}
    </div>
  );

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header Banner */}
      <div className="bg-[#094532] text-white rounded-[28px] px-6 sm:px-8 py-7 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute inset-0 sarv-dot-pattern opacity-25 pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-xl sm:text-2xl font-black">فروشگاه تخصصی سرو سیستم</h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1.5">
            تضمین اصالت کالا، گارانتی معتبر و ارسال سریع به سراسر ایران
          </p>
        </div>
        <div className="relative z-10 text-xs font-bold text-[#ffb68f] tabular-nums">
          {toPersianDigits(filteredProducts.length)} محصول یافت شد
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-3 bg-white rounded-[24px] p-5 border border-gray-100 shadow-xs sticky top-6">
          {FilterPanel}
        </aside>

        {/* Main Product Area */}
        <div className="lg:col-span-9 space-y-5">
          {/* Toolbar: Sort & Mobile Filter Trigger */}
          <div className="bg-white rounded-2xl p-3.5 border border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#094532] text-white text-xs font-bold cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>فیلترها</span>
            </button>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-xs font-bold text-gray-500 whitespace-nowrap ml-1">
                مرتب‌سازی:
              </span>
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSortBy(opt.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    sortBy === opt.id
                      ? 'bg-[#f7e6ce] text-[#094532] font-bold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 space-y-3">
              <p className="text-base font-bold text-gray-800">محصولی با این فیلترها پیدا نشد</p>
              <p className="text-xs text-gray-500">
                فیلترهای انتخابی یا عبارت جستجو را تغییر دهید تا محصولات بیشتری نمایش داده شود.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ff611a] text-white text-xs font-bold cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>نمایش همه محصولات</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="absolute inset-0 bg-black/45"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="absolute inset-x-0 bottom-0 max-h-[85vh] bg-white rounded-t-3xl p-5 overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                <h2 className="text-sm font-black text-gray-900">فیلتر محصولات</h2>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  aria-label="بستن فیلترها"
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {FilterPanel}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full mt-5 h-11 rounded-xl bg-[#094532] text-white text-xs font-bold"
              >
                اعمال فیلتر ({toPersianDigits(filteredProducts.length)} کالا)
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
