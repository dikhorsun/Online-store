import Page from '../../templates/page';
import createElement from '../helper/createElement';
import { brandInputId } from '../../json-data/input-id';
import { getLabelsBrand, getLabelsCategory } from '../../json-data/label-contents';
import createInputLabelInContainer from '../helper/createInputLabelInContainer';
import { inputBrandListener } from '../filters/filter-brand';
import { Product, CartBtnInner } from '../types/types';
import { getStorageElem, updateCart, checkProductInCart } from '../storage/localStorage';
import { inputCategoryListener } from '../filters/filter-category';
import { renderFilterPrice, renderFilterStock, renderSelect } from '../helper/renderTools';
import { getMainByUrl } from './renderByUrl/renderMain';
import changeBtnStyleForSecond from '../helper/changeBtnStyleForSecond';
import removeAllChilds from '../helper/removeChild';

class MainPage extends Page {
    static url: string;

    constructor(id: string, url?: string) {
        super(id);
        if (url) MainPage.url = url;
    }
    static wrapperMain: HTMLElement = createElement('div', 'wrapper wrapper__main');
    static sectionTools: HTMLElement = createElement('section', 'tools', MainPage.wrapperMain);
    static sectionGoods: HTMLElement = createElement('section', 'goods', MainPage.wrapperMain);
    static regulationContainer: HTMLElement = createElement('div', 'regulation-container', MainPage.sectionGoods);
    static cardsContainer: HTMLElement = createElement('div', 'cards-container', MainPage.sectionGoods);

    isQueryInUrl(url: string) {
        const splitedUrl = url.split('#');
        if (splitedUrl[1].includes('?')) {
            return true;
        } else {
            return false;
        }
    }

    async renderMainPage() {
        removeAllChilds(MainPage.sectionTools);
        removeAllChilds(MainPage.regulationContainer);
        removeAllChilds(MainPage.cardsContainer);
        // MainPage.sectionTools.innerHTML = '';
        // MainPage.regulationContainer.innerHTML = '';
        // MainPage.cardsContainer.innerHTML = '';
        this.renderSectionTools();
        this.renderSectionGoods();
        await this.renderAllGods();
    }

    async renderSectionTools() {
        // sort
        renderSelect();
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
        // fieldset with category inputs
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
        // filter price
        renderFilterPrice(['0', '100']);
        // filter stock
        renderFilterStock(['0', '100']);
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
        return MainPage.sectionTools;
    }

    renderSectionGoods() {
        const searchContainer = createElement('div', 'search-container', MainPage.regulationContainer);
        const inputSearch: HTMLInputElement = document.createElement('input');
        inputSearch.classList.add('search-field');
        inputSearch.type = 'search';
        inputSearch.placeholder = 'Search goods';
        searchContainer.append(inputSearch);
        const goodsFound = createElement('div', 'goods-found', MainPage.regulationContainer);
        createElement('span', 'goods-found__amount', goodsFound, '0');
        createElement('span', 'goods-found__text', goodsFound, ' goods found');
        const viewMode = createElement('div', 'regulation-container__view-mode', MainPage.regulationContainer);
        createElement('div', 'view view-list', viewMode);
        createElement('div', 'view view-block view_active', viewMode);
    }

    generateCard(product: Product) {
        const card = document.createElement('div');
        card.classList.add('card-item');
        card.id = product.id.toString();

        const cardImage = createElement('div', 'card-item__image', card);
        cardImage.style.background = `url('${product.thumbnail}') center center / cover`;

        createElement('p', 'card-item__title', card, product.title);
        createElement('p', 'card-item__price', card, `Price: ${product.price}`);
        createElement('p', 'card-item__rating', card, `Rating: ${product.rating}`);
        createElement('p', 'card-item__stock', card, `Stock: ${product.stock}`);

        const productAdded: boolean = checkProductInCart(`${product.id}`);
        const buttonText = productAdded ? CartBtnInner.remove : CartBtnInner.add;
        createElement(
            'button',
            `button card-item__add-to-cart${productAdded ? ' button-added' : ''}`,
            card,
            `${buttonText}`
        );
        MainPage.cardsContainer.append(card);
        return card;
    }

    async renderAllGods(): Promise<Product[] | undefined> {
        try {
            const response = await fetch('./json-data/goods.json');
            const dataGoods = await response.json();
            const goodsArray: Array<Product> = dataGoods.products;
            for (let i = 0; i < goodsArray.length; i += 1) {
                this.generateCard(goodsArray[i]);
            }
            MainPage.cardsContainer.addEventListener('click', this.cartListener);

            return goodsArray;
        } catch (error) {
            console.log(error);
        }
    }
    cartListener(event: MouseEvent): void {
        const target = event.target as HTMLElement;
        const card = target.closest('.card-item') as HTMLElement;
        if (target.tagName === 'BUTTON') {
            const productsList: string[] = getStorageElem();
            const productAdded: boolean = productsList.includes(card.id);
            if (!productAdded) {
                target.classList.add('button-added');
                target.innerHTML = CartBtnInner.remove;
            } else {
                target.classList.remove('button-added');
                target.innerHTML = CartBtnInner.add;
            }
            updateCart(card.id, target);
        } else if (!card) {
            return;
        } else {
            window.location.hash = `product-details/${card.id}`;
        }
    }
    render() {
        if (MainPage.url && this.isQueryInUrl(MainPage.url)) {
            // location.href = MainPage.url;
            getMainByUrl(MainPage.url);
            this.container.append(MainPage.wrapperMain);
        } else if (!MainPage.url && localStorage.getItem('urlMain')) {
            const url = localStorage.getItem('urlMain');
            if (url) {
                location.href = url;
                getMainByUrl(url);
                this.container.append(MainPage.wrapperMain);
            }
        } else {
            this.renderMainPage();
            this.container.append(MainPage.wrapperMain);
        }

        return this.container;
    }
}

export default MainPage;
