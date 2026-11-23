import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS, INITIAL_TRACKED_ORDERS } from './data';
import {
  toPersianDigits,
  formatToman,
  validateCoupon,
  calculateCartTotals,
  filterAndSortProducts,
  computeSoldPercentage,
  splitCountdownSeconds,
  findTrackedOrder,
  generateOrderCode,
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_COST,
} from './store-logic';

test('formats Persian digits and Toman prices accurately', () => {
  assert.equal(toPersianDigits('0215522885'), '۰۲۱۵۵۲۲۸۸۵');
  assert.equal(formatToman(12200000), '۱۲,۲۰۰,۰۰۰');
  assert.equal(formatToman(-500), '۰');
});

test('validates discount coupons and calculates cart totals with free shipping threshold', () => {
  assert.equal(validateCoupon('sarv10').valid, true);
  assert.equal(validateCoupon('SARV10').percent, 10);
  assert.equal(validateCoupon('INVALID').valid, false);

  const hub = PRODUCTS.find((p) => p.id === 'p-usbc-hub')!;
  const underThreshold = calculateCartTotals([{ product: hub, quantity: 1 }]);
  assert.equal(underThreshold.subtotal, hub.price);
  assert.equal(underThreshold.shippingCost, STANDARD_SHIPPING_COST);
  assert.equal(underThreshold.freeShippingRemaining, FREE_SHIPPING_THRESHOLD - hub.price);

  const mouse = PRODUCTS.find((p) => p.id === 'p-mouse-g502')!;
  const overThresholdWithCoupon = calculateCartTotals([{ product: mouse, quantity: 1 }], 'SARV10');
  const expectedDiscount = Math.round(mouse.price * 0.1);
  assert.equal(overThresholdWithCoupon.couponDiscount, expectedDiscount);
  assert.equal(overThresholdWithCoupon.shippingCost, 0);
  assert.equal(overThresholdWithCoupon.finalTotal, mouse.price - expectedDiscount);
});

test('filters and sorts products by category, brand, search query, and price', () => {
  const gaming = filterAndSortProducts(PRODUCTS, { category: 'gaming' });
  assert.ok(gaming.length >= 2);
  assert.ok(gaming.every((p) => p.category === 'gaming'));

  const asusOnly = filterAndSortProducts(PRODUCTS, { brand: 'asus' });
  assert.ok(asusOnly.length >= 2);
  assert.ok(asusOnly.every((p) => p.brand === 'asus'));

  const searchResult = filterAndSortProducts(PRODUCTS, { query: 'Logitech' });
  assert.equal(searchResult.length, 1);
  assert.equal(searchResult[0].id, 'p-mouse-g502');

  const asc = filterAndSortProducts(PRODUCTS, { sortBy: 'price-asc' });
  for (let i = 1; i < asc.length; i++) {
    assert.ok(asc[i].price >= asc[i - 1].price);
  }
});

test('computes sold percentage, countdown parts, and tracked order lookup', () => {
  assert.equal(computeSoldPercentage(24, 76), 24);
  assert.equal(computeSoldPercentage(0, 0), 0);

  assert.deepEqual(splitCountdownSeconds(5 * 3600 + 34 * 60 + 4), {
    hours: '05',
    minutes: '34',
    seconds: '04',
  });

  const found = findTrackedOrder(INITIAL_TRACKED_ORDERS, ' srv-1405-8821 ');
  assert.ok(found);
  assert.equal(found.customerName, 'محمدرضا کریمی');
  assert.equal(findTrackedOrder(INITIAL_TRACKED_ORDERS, 'NONEXISTENT'), undefined);
  assert.match(generateOrderCode(42), /^SRV-1405-\d{4}$/);
});
