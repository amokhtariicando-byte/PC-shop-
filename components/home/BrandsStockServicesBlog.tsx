'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowLeft, Globe, PhoneCall, Calendar, Clock } from 'lucide-react';
import { BRANDS, PRODUCTS, BLOG_POSTS, SERVICES } from '@/lib/data';
import { toPersianDigits } from '@/lib/store-logic';
import ProductCard from '@/components/ProductCard';
import { TopNotchBay, SectionRibbonFlourish } from './NotchedShapes';

export default function BrandsStockServicesBlog() {
  const [stockPage, setStockPage] = useState(0);
  const stockAll = PRODUCTS.filter((p) => p.isStock);
  const stockDisplay =
    stockPage === 0
      ? stockAll.slice(0, 4)
      : [...stockAll.slice(1), stockAll[0]].slice(0, 4);

  const featuredPost = BLOG_POSTS[0];
  const secondaryPosts = BLOG_POSTS.slice(1, 3);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Selected Brands Strip matching screenshots 4 & 5 */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start gap-2.5 mb-7">
          <span aria-hidden="true" className="w-1 h-10 rounded-full bg-[#ff611a] mt-0.5" />
          <div>
            <h2 className="text-lg sm:text-xl font-black text-gray-900">برندهای منتخب</h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">سرو سیستم</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-0 lg:divide-x lg:divide-x-reverse lg:divide-gray-200">
          {BRANDS.map((brand) => (
            <motion.div key={brand.id} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
              <Link
                href={`/shop?brand=${brand.slug}`}
                className="flex items-center justify-center gap-3 px-4 py-2 group"
              >
                <div className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full overflow-hidden shadow-md shadow-amber-900/5 border border-amber-100/80 shrink-0 transition-transform duration-300 group-hover:scale-105 bg-[#faf4ea]">
                  <Image
                    src={brand.logo}
                    alt={`محصولات برند ${brand.persianName}`}
                    fill
                    sizes="72px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-gray-400 font-medium">محصولات</p>
                  <p className="text-sm sm:text-base font-black text-gray-900 group-hover:text-[#094532] transition-colors">
                    {brand.persianName}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dark Forest Green Stock Products Container matching screenshot 5 */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#225445] rounded-[30px] sm:rounded-[36px] px-4 sm:px-7 py-7 sm:py-8 overflow-hidden shadow-xl shadow-[#094532]/15">
          <SectionRibbonFlourish className="absolute -top-4 -left-6 w-64 h-48 text-white" />

          <div className="relative z-10 flex items-center justify-between gap-4 mb-6">
            <div className="flex items-start gap-2.5 text-white">
              <span aria-hidden="true" className="w-1 h-10 rounded-full bg-[#ff611a] mt-0.5" />
              <div>
                <h2 className="text-lg sm:text-xl font-black">محصولات</h2>
                <p className="text-xs sm:text-sm text-white/80 font-medium">استوک</p>
              </div>
            </div>

            <Link
              href="/shop?category=stock"
              className="inline-flex items-center gap-2 border border-white/40 hover:bg-white hover:text-[#094532] text-white text-xs font-bold px-4 py-2 rounded-full transition-colors whitespace-nowrap shrink-0"
            >
              <span>مشاهده همه</span>
              <span className="w-5 h-5 rounded-full bg-[#ff611a] text-white flex items-center justify-center">
                <ArrowLeft className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>

          <motion.div
            key={stockPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
          >
            {stockDisplay.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          <div className="relative z-10 flex items-center justify-center gap-1.5 mt-6">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setStockPage(idx % 2)}
                aria-label={`صفحه ${toPersianDigits(idx + 1)} محصولات استوک`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  stockPage === idx % 2 && idx < 2
                    ? 'w-7 bg-[#ff611a]'
                    : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Network & Communication Services with TRUE Top-Left Concave Scoops (Screenshots 5 & 6) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start gap-2.5 mb-7">
          <span aria-hidden="true" className="w-1 h-10 rounded-full bg-[#ff611a] mt-0.5" />
          <div>
            <h2 className="text-lg sm:text-xl font-black text-gray-900">خدمات تخصصی</h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">شبکه و ارتباطات</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Right Descriptive Copy */}
          <div className="lg:col-span-5 text-right space-y-4">
            <p className="text-sm text-gray-600 leading-8 text-justify">
              از مشاوره و طراحی شبکه‌های داخلی گرفته تا پیاده‌سازی زیرساخت‌های ارتباطی، راه‌اندازی
              سیستم‌های تلفنی VoIP و ایجاد ارتباطات امن بر بستر VPN، مجموعه ما با ارائه راهکارهای
              تخصصی و متناسب با نیاز هر کسب‌وکار، در مسیر توسعه، بهینه‌سازی و ارتقای زیرساخت فناوری
              اطلاعات همراه شما خواهد بود.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#094532] hover:text-[#ff611a] transition-colors"
            >
              <span>درخواست مشاوره رایگان پروژه شبکه</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          {/* Left Two True Concave-Notched Service Cards (Teal + Coral Orange) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-11 sm:gap-6 pt-7">
              {SERVICES.slice(0, 2).map((srv) => {
                const isTeal = srv.color === 'teal';
                const Icon = isTeal ? Globe : PhoneCall;
                return (
                  <motion.div
                    key={srv.id}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25 }}
                    className={`relative rounded-[28px] p-6 pt-12 text-white overflow-visible ${
                      isTeal
                        ? 'bg-gradient-to-br from-[#6496a0] to-[#4e808a] shadow-[0_14px_26px_-14px_rgba(16,59,67,0.45)]'
                        : 'bg-gradient-to-br from-[#fb8149] to-[#f46b2f] shadow-[0_14px_26px_-14px_rgba(217,77,18,0.45)]'
                    }`}
                  >
                    {/* TRUE G1-Continuous Top-Left Concave Scoop + Concentric Icon Circle */}
                    <TopNotchBay className="left-4 sm:left-6">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${
                          isTeal ? 'bg-[#103b43]' : 'bg-[#d94d12]'
                        }`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </TopNotchBay>

                    <div
                      aria-hidden="true"
                      className="absolute bottom-3 right-5 w-28 h-14 sarv-dot-pattern opacity-70 pointer-events-none"
                    />

                    <div className="relative z-10 space-y-2.5">
                      <div className="flex items-center gap-2">
                        <span
                          aria-hidden="true"
                          className={`w-1 h-6 rounded-full shrink-0 ${
                            isTeal ? 'bg-[#ff611a]' : 'bg-[#c93e05]'
                          }`}
                        />
                        <h3 className="text-base sm:text-lg font-black">{srv.title}</h3>
                      </div>
                      <p className="text-xs text-white/90 leading-6 min-h-[3.2rem]">
                        {srv.shortDesc}
                      </p>

                      <div className="pt-3 flex justify-end">
                        <Link
                          href={`/services#${srv.slug}`}
                          className="inline-flex items-center gap-2 border border-white/60 hover:bg-white hover:text-gray-900 text-white text-xs font-bold px-4 py-1.5 rounded-full transition-colors"
                        >
                          <span>مشاهده</span>
                          <span className="w-4 h-4 rounded-full bg-white text-gray-800 flex items-center justify-center">
                            <ArrowLeft className="w-3 h-3" />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-1.5 mt-5">
              <span className="w-7 h-2 rounded-full bg-[#094532]" />
              <span className="w-2 h-2 rounded-full bg-gray-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Sarv System Blog Section matching screenshot 6 */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-start gap-2.5">
            <span aria-hidden="true" className="w-1 h-10 rounded-full bg-[#ff611a] mt-0.5" />
            <div>
              <h2 className="text-lg sm:text-xl font-black text-gray-900">بلاگ</h2>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">سرو سیستم</p>
            </div>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border border-gray-300 hover:border-[#094532] hover:text-[#094532] text-gray-700 text-xs font-bold px-4 py-2 rounded-full transition-colors whitespace-nowrap shrink-0"
          >
            <span>مشاهده همه</span>
            <span className="w-5 h-5 rounded-full bg-[#ff611a] text-white flex items-center justify-center">
              <ArrowLeft className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Right Large Featured Dark Blog Card */}
          <motion.article
            whileHover={{ y: -4 }}
            className="lg:col-span-6 relative rounded-[26px] overflow-hidden min-h-[280px] sm:min-h-[320px] group shadow-md bg-[#122620]"
          >
            <Link href={`/blog/${featuredPost.slug}`} className="relative block w-full h-full min-h-[280px] sm:min-h-[320px]">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <div className="absolute bottom-0 right-0 left-0 p-6 text-white space-y-2.5">
                <h3 className="text-base sm:text-lg font-extrabold leading-relaxed group-hover:text-[#ffb48f] transition-colors">
                  {featuredPost.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-[#ff8a54] font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{featuredPost.date}</span>
                </div>
              </div>
            </Link>
          </motion.article>

          {/* Left Two Horizontal Blog Article Cards */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4 divide-y divide-gray-200/70">
            {secondaryPosts.map((post) => (
              <motion.article
                key={post.id}
                whileHover={{ x: -4 }}
                transition={{ duration: 0.2 }}
                className="pt-4 first:pt-0 flex-1 flex items-center"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="w-full flex items-center gap-4 group"
                >
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 shadow-sm bg-gray-100">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="128px"
                      className="object-cover transition-transform duration-300 group-hover:scale-106"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0 space-y-3">
                    <h3 className="text-sm sm:text-[15px] font-extrabold text-gray-800 group-hover:text-[#094532] leading-7 line-clamp-2 transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="font-semibold text-[#c95929]">{post.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
