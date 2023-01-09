import { Product } from '../types/types';

function sortProducts(array: Array<Product>, paramether: string): Array<Product> {
    if (paramether === 'priceA') {
        array.sort(function (a, b) {
            return a.price - b.price;
        });
    }
    if (paramether === 'priceD') {
        array.sort(function (a, b) {
            return b.price - a.price;
        });
    }
    if (paramether === 'ratingA') {
        array.sort(function (a, b) {
            return a.rating - b.rating;
        });
    }
    if (paramether === 'ratingD') {
        array.sort(function (a, b) {
            return b.rating - a.rating;
        });
    }
    return array;
}

export default sortProducts;
