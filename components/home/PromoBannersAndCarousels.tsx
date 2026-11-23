'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { PRODUCTS } from '@/lib/data';
import { toPersianDigits } from '@/lib/store-logic';
import ProductCard from '@/components/ProductCard';

const NEWEST_TABS = [
  { id: 'all', label: 'همه' },
  { id: 'gaming', label: 'گیمینگ' },
  { id: 'computer', label: 'قطعات کامپیوتر' },
  { id: 'laptop', label: 'لپ تاپ' },
] as const;

const MID_BANNERS = [
  {
    id: 'mid-1',
    href: '/shop?category=accessories',
    image: '/assets/extracted/mid-peripherals.png',
    alt: 'تجهیزات جانبی؛ ماوس، کیبورد، هدست و لوازم گیمینگ',
  },
  {
    id: 'mid-2',
    href: '/shop?category=laptop',
    image: '/assets/extracted/mid-laptops.png',
    alt: 'نسل جدید لپ‌تاپ‌ها؛ لپ‌تاپ‌های قدرتمند برای هر پروژه',
  },
  {
    id: 'mid-3',
    href: '/shop?category=storage',
    image: '/assets/extracted/mid-storage.png',
    alt: 'حافظه‌های پرسرعت؛ هارد و کارت حافظه با بهترین قیمت',
  },
];

export default function PromoBannersAndCarousels() {
  const [newestTab, setNewestTab] = useState<(typeof NEWEST_TABS)[number]['id']>('all');
  const [newestPage, setNewestPage] = useState(0);
  const [hardwarePage, setHardwarePage] = useState(0);

  const filteredNewest = PRODUCTS.filter((p) => {
    if (newestTab === 'all') return true;
    if (newestTab === 'gaming') return p.category === 'gaming';
    if (newestTab === 'computer') return p.isComputer || p.category === 'computer';
    if (newestTab === 'laptop') return p.category === 'laptop';
    return true;
  });

  const newestDisplay =
    newestPage === 0
      ? filteredNewest.slice(0, 4)
      : [...filteredNewest.slice(2), ...filteredNewest.slice(0, 2)].slice(0, 4);

  const networkProducts = PRODUCTS.filter((p) => p.isNetwork).slice(0, 3);
  const hardwareAll = PRODUCTS.filter((p) => p.isComputer || p.category === 'gaming' || p.category === 'storage');
  const hardwareDisplay =
    hardwarePage === 0
      ? hardwareAll.slice(0, 4)
      : [...hardwareAll.slice(2), ...hardwareAll.slice(0, 2)].slice(0, 4);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 3 Colorful Mid Promotional Banners matching screenshot 2 */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {MID_BANNERS.map((banner, idx) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              whileHover={{ y: -6, scale: 1.015 }}
            >
              <Link
                href={banner.href}
                className="block relative w-full aspect-[300/214] rounded-2xl overflow-visible"
              >
                <Image
                  src={banner.image}
                  alt={banner.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.08)]"
                  referrerPolicy="no-referrer"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newest Products Warm Cream Container matching screenshots 2 & 3 */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#f7e6ce] rounded-[30px] sm:rounded-[36px] px-4 sm:px-7 py-7 sm:py-8">
          {/* Header with Interactive Filter Tabs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-start gap-2.5">
              <span aria-hidden="true" className="w-1 h-10 rounded-full bg-[#ff611a] mt-0.5" />
              <div>
                <h2 className="text-lg sm:text-xl font-black text-gray-900">جدیدترین</h2>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">محصولات</p>
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div
              role="tablist"
              aria-label="فیلتر جدیدترین محصولات"
              className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0"
            >
              {NEWEST_TABS.map((tab) => {
                const active = newestTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    type="button"
                    aria-selected={active}
                    onClick={() => {
                      setNewestTab(tab.id);
                      setNewestPage(0);
                    }}
                    className={`relative px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer border ${
                      active
                        ? 'text-[#ff611a] border-[#ff611a] bg-[#ff611a]/10'
                        : 'text-gray-700 border-gray-400/50 hover:border-gray-600 bg-transparent'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <Link
              href="/shop"
              className="hidden md:inline-flex items-center gap-2 border border-gray-500/40 hover:border-[#094532] hover:text-[#094532] text-gray-700 text-xs font-bold px-4 py-2 rounded-full transition-colors whitespace-nowrap shrink-0"
            >
              <span>مشاهده همه</span>
              <span className="w-5 h-5 rounded-full bg-[#ff611a] text-white flex items-center justify-center">
                <ArrowLeft className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>

          {/* 4-Column Product Grid */}
          <motion.div
            key={`${newestTab}-${newestPage}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
          >
            {newestDisplay.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-6">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setNewestPage(idx % 2)}
                aria-label={`صفحه ${toPersianDigits(idx + 1)} جدیدترین محصولات`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  newestPage === idx % 2 && idx < 2
                    ? 'w-7 bg-[#ff611a]'
                    : 'w-2 bg-[#ff611a]/30 hover:bg-[#ff611a]/60'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Network & Networking Equipment Section matching screenshot 3 */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-start gap-2.5">
            <span aria-hidden="true" className="w-1 h-10 rounded-full bg-[#ff611a] mt-0.5" />
            <div>
              <h2 className="text-lg sm:text-xl font-black text-gray-900">محصولات</h2>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">شبکه و تجهیزات شبکه</p>
            </div>
          </div>

          <Link
            href="/shop?category=network"
            className="inline-flex items-center gap-2 border border-gray-300 hover:border-[#094532] hover:text-[#094532] text-gray-700 text-xs font-bold px-4 py-2 rounded-full transition-colors whitespace-nowrap shrink-0"
          >
            <span>مشاهده همه</span>
            <span className="w-5 h-5 rounded-full bg-[#ff611a] text-white flex items-center justify-center">
              <ArrowLeft className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
          {/* Tall Vibrant Orange Network Banner Card (Rightmost in RTL) */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.22 }}
            className="relative bg-[#ff6319] text-white rounded-[24px] p-5 flex flex-col justify-between overflow-visible min-h-[340px] shadow-lg shadow-orange-500/20"
          >
            {/* Top-Right Sarv Logo Pill */}
            <div className="flex items-start justify-between">
              <div className="relative w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center p-1.5 -mt-2 -mr-1">
                <Image
                  src="/assets/extracted/sarv-logo.png"
                  alt="سرو سیستم"
                  fill
                  sizes="48px"
                  className="object-contain p-1.5"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex items-start gap-2 pt-4">
                <span aria-hidden="true" className="w-1 h-10 rounded-full bg-white/90" />
                <div>
                  <h3 className="text-base font-black leading-snug">شبکه</h3>
                  <p className="text-sm font-bold text-white/95">و تجهیزات شبکه</p>
                </div>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="w-36 h-16 sarv-dot-pattern opacity-60 self-center my-1"
            />

            {/* Exact Extracted Network Router/Switch/AP/Cable Visual */}
            <Link
              href="/shop?category=network"
              className="relative w-full h-[185px] -mx-1 mt-auto block group"
            >
              <Image
                src="/assets/extracted/banner-network-gear.png"
                alt="روتر، سوئیچ، اکسس پوینت و کابل شبکه سرو سیستم"
                fill
                sizes="(max-width: 640px) 90vw, 280px"
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </Link>
          </motion.div>

          {/* 3 Product Cards */}
          {networkProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 2 Wide Audio Banners matching screenshot 4 */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/shop?category=audio"
              className="block relative w-full aspect-[416/192]"
            >
              <Image
                src="/assets/extracted/audio-headphones.png"
                alt="هدفون و هندزفری؛ جدیدترین لوازم جانبی با بهترین قیمت"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.06)]"
                referrerPolicy="no-referrer"
              />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/shop?category=audio"
              className="block relative w-full aspect-[416/192]"
            >
              <Image
                src="/assets/extracted/audio-speaker.png"
                alt="صدایی فراتر از انتظار؛ اسپیکر و تجهیزات صوتی با کیفیت بالا"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.06)]"
                referrerPolicy="no-referrer"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Computer & Hardware Section matching screenshot 4 */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-start gap-2.5">
            <span aria-hidden="true" className="w-1 h-10 rounded-full bg-[#ff611a] mt-0.5" />
            <div>
              <h2 className="text-lg sm:text-xl font-black text-gray-900">محصولات</h2>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">کامپیوتر و سخت‌افزار</p>
            </div>
          </div>

          <Link
            href="/shop?category=computer"
            className="inline-flex items-center gap-2 border border-gray-300 hover:border-[#094532] hover:text-[#094532] text-gray-700 text-xs font-bold px-4 py-2 rounded-full transition-colors whitespace-nowrap shrink-0"
          >
            <span>مشاهده همه</span>
            <span className="w-5 h-5 rounded-full bg-[#ff611a] text-white flex items-center justify-center">
              <ArrowLeft className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        <motion.div
          key={hardwarePage}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {hardwareDisplay.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>

        <div className="flex items-center justify-center gap-1.5 mt-6">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setHardwarePage(idx % 2)}
              aria-label={`صفحه ${toPersianDigits(idx + 1)} محصولات کامپیوتر`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                hardwarePage === idx % 2 && idx < 2
                  ? 'w-7 bg-[#094532]'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
