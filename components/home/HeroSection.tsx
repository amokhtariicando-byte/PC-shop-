'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { HERO_SLIDES } from '@/lib/data';
import { splitCountdownSeconds, toPersianDigits } from '@/lib/store-logic';

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
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Right Column (~68% / 8 cols): Deep Forest Green Main Hero Banner */}
        <div className="lg:col-span-8 relative">
          <div className="relative bg-[#023a2d] text-white rounded-[28px] sm:rounded-[32px] min-h-[260px] sm:min-h-[285px] px-6 sm:px-9 py-7 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-visible shadow-lg shadow-[#023a2d]/20">
            {/* Subtle Dot Pattern Background */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-[28px] sm:rounded-[32px] overflow-hidden pointer-events-none"
            >
              <div className="absolute bottom-3 right-1/4 w-48 h-24 sarv-dot-pattern opacity-60" />
              <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full bg-emerald-400/10 blur-3xl" />
            </div>

            {/* Text & Primary CTA (Right side in RTL) */}
            <div className="relative z-10 flex-1 text-right space-y-3.5 max-w-sm">
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

            {/* Exact Extracted White Gaming PC + GPU + Keyboard Visual */}
            <div className="relative z-10 w-full sm:w-[54%] max-w-[385px] h-[185px] sm:h-[235px] sm:-mt-8 shrink-0 animate-sarv-float hero-img-blend">
              <Image
                src={slide.image}
                alt="کیس گیمینگ سفید، کارت گرافیک و کیبورد سرو سیستم"
                fill
                priority
                sizes="(max-width: 640px) 90vw, 385px"
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Bottom Carousel Dots Pill matching screenshot 1 */}
            <div className="absolute -bottom-3 left-8 z-20 bg-white rounded-full px-3 py-1.5 shadow-md flex items-center gap-1.5">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`اسلاید ${toPersianDigits(idx + 1)}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeSlide === idx
                      ? 'w-5 bg-[#ff611a]'
                      : 'w-2 bg-gray-200 hover:bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Left Column (~32% / 4 cols): Cream Gaming Banner + Countdown Timer */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-4">
          {/* Cream Gaming Card */}
          <Link
            href="/shop?category=gaming"
            className="group relative bg-[#f7e2c1] rounded-[28px] px-5 py-6 min-h-[178px] flex items-center justify-between overflow-visible shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              aria-hidden="true"
              className="absolute bottom-2 right-5 w-28 h-14 sarv-dot-pattern-dark opacity-70 pointer-events-none"
            />

            {/* Right Text */}
            <div className="relative z-10 flex items-start gap-2.5 max-w-[56%]">
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

            {/* Protruding Black PS5 Cutout */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              className="relative z-10 w-[142px] sm:w-[162px] h-[174px] -mt-12 -mb-2 shrink-0"
            >
              <Image
                src="/assets/extracted/hero-ps5.png"
                alt="کنسول پلی‌استیشن ۵ دنیای گیمینگ سرو سیستم"
                fill
                priority
                sizes="160px"
                className="object-contain drop-shadow-[0_14px_20px_rgba(15,23,42,0.22)]"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </Link>

          {/* Live Special Offer Countdown Bar matching screenshot 1 */}
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
                        className="w-6 h-8 rounded-full bg-[#ff611a] text-white text-xs font-black flex items-center justify-center shadow-sm shadow-orange-500/25 tabular-nums"
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
