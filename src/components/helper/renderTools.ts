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

function renderSelect() {
    const selectSort = createElement('select', 'tools__sort', MainPage.sectionTools);
    selectSort.id = 'sort-goods';
    const firstOption = createOptions('', 'Sort goods...', selectSort);
    firstOption.setAttribute('selected', 'selected');
    createOptions('priceA', 'By price: low to high', selectSort);
    createOptions('priceD', 'By price: high to low', selectSort);
    createOptions('ratingA', 'By rating: low to high', selectSort);
    createOptions('ratingD', 'By rating: high to low', selectSort);
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
    createElement('div', 'filter-price__title', MainPage.sectionTools, 'Filter goods by price');
    const filterPriceContainer = createElement('div', 'filter-price', MainPage.sectionTools);
    const visiblePartsFilterPrice = createElement('div', 'filter-price__visible-parts-container', filterPriceContainer);
    const priceInverseLeft = createElement('div', 'filter-price__inverse-left', visiblePartsFilterPrice);
    priceInverseLeft.style.width = '70%';
    const priceInverseRight = createElement('div', 'filter-price__inverse-right', visiblePartsFilterPrice);
    priceInverseRight.style.width = '70%';
    const priceRange = createElement('div', 'filter-price__range', visiblePartsFilterPrice);
    priceRange.style.left = '0%';
    priceRange.style.right = '0%';
    const priceThumbLeft = createElement('span', 'filter-price__thumb-left', visiblePartsFilterPrice);
    priceThumbLeft.style.left = `${array[0]}%`;
    const priceThumbRight = createElement('span', 'filter-price__thumb-right', visiblePartsFilterPrice);
    priceThumbRight.style.left = `${array[1]}%`;
    const priceSignLeft = createElement('div', 'filter-price__sign-left', visiblePartsFilterPrice);
    priceSignLeft.style.left = `${array[0]}%`;
    createElement('span', 'filter-price__left-thumb-screen', priceSignLeft, `${array[0]}`);
    const priceSignRight = createElement('div', 'filter-price__sign-right', visiblePartsFilterPrice);
    priceSignRight.style.left = `${array[1]}%`;
    createElement('span', 'filter-price__right-thumb-screen', priceSignRight, `${array[1]}`);
    createInputRange(
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
    createInputRange(
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
}

export { renderSelect, renderBrand, renderCategory, renderFilterPrice };
