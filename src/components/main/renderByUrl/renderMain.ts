import { FilterValueObject, Product, keyFilter, keyProduct, IdLabel } from '../../types/types';
import MainPage from '../../main/index';
import createElement from '../../helper/createElement';
import createOptions from '@src/components/helper/createOption';
import createInputLabelInContainer from '../../helper/createInputLabelInContainer';
import { getLabelsBrand, getLabelsCategory } from '../../../json-data/label-contents';
import {
    renderSelect,
    renderBrand,
    renderCategory,
    renderFilterPrice,
    renderFilterStock,
} from '../../helper/renderTools';
import { brandInputId } from '../../../json-data/input-id';
import { inputBrandListener, generateCard } from '../../filters/filter-brand';
import { inputCategoryListener } from '@src/components/filters/filter-category';
import { brandIdLabel } from '@src/json-data/brandIdLabel';
import { keepUrlOfMainPage } from '../../storage/localStorage';
import { addQuery, removeQuery } from '../query-params/query';
import sortProducts from '../../helper/sortProducts';
import changeBtnStyleForSecond from '@src/components/helper/changeBtnStyleForSecond';
import removeAllChilds from '@src/components/helper/removeChild';

// form object of followng structure
// {
// filter: [value, value],
// filter: [value, value],
// }

function showNotFound() {
    removeAllChilds(MainPage.cardsContainer);
    // MainPage.cardsContainer.innerHTML = '';
    MainPage.cardsContainer.innerHTML = '<div class="not-found">Goods are not found</div>';
}

async function getMainByUrl(currentURL: string) {
    keepUrlOfMainPage(currentURL);
    const splitedURL: string[] = currentURL.split('?');
    const filtersPart: string[] = splitedURL.slice(1);
    const filterValueObject: FilterValueObject = {};
    if (filtersPart.length !== 0) {
        filtersPart.forEach((item) => {
            const splitedFilter = item.split('=');
            const filter: string = splitedFilter[0];
            const values: string = splitedFilter[1];
            if (filter === 'brand' || filter === 'category') {
                const valuesArray = values.split(',');
                const labelsArray: string[] = [];
                valuesArray.forEach((value) => {
                    const label = brandIdLabel[value as IdLabel];
                    labelsArray.push(label);
                });
                filterValueObject[filter] = labelsArray;
            } else if (filter === 'price' || filter === 'stock') {
                const valuesArray = values.split(',');
                filterValueObject[filter] = valuesArray;
            } else if (filter === 'sort') {
                filterValueObject[filter] = [values];
            } else {
                showNotFound();
            }
        });
        removeAllChilds(MainPage.sectionTools);
        removeAllChilds(MainPage.regulationContainer);
        removeAllChilds(MainPage.cardsContainer);
        // MainPage.sectionTools.innerHTML = '';
        // MainPage.regulationContainer.innerHTML = '';
        // MainPage.cardsContainer.innerHTML = '';

        //render of select
        if (!Object.keys(filterValueObject).includes('sort')) {
            renderSelect();
        } else {
            // const optionsArray: string[] = ['Choose', 'Nosort', 'priceA', 'priceD', 'ratingA', 'ratingD'];
            const sortValue = filterValueObject.sort?.toString();
            const selectSort = document.createElement('select');
            selectSort.classList.add('tools__sort');
            selectSort.id = 'sort-goods';
            const chooseOption = createOptions('Choose', 'Sort goods...', selectSort);
            if (chooseOption.value === sortValue) {
                chooseOption.setAttribute('selected', 'selected');
            }
            const noSortOption = createOptions('Nosort', 'Without sort', selectSort);
            if (noSortOption.value === sortValue) {
                noSortOption.setAttribute('selected', 'selected');
            }
            const priceAOption = createOptions('priceA', 'By price: low to high', selectSort);
            if (priceAOption.value === sortValue) {
                priceAOption.setAttribute('selected', 'selected');
            }
            const priceDOption = createOptions('priceD', 'By price: high to low', selectSort);
            if (priceDOption.value === sortValue) {
                priceDOption.setAttribute('selected', 'selected');
            }
            const ratingAOption = createOptions('ratingA', 'By rating: low to high', selectSort);
            if (ratingAOption.value === sortValue) {
                ratingAOption.setAttribute('selected', 'selected');
            }
            const ratingDOption = createOptions('ratingD', 'By rating: high to low', selectSort);
            if (ratingDOption.value === sortValue) {
                ratingDOption.setAttribute('selected', 'selected');
            }

            selectSort.addEventListener('change', function () {
                if (
                    this.value === 'priceA' ||
                    this.value === 'priceD' ||
                    this.value === 'ratingA' ||
                    this.value === 'ratingD'
                ) {
                    addQuery([this.value], 'sort');
                } else {
                    removeQuery([], 'sort');
                }
            });
            MainPage.sectionTools.append(selectSort);
        }
        // render of section brand
        if (!Object.keys(filterValueObject).includes('brand')) {
            renderBrand();
        } else {
            const valuesBrandArr: string[] | undefined = filterValueObject['brand'];
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
                    if (valuesBrandArr && valuesBrandArr.includes(brandLabelsArray[i])) {
                        const input: HTMLInputElement | null = document.querySelector(`#${brandInputId[i]}`);
                        if (input) {
                            input.checked = true;
                        }
                    }
                }
            }
        }

        // render of section category
        if (!Object.keys(filterValueObject).includes('category')) {
            renderCategory();
        } else {
            const valuesCategoryArr: string[] | undefined = filterValueObject['category'];
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
                    if (valuesCategoryArr && valuesCategoryArr.includes(`${categoryLabelsArray[i]}`)) {
                        const input: HTMLInputElement | null = document.querySelector(`#${categoryLabelsArray[i]}`);
                        if (input) {
                            input.checked = true;
                        }
                    }
                }
            }
        }

        // render of filter price
        if (!Object.keys(filterValueObject).includes('price')) {
            renderFilterPrice(['0', '100']);
        } else {
            const valuesPrice: string[] | undefined = filterValueObject.price;
            if (valuesPrice) {
                renderFilterPrice([`${valuesPrice[0]}`, `${valuesPrice[1]}`]);
            }
        }

        // render of filter stock
        if (!Object.keys(filterValueObject).includes('stock')) {
            renderFilterStock(['0', '100']);
        } else {
            const valuesStock: string[] | undefined = filterValueObject.stock;
            if (valuesStock) {
                renderFilterStock([`${valuesStock[0]}`, `${valuesStock[1]}`]);
            }
        }

        // btn clear filters
        const btnResetFilters = createElement('button', 'button clear-filters', MainPage.sectionTools, 'Reset filters');
        btnResetFilters.addEventListener('click', () => {
            location.hash = 'main-page';
        });

        // btn copy to clipboard
        const btnCopyToClipboard: HTMLButtonElement = document.createElement('button');
        btnCopyToClipboard.classList.add('button');
        btnCopyToClipboard.classList.add('copy-settings');
        btnCopyToClipboard.textContent = 'Copy settings';
        MainPage.sectionTools.append(btnCopyToClipboard);
        btnCopyToClipboard.addEventListener('click', () => {
            const currentURL = window.location.href;
            navigator.clipboard
                .writeText(currentURL)
                .then(() => {
                    changeBtnStyleForSecond(btnCopyToClipboard);
                })
                .catch((error) => {
                    console.log("Error: can't change btn style", error);
                });
        });

        // filter, sort and render goods
        const filteredGoods = await filterGoods(filterValueObject);
        if (filteredGoods && filteredGoods.length > 0) {
            if (filterValueObject['sort'] && Object.keys(filterValueObject).includes('sort')) {
                const param = filterValueObject['sort'][0];
                const sortedFilteredGoods: Array<Product> = sortProducts(filteredGoods, param);
                for (let i = 0; i < sortedFilteredGoods.length; i += 1) {
                    generateCard(sortedFilteredGoods[i]);
                }
            } else {
                for (let i = 0; i < filteredGoods.length; i += 1) {
                    generateCard(filteredGoods[i]);
                }
            }
        } else {
            showNotFound();
        }

        // count of goods amount and controller
        let goodsAmount = 0;
        if (filteredGoods && filteredGoods.length > 0) {
            goodsAmount = filteredGoods.length;
        } else if (filteredGoods && filteredGoods.length === 0) {
            goodsAmount = 0;
        }
        const searchContainer = createElement('div', 'search-container', MainPage.regulationContainer);
        const inputSearch: HTMLInputElement = document.createElement('input');
        inputSearch.classList.add('search-field');
        inputSearch.type = 'search';
        inputSearch.placeholder = 'Search goods';
        searchContainer.append(inputSearch);
        const goodsFound = createElement('div', 'goods-found', MainPage.regulationContainer);
        createElement('span', 'goods-found__amount', goodsFound, `${goodsAmount}`);
        createElement('span', 'goods-found__text', goodsFound, ' goods found');
        const viewMode = createElement('div', 'regulation-container__view-mode', MainPage.regulationContainer);
        createElement('div', 'view view-list', viewMode);
        createElement('div', 'view view-block view_active', viewMode);
    }
}

async function filterGoods(filteredObject: FilterValueObject): Promise<Product[] | undefined> {
    try {
        const response = await fetch('./json-data/goods.json');
        const dataGoods = await response.json();
        const goodsArray: Array<Product> = dataGoods.products;
        const filteredArray: Array<Product> = [];
        goodsArray.forEach((product) => {
            let flag = true;

            for (const key in filteredObject) {
                const valuesArrIncome = filteredObject[key as keyFilter];
                const valueProduct = product[key as keyProduct];
                if (key === 'price' || key === 'stock') {
                    if (valuesArrIncome && (valueProduct < valuesArrIncome[0] || valueProduct > valuesArrIncome[1])) {
                        flag = false;
                    }
                } else if (key === 'brand' || key === 'category') {
                    if (valuesArrIncome && !valuesArrIncome.includes(valueProduct as keyFilter)) {
                        flag = false;
                    }
                }
            }

            if (flag === true) {
                filteredArray.push(product);
            }
        });
        return filteredArray;
    } catch (error) {
        console.log(error);
    }
}

export { getMainByUrl };
