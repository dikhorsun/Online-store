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

export type keyCartStorageObj = keyof CartStorageObj;

export interface CartStorageObj {
    id?: number | undefined;
    count?: number;
    price?: number;
}

export enum CartBtnInner {
    add = 'Add to cart',
    remove = 'Remove from cart',
}

export enum LocalStorageKey {
    counter = 'counter',
    sumTotal = 'sumTotal',
    products = 'cart_products',
    dataObj = 'data_obj',
}

export enum AddRemoveCartOpt {
    add,
    remove,
}
