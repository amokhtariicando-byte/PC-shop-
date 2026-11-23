import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/data';

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs font-bold text-[#094532] hover:text-[#ff611a]"
      >
        <ArrowRight className="w-4 h-4" />
        <span>بازگشت به بلاگ سرو سیستم</span>
      </Link>

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
          <span className="font-bold text-[#ff611a]">{post.category}</span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {post.date}
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            زمان مطالعه: {post.readTime}
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            {post.author}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-snug">
          {post.title}
        </h1>
      </header>

      <div className="relative aspect-[16/9] w-full rounded-[28px] overflow-hidden shadow-md bg-gray-100">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 896px"
          className="object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="bg-white rounded-[28px] p-6 sm:p-9 border border-gray-100 shadow-xs space-y-5 text-sm sm:text-base text-gray-700 leading-9">
        <p className="font-semibold text-gray-900">{post.excerpt}</p>
        {post.content.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>

      {otherPosts.length > 0 && (
        <section className="pt-4 space-y-4">
          <h2 className="text-lg font-black text-gray-900">مقالات پیشنهادی دیگر</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherPosts.map((item) => (
              <Link
                key={item.id}
                href={`/blog/${item.slug}`}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-gray-100 hover:border-[#094532]/30 transition-colors"
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-900 line-clamp-2 leading-6">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1">{item.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
