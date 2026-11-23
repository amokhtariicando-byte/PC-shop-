'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowLeft, Truck } from 'lucide-react';
import { useStore } from './StoreProvider';
import { formatToman, toPersianDigits } from '@/lib/store-logic';

export default function CartDrawer() {
  const { items, totals, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/45 backdrop-blur-xs"
          />

          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            aria-label="سبد خرید"
            className="absolute top-0 left-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#ff611a]/10 text-[#ff611a] flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-gray-900">سبد خرید شما</h2>
                  <p className="text-[11px] text-gray-500">
                    {toPersianDigits(totals.itemCount)} کالا انتخاب شده
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                aria-label="بستن سبد خرید"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Free Shipping Indicator */}
            {items.length > 0 && (
              <div className="px-5 py-3 bg-[#fbf4e9] border-b border-orange-100">
                <div className="flex items-center gap-2 text-xs text-[#094532] font-medium">
                  <Truck className="w-4 h-4 text-[#ff611a] shrink-0" />
                  {totals.freeShippingRemaining === 0 ? (
                    <span>تبریک! ارسال سفارش شما کاملاً رایگان شد.</span>
                  ) : (
                    <span>
                      {formatToman(totals.freeShippingRemaining)} تومان دیگر تا ارسال رایگان
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-3">
                  <div className="w-16 h-16 rounded-3xl bg-gray-100 text-gray-400 flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-bold text-gray-800">سبد خرید شما خالی است</p>
                  <p className="text-xs text-gray-500 max-w-[240px] leading-relaxed">
                    محصولات گیمینگ، قطعات کامپیوتر و تجهیزات شبکه سرو سیستم را بررسی کنید.
                  </p>
                  <Link
                    href="/shop"
                    onClick={() => setIsCartOpen(false)}
                    className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#094532] text-white text-xs font-bold hover:bg-[#063828] transition-colors"
                  >
                    <span>مشاهده فروشگاه</span>
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                items.map(({ product, quantity }) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-3 p-3 rounded-2xl border border-gray-100 bg-white shadow-xs"
                  >
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={() => setIsCartOpen(false)}
                      className="relative w-20 h-20 rounded-xl bg-gray-50 shrink-0 overflow-hidden"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="80px"
                        className="object-contain p-1.5"
                        referrerPolicy="no-referrer"
                      />
                    </Link>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <Link
                          href={`/product/${product.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="text-xs font-bold text-gray-800 hover:text-[#094532] line-clamp-2 leading-relaxed"
                        >
                          {product.name}
                        </Link>
                        <p className="text-xs font-extrabold text-[#094532] mt-1 tabular-nums">
                          {formatToman(product.price * quantity)} تومان
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            aria-label={`افزایش تعداد ${product.name}`}
                            className="w-7 h-7 rounded-md bg-white text-gray-700 hover:text-[#094532] flex items-center justify-center shadow-2xs cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold tabular-nums">
                            {toPersianDigits(quantity)}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            aria-label={`کاهش تعداد ${product.name}`}
                            className="w-7 h-7 rounded-md bg-white text-gray-700 hover:text-red-600 flex items-center justify-center shadow-2xs cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(product.id)}
                          aria-label={`حذف ${product.name}`}
                          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Totals & Checkout */}
            {items.length > 0 && (
              <div className="p-5 border-t border-gray-100 bg-gray-50/70 space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>سود شما از تخفیف‌ها</span>
                  <span className="font-bold text-[#ff611a] tabular-nums">
                    {formatToman(totals.productDiscount + totals.couponDiscount)} تومان
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm font-extrabold text-gray-900">
                  <span>مبلغ قابل پرداخت</span>
                  <span className="tabular-nums text-[#094532]">
                    {formatToman(totals.finalTotal)} تومان
                  </span>
                </div>
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full h-12 rounded-2xl bg-[#ff611a] hover:bg-[#e5500d] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-colors"
                >
                  <span>تکمیل خرید و پرداخت</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
