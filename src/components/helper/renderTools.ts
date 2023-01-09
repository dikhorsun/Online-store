import createElement from '../helper/createElement';
import createOptions from '../helper/createOption';
import createInputLabelInContainer from '../helper/createInputLabelInContainer';
import MainPage from '../main';
import { getLabelsBrand, getLabelsCategory } from '../../json-data/label-contents';
import { brandInputId } from '../../json-data/input-id';
import { inputBrandListener } from '../filters/filter-brand';
import { inputCategoryListener } from '../filters/filter-category';
import createInputRange from '../helper/createInput';
import { filterPriceListener } from '../filters/filter-price';
import { filterStockListener } from '../filters/filter-stock';
import { addQuery, removeQuery } from '../main/query-params/query';

function renderSelect() {
    const selectSort = document.createElement('select');
    selectSort.classList.add('tools__sort');
    selectSort.id = 'sort-goods';

    createOptions('Choose', 'Sort goods...', selectSort);
    createOptions('Nosort', 'Without sort', selectSort);
    createOptions('priceA', 'By price: low to high', selectSort);
    createOptions('priceD', 'By price: high to low', selectSort);
    createOptions('ratingA', 'By rating: low to high', selectSort);
    createOptions('ratingD', 'By rating: high to low', selectSort);
    selectSort.addEventListener('change', function () {
        if (
            this.value === 'priceA' ||
            this.value === 'priceD' ||
            this.value === 'ratingA' ||
            this.value === 'ratingD'
        ) {
            addQuery([this.value], 'sort');
        } else if (this.value === 'Nosort' || this.value === 'Choose') {
            removeQuery([], 'sort');
        }
    });
    MainPage.sectionTools.append(selectSort);
}

async function renderBrand() {
    // fieldset with brand inputs
    const fieldsetBrand = createElement('fieldset', 'filter-brand', MainPage.sectionTools);
    createElement('legend', 'filter-brand__legend', fieldsetBrand, 'Filter goods by brand');
    const brandLabelsArray = await getLabelsBrand();
    if (brandLabelsArray) {
        for (let i = 0; i < brandInputId.length; i++) {
            createInputLabelInContainer(
                fieldsetBrand,
                'filter-brand__line',
                'checkbox',
                'filter-brand__input',
                brandInputId[i],
                inputBrandListener,
                brandLabelsArray[i]
            );
        }
    }
}

async function renderCategory() {
    const fieldsetCategory = createElement('fieldset', 'filter-category', MainPage.sectionTools);
    createElement('legend', 'filter-category__legend', fieldsetCategory, 'Filter goods by category');
    const categoryLabelsArray = await getLabelsCategory();
    if (categoryLabelsArray) {
        for (let i = 0; i < 6; i++) {
            createInputLabelInContainer(
                fieldsetCategory,
                'filter-category__line',
                'checkbox',
                'filter-category__input',
                categoryLabelsArray[i],
                inputCategoryListener,
                categoryLabelsArray[i]
            );
        }
    }
}

function renderFilterPrice(array: string[]) {
    const rightValueNum = Number(array[1]);
    const rightValuePercent = (rightValueNum * 100) / 100;
    const rightValue: string = Math.trunc(rightValuePercent).toString();
    const hundredMinusRight = Math.trunc(100 - rightValuePercent).toString();
    const leftValueNum = Number(array[0]);
    const leftValuePercent = (leftValueNum * 100) / 100;
    const leftValue: string = Math.trunc(leftValuePercent).toString();
    createElement('div', 'filter-price__title', MainPage.sectionTools, 'Filter goods by price');
    const filterPriceContainer = createElement('div', 'filter-price', MainPage.sectionTools);
    const visiblePartsFilterPrice = createElement('div', 'filter-price__visible-parts-container', filterPriceContainer);
    const priceInverseLeft = createElement('div', 'filter-price__inverse-left', visiblePartsFilterPrice);
    priceInverseLeft.style.width = `${leftValue}%`;
    const priceInverseRight = createElement('div', 'filter-price__inverse-right', visiblePartsFilterPrice);
    priceInverseRight.style.width = `${hundredMinusRight}%`;
    const priceRange = createElement('div', 'filter-price__range', visiblePartsFilterPrice);
    priceRange.style.left = `${leftValue}%`;
    priceRange.style.right = `${hundredMinusRight}%`;
    const priceThumbLeft = createElement('span', 'filter-price__thumb-left', visiblePartsFilterPrice);
    priceThumbLeft.style.left = `${leftValue}%`;
    const priceThumbRight = createElement('span', 'filter-price__thumb-right', visiblePartsFilterPrice);
    priceThumbRight.style.left = `${rightValue}%`;
    const priceSignLeft = createElement('div', 'filter-price__sign-left', visiblePartsFilterPrice);
    priceSignLeft.style.left = `${leftValue}%`;
    const priceLeftThumbScreen = createElement('span', 'filter-price__left-thumb-screen', priceSignLeft, `${array[0]}`);
    const priceSignRight = createElement('div', 'filter-price__sign-right', visiblePartsFilterPrice);
    priceSignRight.style.left = `${rightValue}%`;
    const priceRightThumbScreen = createElement(
        'span',
        'filter-price__right-thumb-screen',
        priceSignRight,
        `${array[1]}`
    );
    const inputPriceLeft = createInputRange(
        'input',
        'range',
        'input-price-left',
        `${array[0]}`,
        '100',
        '0',
        '1',
        filterPriceListener,
        filterPriceContainer
    );
    const inputPriceRight = createInputRange(
        'input',
        'range',
        'input-price-right',
        `${array[1]}`,
        '100',
        '0',
        '1',
        filterPriceListener,
        filterPriceContainer
    );
    inputPriceLeft.addEventListener('input', () => {
        const inputRightValue = Number(inputPriceRight.value);
        const numberOne = 1;
        const rightValueMinusOne: number = inputRightValue - numberOne;
        let inputLeftValue = Number(inputPriceLeft.value);
        inputLeftValue = Math.min(inputLeftValue, rightValueMinusOne);
        const value: number = (inputLeftValue / parseInt(inputPriceLeft.max, 10)) * 100;
        priceInverseLeft.style.width = `${value}%`;
        priceRange.style.left = `${value}%`;
        priceThumbLeft.style.left = `${value}%`;
        priceSignLeft.style.left = `${value}%`;
        priceLeftThumbScreen.innerHTML = inputPriceLeft.value;
    });
    inputPriceRight.addEventListener('input', () => {
        let inputRightValue = Number(inputPriceRight.value);
        const inputLeftValue = Number(inputPriceLeft.value);
        inputRightValue = Math.max(inputRightValue, inputLeftValue - -1);
        const value: number = (inputRightValue / parseInt(inputPriceRight.max, 10)) * 100;
        priceInverseRight.style.width = `${100 - value}%`;
        priceRange.style.right = `${100 - value}%`;
        priceThumbRight.style.left = `${value}%`;
        priceSignRight.style.left = `${value}%`;
        priceRightThumbScreen.innerHTML = inputPriceRight.value;
    });
}

function renderFilterStock(array: string[]) {
    const rightValueNum = Number(array[1]);
    const rightValuePercent = (rightValueNum * 100) / 100;
    const rightValue: string = Math.trunc(rightValuePercent).toString();
    const hundredMinusRight = Math.trunc(100 - rightValuePercent).toString();
    const leftValueNum = Number(array[0]);
    const leftValuePercent = (leftValueNum * 100) / 100;
    const leftValue: string = Math.trunc(leftValuePercent).toString();
    createElement('div', 'filter-stock__title', MainPage.sectionTools, 'Filter goods by stock');
    const filterStockContainer = createElement('div', 'filter-stock', MainPage.sectionTools);
    const visiblePartsFilterStock = createElement('div', 'filter-stock__visible-parts-container', filterStockContainer);
    const stockInverseLeft = createElement('div', 'filter-stock__inverse-left', visiblePartsFilterStock);
    stockInverseLeft.style.width = `${leftValue}%`;
    const stockInverseRight = createElement('div', 'filter-stock__inverse-right', visiblePartsFilterStock);
    stockInverseRight.style.width = `${hundredMinusRight}%`;
    const stockRange = createElement('div', 'filter-stock__range', visiblePartsFilterStock);
    stockRange.style.left = `${leftValue}%`;
    stockRange.style.right = `${hundredMinusRight}%`;
    const stockThumbLeft = createElement('span', 'filter-stock__thumb-left', visiblePartsFilterStock);
    stockThumbLeft.style.left = `${leftValue}%`;
    const stockThumbRight = createElement('span', 'filter-stock__thumb-right', visiblePartsFilterStock);
    stockThumbRight.style.left = `${rightValue}%`;
    const stockSignLeft = createElement('div', 'filter-stock__sign-left', visiblePartsFilterStock);
    stockSignLeft.style.left = `${leftValue}%`;
    const stockLeftThumbScreen = createElement('span', 'filter-stock__left-thumb-screen', stockSignLeft, `${array[0]}`);
    const stockSignRight = createElement('div', 'filter-stock__sign-right', visiblePartsFilterStock);
    stockSignRight.style.left = `${rightValue}%`;
    const stockRightThumbScreen = createElement(
        'span',
        'filter-stock__right-thumb-screen',
        stockSignRight,
        `${array[1]}`
    );
    const inputStockLeft = createInputRange(
        'input',
        'range',
        'input-stock-left',
        `${array[0]}`,
        '100',
        '0',
        '1',
        filterStockListener,
        filterStockContainer
    );
    const inputStockRight = createInputRange(
        'input',
        'range',
        'input-stock-right',
        `${array[1]}`,
        '100',
        '0',
        '1',
        filterStockListener,
        filterStockContainer
    );
    inputStockLeft.addEventListener('input', () => {
        const inputRightValue = Number(inputStockRight.value);
        const numberOne = 1;
        const rightValueMinusOne: number = inputRightValue - numberOne;
        let inputLeftValue = Number(inputStockLeft.value);
        inputLeftValue = Math.min(inputLeftValue, rightValueMinusOne);
        const value: number = (inputLeftValue / parseInt(inputStockLeft.max, 10)) * 100;
        stockInverseLeft.style.width = `${value}%`;
        stockRange.style.left = `${value}%`;
        stockThumbLeft.style.left = `${value}%`;
        stockSignLeft.style.left = `${value}%`;
        stockLeftThumbScreen.innerHTML = inputStockLeft.value;
    });
    inputStockRight.addEventListener('input', () => {
        let inputRightValue = Number(inputStockRight.value);
        const inputLeftValue = Number(inputStockLeft.value);
        inputRightValue = Math.max(inputRightValue, inputLeftValue - -1);
        const value: number = (inputRightValue / parseInt(inputStockRight.max, 10)) * 100;
        stockInverseRight.style.width = `${100 - value}%`;
        stockRange.style.right = `${100 - value}%`;
        stockThumbRight.style.left = `${value}%`;
        stockSignRight.style.left = `${value}%`;
        stockRightThumbScreen.innerHTML = inputStockRight.value;
    });
}

export { renderSelect, renderBrand, renderCategory, renderFilterPrice, renderFilterStock };
