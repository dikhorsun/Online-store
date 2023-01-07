import { addQuery } from '../main/query-params/query';

const arrayInputsPrice: string[] = ['0', '100'];
function filterPriceListener(this: HTMLInputElement) {
    if (this.classList.contains('input-price-left')) {
        arrayInputsPrice[0] = this.value;
        addQuery(arrayInputsPrice, 'price');
    } else {
        arrayInputsPrice[1] = this.value;
        addQuery(arrayInputsPrice, 'price');
    }
}

export { filterPriceListener, arrayInputsPrice };
