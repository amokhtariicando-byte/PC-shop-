'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  Speaker,
  Gamepad2,
  MonitorSpeaker,
  PlugZap,
  Monitor,
  HardDrive,
  Usb,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { CATEGORIES, type CategoryItem } from '@/lib/data';

const ICON_MAP: Record<CategoryItem['iconName'], React.ComponentType<{ className?: string }>> = {
  Speaker,
  Gamepad2,
  MonitorSpeaker,
  PlugZap,
  Monitor,
  HardDrive,
  Usb,
};

export default function CategoryStrip() {
  const [selectedId, setSelectedId] = useState<string>('cat-3');
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (delta: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 lg:gap-6">
        {/* Right Heading matching screenshot 1 */}
        <div className="flex items-center gap-3 shrink-0 lg:min-w-[165px]">
          <span
            aria-hidden="true"
            className="w-1 h-10 rounded-full bg-[#ff611a] shrink-0"
          />
          <div>
            <p className="text-xs font-medium text-gray-500">دسترسی فوری به همه</p>
            <h2 className="text-base sm:text-lg font-black text-gray-900">دسته‌بندی‌ها</h2>
          </div>
        </div>

        {/* White Floating Strip Container */}
        <div className="flex-1 min-w-0 bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 px-3 sm:px-4 py-4 flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByAmount(220)}
            aria-label="اسکرول دسته‌بندی به راست"
            className="hidden sm:flex w-8 h-8 rounded-full hover:bg-gray-100 text-gray-400 hover:text-[#094532] items-center justify-center shrink-0 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex-1 flex items-center justify-between gap-3 overflow-x-auto no-scrollbar py-1 px-1"
          >
            {CATEGORIES.map((cat) => {
              const Icon = ICON_MAP[cat.iconName];
              const isActive = selectedId === cat.id;

              return (
                <motion.div
                  key={cat.id}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  className="shrink-0"
                >
                  <Link
                    href={`/shop?category=${cat.slug}`}
                    onMouseEnter={() => setSelectedId(cat.id)}
                    className={`w-[104px] sm:w-[114px] h-[98px] rounded-[20px] flex flex-col items-center justify-center gap-2.5 px-2 transition-all duration-200 border ${
                      isActive
                        ? 'bg-[#094532] text-white border-[#094532] shadow-lg shadow-[#094532]/20'
                        : 'bg-white text-gray-700 border-gray-200/80 hover:border-[#094532]/40'
                    }`}
                  >
                    <Icon
                      className={`w-7 h-7 stroke-[1.6] ${
                        isActive ? 'text-white' : 'text-gray-600'
                      }`}
                    />
                    <span className="text-[11px] sm:text-xs font-bold whitespace-nowrap">
                      {cat.label}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => scrollByAmount(-220)}
            aria-label="اسکرول دسته‌بندی به چپ"
            className="hidden sm:flex w-8 h-8 rounded-full hover:bg-gray-100 text-gray-400 hover:text-[#094532] items-center justify-center shrink-0 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
