'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { toPersianDigits } from '@/lib/store-logic';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('مشاوره خرید و اسمبل سیستم');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;
    setSent(true);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <div className="bg-[#094532] text-white rounded-[28px] px-6 sm:px-8 py-8 relative overflow-hidden">
        <div className="absolute inset-0 sarv-dot-pattern opacity-25 pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-black">تماس با سرو سیستم</h1>
          <p className="text-xs sm:text-sm text-white/80 mt-2">
            پاسخگویی سریع کارشناسان فروش، پشتیبانی فنی و واحد پروژه‌های شبکه
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-xs flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#fbf4e9] text-[#ff611a] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-black text-gray-900">تلفن‌های تماس و پشتیبانی</h2>
              <div className="mt-1.5 space-y-1 text-xs text-gray-600 tabular-nums">
                <p>واحد فروش و پشتیبانی: {toPersianDigits('021-6655221')}</p>
                <p>دفتر مرکزی و سازمانی: {toPersianDigits('021-5522885')}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-xs flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#fbf4e9] text-[#ff611a] flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-black text-gray-900">پست الکترونیک</h2>
              <p className="mt-1.5 text-xs text-gray-600" dir="ltr">
                info@sarvsystem.com
              </p>
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-xs flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#fbf4e9] text-[#ff611a] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-black text-gray-900">نشانی فروشگاه مرکزی</h2>
              <p className="mt-1.5 text-xs text-gray-600 leading-6">
                تهران، خیابان ولیعصر، تقاطع طالقانی، مجتمع تجاری نور، طبقه اول، واحد ۶۰۴
              </p>
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-xs flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#fbf4e9] text-[#ff611a] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-black text-gray-900">ساعات پاسخ‌گویی</h2>
              <p className="mt-1.5 text-xs text-gray-600 leading-6">
                شنبه تا چهارشنبه: ۹:۳۰ تا ۲۰:۰۰ — پنج‌شنبه‌ها: ۹:۳۰ تا ۱۵:۰۰ (پشتیبانی تیکتی ۲۴ ساعته)
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-[28px] p-6 sm:p-8 border border-gray-100 shadow-xs">
          <h2 className="text-lg font-black text-gray-900 mb-5">ارسال پیام به سرو سیستم</h2>
          {sent ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#094532] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <p className="text-base font-black text-gray-900">پیام شما با موفقیت ارسال شد</p>
              <p className="text-xs text-gray-600">
                همکاران ما در اسرع وقت پاسخ شما را ارسال یا با شما تماس می‌گیرند.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setName('');
                  setPhone('');
                  setMessage('');
                }}
                className="mt-2 px-5 py-2.5 rounded-full bg-[#094532] text-white text-xs font-bold cursor-pointer"
              >
                ارسال پیام جدید
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cnt-name" className="block text-xs font-bold text-gray-700 mb-1.5">
                    نام و نام خانوادگی *
                  </label>
                  <input
                    id="cnt-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#094532]"
                  />
                </div>
                <div>
                  <label htmlFor="cnt-phone" className="block text-xs font-bold text-gray-700 mb-1.5">
                    شماره تماس *
                  </label>
                  <input
                    id="cnt-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    dir="ltr"
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-sm text-left focus:outline-none focus:border-[#094532]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="cnt-subject" className="block text-xs font-bold text-gray-700 mb-1.5">
                  موضوع پیام
                </label>
                <select
                  id="cnt-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-[#094532]"
                >
                  <option value="مشاوره خرید و اسمبل سیستم">مشاوره خرید و اسمبل سیستم</option>
                  <option value="پیگیری سفارش و ارسال">پیگیری سفارش و ارسال</option>
                  <option value="خدمات شبکه و VoIP">خدمات شبکه و VoIP</option>
                  <option value="گارانتی و خدمات پس از فروش">گارانتی و خدمات پس از فروش</option>
                </select>
              </div>

              <div>
                <label htmlFor="cnt-msg" className="block text-xs font-bold text-gray-700 mb-1.5">
                  متن پیام *
                </label>
                <textarea
                  id="cnt-msg"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="سوال یا درخواست خود را بنویسید..."
                  className="w-full p-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#094532]"
                />
              </div>

              <button
                type="submit"
                className="h-11 px-7 rounded-full bg-[#ff611a] hover:bg-[#e5500d] text-white text-xs font-bold inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>ارسال پیام</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
