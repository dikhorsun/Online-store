import { LocalStorageKey, AddRemoveCartOpt, CartStorageObj } from '../types/types';
import { Product } from '../types/types';

function getStorageObj(): object[] {
    const addedCartItem: string | null = localStorage.getItem(LocalStorageKey.dataObj);
    const defautStorageArr: object[] = [
        {
            id: 0,
            count: 0,
            price: 0,
        },
    ];
    return addedCartItem ? JSON.parse(addedCartItem) : defautStorageArr;
}

function getStorageElemCount(idItem: string): number | undefined {
    const addedCartItem: CartStorageObj[] = getStorageObj();
    const defautStorageElemCount = 1;
    const currentObjArr: CartStorageObj[] = addedCartItem.filter(
        (obj: CartStorageObj) => obj.id && obj.id.toString() === idItem
    );
    return currentObjArr.length != 0 ? currentObjArr[0].count : defautStorageElemCount;
}

async function setStorageObj(option: AddRemoveCartOpt, idItem: string, elem?: HTMLElement, value = 1): Promise<void> {
    const response = await fetch('./json-data/goods.json');
    const dataGoods = await response.json();
    const goodsArray: Array<Product> = dataGoods.products;
    const currentProduct = goodsArray.filter((obj) => obj.id.toString() === idItem);
    const currentProductId = currentProduct[0].id;
    const currentProductPrice = currentProduct[0].price;
    const currentObjICP: CartStorageObj = {
        id: currentProductId,
        count: getStorageElemCount(idItem),
        price: currentProductPrice,
    };
    const currCounterValue = Number(getStorageCounter());
    const currSumTotal = Number(getSumTotal());

    const addedCartItem: CartStorageObj[] = getStorageObj();

    const currentObjArr: CartStorageObj[] = addedCartItem.filter(
        (obj: CartStorageObj) => obj.id && obj.id.toString() === idItem
    );

    if (currentObjArr[0]) {
        if (elem?.className === 'btn-plus') {
            (currentObjArr[0].count as number) += 1;
        } else if (elem?.className === 'btn-minus') {
            (currentObjArr[0].count as number) -= 1;
        } else if (elem?.className !== 'goods-buy-button') {
            addedCartItem.splice(addedCartItem.indexOf(currentObjArr[0]), 1);
        }
    } else {
        addedCartItem.push(currentObjICP);
    }

    localStorage.setItem(LocalStorageKey.dataObj, JSON.stringify(addedCartItem));
    if (
        (elem?.className === 'button card-item__add-to-cart' ||
            elem?.className === 'button card-item__add-to-cart button-added' ||
            elem?.className === 'btn-add goods-buy-button' ||
            elem?.className === 'btn-add goods-buy-button button-added' ||
            'goods-buy-button') &&
        elem !== undefined
    ) {
        if (option == AddRemoveCartOpt.add) {
            localStorage.setItem(LocalStorageKey.counter, `${currCounterValue + value}`);
            localStorage.setItem(LocalStorageKey.sumTotal, `${currSumTotal + currentProductPrice}`);
        }
        if (option == AddRemoveCartOpt.remove) {
            if (elem?.className !== 'goods-buy-button') {
                localStorage.setItem(
                    LocalStorageKey.counter,
                    `${currCounterValue - (currentObjArr[0].count as number) * value}`
                );
                localStorage.setItem(
                    LocalStorageKey.sumTotal,
                    `${currSumTotal - (currentObjArr[0].count as number) * currentProductPrice}`
                );
            }
        }
    }
    if (elem?.className === 'btn-plus') {
        localStorage.setItem(LocalStorageKey.counter, `${currCounterValue + value}`);
        localStorage.setItem(LocalStorageKey.sumTotal, `${currSumTotal + currentProductPrice}`);
    }
    if (elem?.className === 'btn-minus') {
        localStorage.setItem(LocalStorageKey.counter, `${currCounterValue - value}`);
        localStorage.setItem(LocalStorageKey.sumTotal, `${currSumTotal - currentProductPrice}`);
    }
}

function getStorageElem(): string[] {
    const addedCartItem: string | null = localStorage.getItem(LocalStorageKey.products);
    const defautStorageArr: string[] = [];
    return addedCartItem ? JSON.parse(addedCartItem) : defautStorageArr;
}

function setStorageElem(idItem: string, elem?: HTMLElement): void {
    const addedCartItem: string[] = getStorageElem();

    if (addedCartItem.includes(idItem)) {
        if (
            elem?.className !== 'goods-buy-button' &&
            elem?.className !== 'btn-plus' &&
            elem?.className !== 'btn-minus'
        ) {
            addedCartItem.splice(addedCartItem.indexOf(idItem), 1);
        }
    } else {
        addedCartItem.push(idItem);
    }
    localStorage.setItem(LocalStorageKey.products, JSON.stringify(addedCartItem));
}

function getStoragePromo(): string[] {
    const addedCartItem: string | null = localStorage.getItem(LocalStorageKey.promoId);
    const defautStorageArr: string[] = [];
    return addedCartItem ? JSON.parse(addedCartItem) : defautStorageArr;
}

function setStoragePromo(promoId: string): void {
    const addedCartItem: string[] = getStoragePromo();

    if (addedCartItem.includes(promoId)) {
        addedCartItem.splice(addedCartItem.indexOf(promoId), 1);
    } else {
        addedCartItem.push(promoId);
    }
    localStorage.setItem(LocalStorageKey.promoId, JSON.stringify(addedCartItem));
}

function getStorageCounter(): string {
    const storedCounter: string | null = localStorage.getItem(LocalStorageKey.counter);
    return storedCounter ? storedCounter : '0';
}

function getSumTotal(): string {
    const storedSumTotal: string | null = localStorage.getItem(LocalStorageKey.sumTotal);
    return storedSumTotal ? storedSumTotal : '0';
}

async function updateCart(idItem: string, elem?: HTMLElement): Promise<void> {
    const addedCartItem: string[] = getStorageElem();
    setStorageElem(idItem, elem);
    addedCartItem.includes(idItem)
        ? await setStorageObj(AddRemoveCartOpt.remove, idItem, elem)
        : await setStorageObj(AddRemoveCartOpt.add, idItem, elem);
    const cartCounter = document.querySelector('.header-container__amount');
    const sumTotalDiv = document.querySelector('.header-container__cost');
    const totalNumber = document.querySelector('.cart__general-number') as HTMLElement;
    const totaPrice = document.querySelector('.price') as HTMLElement;

    if (cartCounter) {
        cartCounter.textContent = getStorageCounter();
        if (totalNumber) {
            totalNumber.innerHTML = `<span>Total products:</span> ${getStorageCounter()}`;
        }
    }
    if (sumTotalDiv) {
        sumTotalDiv.textContent = `${getSumTotal()}`;
        if (totaPrice) {
            totaPrice.innerHTML = `<span>Total payable:</span> ${getSumTotal()}$`;
        }
    }
}

function checkProductInCart(id: string): boolean {
    const productsList = getStorageElem();
    return productsList.includes(id);
}

function checkPromoInCart(promoId: string): boolean {
    const productsList = getStoragePromo();
    return productsList.includes(promoId);
}

function keepUrlOfMainPage(url: string) {
    if (localStorage.getItem('urlMain') !== null) {
        localStorage['urlMain'] = url;
    } else {
        localStorage.setItem('urlMain', url);
    }
}

export {
    getStorageElem,
    setStorageElem,
    getStorageCounter,
    checkProductInCart,
    updateCart,
    getSumTotal,
    keepUrlOfMainPage,
    getStorageElemCount,
    getStoragePromo,
    setStoragePromo,
    checkPromoInCart,
};
