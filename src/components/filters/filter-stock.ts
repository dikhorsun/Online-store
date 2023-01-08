function filterByPrice() {
    const inputLeft = document.querySelector('.input-stock-left') as HTMLInputElement;
    const inputRight = document.querySelector('.input-stock-right') as HTMLInputElement;
    const inputPartsContainer = document.querySelector('.filter-stock__visible-parts-container') as HTMLDivElement;
    const inverseLeft = inputPartsContainer?.querySelector('.filter-stock__inverse-left') as HTMLDivElement;
    const inverseRight = inputPartsContainer?.querySelector('.filter-stock__inverse-right') as HTMLDivElement;
    const range = inputPartsContainer.querySelector('.filter-stock__range') as HTMLDivElement;
    const thumbLeft = inputPartsContainer.querySelector('.filter-stock__thumb-left') as HTMLSpanElement;
    const thumbRight = inputPartsContainer.querySelector('.filter-stock__thumb-right') as HTMLSpanElement;
    const signLeft = inputPartsContainer.querySelector('.filter-stock__sign-left') as HTMLDivElement;
    const signRight = inputPartsContainer.querySelector('.filter-stock__sign-right') as HTMLDivElement;
    const leftThumbScreen = signLeft.querySelector('.filter-stock__left-thumb-screen') as HTMLSpanElement;
    const rightThumbScreen = signRight.querySelector('.filter-stock__right-thumb-screen') as HTMLSpanElement;

    inputLeft.addEventListener('input', () => {
        const inputRightValue = Number(inputRight.value);
        const rightValueMinusOne = inputRightValue - 1;
        let inputLeftValue = Number(inputLeft.value);
        inputLeftValue = Math.min(inputLeftValue, rightValueMinusOne);
        const value: number = (inputLeftValue / parseInt(inputLeft.max, 10)) * 100;
        inverseLeft.style.width = `${value}%`;
        range.style.left = `${value}%`;
        thumbLeft.style.left = `${value}%`;
        signLeft.style.left = `${value}%`;
        leftThumbScreen.innerHTML = inputLeft.value;
    });
    inputRight.addEventListener('input', () => {
        let inputRightValue = Number(inputRight.value);
        const leftInputValue = Number(inputLeft.value);
        inputRightValue = Math.max(inputRightValue, leftInputValue - -1);
        const value = (inputRightValue / parseInt(inputRight.max, 10)) * 100;
        inverseRight.style.width = `${100 - value}%`;
        range.style.right = `${100 - value}%`;
        thumbRight.style.left = `${value}%`;
        signRight.style.left = `${value}%`;
        rightThumbScreen.innerHTML = inputRight.value;
    });
}
filterByPrice();
export default filterByPrice;
