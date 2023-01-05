export type Product = {
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
