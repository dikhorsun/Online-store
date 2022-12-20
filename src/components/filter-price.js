'use strict';
export function filterByPrice() {
    const inputLeft = document.querySelector('.input-price-left');
    const inputRight = document.querySelector('.input-price-right');
    const inputPartsContainer = document.querySelector('.filter-price__visible-parts-container');
    const inverseLeft = inputPartsContainer.querySelector('.filter-price__inverse-left');
    const inverseRight = inputPartsContainer.querySelector('.filter-price__inverse-right');
    const range = inputPartsContainer.querySelector('.filter-price__range');
    const thumbLeft = inputPartsContainer.querySelector('.filter-price__thumb-left');
    const thumbRight = inputPartsContainer.querySelector('.filter-price__thumb-right');
    const signLeft = inputPartsContainer.querySelector('.filter-price__sign-left');
    const signRight = inputPartsContainer.querySelector('.filter-price__sign-right');
    const leftThumbScreen = signLeft.querySelector('.filter-price__left-thumb-screen');
    const rightThumbScreen = signRight.querySelector('.filter-price__right-thumb-screen');

    inputLeft.addEventListener('input', () => {
        const rightValueMinusOne = inputRight.value - 1;
        inputLeft.value = Math.min(inputLeft.value, rightValueMinusOne);
        let value = (inputLeft.value / parseInt(inputLeft.max)) * 100;
        inverseLeft.style.width = value + '%';
        range.style.left = value + '%';
        thumbLeft.style.left = value + '%';
        signLeft.style.left = value + '%';
        leftThumbScreen.innerHTML = inputLeft.value;
    });
    inputRight.addEventListener('input', () => {
        inputRight.value = Math.max(inputRight.value, inputLeft.value - -1);
        let value = (inputRight.value / parseInt(inputRight.max)) * 100;
        inverseRight.style.width = 100 - value + '%';
        range.style.right = 100 - value + '%';
        thumbRight.style.left = value + '%';
        signRight.style.left = value + '%';
        rightThumbScreen.innerHTML = inputRight.value;
    });
}
filterByPrice();
