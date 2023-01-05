import { LocalStorageKey, AddRemoveCartOpt } from '../types/types';
import { getRequest } from '../helper/getRequest';
import { Product } from '../types/types';

function getStorageElem(): string[] {
    const addedCartItem: string | null = localStorage.getItem(LocalStorageKey.products);
    const defautStorageArr: string[] = [];
    return addedCartItem ? JSON.parse(addedCartItem) : defautStorageArr;
}

function setStorageElem(idItem: string, elem?: HTMLElement): void {
    const addedCartItem: string[] = getStorageElem();

    if (addedCartItem.includes(idItem)) {
        if (!elem) {
            addedCartItem.splice(addedCartItem.indexOf(idItem), 1);
        }
    } else {
        addedCartItem.push(idItem);
    }
    localStorage.setItem(LocalStorageKey.products, JSON.stringify(addedCartItem));
}

function getStorageCounter(): string {
    const storedCounter: string | null = localStorage.getItem(LocalStorageKey.counter);
    return storedCounter ? storedCounter : '0';
}

function getSumTotal(): string {
    const storedSumTotal: string | null = localStorage.getItem(LocalStorageKey.sumTotal);
    return storedSumTotal ? storedSumTotal : '0';
}

async function setStorageCounter(
    option: AddRemoveCartOpt,
    idItem: string,
    elem?: HTMLElement,
    value = 1
): Promise<void> {
    const response = await fetch('./json-data/goods.json');
    const dataGoods = await response.json();
    const goodsArray: Array<Product> = dataGoods.products;
    const currentProduct = goodsArray.filter((obj) => obj.id.toString() === idItem);
    const currentProductPrice = currentProduct[0].price;
    const currCounterValue = Number(getStorageCounter());
    const currSumTotal = Number(getSumTotal());
    if (option == AddRemoveCartOpt.add) {
        localStorage.setItem(LocalStorageKey.counter, `${currCounterValue + value}`);
        localStorage.setItem(LocalStorageKey.sumTotal, `${currSumTotal + currentProductPrice}`);
    }
    if (option == AddRemoveCartOpt.remove) {
        if (!elem) {
            localStorage.setItem(LocalStorageKey.counter, `${currCounterValue - value}`);
            localStorage.setItem(LocalStorageKey.sumTotal, `${currSumTotal - currentProductPrice}`);
        }
    }
}

async function updateCart(idItem: string, elem?: HTMLElement): Promise<void> {
    const addedCartItem: string[] = getStorageElem();
    setStorageElem(idItem, elem);
    addedCartItem.includes(idItem)
        ? await setStorageCounter(AddRemoveCartOpt.remove, idItem, elem)
        : await setStorageCounter(AddRemoveCartOpt.add, idItem, elem);
    const cartCounter = document.querySelector('.header-container__amount');
    const sumTotalDiv = document.querySelector('.header-container__cost');
    if (cartCounter) {
        cartCounter.textContent = getStorageCounter();
    }
    if (sumTotalDiv) {
        sumTotalDiv.textContent = `${getSumTotal()}`;
    }
}

function checkProductInCart(id: string): boolean {
    const productsList = getStorageElem();
    return productsList.includes(id);
}

export {
    getStorageElem,
    setStorageElem,
    getStorageCounter,
    setStorageCounter,
    checkProductInCart,
    updateCart,
    getSumTotal,
};
