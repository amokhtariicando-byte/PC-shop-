'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  Plus,
  Minus,
  Trash2,
  Ticket,
  CheckCircle2,
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
} from 'lucide-react';
import { useStore } from '@/components/StoreProvider';
import { formatToman, toPersianDigits, validateCoupon } from '@/lib/store-logic';
import type { TrackedOrder } from '@/lib/data';

export default function CartCheckoutPage() {
  const {
    items,
    totals,
    couponCode,
    setCouponCode,
    updateQuantity,
    removeFromCart,
    placeOrder,
  } = useStore();

  const [couponInput, setCouponInput] = useState(couponCode);
  const [couponMessage, setCouponMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('تهران');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online');
  const [formError, setFormError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<TrackedOrder | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateCoupon(couponInput);
    if (res.valid) {
      setCouponCode(couponInput.trim().toUpperCase());
      setCouponMessage({ ok: true, text: `${res.label} اعمال شد.` });
    } else {
      setCouponCode('');
      setCouponMessage({ ok: false, text: 'کد تخفیف معتبر نیست. کد نمونه: SARV10' });
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || phone.trim().length < 10 || !address.trim()) {
      setFormError('لطفاً نام و نام خانوادگی، شماره تماس معتبر و آدرس کامل را وارد کنید.');
      return;
    }
    setFormError('');
    const order = placeOrder({
      customerName: fullName.trim(),
      city: city.trim() || 'تهران',
      total: totals.finalTotal,
      itemsCount: totals.itemCount,
    });
    setConfirmedOrder(order);
  };

  if (confirmedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-14">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[30px] p-8 border border-gray-100 shadow-lg text-center space-y-5"
        >
          <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-[#094532] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h1 className="text-2xl font-black text-gray-900">سفارش شما با موفقیت ثبت شد!</h1>
          <p className="text-sm text-gray-600 leading-7">
            ممنون از خرید شما {confirmedOrder.customerName} عزیز. کارشناسان انبار سرو سیستم در حال
            آماده‌سازی و بسته‌بندی ایمن سفارش شما هستند.
          </p>

          <div className="bg-[#fbf4e9] rounded-2xl p-5 text-right space-y-2.5 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">کد رهگیری سفارش:</span>
              <span className="font-black text-[#094532] tabular-nums" dir="ltr">
                {confirmedOrder.code}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">مبلغ نهایی:</span>
              <span className="font-black text-gray-900 tabular-nums">
                {formatToman(confirmedOrder.total)} تومان
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">روش ارسال:</span>
              <span className="font-bold text-gray-800">{confirmedOrder.courier}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href={`/track-order?code=${confirmedOrder.code}`}
              className="px-6 py-3 rounded-full bg-[#094532] hover:bg-[#063828] text-white text-xs font-bold transition-colors"
            >
              پیگیری وضعیت سفارش
            </Link>
            <Link
              href="/shop"
              className="px-6 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors"
            >
              ادامه خرید در فروشگاه
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-start gap-2.5 mb-7">
        <span aria-hidden="true" className="w-1 h-10 rounded-full bg-[#ff611a] mt-0.5" />
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">سبد خرید و تکمیل سفارش</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            کد تخفیف ویژه ۱۰ درصدی: <strong className="text-[#ff611a]">SARV10</strong>
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-[28px] p-12 border border-gray-100 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-base font-black text-gray-900">سبد خرید شما در حال حاضر خالی است</h2>
          <p className="text-xs text-gray-500 max-w-md mx-auto leading-6">
            برای ثبت سفارش، ابتدا کالاهای مورد نیاز خود را از فروشگاه سرو سیستم انتخاب کنید.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ff611a] text-white text-xs font-bold"
          >
            <span>ورود به فروشگاه</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* Left/Right Main Column: Cart Items + Checkout Form */}
          <div className="lg:col-span-8 space-y-6">
            {/* Items List */}
            <div className="bg-white rounded-[26px] p-5 sm:p-6 border border-gray-100 shadow-xs space-y-4">
              <h2 className="text-sm font-black text-gray-900">
                کالاهای سبد خرید ({toPersianDigits(totals.itemCount)} عدد)
              </h2>
              <div className="divide-y divide-gray-100">
                {items.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="py-4 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <Link
                        href={`/product/${product.slug}`}
                        className="relative w-20 h-20 rounded-2xl bg-gray-50 border border-gray-100 shrink-0 overflow-hidden"
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="80px"
                          className="object-contain p-1.5"
                          referrerPolicy="no-referrer"
                        />
                      </Link>
                      <div>
                        <Link
                          href={`/product/${product.slug}`}
                          className="text-sm font-bold text-gray-900 hover:text-[#094532]"
                        >
                          {product.name}
                        </Link>
                        <p className="text-xs text-gray-400 mt-1">{product.warranty}</p>
                        <p className="text-sm font-black text-[#094532] mt-1 tabular-nums">
                          {formatToman(product.price * quantity)} تومان
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      <div className="flex items-center gap-1.5 bg-gray-100 rounded-xl p-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          aria-label={`افزایش تعداد ${product.name}`}
                          className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-2xs cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold tabular-nums">
                          {toPersianDigits(quantity)}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          aria-label={`کاهش تعداد ${product.name}`}
                          className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-2xs cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`حذف ${product.name}`}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping & Payment Form */}
            <form
              id="checkout-form"
              onSubmit={handleCheckout}
              className="bg-white rounded-[26px] p-5 sm:p-6 border border-gray-100 shadow-xs space-y-5"
            >
              <h2 className="text-sm font-black text-gray-900">اطلاعات گیرنده و ارسال</h2>

              {formError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="chk-name" className="block text-xs font-bold text-gray-700 mb-1.5">
                    نام و نام خانوادگی *
                  </label>
                  <input
                    id="chk-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="مثلاً علی محمدی"
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#094532]"
                  />
                </div>
                <div>
                  <label htmlFor="chk-phone" className="block text-xs font-bold text-gray-700 mb-1.5">
                    شماره موبایل *
                  </label>
                  <input
                    id="chk-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09123456789"
                    dir="ltr"
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-sm text-left focus:outline-none focus:border-[#094532]"
                  />
                </div>
                <div>
                  <label htmlFor="chk-city" className="block text-xs font-bold text-gray-700 mb-1.5">
                    شهر
                  </label>
                  <input
                    id="chk-city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#094532]"
                  />
                </div>
                <div>
                  <label htmlFor="chk-postal" className="block text-xs font-bold text-gray-700 mb-1.5">
                    کد پستی
                  </label>
                  <input
                    id="chk-postal"
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="14155-6311"
                    dir="ltr"
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-sm text-left focus:outline-none focus:border-[#094532]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="chk-address" className="block text-xs font-bold text-gray-700 mb-1.5">
                  نشانی کامل پستی *
                </label>
                <textarea
                  id="chk-address"
                  rows={3}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="خیابان، کوچه، پلاک، واحد..."
                  className="w-full p-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#094532]"
                />
              </div>

              <div className="space-y-2.5">
                <span className="block text-xs font-bold text-gray-700">روش پرداخت</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('online')}
                    className={`p-3.5 rounded-2xl border text-right transition-colors cursor-pointer ${
                      paymentMethod === 'online'
                        ? 'border-[#094532] bg-emerald-50/40'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="text-xs font-black text-gray-900">پرداخت اینترنتی امن</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">کلیه کارت‌های عضو شتاب</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3.5 rounded-2xl border text-right transition-colors cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-[#094532] bg-emerald-50/40'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="text-xs font-black text-gray-900">پرداخت در محل (تهران)</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">کارت‌خوان سیار هنگام تحویل</p>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Summary Sidebar */}
          <aside className="lg:col-span-4 space-y-4 sticky top-6">
            {/* Coupon Box */}
            <form
              onSubmit={handleApplyCoupon}
              className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-xs space-y-3"
            >
              <label htmlFor="coupon-input" className="flex items-center gap-2 text-xs font-black text-gray-900">
                <Ticket className="w-4 h-4 text-[#ff611a]" />
                <span>کد تخفیف دارید؟</span>
              </label>
              <div className="flex gap-2">
                <input
                  id="coupon-input"
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="مثلاً SARV10"
                  dir="ltr"
                  className="flex-1 h-10 px-3 rounded-xl border border-gray-200 text-xs text-left uppercase focus:outline-none focus:border-[#094532]"
                />
                <button
                  type="submit"
                  className="px-4 h-10 rounded-xl bg-[#094532] hover:bg-[#063828] text-white text-xs font-bold cursor-pointer"
                >
                  اعمال
                </button>
              </div>
              {couponMessage && (
                <p
                  className={`text-[11px] font-semibold ${
                    couponMessage.ok ? 'text-emerald-700' : 'text-rose-600'
                  }`}
                >
                  {couponMessage.text}
                </p>
              )}
            </form>

            {/* Totals Box */}
            <div className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-xs space-y-3.5">
              <h2 className="text-sm font-black text-gray-900 pb-2 border-b border-gray-100">
                خلاصه سفارش
              </h2>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-gray-600">
                  <span>جمع قیمت کالاها</span>
                  <span className="tabular-nums font-bold">
                    {formatToman(totals.originalSubtotal)} تومان
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#ff611a]">
                  <span>تخفیف محصولات</span>
                  <span className="tabular-nums font-bold">
                    {formatToman(totals.productDiscount)}- تومان
                  </span>
                </div>
                {totals.couponDiscount > 0 && (
                  <div className="flex items-center justify-between text-emerald-700">
                    <span>کد تخفیف ({couponCode})</span>
                    <span className="tabular-nums font-bold">
                      {formatToman(totals.couponDiscount)}- تومان
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between text-gray-600">
                  <span>هزینه ارسال</span>
                  <span className="font-bold text-[#094532]">
                    {totals.shippingCost === 0
                      ? 'رایگان'
                      : `${formatToman(totals.shippingCost)} تومان`}
                  </span>
                </div>
              </div>

              <div className="pt-3.5 border-t border-gray-100 flex items-center justify-between text-sm font-black text-gray-900">
                <span>مبلغ قابل پرداخت</span>
                <span className="text-[#094532] tabular-nums">
                  {formatToman(totals.finalTotal)} تومان
                </span>
              </div>

              <button
                type="submit"
                form="checkout-form"
                className="w-full h-12 rounded-2xl bg-[#ff611a] hover:bg-[#e5500d] text-white font-bold text-sm shadow-lg shadow-orange-500/20 transition-colors cursor-pointer"
              >
                ثبت نهایی و پرداخت سفارش
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-[#094532]" />
                <span>تراکنش ایمن با تضمین ۷ روز بازگشت کالا</span>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
