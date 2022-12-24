function filterByPrice() {
    const inputLeft = document.querySelector('.input-price-left') as HTMLInputElement;
    const inputRight = document.querySelector('.input-price-right') as HTMLInputElement;
    const inverseLeft = document.querySelector('.filter-price__inverse-left') as HTMLDivElement;
    const inverseRight = document.querySelector('.filter-price__inverse-right') as HTMLDivElement;
    const range = document.querySelector('.filter-price__range') as HTMLDivElement;
    const thumbLeft = document.querySelector('.filter-price__thumb-left') as HTMLSpanElement;
    const thumbRight = document.querySelector('.filter-price__thumb-right') as HTMLSpanElement;
    const signLeft = document.querySelector('.filter-price__sign-left') as HTMLDivElement;
    const signRight = document.querySelector('.filter-price__sign-right') as HTMLDivElement;
    const leftThumbScreen = document.querySelector('.filter-price__left-thumb-screen') as HTMLSpanElement;
    const rightThumbScreen = document.querySelector('.filter-price__right-thumb-screen') as HTMLSpanElement;

    if (inputLeft && inputRight) {
        inputLeft.addEventListener('input', () => {
            const inputRightValue = Number(inputRight.value);
            const numberOne = 1;
            const rightValueMinusOne: number = inputRightValue - numberOne;
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
            const inputLeftValue = Number(inputLeft.value);
            inputRightValue = Math.max(inputRightValue, inputLeftValue - -1);
            const value: number = (inputRightValue / parseInt(inputRight.max, 10)) * 100;
            inverseRight.style.width = `${100 - value}%`;
            range.style.right = `${100 - value}%`;
            thumbRight.style.left = `${value}%`;
            signRight.style.left = `${value}%`;
            rightThumbScreen.innerHTML = inputRight.value;
        });
    }
}
filterByPrice();
export default filterByPrice;
