import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/data';

export default function BlogPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-[#094532] text-white rounded-[28px] px-6 sm:px-8 py-8 relative overflow-hidden">
        <div className="absolute inset-0 sarv-dot-pattern opacity-25 pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-2xl sm:text-3xl font-black">مجله و بلاگ تخصصی سرو سیستم</h1>
          <p className="text-xs sm:text-sm text-white/80 mt-2 leading-7">
            نقد و بررسی جدیدترین قطعات سخت‌افزاری، راهنمای خرید گیمینگ، و مقالات آموزشی شبکه و VoIP
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-xs hover:shadow-xl transition-all flex flex-col group"
          >
            <Link
              href={`/blog/${post.slug}`}
              className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100"
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </Link>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="font-bold text-[#ff611a]">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block text-base font-black text-gray-900 group-hover:text-[#094532] leading-7 transition-colors"
                >
                  {post.title}
                </Link>
                <p className="text-xs text-gray-600 leading-6 line-clamp-3">{post.excerpt}</p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 text-gray-400">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 font-bold text-[#094532] hover:text-[#ff611a]"
                >
                  <span>مطالعه مقاله</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
