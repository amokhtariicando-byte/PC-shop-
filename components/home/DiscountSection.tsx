'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, Tag } from 'lucide-react';
import { PRODUCTS } from '@/lib/data';
import { splitCountdownSeconds, toPersianDigits } from '@/lib/store-logic';
import ProductCard from '@/components/ProductCard';

export default function DiscountSection() {
  const [secondsLeft, setSecondsLeft] = useState(14 * 3600 + 23 * 60 + 12);

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 14 * 3600 + 23 * 60 + 12));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const { hours, minutes, seconds } = splitCountdownSeconds(secondsLeft);
  const countdownText = `${toPersianDigits('01')} : ${toPersianDigits(hours)} : ${toPersianDigits(
    minutes
  )} : ${toPersianDigits(seconds)}`;

  const discountedProducts = PRODUCTS.filter((p) => p.isFeaturedDiscount).slice(0, 6);

  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative bg-gradient-to-l from-[#ff6319] via-[#ff6a22] to-[#ff5812] rounded-[30px] sm:rounded-[36px] px-4 sm:px-7 pt-6 pb-8 shadow-xl shadow-orange-500/15 overflow-hidden">
        {/* Decorative subtle translucent curve on left matching screenshots 1 & 2 */}
        <div
          aria-hidden="true"
          className="absolute -top-12 -left-10 w-64 h-64 rounded-full border-[24px] border-white/10 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute top-20 left-16 w-40 h-40 rounded-full border-[18px] border-white/8 pointer-events-none"
        />

        {/* Header Row */}
        <div className="relative z-10 flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 text-white">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center rotate-12 shrink-0">
              <Tag className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-start gap-2.5">
              <span aria-hidden="true" className="w-1 h-10 rounded-full bg-white mt-0.5" />
              <div>
                <h2 className="text-lg sm:text-xl font-black leading-tight">محصولات</h2>
                <p className="text-xs sm:text-sm text-white/85 font-medium">تخفیف‌دار</p>
              </div>
            </div>
          </div>

          <Link
            href="/shop?discount=1"
            className="inline-flex items-center gap-2 border border-white/60 hover:bg-white hover:text-[#ff611a] text-white text-xs font-bold px-4 py-2 rounded-full transition-colors whitespace-nowrap shrink-0"
          >
            <span>مشاهده همه</span>
            <span className="w-5 h-5 rounded-full bg-white text-[#ff611a] flex items-center justify-center">
              <ArrowLeft className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        {/* 6-Card Grid (3x2 on desktop, 2x3 on tablet, 1x6 on mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {discountedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="discount-horizontal"
              countdownText={countdownText}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
