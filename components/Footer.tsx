'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Send,
  MessageCircle,
  CreditCard,
  Award,
  RotateCcw,
  Headphones,
} from 'lucide-react';
import { toPersianDigits } from '@/lib/store-logic';

const TRUST_FEATURES = [
  { label: 'پرداخت امن و آسان', icon: CreditCard },
  { label: 'ضمانت اصالت کالا', icon: Award },
  { label: '۷ روز ضمانت بازگشت کالا', icon: RotateCcw },
  { label: 'پشتیبانی ۲۴ ساعته', icon: Headphones },
];

export default function Footer() {
  return (
    <footer className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
      {/* Trust Features Bar matching screenshot 6 & 7 */}
      <div className="bg-[#efefef] rounded-2xl sm:rounded-3xl px-5 py-5 mb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x lg:divide-x-reverse lg:divide-gray-300/70">
          {TRUST_FEATURES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center justify-center gap-3 px-2 py-1"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#f7d8c9] text-[#4b3830] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-gray-800 leading-snug">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Deep Forest Green Footer Card matching screenshot 7 */}
      <div className="relative bg-[#063f2d] text-white rounded-[28px] sm:rounded-[34px] px-5 sm:px-8 lg:px-10 pt-14 sm:pt-12 pb-6 sm:pb-8 shadow-xl">
        {/* Top-Right Protruding Orange Social Tab */}
        <div className="absolute -top-5 right-5 sm:right-10 bg-[#ff611a] text-white rounded-2xl px-5 py-2.5 sm:py-3 flex items-center gap-4 shadow-lg shadow-orange-600/25">
          <span className="text-xs sm:text-sm font-bold whitespace-nowrap">با ما همراه باشید:</span>
          <div className="flex items-center gap-2.5">
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noreferrer"
              aria-label="واتساپ سرو سیستم"
              className="w-7 h-7 rounded-full bg-white/15 hover:bg-white hover:text-[#ff611a] flex items-center justify-center transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              aria-label="تلگرام سرو سیستم"
              className="w-7 h-7 rounded-full bg-white/15 hover:bg-white hover:text-[#ff611a] flex items-center justify-center transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="اینستاگرام سرو سیستم"
              className="w-7 h-7 rounded-full bg-white/15 hover:bg-white hover:text-[#ff611a] flex items-center justify-center transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Columns + eNamad Trust Seals */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-start pt-4 pb-10">
          {/* Col 1: Quick Access */}
          <div>
            <h3 className="text-sm font-extrabold text-white mb-4">دسترسی سریع</h3>
            <ul className="space-y-2.5 text-xs text-white/80">
              {[
                { href: '/', label: 'صفحه اصلی' },
                { href: '/shop', label: 'فروشگاه' },
                { href: '/blog', label: 'بلاگ' },
                { href: '/faq', label: 'پرسش‌های متداول' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 hover:text-white transition-colors group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff611a] shrink-0" />
                    <span className="group-hover:-translate-x-0.5 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Popular Categories */}
          <div>
            <h3 className="text-sm font-extrabold text-white mb-4">محبوب‌ترین دسته‌بندی‌ها</h3>
            <ul className="space-y-2.5 text-xs text-white/80">
              {[
                { href: '/shop?category=laptop', label: 'نمایشگر' },
                { href: '/shop?category=laptop', label: 'لپ‌تاپ' },
                { href: '/shop?category=gaming', label: 'لوازم گیمینگ' },
                { href: '/shop?category=computer', label: 'کیس' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 hover:text-white transition-colors group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff611a] shrink-0" />
                    <span className="group-hover:-translate-x-0.5 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services & Support */}
          <div>
            <h3 className="text-sm font-extrabold text-white mb-4">خدمات و پشتیبانی</h3>
            <ul className="space-y-2.5 text-xs text-white/80">
              {[
                { href: '/contact', label: 'تماس با ما' },
                { href: '/about', label: 'درباره ما' },
                { href: '/track-order', label: 'پیگیری سفارش' },
                { href: '/faq?tab=warranty', label: 'قوانین و مقررات' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 hover:text-white transition-colors group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff611a] shrink-0" />
                    <span className="group-hover:-translate-x-0.5 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Customer Guide */}
          <div>
            <h3 className="text-sm font-extrabold text-white mb-4">راهنمای مشتریان</h3>
            <ul className="space-y-2.5 text-xs text-white/80">
              {[
                { href: '/faq?tab=order', label: 'نحوه ثبت سفارش' },
                { href: '/cart', label: 'روش‌های پرداخت' },
                { href: '/faq?tab=warranty', label: 'شرایط بازگشت کالا' },
                { href: '/services', label: 'خدمات شبکه و VoIP' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 hover:text-white transition-colors group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff611a] shrink-0" />
                    <span className="group-hover:-translate-x-0.5 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: eNamad Dual Badges Pill matching screenshot 7 */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 flex lg:justify-end">
            <div className="inline-flex lg:flex-col items-center gap-3 bg-white/20 backdrop-blur-xs rounded-2xl p-3 border border-white/15">
              <div className="relative w-16 h-16 rounded-xl bg-white overflow-hidden shadow-sm">
                <Image
                  src="/assets/extracted/enamad.png"
                  alt="نماد اعتماد الکترونیکی سرو سیستم"
                  fill
                  sizes="64px"
                  className="object-contain p-1"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="relative w-16 h-16 rounded-xl bg-white overflow-hidden shadow-sm">
                <Image
                  src="/assets/extracted/enamad.png"
                  alt="نشان ملی ثبت رسانه‌های دیجیتال"
                  fill
                  sizes="64px"
                  className="object-contain p-1"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* White Inner Brand & Contact Box matching screenshot 7 */}
        <div className="bg-white text-gray-700 rounded-[24px] px-5 sm:px-8 py-6 shadow-inner">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="relative w-20 h-16 mb-3">
              <Image
                src="/assets/extracted/sarv-logo.png"
                alt="سرو سیستم"
                fill
                sizes="80px"
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xs sm:text-[13px] text-gray-500 leading-7">
              فروشگاه تخصصی سرو سیستم با بیش از یک دهه تجربه در زمینه تأمین قطعات کامپیوتر، سیستم‌های
              گیمینگ، لپ‌تاپ، تجهیزات شبکه سازمانی و پیاده‌سازی زیرساخت‌های VoIP، مرجع مطمئن خرید
              کالای اورجینال با ضمانت اصالت، ارسال سریع سراسری و پشتیبانی مهندسی ۲۴ ساعته در سراسر
              کشور است.
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-2 text-center md:text-right">
              <MapPin className="w-4 h-4 text-[#ff611a] shrink-0" />
              <span>تهران، خیابان ولیعصر، تقاطع طالقانی، مجتمع تجاری نور، طبقه اول، واحد ۶۰۴</span>
            </div>

            <div className="flex items-center gap-3 tabular-nums font-bold text-gray-700">
              <Phone className="w-4 h-4 text-[#ff611a] shrink-0" />
              <a href="tel:0215522885" className="hover:text-[#094532] transition-colors">
                {toPersianDigits('0215522885')}
              </a>
              <span className="text-gray-300">|</span>
              <a href="tel:0215522885" className="hover:text-[#094532] transition-colors">
                {toPersianDigits('0215522885')}
              </a>
            </div>

            <a
              href="mailto:info@sarvsystem.com"
              className="flex items-center gap-2 font-medium text-gray-700 hover:text-[#094532] transition-colors"
              dir="ltr"
            >
              <span>info@sarvsystem.com</span>
              <Mail className="w-4 h-4 text-[#ff611a] shrink-0" />
            </a>
          </div>
        </div>

        <p className="text-center text-[11px] text-white/55 mt-4">
          © ۱۴۰۵ تمامی حقوق مادی و معنوی برای فروشگاه اینترنتی سرو سیستم محفوظ است.
        </p>
      </div>
    </footer>
  );
}
