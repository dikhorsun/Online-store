import { addQuery } from '../main/query-params/query';

const arrayInputsStock: string[] = ['0', '100'];
function filterStockListener(this: HTMLInputElement) {
    if (this.classList.contains('input-stock-left')) {
        arrayInputsStock[0] = this.value;
        addQuery(arrayInputsStock, 'stock');
    } else {
        arrayInputsStock[1] = this.value;
        addQuery(arrayInputsStock, 'stock');
    }
}

export { filterStockListener, arrayInputsStock };
