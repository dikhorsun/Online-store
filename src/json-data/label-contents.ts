import { Product } from '@src/components/types/types';

async function getLabelsBrand(): Promise<string[] | undefined> {
    try {
        const response = await fetch('./json-data/goods.json');
        const dataGoods = await response.json();
        const goodsArray: Array<Product> = dataGoods.products;
        const labelsBrandSet: Set<string> = new Set();
        for (let i = 0; i < goodsArray.length; i += 1) {
            labelsBrandSet.add(goodsArray[i].brand);
        }
        const labelsBrandArray = Array.from(labelsBrandSet);
        return labelsBrandArray;
    } catch (error) {
        console.log(error);
    }
}

async function getLabelsCategory(): Promise<string[] | undefined> {
    try {
        const response = await fetch('./json-data/goods.json');
        const dataGoods = await response.json();
        const goodsArray: Array<Product> = dataGoods.products;
        const labelsCategorySet: Set<string> = new Set();
        for (let i = 0; i < goodsArray.length; i += 1) {
            labelsCategorySet.add(goodsArray[i].category);
        }

        const labelsCategoryArray = Array.from(labelsCategorySet);
        return labelsCategoryArray;
    } catch (error) {
        console.log(error);
    }
}

export { getLabelsBrand, getLabelsCategory };
