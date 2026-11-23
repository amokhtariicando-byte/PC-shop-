import React, { Suspense } from 'react';
import ShopCatalogClient from '@/components/shop/ShopCatalogClient';

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-[1280px] mx-auto px-4 py-16 text-center text-sm text-gray-500">
          در حال بارگذاری محصولات فروشگاه...
        </div>
      }
    >
      <ShopCatalogClient />
    </Suspense>
  );
}
