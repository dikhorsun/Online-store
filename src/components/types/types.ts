interface Product {
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

type Filter = 'brand' | 'category' | 'price' | 'stock';

type keyFilter = keyof FilterValueObject;

type keyProduct = keyof Product;

interface FilterValueObject {
    brand?: string[];
    category?: string[];
    price?: string[];
    stock?: string[];
}

export { Product, Filter, FilterValueObject, keyFilter, keyProduct };
