import Page from '../../templates/page';
import createElement from '../helper/createElement';
import createOptions from '../helper/createOption';
import { brandInputId } from '../../json-data/input-id';
import { getLabelsBrand, getLabelsCategory } from '../../json-data/label-contents';
import createInputLabelInContainer from '../helper/createInputLabelInContainer';
import { inputBrandListener } from '../filters/filter-brand';
import { Product, CartBtnInner } from '../types/types';
import { getStorageElem, updateCart, checkProductInCart } from '../storage/localStorage';
import { inputCategoryListener } from '../filters/filter-category';

class MainPage extends Page {
    constructor(id: string) {
        super(id);
    }
    static wrapperMain: HTMLElement = createElement('div', 'wrapper wrapper__main');
    static sectionTools: HTMLElement = createElement('section', 'tools', MainPage.wrapperMain);
    static sectionGoods: HTMLElement = createElement('section', 'goods', MainPage.wrapperMain);
    static regulationContainer: HTMLElement = createElement('div', 'regulation-container', MainPage.sectionGoods);
    static cardsContainer: HTMLElement = createElement('div', 'cards-container', MainPage.sectionGoods);

    async renderMainPage() {
        // console.log(this);
        // console.log(MainPage.asd);
        this.renderSectionTools();
        this.renderSectionGoods();
        await this.renderAllGods();
    }

    async renderSectionTools() {
        // sort
        const selectSort = createElement('select', 'tools__sort', MainPage.sectionTools);
        selectSort.id = 'sort-goods';
        const firstOption = createOptions('', 'Sort goods...', selectSort);
        firstOption.setAttribute('selected', 'selected');
        createOptions('priceA', 'By price: low to high', selectSort);
        createOptions('priceD', 'By price: high to low', selectSort);
        createOptions('ratingA', 'By rating: low to high', selectSort);
        createOptions('ratingD', 'By rating: high to low', selectSort);
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
        const button = createElement(
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
            MainPage.cardsContainer.addEventListener('click', (event) => {
                let target = event.target as HTMLElement;
                let card = target.closest('.card-item') as HTMLElement;
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
                    updateCart(card.id);
                } else if (!card) {
                    return;
                } else {
                    window.location.hash = `product-details/${card.id}`;
                }
            });

            return goodsArray;
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        //
        this.container.append(MainPage.wrapperMain);
        this.renderMainPage();
        return this.container;
    }
}

export default MainPage;
