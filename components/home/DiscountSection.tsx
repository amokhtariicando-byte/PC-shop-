'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, Percent } from 'lucide-react';
import { PRODUCTS } from '@/lib/data';
import { splitCountdownSeconds, toPersianDigits } from '@/lib/store-logic';
import ProductCard from '@/components/ProductCard';
import { SectionRibbonFlourish } from './NotchedShapes';

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
      {/* Outer wrapper allows bottom row of product cards to overhang cleanly below the orange backdrop (Screenshot 2) */}
      <div className="relative px-4 sm:px-7 pt-6 pb-2">
        {/* Vibrant Orange Rounded Backdrop ending behind the lower half of the bottom row */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 bottom-[62px] sm:bottom-[86px] bg-gradient-to-l from-[#ff6319] via-[#ff6a22] to-[#ff5812] rounded-[30px] sm:rounded-[36px] shadow-xl shadow-orange-500/15 overflow-hidden pointer-events-none"
        >
          <SectionRibbonFlourish className="absolute -top-4 -left-6 w-64 h-48 text-white" />
        </div>

        {/* Header Row */}
        <div className="relative z-10 flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 text-white">
            {/* Crisp Tilted White Price-Tag Badge matching Screenshots 1 & 2 */}
            <div className="relative w-12 h-11 rounded-xl bg-white text-[#ff611a] flex items-center justify-center -rotate-12 shadow-md shadow-orange-900/15 shrink-0">
              <span
                aria-hidden="true"
                className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#ff611a]"
              />
              <Percent className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex items-start gap-2.5">
              <span aria-hidden="true" className="w-1 h-10 rounded-full bg-white mt-0.5" />
              <div>
                <h2 className="text-lg sm:text-xl font-black leading-tight">محصولات</h2>
                <p className="text-xs sm:text-sm text-white/90 font-medium">تخفیف‌دار</p>
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

        {/* 6-Card Grid (3x2 on desktop, 2x3 on tablet, 1x6 on mobile) with overhanging bottom row */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {discountedProducts.map((product) => (
            <div key={product.id} className="rounded-2xl shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
              <ProductCard
                product={product}
                variant="discount-horizontal"
                countdownText={countdownText}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
