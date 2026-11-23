import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import { MotionConfig } from 'motion/react';
import './globals.css';
import { StoreProvider } from '@/components/StoreProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-vazirmatn',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'سرو سیستم | فروشگاه تخصصی کامپیوتر، گیمینگ و تجهیزات شبکه',
  description:
    'سرو سیستم؛ مرجع تخصصی خرید تجهیزات دیجیتال، قطعات کامپیوتر، لوازم گیمینگ، لپ‌تاپ، محصولات استوک و خدمات تخصصی شبکه و VoIP.',
  openGraph: {
    title: 'سرو سیستم | فروشگاه تخصصی کامپیوتر، گیمینگ و تجهیزات شبکه',
    description:
      'مرجع تخصصی خرید تجهیزات دیجیتال، قطعات کامپیوتر، لوازم گیمینگ، لپ‌تاپ و خدمات شبکه و VoIP.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'سرو سیستم | فروشگاه تخصصی کامپیوتر و تجهیزات دیجیتال',
    description:
      'خرید آنلاین قطعات کامپیوتر، لوازم گیمینگ، لپ‌تاپ، تجهیزات شبکه و محصولات استوک با ضمانت اصالت کالا.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body
        suppressHydrationWarning
        className="font-sans antialiased bg-[#fafafa] text-gray-900 min-h-screen flex flex-col"
      >
        <MotionConfig reducedMotion="user">
          <StoreProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
          </StoreProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
