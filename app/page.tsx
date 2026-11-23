import HeroSection from '@/components/home/HeroSection';
import CategoryStrip from '@/components/home/CategoryStrip';
import DiscountSection from '@/components/home/DiscountSection';
import PromoBannersAndCarousels from '@/components/home/PromoBannersAndCarousels';
import BrandsStockServicesBlog from '@/components/home/BrandsStockServicesBlog';

export default function HomePage() {
  return (
    <div className="space-y-10 sm:space-y-14 pb-6">
      <HeroSection />
      <CategoryStrip />
      <DiscountSection />
      <PromoBannersAndCarousels />
      <BrandsStockServicesBlog />
    </div>
  );
}
