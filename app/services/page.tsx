'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Globe, PhoneCall, ShieldCheck, CheckCircle2, Send } from 'lucide-react';
import { SERVICES } from '@/lib/data';

const ICON_MAP = {
  Globe,
  PhoneCall,
  ShieldCheck,
};

export default function ServicesPage() {
  const [orgName, setOrgName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState(SERVICES[0].title);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName.trim() || phone.trim().length < 10) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero Banner */}
      <section className="bg-[#094532] text-white rounded-[32px] p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute inset-0 sarv-dot-pattern opacity-25 pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h1 className="text-2xl sm:text-3xl font-black leading-snug">
              خدمات تخصصی شبکه، زیرساخت سازمانی و راه‌اندازی VoIP
            </h1>
            <p className="text-xs sm:text-sm text-white/85 leading-8">
              تیم مهندسی سرو سیستم از مرحله امکان‌سنجی و طراحی توپولوژی شبکه داخلی تا پیاده‌سازی
              سیستم‌های تلفنی تحت شبکه (VoIP)، آرایش رک، فایروال و ارتباطات امن بین شعب همراه
              سازمان و کسب‌وکار شماست.
            </p>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-52">
              <Image
                src="/assets/extracted/cutout-network-gear.png"
                alt="تجهیزات شبکه سازمانی سرو سیستم"
                fill
                sizes="260px"
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Detailed Cards */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {SERVICES.map((srv, idx) => {
          const Icon = ICON_MAP[srv.icon];
          const colorClasses =
            srv.color === 'teal'
              ? 'bg-[#5d919b] text-white'
              : srv.color === 'coral'
              ? 'bg-[#f87c44] text-white'
              : 'bg-[#094532] text-white';

          return (
            <motion.article
              key={srv.id}
              id={srv.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-white rounded-[28px] overflow-hidden border border-gray-100 shadow-xs flex flex-col"
            >
              <div className={`${colorClasses} p-6 space-y-3 relative`}>
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-black">{srv.title}</h2>
                <p className="text-xs text-white/90 leading-6">{srv.shortDesc}</p>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <p className="text-xs text-gray-600 leading-7">{srv.fullDesc}</p>
                  <ul className="space-y-2.5">
                    {srv.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-[#094532] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 border-t border-gray-100 text-[11px] font-bold text-[#ff611a]">
                  {srv.sla}
                </div>
              </div>
            </motion.article>
          );
        })}
      </section>

      {/* Consultation Form */}
      <section className="bg-[#f7e6ce] rounded-[32px] p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900">
              درخواست مشاوره و بازدید رایگان
            </h2>
            <p className="text-xs sm:text-sm text-gray-700 leading-7">
              اطلاعات پروژه خود را ثبت کنید تا مهندسان شبکه سرو سیستم ظرف کمتر از ۲ ساعت کاری برای
              ارائه راهکار و برآورد هزینه با شما تماس بگیرند.
            </p>
          </div>

          <div className="lg:col-span-7 bg-white rounded-[24px] p-6 shadow-sm">
            {submitted ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#094532] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-base font-black text-gray-900">
                  درخواست مشاوره شما ثبت شد
                </h3>
                <p className="text-xs text-gray-600">
                  کارشناسان واحد شبکه سرو سیستم برای هماهنگی زمان بازدید با شماره شما تماس خواهند
                  گرفت.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setOrgName('');
                    setPhone('');
                    setNotes('');
                  }}
                  className="mt-2 px-5 py-2 rounded-full bg-[#094532] text-white text-xs font-bold cursor-pointer"
                >
                  ثبت درخواست جدید
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="srv-org" className="block text-xs font-bold text-gray-700 mb-1.5">
                      نام شرکت یا درخواست‌کننده *
                    </label>
                    <input
                      id="srv-org"
                      type="text"
                      required
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="مثلاً شرکت فناوری نوین"
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#094532]"
                    />
                  </div>
                  <div>
                    <label htmlFor="srv-phone" className="block text-xs font-bold text-gray-700 mb-1.5">
                      شماره تماس *
                    </label>
                    <input
                      id="srv-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="09123456789"
                      dir="ltr"
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-sm text-left focus:outline-none focus:border-[#094532]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="srv-type" className="block text-xs font-bold text-gray-700 mb-1.5">
                    نوع خدمت مورد نیاز
                  </label>
                  <select
                    id="srv-type"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-[#094532]"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="srv-notes" className="block text-xs font-bold text-gray-700 mb-1.5">
                    توضیحات پروژه (تعداد کاربر، متراژ، نیازها)
                  </label>
                  <textarea
                    id="srv-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="توضیح کوتاهی درباره نیاز شبکه یا تعداد داخلی‌های VoIP بنویسید..."
                    className="w-full p-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#094532]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 h-11 rounded-full bg-[#ff611a] hover:bg-[#e5500d] text-white text-xs font-bold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>ارسال درخواست مشاوره</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
