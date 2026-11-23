'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '@/lib/data';

const FAQ_TABS = [
  { id: 'all', label: 'همه پرسش‌ها' },
  { id: 'order', label: 'ثبت سفارش و پرداخت' },
  { id: 'warranty', label: 'گارانتی و بازگشت کالا' },
  { id: 'shipping', label: 'ارسال و پیگیری' },
  { id: 'network', label: 'خدمات شبکه و VoIP' },
] as const;

export default function FaqPage() {
  const [activeTab, setActiveTab] = useState<(typeof FAQ_TABS)[number]['id']>('all');
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const filtered = FAQ_ITEMS.filter((item) => {
    if (activeTab !== 'all' && item.category !== activeTab) return false;
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      return item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="bg-[#094532] text-white rounded-[28px] p-6 sm:p-8 text-center space-y-4 relative overflow-hidden">
        <div className="absolute inset-0 sarv-dot-pattern opacity-25 pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mx-auto">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">پرسش‌های متداول و راهنمای مشتریان</h1>
          <p className="text-xs sm:text-sm text-white/80">
            پاسخ سریع به سوالات شما درباره خرید، گارانتی، بازگشت ۷ روزه کالا و خدمات شبکه
          </p>

          <div className="max-w-md mx-auto pt-2 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جستجو در سوالات متداول..."
              aria-label="جستجو در سوالات متداول"
              className="w-full h-11 pr-4 pl-10 rounded-full bg-white text-gray-800 text-xs focus:outline-none"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 mt-1" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {FAQ_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#ff611a] text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-[#094532]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                aria-expanded={isOpen}
                className="w-full px-5 py-4 flex items-center justify-between gap-4 text-right cursor-pointer"
              >
                <div>
                  <span className="text-[11px] font-bold text-[#ff611a] block mb-0.5">
                    {item.categoryLabel}
                  </span>
                  <span className="text-sm font-extrabold text-gray-900">{item.question}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#094532]' : ''
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-8 border-t border-gray-50">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center text-xs text-gray-500">
            پاسخی مطابق جستجوی شما یافت نشد. می‌توانید سوال خود را از طریق صفحه تماس با ما بپرسید.
          </div>
        )}
      </div>

      <div className="bg-[#fbf4e9] rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black text-gray-900">پاسخ سوال خود را پیدا نکردید؟</p>
          <p className="text-xs text-gray-600 mt-1">
            کارشناسان پشتیبانی سرو سیستم ۲۴ ساعته آماده راهنمایی شما هستند.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-2.5 rounded-full bg-[#094532] text-white text-xs font-bold whitespace-nowrap"
        >
          تماس با پشتیبانی
        </Link>
      </div>
    </div>
  );
}
