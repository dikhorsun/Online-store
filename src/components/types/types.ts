export interface Product {
    brand: string;
    category: string;
    description: string;
    discountPercentage: number;
    id: number;
    images: string[];
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
    title: string;
}

export type Filter = 'brand' | 'category' | 'price' | 'stock';

export type keyFilter = keyof FilterValueObject;

export type keyProduct = keyof Product;

export interface FilterValueObject {
    brand?: string[];
    category?: string[];
    price?: string[];
    stock?: string[];
}

export enum CartBtnInner {
    add = 'Add to cart',
    remove = 'Remove from cart',
}

export enum LocalStorageKey {
    counter = 'counter',
    sumTotal = 'sumTotal',
    products = 'cart_products',
}

export enum AddRemoveCartOpt {
    add,
    remove,
}

export type BrandIdLabel = {
    samsung: 'Samsung';
    apple: 'Apple';
    oppo: 'OPPO';
    huawei: 'Huawei';
    'microsoft-surface': 'Microsoft Surface';
    infinix: 'Infinix';
    'hp-pavilion': 'HP Pavilion';
    'impression-of-acqua-di-gio': 'Impression of Acqua Di Gio';
    'royal-mirage': 'Royal Mirage';
    'fog-scent-xpressio': 'Fog Scent Xpressio';
    'al-munakh': 'Al Munakh';
    'lord-rehab': 'Lord Al Rehab';
    'loreal-paris': "L'Oreal Paris";
    'hemani-tea': 'Hemani Tea';
    dermive: 'Dermive';
    'rorec-white-rice': 'ROREC White Rice';
    'fair-clear': 'Fair & Clear';
    'saaf-khaas': 'Saaf & Khaas';
    'bake-parlor-big': 'Bake Parlor Big';
    'baking-food-items': 'Baking Food Items';
    fauji: 'Fauji';
    'dry-rose': 'Dry Rose';
    'boho-decor': 'Boho Decor';
    'flying-wooden': 'Flying Wooden';
    'led-lights': 'LED Lights';
    'luxury-palace': 'Luxury palace';
    golden: 'Golden';
    smartphones: 'smartphones';
    laptops: 'laptops';
    groceries: 'groceries';
    fragrances: 'fragrances';
    skincare: 'skincare';
    'home-decoration': 'home-decoration';
};

export type IdLabel = keyof BrandIdLabel;
