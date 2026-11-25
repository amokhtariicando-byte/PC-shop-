'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpLeft, Headphones, Volume2 } from 'lucide-react';
import { PRODUCTS } from '@/lib/data';
import { toPersianDigits } from '@/lib/store-logic';
import ProductCard from '@/components/ProductCard';
import { LeftNotchBay, TopLeftCornerBay, TopNotchBay } from './NotchedShapes';

const NEWEST_TABS = [
  { id: 'all', label: 'همه' },
  { id: 'gaming', label: 'گیمینگ' },
  { id: 'computer', label: 'قطعات کامپیوتر' },
  { id: 'laptop', label: 'لپ تاپ' },
] as const;

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
  const hardwareAll = PRODUCTS.filter(
    (p) => p.isComputer || p.category === 'gaming' || p.category === 'storage'
  );
  const hardwareDisplay =
    hardwarePage === 0
      ? hardwareAll.slice(0, 4)
      : [...hardwareAll.slice(2), ...hardwareAll.slice(0, 2)].slice(0, 4);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 3 Colorful Mid Promotional Banners with TRUE G1-Continuous Left Concave Scoops (Screenshot 2) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-7">
          {/* Card 1 (Right in RTL): Lime Green Peripherals Banner */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35 }}
            whileHover={{ y: -5 }}
            className="pt-8 md:pt-7 pl-2"
          >
            <Link
              href="/shop?category=accessories"
              className="group relative block bg-gradient-to-br from-[#61d858] to-[#4cc644] rounded-[26px] px-6 pt-24 pb-6 text-white overflow-visible shadow-[0_14px_24px_-14px_rgba(34,197,94,0.35)]"
            >
              {/* Subtle Triangle Grid Pattern */}
              <div
                aria-hidden="true"
                className="absolute top-3 left-8 w-28 h-20 sarv-dot-pattern opacity-70 pointer-events-none"
              />

              {/* Protruding Top Hardware Visual: Keyboard + Mouse Composition */}
              <div className="absolute -top-11 inset-x-0 mx-auto w-[225px] h-[126px] pointer-events-none flex items-center justify-center mix-blend-multiply">
                <div className="relative w-[166px] h-[100px] -rotate-3 translate-x-4 -translate-y-1 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/assets/extracted/prod-keyboard.png"
                    alt="کیبورد گیمینگ"
                    fill
                    sizes="166px"
                    className="object-contain contrast-115"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="relative w-[92px] h-[92px] -translate-x-5 translate-y-3 transition-transform duration-300 group-hover:scale-108">
                  <Image
                    src="/assets/extracted/prod-mouse.png"
                    alt="ماوس گیمینگ"
                    fill
                    sizes="92px"
                    className="object-contain contrast-115"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* TRUE G1-Continuous Left-Edge Concave Scoop + Concentric Orange Arrow Button */}
              <LeftNotchBay>
                <span className="w-11 h-11 rounded-full bg-[#ff611a] text-white flex items-center justify-center shadow-md shadow-orange-600/25 transition-transform duration-200 group-hover:scale-108">
                  <ArrowLeft className="w-5 h-5" />
                </span>
              </LeftNotchBay>

              {/* Bottom Centered Title & Subtitle with Vertical Orange Accent Bar */}
              <div className="relative z-10 flex items-center justify-center gap-2.5 pl-4">
                <span
                  aria-hidden="true"
                  className="w-1 h-10 rounded-full bg-[#ff611a] shrink-0"
                />
                <div className="text-right">
                  <h3 className="text-lg font-black text-white leading-tight">تجهیزات جانبی</h3>
                  <p className="text-xs font-medium text-white/95 mt-1">
                    موس، کیبورد، هدست و...
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Card 2 (Center): Teal Laptops Banner */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: 0.08 }}
            whileHover={{ y: -5 }}
            className="pt-8 md:pt-7 pl-2"
          >
            <Link
              href="/shop?category=laptop"
              className="group relative block bg-gradient-to-br from-[#52b69e] to-[#3f9f88] rounded-[26px] px-6 pt-24 pb-6 text-white overflow-visible shadow-[0_14px_24px_-14px_rgba(13,148,136,0.35)]"
            >
              <div
                aria-hidden="true"
                className="absolute top-3 left-8 w-28 h-20 sarv-dot-pattern opacity-70 pointer-events-none"
              />

              {/* Protruding Top Hardware Visual: Next-Gen Laptops */}
              <div className="absolute -top-11 inset-x-0 mx-auto w-[200px] h-[128px] pointer-events-none flex items-center justify-center mix-blend-multiply">
                <div className="relative w-[166px] h-[122px] transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/assets/extracted/prod-laptop.png"
                    alt="نسل جدید لپ‌تاپ‌ها"
                    fill
                    sizes="166px"
                    className="object-contain contrast-115"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* TRUE G1-Continuous Left-Edge Concave Scoop + Concentric Dark Green Arrow Button */}
              <LeftNotchBay>
                <span className="w-11 h-11 rounded-full bg-[#094532] text-white flex items-center justify-center shadow-md shadow-emerald-950/25 transition-transform duration-200 group-hover:scale-108">
                  <ArrowLeft className="w-5 h-5" />
                </span>
              </LeftNotchBay>

              <div className="relative z-10 flex items-center justify-center gap-2.5 pl-4">
                <span
                  aria-hidden="true"
                  className="w-1 h-10 rounded-full bg-[#ff611a] shrink-0"
                />
                <div className="text-right">
                  <h3 className="text-lg font-black text-white leading-tight">
                    نسل جدید لپ‌تاپ‌ها
                  </h3>
                  <p className="text-xs font-medium text-white/95 mt-1">
                    لپ‌تاپ‌های قدرتمند برای هر پروژه
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Card 3 (Left in RTL): Steel Blue High-Speed Storage Banner */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: 0.16 }}
            whileHover={{ y: -5 }}
            className="pt-8 md:pt-7 pl-2"
          >
            <Link
              href="/shop?category=storage"
              className="group relative block bg-gradient-to-br from-[#5982b6] to-[#446ba0] rounded-[26px] px-6 pt-24 pb-6 text-white overflow-visible shadow-[0_14px_24px_-14px_rgba(30,58,138,0.35)]"
            >
              <div
                aria-hidden="true"
                className="absolute top-3 left-8 w-28 h-20 sarv-dot-pattern opacity-70 pointer-events-none"
              />

              {/* Protruding Top Hardware Visual: External HDD + USB Hub */}
              <div className="absolute -top-11 inset-x-0 mx-auto w-[210px] h-[128px] pointer-events-none flex items-center justify-center mix-blend-multiply">
                <div className="relative w-[134px] h-[118px] translate-x-3 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/assets/extracted/prod-hdd.png"
                    alt="هارد اکسترنال پرسرعت"
                    fill
                    sizes="134px"
                    className="object-contain contrast-115"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="relative w-[88px] h-[88px] -translate-x-4 translate-y-3 rotate-12 transition-transform duration-300 group-hover:scale-108">
                  <Image
                    src="/assets/extracted/prod-hub.png"
                    alt="فلش و هاب حافظه"
                    fill
                    sizes="88px"
                    className="object-contain contrast-115"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* TRUE G1-Continuous Left-Edge Concave Scoop + Concentric Navy Arrow Button */}
              <LeftNotchBay>
                <span className="w-11 h-11 rounded-full bg-[#0a2342] text-white flex items-center justify-center shadow-md shadow-slate-900/30 transition-transform duration-200 group-hover:scale-108">
                  <ArrowLeft className="w-5 h-5" />
                </span>
              </LeftNotchBay>

              <div className="relative z-10 flex items-center justify-center gap-2.5 pl-4">
                <span
                  aria-hidden="true"
                  className="w-1 h-10 rounded-full bg-[#ff611a] shrink-0"
                />
                <div className="text-right">
                  <h3 className="text-lg font-black text-white leading-tight">
                    حافظه‌های پرسرعت
                  </h3>
                  <p className="text-xs font-medium text-white/95 mt-1">
                    هارد و کارت حافظه با بهترین قیمت
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Newest Products Warm Cream Container matching screenshots 2 & 3 */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#f7e6ce] rounded-[30px] sm:rounded-[36px] px-4 sm:px-7 py-7 sm:py-8">
          {/* Header with Interactive Filter Tabs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-2.5">
                <span aria-hidden="true" className="w-1 h-10 rounded-full bg-[#ff611a] mt-0.5" />
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-gray-900">جدیدترین</h2>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">محصولات</p>
                </div>
              </div>

              <Link
                href="/shop"
                className="md:hidden inline-flex items-center gap-2 border border-gray-500/40 text-gray-700 text-xs font-bold px-3.5 py-1.5 rounded-full"
              >
                <span>مشاهده همه</span>
                <span className="w-4 h-4 rounded-full bg-[#ff611a] text-white flex items-center justify-center">
                  <ArrowLeft className="w-3 h-3" />
                </span>
              </Link>
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

      {/* Network & Networking Equipment Section with TRUE Top-Left Quarter-Circle Concave Cutout (Screenshot 3) */}
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
          {/* Tall Vibrant Orange Network Banner Card with TRUE Top-Left Carved Corner Pocket */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.22 }}
            className="relative bg-gradient-to-b from-[#ff661c] to-[#f45c14] text-white rounded-[26px] p-5 flex flex-col justify-between overflow-visible min-h-[346px] shadow-[0_14px_26px_-14px_rgba(244,92,20,0.45)]"
          >
            {/* TRUE G1-Continuous Top-Left Corner Cutout Pocket with Concentric White Sarv Logo Badge */}
            <TopLeftCornerBay>
              <div className="relative w-14 h-14 rounded-full bg-white shadow-md shadow-amber-900/10 flex items-center justify-center p-2 border border-gray-100">
                <Image
                  src="/assets/extracted/sarv-logo.png"
                  alt="سرو سیستم"
                  fill
                  sizes="56px"
                  className="object-contain p-1.5"
                  referrerPolicy="no-referrer"
                />
              </div>
            </TopLeftCornerBay>

            {/* Top-Right Heading matching Screenshot 3 */}
            <div className="relative z-10 flex items-start justify-start pt-14 pr-1">
              <div className="flex items-start gap-2.5">
                <span aria-hidden="true" className="w-1 h-11 rounded-full bg-white/95 mt-0.5" />
                <div>
                  <h3 className="text-lg font-black leading-snug">شبکه</h3>
                  <p className="text-sm font-bold text-white/95">و تجهیزات شبکه</p>
                </div>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="w-36 h-16 sarv-dot-pattern opacity-70 self-center my-1"
            />

            {/* Extracted Network Router/Switch/AP/Cable Cutout protruding slightly over bottom-left */}
            <Link
              href="/shop?category=network"
              className="relative w-[108%] h-[185px] -mr-2 mt-auto block group"
            >
              <Image
                src="/assets/extracted/cutout-network-gear.png"
                alt="روتر، سوئیچ، اکسس پوینت و کابل شبکه سرو سیستم"
                fill
                sizes="(max-width: 640px) 90vw, 290px"
                className="object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_14px_18px_rgba(0,0,0,0.22)]"
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

      {/* 2 Wide Audio Banners with TRUE G1-Continuous Top-Left Concave Scoops (Screenshot 4) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-9 md:gap-6">
          {/* Right Audio Card (Sage Green): Headphones & Handsfree */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="pt-6"
          >
            <Link
              href="/shop?category=audio"
              className="group relative flex items-center justify-between gap-3 bg-gradient-to-l from-[#79ac98] to-[#689c88] text-white rounded-[26px] px-5 sm:px-8 pt-10 pb-6 sm:py-7 min-h-[164px] overflow-visible shadow-[0_14px_24px_-14px_rgba(16,80,60,0.3)]"
            >
              {/* TRUE G1-Continuous Top-Left Concave Scoop + Concentric Dark Green ArrowUpLeft Button */}
              <TopNotchBay className="left-4 sm:left-6">
                <span className="w-11 h-11 rounded-full bg-[#094532] text-white flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-108">
                  <ArrowUpLeft className="w-5 h-5" />
                </span>
              </TopNotchBay>

              {/* Triangle Pattern on Bottom-Right */}
              <div
                aria-hidden="true"
                className="absolute bottom-2.5 right-6 w-28 h-20 sarv-dot-pattern opacity-70 pointer-events-none"
              />

              {/* Right Protruding Headphones Emblem breaking slightly above top edge */}
              <div className="relative z-10 w-[104px] sm:w-[144px] h-[104px] sm:h-[154px] -mt-10 sm:-mt-14 sm:-mb-2 shrink-0 flex items-center justify-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-[28px] rotate-6 bg-gradient-to-br from-[#f7e2c1] via-[#e7c59c] to-[#c99e70] border-2 border-white/60 flex items-center justify-center shadow-[0_16px_26px_rgba(9,69,50,0.28)] transition-transform duration-300 group-hover:scale-106 group-hover:rotate-3">
                  <Headphones className="w-12 h-12 sm:w-16 sm:h-16 text-[#183049] stroke-[1.8]" />
                </div>
              </div>

              {/* Left Text Block with Orange Vertical Accent Bar */}
              <div className="relative z-10 flex items-center gap-3 text-right flex-1 min-w-0 sm:pt-4">
                <span
                  aria-hidden="true"
                  className="w-1 h-11 rounded-full bg-[#ff611a] shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-base sm:text-xl font-black text-white leading-snug">
                    هدفون و هندزفری
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-white/90 mt-1 leading-relaxed">
                    جدیدترین لوازم جانبی با بهترین قیمت
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Left Audio Card (Slate Blue-Teal): Speakers & Sound Equipment */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="pt-6"
          >
            <Link
              href="/shop?category=audio"
              className="group relative flex items-center justify-between gap-3 bg-gradient-to-l from-[#7198a6] to-[#5f8795] text-white rounded-[26px] px-5 sm:px-8 pt-10 pb-6 sm:py-7 min-h-[164px] overflow-visible shadow-[0_14px_24px_-14px_rgba(21,58,107,0.3)]"
            >
              {/* TRUE G1-Continuous Top-Left Concave Scoop + Concentric Navy ArrowUpLeft Button */}
              <TopNotchBay className="left-4 sm:left-6">
                <span className="w-11 h-11 rounded-full bg-[#153a6b] text-white flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-108">
                  <ArrowUpLeft className="w-5 h-5" />
                </span>
              </TopNotchBay>

              {/* Triangle Pattern on Bottom-Right */}
              <div
                aria-hidden="true"
                className="absolute bottom-2.5 right-6 w-28 h-20 sarv-dot-pattern opacity-70 pointer-events-none"
              />

              {/* Right Protruding Speaker Emblem breaking slightly above top edge */}
              <div className="relative z-10 w-[104px] sm:w-[144px] h-[104px] sm:h-[154px] -mt-10 sm:-mt-14 sm:-mb-2 shrink-0 flex items-center justify-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-[28px] -rotate-6 bg-gradient-to-br from-[#233a5c] via-[#172842] to-[#0d192b] border-2 border-sky-200/40 flex items-center justify-center shadow-[0_16px_26px_rgba(13,25,43,0.34)] transition-transform duration-300 group-hover:scale-106 group-hover:-rotate-3">
                  <Volume2 className="w-12 h-12 sm:w-16 sm:h-16 text-sky-200 stroke-[1.8]" />
                </div>
              </div>

              {/* Left Text Block with Orange Vertical Accent Bar */}
              <div className="relative z-10 flex items-center gap-3 text-right flex-1 min-w-0 sm:pt-4">
                <span
                  aria-hidden="true"
                  className="w-1 h-11 rounded-full bg-[#ff611a] shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-base sm:text-xl font-black text-white leading-snug">
                    صدایی فراتر از انتظار
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-white/90 mt-1 leading-relaxed">
                    اسپیکر و تجهیزات صوتی با کیفیت بالا
                  </p>
                </div>
              </div>
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
