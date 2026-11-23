import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/lib/data';
import ProductDetailClient from '@/components/product/ProductDetailClient';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);
  return <ProductDetailClient product={product} related={related} />;
}
