'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { HERO_SLIDES } from '@/lib/data';
import { splitCountdownSeconds, toPersianDigits } from '@/lib/store-logic';
import { HeroBottomNotchBay } from './NotchedShapes';

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(5 * 3600 + 34 * 60 + 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 5 * 3600 + 34 * 60 + 4));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const rot = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(rot);
  }, []);

  const slide = HERO_SLIDES[activeSlide];
  const { hours, minutes, seconds } = splitCountdownSeconds(secondsLeft);

  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Right Column (~68% / 8 cols): Deep Forest Green Main Hero Banner with Bottom-Right Concave Notch */}
        <div className="lg:col-span-8 relative">
          <div className="relative bg-gradient-to-l from-[#02382b] via-[#043f31] to-[#084938] text-white rounded-[28px] sm:rounded-[32px] min-h-[268px] sm:min-h-[290px] px-6 sm:px-9 pt-7 pb-12 sm:py-7 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-visible">
            {/* Subtle Triangle Pattern & Concentric Orbital Rings Background */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-[28px] sm:rounded-[32px] overflow-hidden pointer-events-none"
            >
              <div className="absolute bottom-4 right-[20%] w-48 h-24 sarv-dot-pattern opacity-70" />
              <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full bg-emerald-400/10 blur-3xl" />
              {/* Concentric orbital rings behind the PC case matching Screenshot 1 */}
              <div className="absolute left-[12%] top-1/2 -translate-y-1/2 w-[265px] h-[145px] rounded-full border border-emerald-300/20 -rotate-12" />
              <div className="absolute left-[8%] top-1/2 -translate-y-1/2 w-[330px] h-[180px] rounded-full border border-emerald-300/15 -rotate-12" />
            </div>

            {/* Text & Primary CTA (Right side in RTL) */}
            <div className="relative z-10 flex-1 text-right space-y-3.5 max-w-sm w-full sm:pb-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2.5"
                >
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="w-1 h-12 rounded-full bg-white/85 mt-1 shrink-0"
                    />
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                        {slide.title}
                      </h1>
                      <p className="text-xs sm:text-sm text-white/85 font-medium mt-1.5 leading-relaxed">
                        {slide.subtitle}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="pt-2 pr-4">
                <Link
                  href={slide.ctaHref}
                  className="inline-flex items-center gap-2.5 bg-[#ff611a] hover:bg-[#e5500d] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-lg shadow-orange-600/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>{slide.ctaLabel}</span>
                  <span className="w-5 h-5 rounded-full bg-white text-[#ff611a] flex items-center justify-center">
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Layered Hardware Composition breaking above the top edge matching Screenshot 1 */}
            <div className="relative z-10 w-full sm:w-[55%] max-w-[400px] h-[205px] sm:h-[268px] sm:-mt-14 sm:-mb-5 shrink-0 flex items-center justify-center">
              {/* Floating RGB Mechanical Keyboard (right-bottom of PC case) */}
              <motion.div
                animate={{ y: [0, -5, 0], rotate: [-4, -2, -4] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute right-0 bottom-5 w-[90px] sm:w-[106px] h-[64px] sm:h-[76px] z-20 pointer-events-none drop-shadow-[0_12px_18px_rgba(0,0,0,0.45)]"
              >
                <div className="relative w-full h-full [clip-path:polygon(13%_43%,90%_7%,93%_17%,88%_52%,9%_82%,6%_73%)]">
                  <Image
                    src="/assets/extracted/prod-keyboard.png"
                    alt="کیبورد مکانیکال گیمینگ"
                    fill
                    sizes="106px"
                    className="object-contain scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>

              {/* Main Protruding White RGB Gaming PC Case */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-[205px] sm:w-[258px] h-[205px] sm:h-[260px] z-10 drop-shadow-[0_20px_28px_rgba(0,0,0,0.42)]"
              >
                <Image
                  src="/assets/extracted/cutout-pc-case.png"
                  alt="کیس گیمینگ سفید سرو سیستم"
                  fill
                  priority
                  sizes="260px"
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Floating White Triple-Fan RTX GPU (left-middle of PC case) */}
              <motion.div
                animate={{ y: [0, 5, 0], rotate: [-12, -9, -12] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-0 top-1/2 -translate-y-1/3 w-[94px] sm:w-[112px] h-[68px] sm:h-[82px] z-20 pointer-events-none drop-shadow-[0_12px_18px_rgba(0,0,0,0.45)]"
              >
                <div className="relative w-full h-full [clip-path:polygon(12%_30%,81%_10%,91%_16%,87%_55%,20%_81%,11%_74%)]">
                  <Image
                    src="/assets/extracted/prod-gpu.png"
                    alt="کارت گرافیک سفید ایسوس"
                    fill
                    sizes="112px"
                    className="object-contain scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            </div>

            {/* True Concave Bottom-Right Pagination Notch carved upward into the green hero banner (Screenshot 1) */}
            <HeroBottomNotchBay className="right-6 sm:right-12">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`اسلاید ${toPersianDigits(idx + 1)}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeSlide === idx
                      ? 'w-5 bg-[#ff611a]'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </HeroBottomNotchBay>
          </div>
        </div>

        {/* Left Column (~32% / 4 cols): Cream Gaming Banner + Countdown Timer */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-4 pt-6 lg:pt-0">
          {/* Cream Gaming Card with Protruding Black PS5 */}
          <Link
            href="/shop?category=gaming"
            className="group relative bg-[#f7e2c1] rounded-[28px] px-5 py-6 min-h-[182px] flex items-center justify-between overflow-visible shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              aria-hidden="true"
              className="absolute bottom-2.5 right-5 w-28 h-14 sarv-dot-pattern-dark opacity-75 pointer-events-none"
            />

            {/* Right Text */}
            <div className="relative z-10 flex items-start gap-2.5 max-w-[54%]">
              <span
                aria-hidden="true"
                className="w-1 h-10 rounded-full bg-[#ff611a] mt-0.5 shrink-0"
              />
              <div>
                <h2 className="text-lg sm:text-xl font-black text-gray-900 leading-snug">
                  دنیای گیمینگ
                </h2>
                <p className="text-xs font-semibold text-gray-600 mt-0.5">در سرو سیستم</p>
              </div>
            </div>

            {/* Protruding Black PS5 Cutout breaking well above the cream card */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              className="relative z-10 w-[142px] sm:w-[170px] h-[176px] sm:h-[192px] -mt-12 sm:-mt-16 -mb-2 shrink-0"
            >
              <Image
                src="/assets/extracted/hero-ps5.png"
                alt="کنسول پلی‌استیشن ۵ دنیای گیمینگ سرو سیستم"
                fill
                priority
                sizes="170px"
                className="object-contain drop-shadow-[0_14px_20px_rgba(15,23,42,0.22)]"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </Link>

          {/* Live Special Offer Countdown Bar matching Screenshot 1 */}
          <div className="flex items-center justify-between gap-3 px-1">
            <div className="text-right">
              <p className="text-sm font-black text-gray-900">فرصت خرید ویژه</p>
              <p className="text-xs text-gray-500 mt-0.5">رو از دست نده!</p>
            </div>

            <div className="flex items-center gap-2.5" aria-label="زمان باقی‌مانده پیشنهاد ویژه">
              {[
                { value: seconds, label: 'ثانیه' },
                { value: minutes, label: 'دقیقه' },
                { value: hours, label: 'ساعت' },
              ].map((unit) => (
                <div key={unit.label} className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1" dir="ltr">
                    {unit.value.split('').map((digit, idx) => (
                      <span
                        key={`${unit.label}-${idx}`}
                        className="w-6 h-8 rounded-[10px] bg-[#ff611a] text-white text-xs font-black flex items-center justify-center shadow-sm shadow-orange-500/25 tabular-nums"
                      >
                        {toPersianDigits(digit)}
                      </span>
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-gray-500">{unit.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
