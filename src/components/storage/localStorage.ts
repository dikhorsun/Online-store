import { LocalStorageKey, AddRemoveCartOpt } from '../types/types';

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

function setStorageCounter(option: AddRemoveCartOpt, elem?: HTMLElement, value = 1): void {
    const currCounterValue = Number(getStorageCounter());
    if (option == AddRemoveCartOpt.add) {
        localStorage.setItem(LocalStorageKey.counter, `${currCounterValue + value}`);
    }
    if (option == AddRemoveCartOpt.remove) {
        if (!elem) {
            localStorage.setItem(LocalStorageKey.counter, `${currCounterValue - value}`);
        }
    }
}

function updateCart(idItem: string, elem?: HTMLElement): void {
    const addedCartItem: string[] = getStorageElem();
    setStorageElem(idItem, elem);

    addedCartItem.includes(idItem)
        ? setStorageCounter(AddRemoveCartOpt.remove, elem)
        : setStorageCounter(AddRemoveCartOpt.add, elem);
    const cartCounter = document.querySelector('.header-container__amount');
    if (cartCounter) {
        cartCounter.textContent = getStorageCounter();
    }
}

function checkProductInCart(id: string): boolean {
    const productsList = getStorageElem();
    return productsList.includes(id);
}

export { getStorageElem, setStorageElem, getStorageCounter, setStorageCounter, checkProductInCart, updateCart };
