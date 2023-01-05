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

};

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
