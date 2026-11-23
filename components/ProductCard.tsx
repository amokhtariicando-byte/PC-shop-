'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ShoppingBasket, Heart } from 'lucide-react';
import type { Product } from '@/lib/data';
import {
  formatToman,
  toPersianDigits,
  computeSoldPercentage,
} from '@/lib/store-logic';
import { useStore } from './StoreProvider';

interface ProductCardProps {
  product: Product;
  variant?: 'vertical' | 'discount-horizontal';
  countdownText?: string;
}

export default function ProductCard({
  product,
  variant = 'vertical',
  countdownText = '۱۴ : ۲۳ : ۱۲ : ۶۴',
}: ProductCardProps) {
  const { addToCart, wishlistIds, toggleWishlist } = useStore();
  const soldPct = computeSoldPercentage(product.sold, product.remaining);
  const isWished = wishlistIds.includes(product.id);

  if (variant === 'discount-horizontal') {
    return (
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white rounded-2xl p-3.5 shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-between h-full"
      >
        <div className="flex items-center gap-3">
          {/* Product Thumbnail (Right side in RTL) */}
          <Link
            href={`/product/${product.slug}`}
            className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-xl bg-white overflow-hidden group"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="96px"
              className="object-contain p-1 transition-transform duration-300 group-hover:scale-108"
              referrerPolicy="no-referrer"
            />
          </Link>

          {/* Details (Left side in RTL) */}
          <div className="flex-1 min-w-0 flex flex-col justify-between gap-2.5">
            <Link
              href={`/product/${product.slug}`}
              className="text-xs sm:text-[13px] font-bold text-gray-800 hover:text-[#094532] leading-snug line-clamp-2 transition-colors"
            >
              {product.name}
            </Link>

            <div className="flex items-end justify-between gap-2">
              {/* Price Stack */}
              <div className="flex items-center gap-1.5">
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full bg-[#ff611a] text-white text-[10px] font-extrabold tabular-nums">
                      ٪{toPersianDigits(product.discountPercent)}
                    </span>
                    <span className="text-[11px] text-gray-400 line-through tabular-nums">
                      {formatToman(product.originalPrice)}
                    </span>
                  </div>
                  <div className="text-sm font-black text-gray-900 tabular-nums mt-0.5">
                    {formatToman(product.price)}
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-gray-400 [writing-mode:vertical-rl] rotate-180 select-none">
                  تومان
                </span>
              </div>

              {/* Deep Green Square Add-to-Cart Button */}
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={() => addToCart(product)}
                aria-label={`افزودن ${product.name} به سبد خرید`}
                className="w-9 h-9 rounded-xl bg-[#094532] hover:bg-[#ff611a] text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer shadow-xs"
              >
                <ShoppingBasket className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Flash Sale Strip matching screenshot */}
        <div className="mt-3 pt-2 border-t-2 border-rose-500/80 flex items-center justify-between text-[11px] font-bold">
          <span className="text-rose-600">فروش ویژه</span>
          <span className="text-rose-600 tabular-nums tracking-wider" dir="ltr">
            {countdownText}
          </span>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-[22px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_32px_rgba(9,69,50,0.10)] border border-gray-100/80 transition-shadow flex flex-col justify-between h-full group relative"
    >
      {/* Subtle Wishlist Button on Hover */}
      <button
        type="button"
        onClick={() => toggleWishlist(product.id)}
        aria-label={isWished ? `حذف ${product.name} از علاقه‌مندی‌ها` : `افزودن ${product.name} به علاقه‌مندی‌ها`}
        className={`absolute top-3.5 left-3.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
          isWished
            ? 'bg-rose-50 text-rose-500 opacity-100'
            : 'bg-gray-50/90 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-rose-500'
        }`}
      >
        <Heart className={`w-4 h-4 ${isWished ? 'fill-current' : ''}`} />
      </button>

      {/* Product Photo */}
      <Link
        href={`/product/${product.slug}`}
        className="relative w-full aspect-[4/3] mb-3.5 flex items-center justify-center overflow-hidden rounded-xl bg-white"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-2 transition-transform duration-300 group-hover:scale-106"
          referrerPolicy="no-referrer"
        />
      </Link>

      {/* Product Title */}
      <Link
        href={`/product/${product.slug}`}
        className="text-xs sm:text-[13px] font-bold text-gray-800 hover:text-[#094532] leading-relaxed line-clamp-2 min-h-[2.6rem] transition-colors"
      >
        {product.name}
      </Link>

      {/* Sold / Remaining Progress Bar matching exact screenshot */}
      <div className="mt-3 pt-2.5 border-t border-gray-100">
        <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1.5 tabular-nums">
          <span>فروخته شده: {toPersianDigits(product.sold)}</span>
          <span>باقیمانده: {toPersianDigits(product.remaining)}</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-l from-[#ff611a] to-[#ff9757] transition-all duration-500"
            style={{ width: `${soldPct}%` }}
          />
        </div>
      </div>

      {/* Price & Deep Forest Green Cart Button Row */}
      <div className="mt-3.5 flex items-end justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1.5">
              {product.discountPercent > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full bg-[#ff611a] text-white text-[10px] font-extrabold tabular-nums">
                  ٪{toPersianDigits(product.discountPercent)}
                </span>
              )}
              {product.originalPrice > product.price && (
                <span className="text-[11px] text-gray-400 line-through tabular-nums">
                  {formatToman(product.originalPrice)}
                </span>
              )}
            </div>
            <div className="text-sm sm:text-[15px] font-black text-gray-900 tabular-nums mt-0.5">
              {formatToman(product.price)}
            </div>
          </div>
          <span className="text-[10px] font-semibold text-gray-400 [writing-mode:vertical-rl] rotate-180 select-none">
            تومان
          </span>
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => addToCart(product)}
          aria-label={`افزودن ${product.name} به سبد خرید`}
          className="w-10 h-10 rounded-xl bg-[#094532] hover:bg-[#ff611a] text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer shadow-xs"
        >
          <ShoppingBasket className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.article>
  );
}
