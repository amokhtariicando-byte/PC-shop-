import Link from 'next/link';
import Image from 'next/image';
import { Award, ShieldCheck, Users, Cpu, ArrowLeft } from 'lucide-react';
import { toPersianDigits } from '@/lib/store-logic';

const STATS = [
  { value: '+۱۲ سال', label: 'سابقه تخصصی در بازار سخت‌افزار و شبکه', icon: Award },
  { value: '+۲۸,۰۰۰', label: 'سفارش موفق تحویل‌شده در سراسر ایران', icon: Users },
  { value: '+۴۵۰', label: 'پروژه طراحی شبکه و VoIP سازمانی', icon: Cpu },
  { value: '۱۰۰٪', label: 'ضمانت اصالت و سلامت فیزیکی کالاها', icon: ShieldCheck },
];

export default function AboutPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <section className="bg-[#094532] text-white rounded-[32px] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
        <div className="absolute inset-0 sarv-dot-pattern opacity-25 pointer-events-none" />
        <div className="lg:col-span-7 relative z-10 space-y-4">
          <h1 className="text-2xl sm:text-3xl font-black">درباره مجموعه سرو سیستم</h1>
          <p className="text-xs sm:text-sm text-white/85 leading-8">
            سرو سیستم فعالیت خود را با هدف ایجاد مرجعی شفاف، تخصصی و مطمئن برای خرید قطعات کامپیوتر،
            تجهیزات گیمینگ، لپ‌تاپ‌های نو و استوک گرید A++ و همچنین پیاده‌سازی زیرساخت‌های شبکه و
            تلفن تحت شبکه (VoIP) آغاز کرد. امروز کنار مشتریان خانگی، گیمرها، استودیوهای تولید محتوا و
            سازمان‌های بزرگ ایستاده‌ایم.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ff611a] hover:bg-[#e5500d] text-white text-xs font-bold transition-colors"
            >
              <span>مشاهده محصولات فروشگاه</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/40 hover:bg-white hover:text-[#094532] text-white text-xs font-bold transition-colors"
            >
              <span>ارتباط با کارشناسان</span>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 relative z-10 flex justify-center">
          <div className="relative w-72 h-56">
            <Image
              src="/assets/extracted/hero-pc-setup.png"
              alt="تجهیزات تخصصی سرو سیستم"
              fill
              sizes="288px"
              className="object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {STATS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-xs text-center space-y-2.5"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#fbf4e9] text-[#ff611a] flex items-center justify-center mx-auto">
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-2xl font-black text-[#094532] tabular-nums">
                {toPersianDigits(item.value)}
              </p>
              <p className="text-xs text-gray-600 leading-6">{item.label}</p>
            </div>
          );
        })}
      </section>

      <section className="bg-white rounded-[28px] p-6 sm:p-9 border border-gray-100 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-xl font-black text-gray-900">چرا حرفه‌ای‌ها سرو سیستم را انتخاب می‌کنند؟</h2>
          <p className="text-sm text-gray-600 leading-8">
            تمامی قطعات و سیستم‌های استوک پیش از ارسال توسط مهندسان سخت‌افزار ما در ۳۰ مرحله تست
            دما، پایداری و سلامت حافظه بررسی می‌شوند. علاوه بر فروش مستقیم، ما در اسمبل تخصصی، انتخاب
            قطعات سازگار بدون گلوگاه (Bottleneck) و راه‌اندازی شبکه شرکتی در کنار شما هستیم.
          </p>
        </div>
        <div className="bg-[#f7e6ce] rounded-3xl p-6 flex flex-col items-center text-center space-y-3">
          <div className="relative w-24 h-20">
            <Image
              src="/assets/extracted/sarv-logo.png"
              alt="لوگوی سرو سیستم"
              fill
              sizes="96px"
              className="object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-sm font-black text-gray-900">تضمین اصالت، پشتیبانی واقعی</p>
          <p className="text-xs text-gray-700 leading-6">
            دارای نماد اعتماد الکترونیکی و گواهی فروش رسمی تجهیزات دیجیتال و شبکه
          </p>
        </div>
      </section>
    </div>
  );
}
