'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PackageSearch, CheckCircle2, Truck, Box, ClipboardCheck } from 'lucide-react';
import { useStore } from '@/components/StoreProvider';
import { findTrackedOrder, formatToman, toPersianDigits } from '@/lib/store-logic';

const STEPS = [
  { key: 'registered', label: 'ثبت سفارش', icon: ClipboardCheck },
  { key: 'processing', label: 'تست و بسته‌بندی', icon: Box },
  { key: 'shipped', label: 'تحویل به پیک / پست', icon: Truck },
  { key: 'delivered', label: 'تحویل به مشتری', icon: CheckCircle2 },
] as const;

function TrackOrderInner() {
  const searchParams = useSearchParams();
  const { orders } = useStore();
  const initialCode = searchParams.get('code') || '';

  const [codeInput, setCodeInput] = useState(initialCode);
  const [searchedCode, setSearchedCode] = useState(initialCode);

  const foundOrder = searchedCode ? findTrackedOrder(orders, searchedCode) : undefined;
  const activeStepIndex = foundOrder
    ? STEPS.findIndex((s) => s.key === foundOrder.status)
    : -1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchedCode(codeInput);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="bg-[#094532] text-white rounded-[28px] p-6 sm:p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mx-auto">
          <PackageSearch className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-black">پیگیری لحظه‌ای سفارش</h1>
        <p className="text-xs sm:text-sm text-white/80">
          کد رهگیری سفارش خود را وارد کنید (نمونه برای آزمایش:{' '}
          <button
            type="button"
            onClick={() => {
              setCodeInput('SRV-1405-8821');
              setSearchedCode('SRV-1405-8821');
            }}
            className="underline font-bold text-[#ffb68f] cursor-pointer"
          >
            SRV-1405-8821
          </button>
          )
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-2 pt-2">
          <input
            type="text"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            placeholder="مثلاً SRV-1405-8821"
            dir="ltr"
            aria-label="کد رهگیری سفارش"
            className="flex-1 h-11 px-4 rounded-full bg-white text-gray-900 text-sm text-left focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 h-11 rounded-full bg-[#ff611a] hover:bg-[#e5500d] text-white text-xs font-bold cursor-pointer"
          >
            پیگیری
          </button>
        </form>
      </div>

      {searchedCode && !foundOrder && (
        <div className="bg-white rounded-3xl p-8 text-center border border-rose-100 space-y-2">
          <p className="text-sm font-black text-rose-600">سفارشی با کد «{searchedCode}» یافت نشد</p>
          <p className="text-xs text-gray-500">
            لطفاً کد رهگیری را مجدداً بررسی کرده یا با پشتیبانی به شماره ۰۲۱۶۶۵۵۲۲۱ تماس بگیرید.
          </p>
        </div>
      )}

      {foundOrder && (
        <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-gray-100 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-gray-100">
            <div>
              <p className="text-xs text-gray-400">کد رهگیری</p>
              <p className="text-lg font-black text-[#094532] tabular-nums" dir="ltr">
                {foundOrder.code}
              </p>
            </div>
            <div className="text-left">
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#fbf4e9] text-[#ff611a] text-xs font-black">
                {foundOrder.statusLabel}
              </span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const done = idx <= activeStepIndex;
              return (
                <div
                  key={step.key}
                  className={`p-4 rounded-2xl border text-center space-y-2 ${
                    done
                      ? 'border-[#094532]/30 bg-emerald-50/40 text-[#094532]'
                      : 'border-gray-100 bg-gray-50 text-gray-400'
                  }`}
                >
                  <Icon className="w-5 h-5 mx-auto" />
                  <p className="text-xs font-bold">{step.label}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-100 text-xs">
            <div>
              <span className="text-gray-400 block">تحویل‌گیرنده</span>
              <strong className="text-gray-800">{foundOrder.customerName}</strong>
            </div>
            <div>
              <span className="text-gray-400 block">تاریخ ثبت</span>
              <strong className="text-gray-800">{foundOrder.date}</strong>
            </div>
            <div>
              <span className="text-gray-400 block">تعداد و شهر</span>
              <strong className="text-gray-800">
                {toPersianDigits(foundOrder.itemsCount)} کالا — {foundOrder.city}
              </strong>
            </div>
            <div>
              <span className="text-gray-400 block">مبلغ کل</span>
              <strong className="text-[#094532] tabular-nums">
                {formatToman(foundOrder.total)} تومان
              </strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-3xl mx-auto px-4 py-16 text-center text-sm text-gray-500">
          در حال بارگذاری سامانه پیگیری...
        </div>
      }
    >
      <TrackOrderInner />
    </Suspense>
  );
}
