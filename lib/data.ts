export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  englishName: string;
  category:
    | 'gaming'
    | 'computer'
    | 'laptop'
    | 'network'
    | 'storage'
    | 'audio'
    | 'accessories'
    | 'stock';
  categoryLabel: string;
  brand: 'asus' | 'lenovo' | 'hp' | 'samsung' | 'dell' | 'logitech' | 'sony' | 'adata' | 'tp-link';
  brandLabel: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  image: string;
  gallery: string[];
  sold: number;
  remaining: number;
  rating: number;
  reviewCount: number;
  warranty: string;
  isFeaturedDiscount?: boolean;
  isNew?: boolean;
  isNetwork?: boolean;
  isComputer?: boolean;
  isStock?: boolean;
  badgeText?: string;
  description: string;
  specs: ProductSpec[];
  features: string[];
}

export interface CategoryItem {
  id: string;
  slug: string;
  label: string;
  iconName: 'Speaker' | 'Gamepad2' | 'MonitorSpeaker' | 'PlugZap' | 'Monitor' | 'HardDrive' | 'Usb';
  activeDefault?: boolean;
  count: number;
}

export interface BrandItem {
  id: string;
  slug: string;
  persianName: string;
  englishName: string;
  logo: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  featured?: boolean;
  content: string[];
}

export interface FaqItem {
  id: string;
  category: 'order' | 'shipping' | 'warranty' | 'network';
  categoryLabel: string;
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  color: 'teal' | 'coral' | 'green';
  icon: 'Globe' | 'PhoneCall' | 'ShieldCheck';
  deliverables: string[];
  sla: string;
}

export interface TrackedOrder {
  code: string;
  customerName: string;
  date: string;
  status: 'registered' | 'processing' | 'shipped' | 'delivered';
  statusLabel: string;
  total: number;
  itemsCount: number;
  city: string;
  courier: string;
}

export const CATEGORIES: CategoryItem[] = [
  { id: 'cat-1', slug: 'audio', label: 'اسپیکر', iconName: 'Speaker', count: 18 },
  { id: 'cat-2', slug: 'gaming', label: 'لوازم گیمینگ', iconName: 'Gamepad2', count: 42 },
  { id: 'cat-3', slug: 'computer', label: 'کیس', iconName: 'MonitorSpeaker', activeDefault: true, count: 31 },
  { id: 'cat-4', slug: 'accessories', label: 'شارژر موبایل', iconName: 'PlugZap', count: 27 },
  { id: 'cat-5', slug: 'laptop', label: 'نمایشگر', iconName: 'Monitor', count: 24 },
  { id: 'cat-6', slug: 'storage', label: 'هارد اکسترنال', iconName: 'HardDrive', count: 19 },
  { id: 'cat-7', slug: 'network', label: 'فلش', iconName: 'Usb', count: 35 },
];

export const BRANDS: BrandItem[] = [
  { id: 'b-asus', slug: 'asus', persianName: 'ایسوس', englishName: 'ASUS', logo: '/assets/extracted/brand-asus.png' },
  { id: 'b-lenovo', slug: 'lenovo', persianName: 'لنوو', englishName: 'Lenovo', logo: '/assets/extracted/brand-lenovo.png' },
  { id: 'b-hp', slug: 'hp', persianName: 'اچ پی', englishName: 'HP', logo: '/assets/extracted/brand-hp.png' },
  { id: 'b-samsung', slug: 'samsung', persianName: 'سامسونگ', englishName: 'Samsung', logo: '/assets/extracted/brand-samsung.png' },
  { id: 'b-dell', slug: 'dell', persianName: 'دل', englishName: 'DELL', logo: '/assets/extracted/brand-dell.png' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p-mouse-g502',
    slug: 'logitech-g502-x-plus',
    name: 'ماوس گیمینگ Logitech G502 X Plus',
    englishName: 'Logitech G502 X Plus LIGHTSPEED RGB',
    category: 'gaming',
    categoryLabel: 'لوازم گیمینگ',
    brand: 'logitech',
    brandLabel: 'لاجیتک',
    price: 12200000,
    originalPrice: 13120000,
    discountPercent: 7,
    image: '/assets/extracted/prod-mouse.png',
    gallery: ['/assets/extracted/prod-mouse.png', '/assets/extracted/prod-keyboard.png', '/assets/extracted/prod-controller.png'],
    sold: 24,
    remaining: 76,
    rating: 4.9,
    reviewCount: 64,
    warranty: 'گارانتی ۱۸ ماهه سرو سیستم',
    isFeaturedDiscount: true,
    isNew: true,
    isComputer: true,
    isStock: true,
    description:
      'ماوس بی‌سیم حرفه‌ای Logitech G502 X Plus مجهز به سوئیچ‌های نوری-مکانیکی LIGHTFORCE، سنسور فوق‌دقیق HERO 25K و نورپردازی هوشمند LIGHTSYNC RGB برای گیمرهای رقابتی و طراحان حرفه‌ای.',
    specs: [
      { label: 'سنسور اپتیکال', value: 'HERO 25K تا ۲۵٬۶۰۰ DPI' },
      { label: 'نوع اتصال', value: 'بی‌سیم LIGHTSPEED و کابل USB-C' },
      { label: 'وزن دستگاه', value: '۱۰۶ گرم با طراحی ارگونومیک' },
      { label: 'شارژدهی باتری', value: 'تا ۱۲۰ ساعت (بدون RGB)' },
      { label: 'تعداد کلیدها', value: '۱۳ کلید قابل برنامه‌ریزی' },
    ],
    features: ['سوئیچ‌های هیبریدی LIGHTFORCE', 'اسکرول دوحالته سریع و دقیق', 'سازگار با شارژ بی‌سیم POWERPLAY'],
  },
  {
    id: 'p-ps5-black',
    slug: 'ps5-slim-midnight-edition',
    name: 'کنسول بازی PlayStation 5 Midnight Edition',
    englishName: 'Sony PlayStation 5 Console + DualSense',
    category: 'gaming',
    categoryLabel: 'لوازم گیمینگ',
    brand: 'sony',
    brandLabel: 'سونی',
    price: 38900000,
    originalPrice: 41200000,
    discountPercent: 6,
    image: '/assets/extracted/prod-ps5.png',
    gallery: ['/assets/extracted/prod-ps5.png', '/assets/extracted/prod-controller.png'],
    sold: 38,
    remaining: 62,
    rating: 4.9,
    reviewCount: 92,
    warranty: 'گارانتی ۱۲ ماهه تعویض سرو سیستم',
    isNew: true,
    isNetwork: true,
    isComputer: true,
    isStock: true,
    description:
      'نسخه ویژه پلی‌استیشن ۵ با بدنه مشکی مات و نورپردازی آبی، حافظه فوق‌سریع ۱ ترابایت SSD و پشتیبانی کامل از خروجی 4K با نرخ ۱۲۰ فریم بر ثانیه و فناوری Ray Tracing.',
    specs: [
      { label: 'حافظه داخلی', value: '۱ ترابایت NVMe SSD اختصاصی' },
      { label: 'رزولوشن خروجی', value: '4K @ 120Hz و پشتیبانی از 8K' },
      { label: 'دسته همراه', value: 'DualSense Midnight Black' },
      { label: 'صدای سه‌بعدی', value: 'Tempest 3D AudioTech' },
    ],
    features: ['بارگذاری آنی بازی‌ها', 'دسته با بازخورد لمسی و تریگر تطبیقی', 'خنک‌کننده کم‌صدا با فلز مایع'],
  },
  {
    id: 'p-gpu-rtx4070',
    slug: 'asus-rog-strix-rtx-4070-white',
    name: 'کارت گرافیک ASUS ROG Strix RTX 4070 White',
    englishName: 'ASUS ROG Strix RTX 4070 Ti 12GB White OC',
    category: 'computer',
    categoryLabel: 'قطعات کامپیوتر',
    brand: 'asus',
    brandLabel: 'ایسوس',
    price: 46500000,
    originalPrice: 49800000,
    discountPercent: 7,
    image: '/assets/extracted/prod-gpu.png',
    gallery: ['/assets/extracted/prod-gpu.png', '/assets/extracted/prod-mouse.png'],
    sold: 19,
    remaining: 81,
    rating: 5.0,
    reviewCount: 41,
    warranty: 'گارانتی ۳۶ ماهه اصلی',
    isFeaturedDiscount: true,
    isNew: true,
    isNetwork: true,
    isComputer: true,
    isStock: true,
    description:
      'کارت گرافیک پرچمدار سفیدرنگ ایسوس با سه فن Axial-tech، حافظه ۱۲ گیگابایت GDDR6X و پشتیبانی از معماری Ada Lovelace و DLSS 3 برای سیستم‌های رندرینگ و گیمینگ حرفه‌ای.',
    specs: [
      { label: 'حافظه گرافیکی', value: '۱۲ گیگابایت GDDR6X' },
      { label: 'تعداد فن‌ها', value: '۳ فن Axial-tech با چرخش معکوس' },
      { label: 'رابط اتصال', value: 'PCIe 4.0 x16' },
      { label: 'خروجی تصویر', value: '2x HDMI 2.1a + 3x DisplayPort 1.4a' },
    ],
    features: ['بدنه تمام‌سفید مخصوص کیس‌های مدرن', 'حالت بی‌صدا در دمای زیر ۵۰ درجه', 'نورپردازی Aura Sync ARGB'],
  },
  {
    id: 'p-hdd-adata',
    slug: 'adata-hd710-pro-2tb',
    name: 'هارد اکسترنال ADATA HD710 Pro 2TB',
    englishName: 'ADATA HD710 Pro Rugged External HDD 2TB',
    category: 'storage',
    categoryLabel: 'ذخیره‌سازی و هارد',
    brand: 'adata',
    brandLabel: 'ای‌دیتا',
    price: 6450000,
    originalPrice: 6950000,
    discountPercent: 7,
    image: '/assets/extracted/prod-hdd.png',
    gallery: ['/assets/extracted/prod-hdd.png', '/assets/extracted/prod-hub.png'],
    sold: 54,
    remaining: 46,
    rating: 4.8,
    reviewCount: 118,
    warranty: 'گارانتی ۳۶ ماهه آونگ',
    isNew: true,
    isNetwork: true,
    isComputer: true,
    isStock: true,
    description:
      'هارد اکسترنال ضدضربه، ضدآب و ضدگردوغبار ADATA HD710 Pro با استاندارد نظامی MIL-STD-810G و استاندارد IP68؛ مناسب برای آرشیو ایمن پروژه‌ها و حمل‌ونقل روزمره.',
    specs: [
      { label: 'ظرفیت ذخیره‌سازی', value: '۲ ترابایت' },
      { label: 'رابط اتصال', value: 'USB 3.2 Gen 1 پرسرعت' },
      { label: 'استاندارد مقاومت', value: 'IP68 ضدآب و سنسور شوک G-Shock' },
      { label: 'ابعاد و وزن', value: '۲۷۰ گرم با شیار نگهداری کابل' },
    ],
    features: ['ساختار سه‌لایه جاذب ضربه', 'مقاوم در عمق ۲ متری آب تا ۶۰ دقیقه', 'درپوش سیلیکونی محافظ درگاه USB'],
  },
  {
    id: 'p-dualsense',
    slug: 'sony-dualsense-midnight',
    name: 'دسته بازی Sony DualSense Wireless PS5',
    englishName: 'Sony DualSense Wireless Controller',
    category: 'gaming',
    categoryLabel: 'لوازم گیمینگ',
    brand: 'sony',
    brandLabel: 'سونی',
    price: 5400000,
    originalPrice: 5850000,
    discountPercent: 8,
    image: '/assets/extracted/prod-controller.png',
    gallery: ['/assets/extracted/prod-controller.png', '/assets/extracted/prod-ps5.png'],
    sold: 42,
    remaining: 58,
    rating: 4.9,
    reviewCount: 77,
    warranty: 'گارانتی ۱۲ ماهه سرو سیستم',
    isFeaturedDiscount: true,
    description:
      'دسته بی‌سیم اصلی پلی‌استیشن ۵ با قابلیت بازخورد لمسی دقیق (Haptic Feedback)، تریگرهای تطبیقی و میکروفون داخلی با کلید قطع سریع صدا؛ سازگار با PS5 و کامپیوتر.',
    specs: [
      { label: 'نوع اتصال', value: 'بلوتوث ۵.۱ و کابل USB-C' },
      { label: 'باتری داخلی', value: '۱۵۶۰ میلی‌آمپر ساعت قابل شارژ' },
      { label: 'سنسور حرکتی', value: 'ژیروسکوپ و شتاب‌سنج ۶ محوره' },
      { label: 'درگاه صدا', value: 'جک ۳.۵ میلی‌متری استریو + اسپیکر داخلی' },
    ],
    features: ['بازخورد لرزشی پویا', 'پشتیبانی کامل در ویندوز و Steam', 'ارگونومی بهینه برای جلسات طولانی'],
  },
  {
    id: 'p-usbc-hub',
    slug: 'ugreen-usb-c-hub-7in1',
    name: 'هاب چندمنظوره USB-C 7-in-1 آلومینیومی',
    englishName: 'Multiport USB-C 7-in-1 4K HDMI Hub',
    category: 'accessories',
    categoryLabel: 'تجهیزات جانبی',
    brand: 'dell',
    brandLabel: 'دل',
    price: 2350000,
    originalPrice: 2600000,
    discountPercent: 10,
    image: '/assets/extracted/prod-hub.png',
    gallery: ['/assets/extracted/prod-hub.png', '/assets/extracted/prod-laptop.png'],
    sold: 31,
    remaining: 69,
    rating: 4.7,
    reviewCount: 38,
    warranty: 'گارانتی ۱۲ ماهه تعویض',
    isFeaturedDiscount: true,
    description:
      'هاب آلومینیومی ۷ پورت با خروجی HDMI 4K، توان شارژ عبور ۱۰۰ وات (PD)، درگاه‌های USB 3.0 و کارت‌خوان SD/TF؛ همراه ایده‌آل برای لپ‌تاپ‌های مدرن و مک‌بوک.',
    specs: [
      { label: 'خروجی تصویر', value: 'HDMI 4K @ 60Hz' },
      { label: 'توان شارژ PD', value: 'تا ۱۰۰ وات (Power Delivery)' },
      { label: 'پورت‌های دیتا', value: '3x USB-A 3.0 + SD/MicroSD' },
      { label: 'جنس بدنه', value: 'آلیاژ آلومینیوم آنودایز شده با دفع حرارت بالا' },
    ],
    features: ['نصب بدون نیاز به درایور', 'سازگار با مک، ویندوز و آیپد', 'محافظت هوشمند در برابر نوسان ولتاژ'],
  },
  {
    id: 'p-surface-laptop',
    slug: 'microsoft-surface-pro-9-i7',
    name: 'لپ‌تاپ و تبلت هیبریدی Surface Pro 9',
    englishName: 'Surface Pro 9 Core i7 / 16GB / 512GB',
    category: 'laptop',
    categoryLabel: 'لپ‌تاپ و نمایشگر',
    brand: 'lenovo',
    brandLabel: 'لنوو',
    price: 68500000,
    originalPrice: 72400000,
    discountPercent: 5,
    image: '/assets/extracted/prod-laptop.png',
    gallery: ['/assets/extracted/prod-laptop.png', '/assets/extracted/prod-hub.png'],
    sold: 14,
    remaining: 86,
    rating: 4.8,
    reviewCount: 29,
    warranty: 'گارانتی ۲۴ ماهه سرو سیستم',
    isFeaturedDiscount: true,
    isNew: true,
    description:
      'دستگاه هیبریدی فوق‌سبک با نمایشگر لمسی ۱۲۰ هرتز PixelSense، پردازنده نسل ۱۲ اینتل Core i7 و کیبورد مغناطیسی جداشونده برای مدیران، مهندسان و طراحان.',
    specs: [
      { label: 'پردازنده', value: 'Intel Core i7-1255U ۱۰ هسته‌ای' },
      { label: 'حافظه رم و SSD', value: '۱۶ گیگابایت LPDDR5 / ۵۱۲ گیگابایت NVMe' },
      { label: 'نمایشگر', value: '۱۳ اینچ لمسی 2880x1920 با نرخ ۱۲۰ هرتز' },
      { label: 'وزن دستگاه', value: '۸۷۹ گرم' },
    ],
    features: ['پشتیبانی از تاندربولت ۴', 'شارژدهی تا ۱۵.۵ ساعت', 'پایه تنظیم زاویه یکپارچه'],
  },
  {
    id: 'p-keyboard-rgb',
    slug: 'asus-rog-falchion-rgb-mechanical',
    name: 'کیبورد مکانیکال گیمینگ ROG Falchion RGB',
    englishName: 'ASUS ROG Mechanical Wireless RGB Keyboard',
    category: 'accessories',
    categoryLabel: 'تجهیزات جانبی',
    brand: 'asus',
    brandLabel: 'ایسوس',
    price: 9800000,
    originalPrice: 10650000,
    discountPercent: 8,
    image: '/assets/extracted/prod-keyboard.png',
    gallery: ['/assets/extracted/prod-keyboard.png', '/assets/extracted/prod-mouse.png'],
    sold: 27,
    remaining: 73,
    rating: 4.9,
    reviewCount: 53,
    warranty: 'گارانتی ۱۸ ماهه اصلی',
    isFeaturedDiscount: true,
    description:
      'کیبورد مکانیکال کامپکت با سوئیچ‌های خطی سریع، کلیدهای PBT دولایه، نورپردازی مجزای هر کلید Aura Sync و اتصال سه‌حالته برای سرعت واکنش فوق‌العاده.',
    specs: [
      { label: 'نوع سوئیچ', value: 'مکانیکال Red خطی با عمر ۸۰ میلیون ضربه' },
      { label: 'اتصال', value: 'دانگل ۲.۴ گیگاهرتز + بلوتوث + USB-C' },
      { label: 'نورپردازی', value: 'Per-Key RGB قابل شخصی‌سازی' },
      { label: 'جنس کلیدها', value: 'PBT Doubleshot مقاوم در برابر سایش' },
    ],
    features: ['فوم جاذب صدا در شاسی', 'نوار لمسی تنظیم صدا در لبه کناری', 'طراحی فشرده و قابل حمل'],
  },
  {
    id: 'p-switch-enterprise',
    slug: 'cisco-tplink-enterprise-network-kit',
    name: 'پکیج کامل سوئیچ ۲۴ پورت و اکسس‌پوینت شبکه',
    englishName: 'Enterprise 24-Port Gigabit Switch + UniFi AP Kit',
    category: 'network',
    categoryLabel: 'شبکه و تجهیزات شبکه',
    brand: 'hp',
    brandLabel: 'اچ پی',
    price: 24900000,
    originalPrice: 26800000,
    discountPercent: 7,
    image: '/assets/extracted/cutout-network-gear.png',
    gallery: ['/assets/extracted/cutout-network-gear.png', '/assets/extracted/prod-hub.png'],
    sold: 16,
    remaining: 84,
    rating: 4.9,
    reviewCount: 22,
    warranty: 'گارانتی ۲۴ ماهه تجهیزات شبکه سرو سیستم',
    isNetwork: true,
    description:
      'مجموعه تخصصی راه‌اندازی شبکه سازمانی شامل سوئیچ مدیریتی ۲۴ پورت گیگابیتی، روتر دوآنتنه، اکسس‌پوینت سقفی پرقدرت، ماژول فیبر نوری SFP و کابل شبکه شیلددار Cat6A.',
    specs: [
      { label: 'تعداد پورت‌ها', value: '۲۴ پورت گیگابیت + ۴ اسلات SFP' },
      { label: 'استاندارد وای‌فای', value: 'Wi-Fi 6 دو بانده تا ۳۰۰۰ مگابیت' },
      { label: 'مدیریت شبکه', value: 'پشتیبانی از VLAN، QoS و SNMP' },
      { label: 'مناسب برای', value: 'شرکت‌ها، دفاتر اداری و مراکز داده' },
    ],
    features: ['پایداری ۲۴ ساعته در ترافیک سنگین', 'امکان نصب و راه‌اندازی توسط تیم سرو سیستم', 'پشتیبانی از PoE+'],
  },
  {
    id: 'p-thinkpad-stock',
    slug: 'lenovo-thinkpad-x1-carbon-stock',
    name: 'لپ‌تاپ استوک گرید A++ Lenovo ThinkPad X1',
    englishName: 'Lenovo ThinkPad X1 Carbon Gen 9 (Grade A++)',
    category: 'stock',
    categoryLabel: 'محصولات استوک',
    brand: 'lenovo',
    brandLabel: 'لنوو',
    price: 34200000,
    originalPrice: 37500000,
    discountPercent: 9,
    image: '/assets/extracted/prod-laptop.png',
    gallery: ['/assets/extracted/prod-laptop.png'],
    sold: 45,
    remaining: 55,
    rating: 4.8,
    reviewCount: 61,
    warranty: 'گارانتی ۶ ماهه تست و تعویض سرو سیستم',
    isStock: true,
    description:
      'لپ‌تاپ بیزینسی فوق‌سبک با بدنه فیبر کربن، پردازنده Core i7 نسل ۱۱ و نمایشگر IPS ضدبازتاب؛ تست‌شده در ۳۰ مرحله توسط تیم فنی سرو سیستم با سلامت باتری بالای ۹۰ درصد.',
    specs: [
      { label: 'گرید ظاهری', value: 'A++ در حد نو بدون خط و خش' },
      { label: 'پردازنده', value: 'Intel Core i7-1185G7' },
      { label: 'حافظه', value: '۱۶ گیگابایت رم + ۵۱۲ گیگابایت SSD NVMe' },
      { label: 'وزن', value: '۱.۱۳ کیلوگرم' },
    ],
    features: ['بدنه مقاوم با استاندارد نظامی', 'کیبورد بک‌لایت فوق‌العاده نرم', '۷ روز مهلت تست بی‌قیدوشرط'],
  },
  {
    id: 'p-monitor-samsung',
    slug: 'samsung-odyssey-g5-27-165hz',
    name: 'مانیتور گیمینگ سامسونگ Odyssey G5 27"',
    englishName: 'Samsung Odyssey G5 27-inch QHD 165Hz',
    category: 'laptop',
    categoryLabel: 'لپ‌تاپ و نمایشگر',
    brand: 'samsung',
    brandLabel: 'سامسونگ',
    price: 16800000,
    originalPrice: 17900000,
    discountPercent: 6,
    image: '/assets/extracted/prod-gpu.png',
    gallery: ['/assets/extracted/prod-gpu.png'],
    sold: 22,
    remaining: 78,
    rating: 4.8,
    reviewCount: 47,
    warranty: 'گارانتی ۱۸ ماهه سرو سیستم',
    isComputer: true,
    description:
      'مانیتور ۲۷ اینچ QHD با نرخ نوسازی ۱۶۵ هرتز، زمان پاسخ‌گویی ۱ میلی‌ثانیه و پشتیبانی از FreeSync Premium برای تجربه بصری روان در بازی و تدوین.',
    specs: [
      { label: 'رزولوشن', value: '2560 × 1440 (QHD)' },
      { label: 'نرخ نوسازی', value: '۱۶۵ هرتز با زمان پاسخ‌گویی ۱ms' },
      { label: 'پنل', value: 'Fast IPS با پوشش ۹۹٪ sRGB' },
      { label: 'پایه', value: 'تنظیم ارتفاع و چرخش عمودی (Pivot)' },
    ],
    features: ['حالت محافظت از چشم بدون سوسو', 'پشتیبانی از HDR10', 'طراحی بدون حاشیه از ۳ طرف'],
  },
  {
    id: 'p-audio-speaker',
    slug: 'jbl-charge-pro-bluetooth-speaker',
    name: 'اسپیکر بلوتوثی حرفه‌ای ضدآب Charge Pro',
    englishName: 'Wireless Waterproof Bass Bluetooth Speaker',
    category: 'audio',
    categoryLabel: 'هدفون و اسپیکر',
    brand: 'sony',
    brandLabel: 'سونی',
    price: 8900000,
    originalPrice: 9600000,
    discountPercent: 7,
    image: '/assets/extracted/prod-mouse.png',
    gallery: ['/assets/extracted/prod-mouse.png'],
    sold: 33,
    remaining: 67,
    rating: 4.7,
    reviewCount: 34,
    warranty: 'گارانتی ۱۲ ماهه سرو سیستم',
    description:
      'اسپیکر قابل حمل با بیس عمیق استریو، شارژدهی ۲۰ ساعته، قابلیت پاوربانک و استاندارد مقاومت در برابر آب IP67 برای فضاهای باز و محیط کار.',
    specs: [
      { label: 'توان خروجی', value: '۴۰ وات RMS با رادیاتور بیس دوگانه' },
      { label: 'شارژدهی باتری', value: 'تا ۲۰ ساعت پخش مداوم' },
      { label: 'مقاومت', value: 'IP67 ضدآب و ضدگردوغبار' },
      { label: 'اتصال', value: 'بلوتوث ۵.۳ با قابلیت اتصال چند اسپیکر' },
    ],
    features: ['بدنه بافت پارچه‌ای مقاوم', 'شارژ سریع USB-C', 'صدای شفاف حتی در ولوم حداکثر'],
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'srv-network-design',
    slug: 'network-design',
    title: 'طراحی شبکه',
    shortDesc: 'طراحی و پیاده‌سازی زیرساخت شبکه متناسب با نیاز سازمان‌ها و کسب‌وکارها',
    fullDesc:
      'از مشاوره تخصصی و معماری توپولوژی شبکه داخلی گرفته تا کابل‌کشی ساختاریافته، آرایش رک، پیکربندی سوئیچ‌ها و فایروال‌های سازمانی با بالاترین سطح امنیت و پایداری.',
    color: 'teal',
    icon: 'Globe',
    sla: 'پشتیبانی ۲۴/۷ و قرارداد نگهداری SLA',
    deliverables: [
      'امکان‌سنجی و طراحی نقشه توپولوژی شبکه داخلی و فیبر نوری',
      'نصب، آرایش رک و کابل‌کشی استاندارد با تست فلوک',
      'راه‌اندازی فایروال، VPN امن سازمانی و مدیریت دسترسی کاربران',
      'مانیتورینگ لحظه‌ای ترافیک و بهینه‌سازی پهنای باند',
    ],
  },
  {
    id: 'srv-voip',
    slug: 'voip-setup',
    title: 'راه‌اندازی تلفن‌های VoIP',
    shortDesc: 'نصب، پیکربندی و راه‌اندازی سیستم‌های تلفنی تحت شبکه برای ارتباطات حرفه‌ای',
    fullDesc:
      'راه‌اندازی کامل مرکز تلفن تحت شبکه (Issabel / FreePBX / 3CX)، تلفن گویا (IVR)، صف انتظار هوشمند، ضبط مکالمات و اتصال یکپارچه به نرم‌افزار CRM سازمان شما.',
    color: 'coral',
    icon: 'PhoneCall',
    sla: 'نصب سریع زیر ۷۲ ساعت همراه با آموزش پرسنل',
    deliverables: [
      'تأمین و پیکربندی تلفن‌های IP رومیزی و گیت‌وی‌های مخابراتی',
      'طراحی سناریو تلفن گویا (IVR) چندلایه و گزارش‌گیری تماس‌ها',
      'اتصال شعب مختلف از طریق داخلی رایگان تحت بستر امن',
      'ضبط خودکار مکالمات و نظرسنجی پس از تماس مشتریان',
    ],
  },
  {
    id: 'srv-security-vpn',
    slug: 'enterprise-security',
    title: 'امنیت و ارتباط امن VPN',
    shortDesc: 'ایجاد تونل‌های رمزنگاری‌شده بین شعب، بکاپ‌گیری خودکار و ایمن‌سازی سرورها',
    fullDesc:
      'حفاظت جامع از داده‌های حیاتی کسب‌وکار شما در برابر تهدیدات سایبری، راه‌اندازی سیستم‌های پشتیبان‌گیری خودکار و ایمن‌سازی ارتباط دورکاران با شبکه شرکت.',
    color: 'green',
    icon: 'ShieldCheck',
    sla: 'ممیزی امنیتی دوره‌ای و پاسخ‌گویی اضطراری',
    deliverables: [
      'پیکربندی میکروتیک، فورتی‌گیت و تونل‌های IPsec بین شعب',
      'پیاده‌سازی سیستم پشتیبان‌گیری ۳-۲-۱ برای سرورها و دیتابیس‌ها',
      'کنترل دسترسی مبتنی بر نقش و احراز هویت دومرحله‌ای',
      'گزارش‌دهی منظم از سلامت زیرساخت و پیشگیری از نفوذ',
    ],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'best-wireless-earbuds-buying-guide-1405',
    title: 'راهنمای جامع خرید هندزفری بی‌سیم با حذف نویز فعال در سال ۱۴۰۵',
    excerpt:
      'چگونه میان فناوری‌های ANC، کدک‌های صوتی LDAC و کیس‌های شارژ هوشمند بهترین هندزفری بلوتوثی متناسب با بودجه خود را انتخاب کنیم؟',
    category: 'راهنمای خرید',
    readTime: '۶ دقیقه',
    date: '۳۱ خرداد ۱۴۰۵',
    author: 'تحریریه فنی سرو سیستم',
    image: '/assets/extracted/blog-featured.png',
    featured: true,
    content: [
      'انتخاب یک هندزفری بی‌سیم مناسب در سال ۱۴۰۵ تنها به ظاهر یا برند محدود نمی‌شود؛ کیفیت میکروفون در مکالمات محیط شلوغ، عمق حذف نویز فعال (ANC) و پایداری اتصال بلوتوث ۵.۳ نقش تعیین‌کننده‌ای در تجربه روزمره دارند.',
      'کیس‌های شارژ هوشمند جدید با نمایشگر لمسی روی بدنه، امکان کنترل موسیقی، مشاهده درصد باتری هر گوشی و تغییر حالت شفافیت صدا را بدون نیاز به بیرون آوردن گوشی فراهم کرده‌اند.',
      'پیشنهاد کارشناسان سرو سیستم این است که پیش از خرید، وزن هر گوشی، استاندارد مقاومت در برابر تعریق (حداقل IPX4) و پشتیبانی از اتصال هم‌زمان به دو دستگاه (Multipoint) را برای استفاده ترکیبی با لپ‌تاپ و موبایل بررسی کنید.',
    ],
  },
  {
    id: 'blog-2',
    slug: 'how-to-optimize-anc-earbuds-for-calls',
    title: 'ترفندهای افزایش کیفیت صدا و نگهداری اصولی از هندزفری‌های بلوتوثی',
    excerpt:
      'با رعایت پنج نکته ساده در تنظیم اکولایزر و تمیز کردن توری صوتی، کیفیت مکالمه و عمر باتری ایربادز خود را دو برابر کنید.',
    category: 'آموزشی',
    readTime: '۵ دقیقه',
    date: '۲۴ خرداد ۱۴۰۵',
    author: 'مهندس آرمان رضایی',
    image: '/assets/extracted/blog-thumb-1.png',
    content: [
      'یکی از رایج‌ترین دلایل افت کیفیت صدا در هندزفری‌های توگوشی، انتخاب سری سیلیکونی نامتناسب با کانال گوش است. آب‌بندی مناسب نه تنها بیس صدا را تقویت می‌کند بلکه عملکرد سیستم حذف نویز فعال را به شکل محسوسی بهبود می‌بخشد.',
      'به‌روزرسانی منظم میان‌افزار (Firmware) از طریق اپلیکیشن رسمی سازنده، باگ‌های تأخیر صدا در بازی و قطع و وصلی بلوتوث را برطرف می‌کند.',
      'برای افزایش عمر سلول‌های لیتیومی، از تخلیه کامل باتری تا صفر درصد به‌طور مداوم پرهیز کرده و کیس شارژ را در دمای متعادل نگهداری کنید.',
    ],
  },
  {
    id: 'blog-3',
    slug: 'dualsense-pc-setup-and-haptic-guide',
    title: 'آموزش اتصال دسته DualSense به کامپیوتر و فعال‌سازی کامل بازخورد لمسی',
    excerpt:
      'تجربه ویژگی‌های منحصربه‌فرد دسته پلی‌استیشن ۵ شامل تریگرهای تطبیقی و لرزش دقیق روی ویندوز و Steam در کمتر از سه دقیقه.',
    category: 'آموزشی',
    readTime: '۵ دقیقه',
    date: '۱۸ خرداد ۱۴۰۵',
    author: 'امیرحسین مرادی',
    image: '/assets/extracted/blog-thumb-2.png',
    content: [
      'دسته DualSense سونی یکی از محبوب‌ترین کنترلرها میان گیمرهای PC است. برای اتصال سیمی کافیست از یک کابل USB-C باکیفیت استفاده کنید تا بازی‌های پشتیبانی‌شده بلافاصله بازخورد لمسی (Haptic Feedback) را فعال کنند.',
      'در حالت بی‌سیم بلوتوث نیز می‌توانید از طریق تنظیمات Steam Input، نورپردازی تاچ‌پد و حساسیت آنالوگ‌ها را برای هر بازی به صورت اختصاصی شخصی‌سازی نمایید.',
      'توصیه می‌کنیم نرم‌افزار رسمی PlayStation Accessories را روی ویندوز نصب کنید تا جدیدترین آپدیت‌های کنترلر را بدون نیاز به کنسول دریافت نمایید.',
    ],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'order',
    categoryLabel: 'ثبت سفارش و پرداخت',
    question: 'نحوه ثبت سفارش در فروشگاه اینترنتی سرو سیستم چگونه است؟',
    answer:
      'کافی است محصول مورد نظر خود را به سبد خرید اضافه کنید، وارد صفحه سبد خرید شوید، اطلاعات ارسال را تکمیل کرده و از طریق درگاه بانکی امن یا پرداخت در محل (ویژه تهران) سفارش خود را نهایی نمایید.',
  },
  {
    id: 'faq-2',
    category: 'warranty',
    categoryLabel: 'گارانتی و اصالت کالا',
    question: 'آیا تمام کالاها دارای ضمانت اصالت و گارانتی معتبر هستند؟',
    answer:
      'بله؛ تمامی قطعات کامپیوتر، لپ‌تاپ‌ها، تجهیزات شبکه و لوازم گیمینگ ارائه‌شده در سرو سیستم کاملاً اورجینال بوده و همراه با کارت گارانتی معتبر و فاکتور رسمی ارسال می‌شوند.',
  },
  {
    id: 'faq-3',
    category: 'warranty',
    categoryLabel: 'گارانتی و اصالت کالا',
    question: 'شرایط ۷ روز ضمانت بازگشت کالا چیست؟',
    answer:
      'در صورت وجود هرگونه مغایرت فنی، آسیب فیزیکی هنگام تحویل یا عدم تطابق با مشخصات درج‌شده در سایت، تا ۷ روز پس از دریافت می‌توانید درخواست مرجوعی یا تعویض رایگان ثبت کنید.',
  },
  {
    id: 'faq-4',
    category: 'shipping',
    categoryLabel: 'ارسال و پیگیری',
    question: 'زمان تحویل سفارش‌ها در تهران و سایر شهرها چقدر است؟',
    answer:
      'سفارش‌های شهر تهران در همان روز کاری (ارسال اکسپرس ۲ تا ۴ ساعته) و سفارش‌های سایر استان‌ها از طریق پست پیشتاز یا تیپاکس ظرف ۲۴ تا ۷۲ ساعت کاری به دست شما می‌رسد.',
  },
  {
    id: 'faq-5',
    category: 'network',
    categoryLabel: 'خدمات شبکه و VoIP',
    question: 'آیا امکان بازدید کارشناس پیش از طراحی شبکه یا نصب VoIP وجود دارد؟',
    answer:
      'بله؛ تیم فنی سرو سیستم پس از ثبت درخواست در صفحه خدمات تخصصی، جلسه مشاوره رایگان و بازدید حضوری محل پروژه را برای ارائه پیش‌فاکتور دقیق هماهنگ می‌کند.',
  },
  {
    id: 'faq-6',
    category: 'order',
    categoryLabel: 'ثبت سفارش و پرداخت',
    question: 'آیا برای سازمان‌ها و شرکت‌ها فاکتور رسمی صادر می‌شود؟',
    answer:
      'بله؛ تمامی خریدهای سازمانی، تجهیزات شبکه و قطعات سرور با امکان صدور فاکتور رسمی مورد تأیید دارایی و گارانتی سازمانی ارائه می‌گردند.',
  },
];

export const INITIAL_TRACKED_ORDERS: TrackedOrder[] = [
  {
    code: 'SRV-1405-8821',
    customerName: 'محمدرضا کریمی',
    date: '۲۲ خرداد ۱۴۰۵',
    status: 'shipped',
    statusLabel: 'تحویل به پیک / در مسیر ارسال',
    total: 12200000,
    itemsCount: 1,
    city: 'تهران',
    courier: 'پیک اکسپرس سرو سیستم',
  },
  {
    code: 'SRV-1405-7410',
    customerName: 'سارا احمدی',
    date: '۱۸ خرداد ۱۴۰۵',
    status: 'delivered',
    statusLabel: 'تحویل داده شده',
    total: 46500000,
    itemsCount: 1,
    city: 'اصفهان',
    courier: 'تیپاکس هوایی',
  },
];

export const HERO_SLIDES = [
  {
    id: 'slide-1',
    title: 'سرو سیستم؛',
    subtitle: 'مرجع تخصصی خرید تجهیزات دیجیتال و کامپیوتر',
    ctaLabel: 'فروشگاه',
    ctaHref: '/shop',
    image: '/assets/extracted/cutout-pc-case.png',
  },
  {
    id: 'slide-2',
    title: 'اسمبل تخصصی؛',
    subtitle: 'سیستم‌های رندرینگ و گیمینگ با مشاوره رایگان مهندسی',
    ctaLabel: 'مشاهده قطعات',
    ctaHref: '/shop?category=computer',
    image: '/assets/extracted/cutout-pc-case.png',
  },
  {
    id: 'slide-3',
    title: 'زیرساخت شبکه؛',
    subtitle: 'تأمین تجهیزات سازمانی و راه‌اندازی حرفه‌ای VoIP',
    ctaLabel: 'خدمات شبکه',
    ctaHref: '/services',
    image: '/assets/extracted/cutout-pc-case.png',
  },
];
