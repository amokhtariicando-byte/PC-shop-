import type { Product, TrackedOrder } from './data';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ProductFilterOptions {
  category?: string;
  brand?: string;
  query?: string;
  onlyDiscounted?: boolean;
  onlyStock?: boolean;
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'discount' | 'popular';
}

export interface CartTotals {
  subtotal: number;
  originalSubtotal: number;
  productDiscount: number;
  couponDiscount: number;
  shippingCost: number;
  finalTotal: number;
  itemCount: number;
  freeShippingRemaining: number;
}

export const FREE_SHIPPING_THRESHOLD = 10_000_000;
export const STANDARD_SHIPPING_COST = 180_000;

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export function toPersianDigits(input: string | number): string {
  return String(input).replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)] ?? d);
}

export function formatToman(amount: number): string {
  const rounded = Math.max(0, Math.round(amount));
  const formatted = rounded.toLocaleString('en-US');
  return toPersianDigits(formatted);
}

export function validateCoupon(code: string): { valid: boolean; percent: number; label: string } {
  const normalized = code.trim().toUpperCase();
  if (normalized === 'SARV10') {
    return { valid: true, percent: 10, label: '۱۰٪ تخفیف ویژه سرو سیستم' };
  }
  if (normalized === 'WELCOME5') {
    return { valid: true, percent: 5, label: '۵٪ تخفیف خوش‌آمدگویی' };
  }
  return { valid: false, percent: 0, label: 'کد تخفیف معتبر نیست' };
}

export function calculateCartTotals(items: CartItem[], couponCode = ''): CartTotals {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const originalSubtotal = items.reduce(
    (sum, item) => sum + item.product.originalPrice * item.quantity,
    0
  );
  const productDiscount = Math.max(0, originalSubtotal - subtotal);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const coupon = couponCode ? validateCoupon(couponCode) : { valid: false, percent: 0, label: '' };
  const couponDiscount = coupon.valid ? Math.round((subtotal * coupon.percent) / 100) : 0;

  const afterCoupon = Math.max(0, subtotal - couponDiscount);
  const shippingCost =
    items.length === 0 || afterCoupon >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  const freeShippingRemaining =
    items.length === 0 ? FREE_SHIPPING_THRESHOLD : Math.max(0, FREE_SHIPPING_THRESHOLD - afterCoupon);

  return {
    subtotal,
    originalSubtotal,
    productDiscount,
    couponDiscount,
    shippingCost,
    finalTotal: afterCoupon + shippingCost,
    itemCount,
    freeShippingRemaining,
  };
}

export function filterAndSortProducts(
  products: Product[],
  options: ProductFilterOptions
): Product[] {
  const q = (options.query || '').trim().toLowerCase();

  const filtered = products.filter((p) => {
    if (options.category && options.category !== 'all') {
      if (options.category === 'stock') {
        if (!p.isStock && p.category !== 'stock') return false;
      } else if (options.category === 'network') {
        if (!p.isNetwork && p.category !== 'network') return false;
      } else if (options.category === 'computer') {
        if (!p.isComputer && p.category !== 'computer') return false;
      } else if (p.category !== options.category) {
        return false;
      }
    }
    if (options.brand && options.brand !== 'all' && p.brand !== options.brand) {
      return false;
    }
    if (options.onlyDiscounted && p.discountPercent <= 0) {
      return false;
    }
    if (options.onlyStock && !p.isStock && p.category !== 'stock') {
      return false;
    }
    if (q) {
      const hay = `${p.name} ${p.englishName} ${p.categoryLabel} ${p.brandLabel}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const sorted = [...filtered];
  switch (options.sortBy) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'discount':
      sorted.sort((a, b) => b.discountPercent - a.discountPercent);
      break;
    case 'popular':
      sorted.sort((a, b) => b.sold - a.sold);
      break;
    case 'newest':
    default:
      break;
  }

  return sorted;
}

export function computeSoldPercentage(sold: number, remaining: number): number {
  const total = sold + remaining;
  if (total <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((sold / total) * 100)));
}

export function splitCountdownSeconds(totalSeconds: number): {
  hours: string;
  minutes: string;
  seconds: string;
} {
  const clamped = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(clamped / 3600);
  const m = Math.floor((clamped % 3600) / 60);
  const s = clamped % 60;
  return {
    hours: String(h).padStart(2, '0'),
    minutes: String(m).padStart(2, '0'),
    seconds: String(s).padStart(2, '0'),
  };
}

export function findTrackedOrder(
  orders: TrackedOrder[],
  rawCode: string
): TrackedOrder | undefined {
  const normalized = rawCode.trim().toUpperCase();
  if (!normalized) return undefined;
  return orders.find((o) => o.code.toUpperCase() === normalized);
}

export function generateOrderCode(seedNumber: number): string {
  const suffix = String(1000 + (Math.abs(Math.floor(seedNumber)) % 9000));
  return `SRV-1405-${suffix}`;
}
