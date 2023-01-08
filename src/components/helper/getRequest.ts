import { Product } from '../types/types';

async function getRequest(): Promise<Product[]> {
    let goodsArray!: Array<Product>;
    const response = await fetch('./json-data/goods.json');
    const dataGoods = await response.json().then((dataGoods) => {
        goodsArray = dataGoods.products;
    });
    return goodsArray;
}

export { getRequest };
