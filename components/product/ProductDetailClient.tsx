'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  ShoppingBasket,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  Check,
  Plus,
  Minus,
  ChevronLeft,
} from 'lucide-react';
import type { Product } from '@/lib/data';
import { formatToman, toPersianDigits } from '@/lib/store-logic';
import { useStore } from '@/components/StoreProvider';
import ProductCard from '@/components/ProductCard';

interface ProductDetailClientProps {
  product: Product;
  related: Product[];
}

export default function ProductDetailClient({ product, related }: ProductDetailClientProps) {
  const { addToCart, setIsCartOpen, wishlistIds, toggleWishlist } = useStore();
  const [activeImage, setActiveImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);

  const isWished = wishlistIds.includes(product.id);
  const images = product.gallery.length > 0 ? product.gallery : [product.image];

  const handleAdd = (openDrawer = false) => {
    addToCart(product, quantity);
    if (openDrawer) setIsCartOpen(true);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb */}
      <nav aria-label="مسیر صفحه" className="flex items-center gap-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#094532]">
          صفحه اصلی
        </Link>
        <ChevronLeft className="w-3.5 h-3.5" />
        <Link href="/shop" className="hover:text-[#094532]">
          فروشگاه
        </Link>
        <ChevronLeft className="w-3.5 h-3.5" />
        <Link href={`/shop?category=${product.category}`} className="hover:text-[#094532]">
          {product.categoryLabel}
        </Link>
        <ChevronLeft className="w-3.5 h-3.5" />
        <span className="text-gray-800 font-semibold truncate">{product.name}</span>
      </nav>

      {/* Main Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Gallery Column */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative aspect-square bg-white rounded-[28px] border border-gray-100 shadow-xs overflow-hidden p-6">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full"
            >
              <Image
                src={activeImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {images.length > 1 && (
            <div className="flex items-center gap-2.5">
              {images.map((img, i) => (
                <button
                  key={`${img}-${i}`}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  aria-label={`تصویر ${toPersianDigits(i + 1)}`}
                  className={`relative w-20 h-20 rounded-2xl bg-white border-2 overflow-hidden p-2 cursor-pointer transition-colors ${
                    activeImage === img ? 'border-[#ff611a]' : 'border-gray-100 hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} - نما ${i + 1}`}
                    fill
                    sizes="80px"
                    className="object-contain p-1"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info & Contiguous Purchase Module */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-gray-100 shadow-xs space-y-5">
            <div className="flex items-center justify-between gap-3 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#094532]">{product.brandLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{product.categoryLabel}</span>
              </div>
              <div className="flex items-center gap-1 text-amber-500 font-bold tabular-nums">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-gray-800">{toPersianDigits(product.rating)}</span>
                <span className="text-gray-400 font-normal">
                  ({toPersianDigits(product.reviewCount)} دیدگاه)
                </span>
              </div>
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug">
                {product.name}
              </h1>
              <p className="text-xs text-gray-400 mt-1" dir="ltr">
                {product.englishName}
              </p>
            </div>

            <p className="text-sm text-gray-600 leading-8">{product.description}</p>

            {/* Key Features */}
            <ul className="space-y-2 pt-1">
              {product.features.map((feat) => (
                <li key={feat} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-[#094532] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            {/* Contiguous Pricing & Actions */}
            <div className="pt-5 border-t border-gray-100 space-y-4">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-[#ff611a] text-white text-xs font-extrabold tabular-nums">
                      ٪{toPersianDigits(product.discountPercent)} تخفیف
                    </span>
                    <span className="text-sm text-gray-400 line-through tabular-nums">
                      {formatToman(product.originalPrice)} تومان
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#094532] mt-1 tabular-nums">
                    {formatToman(product.price)}{' '}
                    <span className="text-sm font-bold text-gray-500">تومان</span>
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="افزایش تعداد"
                    className="w-9 h-9 rounded-lg bg-white text-gray-700 hover:text-[#094532] flex items-center justify-center shadow-2xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-black tabular-nums">
                    {toPersianDigits(quantity)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="کاهش تعداد"
                    className="w-9 h-9 rounded-lg bg-white text-gray-700 hover:text-red-500 flex items-center justify-center shadow-2xs cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAdd(true)}
                  className="flex-1 min-w-[200px] h-12 rounded-2xl bg-[#ff611a] hover:bg-[#e5500d] text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-orange-500/25 transition-colors cursor-pointer"
                >
                  <ShoppingBasket className="w-5 h-5" />
                  <span>افزودن به سبد خرید</span>
                </motion.button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="افزودن به علاقه‌مندی‌ها"
                  className={`h-12 px-4 rounded-2xl border font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer ${
                    isWished
                      ? 'border-rose-200 bg-rose-50 text-rose-600'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-400'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWished ? 'fill-current' : ''}`} />
                  <span>{isWished ? 'ذخیره شد' : 'علاقه‌مندی'}</span>
                </button>
              </div>
            </div>

            {/* Trust Strip inside PDP */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-gray-100 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#094532] shrink-0" />
                <span>{product.warranty}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#ff611a] shrink-0" />
                <span>ارسال اکسپرس تهران و سراسری</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#094532] shrink-0" />
                <span>۷ روز ضمانت بازگشت کالا</span>
              </div>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-gray-100 shadow-xs">
            <h2 className="text-base font-black text-gray-900 mb-4">مشخصات فنی محصول</h2>
            <div className="divide-y divide-gray-100">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs sm:text-sm"
                >
                  <span className="font-semibold text-gray-500">{spec.label}</span>
                  <span className="sm:col-span-2 font-bold text-gray-800">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="space-y-5">
        <div className="flex items-start gap-2.5">
          <span aria-hidden="true" className="w-1 h-9 rounded-full bg-[#ff611a] mt-0.5" />
          <div>
            <h2 className="text-lg font-black text-gray-900">محصولات مشابه</h2>
            <p className="text-xs text-gray-500">پیشنهاد کارشناسان سرو سیستم</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
