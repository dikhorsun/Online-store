import { Product } from '../types/types';
import createElement from '../helper/createElement';
import MainPage from '../main/index';
import { addQuery, removeQuery } from '../main/query-params/query';
import { categoriesCheckedArr } from './filter-category';

// const brandsCheckedArr: string[] = [];
// const cardsContainer = document.querySelector('.cards-container') as HTMLDivElement;
// const brandsInputIdArr: string[] = [];

// async function inputBrandListener(this: HTMLInputElement) {
//     const inputId = this.id;
//     const label = document.querySelector(`label[for=${inputId}]`) as HTMLLabelElement;
//     if (this.checked) {
//         brandsInputIdArr.push(inputId);
//         addQuery(brandsInputIdArr, 'brand');
//         const labelTextContent: string = label.textContent || '';
//         brandsCheckedArr.push(labelTextContent);
//         MainPage.cardsContainer.innerHTML = '';

//         const filteredJsonGoods = await filterGoodsByBrand();
//         if (filteredJsonGoods) {
//             for (let i = 0; i < filteredJsonGoods.length; i += 1) {
//                 generateCard(filteredJsonGoods[i]);
//             }
//         }
//     } else {
//         const indexOfRemovedBrand = brandsCheckedArr.indexOf(`${label?.textContent}`);
//         brandsInputIdArr.splice(indexOfRemovedBrand, 1);
//         removeQuery(brandsInputIdArr, 'brand');
//         brandsCheckedArr.splice(indexOfRemovedBrand, 1);
//         MainPage.cardsContainer.innerHTML = '';
//         if (brandsCheckedArr.length === 0) {
//             MainPage.sectionTools.innerHTML = '';
//             MainPage.regulationContainer.innerHTML = '';
//         } else {
//             const filteredJsonGoods = await filterGoodsByBrand();
//             if (filteredJsonGoods) {
//                 for (let i = 0; i < filteredJsonGoods.length; i += 1) {
//                     generateCard(filteredJsonGoods[i]);
//                 }
//             }
//         }
//     }
// }

const brandsInputIdArr: string[] = [];
const brandsCheckedArr: string[] = [];

function inputBrandListener(this: HTMLInputElement) {
    const inputId = this.id;
    const label = document.querySelector(`label[for=${inputId}]`) as HTMLLabelElement;
    if (this.checked) {
        brandsInputIdArr.push(inputId);
        addQuery(brandsInputIdArr, 'brand');
        const labelTextContent: string = label.textContent || '';
        brandsCheckedArr.push(labelTextContent);
        MainPage.cardsContainer.innerHTML = '';
    } else {
        const indexOfRemovedBrand = brandsCheckedArr.indexOf(`${label?.textContent}`);
        brandsInputIdArr.splice(indexOfRemovedBrand, 1);
        removeQuery(brandsInputIdArr, 'brand');
        brandsCheckedArr.splice(indexOfRemovedBrand, 1);

        if (brandsCheckedArr.length === 0 && categoriesCheckedArr.length === 0) {
            MainPage.sectionTools.innerHTML = '';
            MainPage.regulationContainer.innerHTML = '';
        }
    }
}

async function renderAllGods(): Promise<Product[] | undefined> {
    try {
        const response = await fetch('./json-data/goods.json');
        const dataGoods = await response.json();
        const goodsArray: Array<Product> = dataGoods.products;
        for (let i = 0; i < goodsArray.length; i += 1) {
            generateCard(goodsArray[i]);
        }
        return goodsArray;
    } catch (error) {
        console.log(error);
    }
}

// async function filterGoodsByBrand(): Promise<Product[] | undefined> {
//     try {
//         const response = await fetch('./json-data/goods.json');
//         const dataGoods = await response.json();
//         const goodsArray: Array<Product> = dataGoods.products;
//         const filterdByBrand: Array<Product> = goodsArray.filter((product: Product) =>
//             brandsCheckedArr.includes(product.brand)
//         );
//         return filterdByBrand;
//     } catch (error) {
//         console.log(error);
//     }
// }

function generateCard(product: Product) {
    const card = document.createElement('div');
    card.classList.add('card-item');

    const cardImage = createElement('div', 'card-item__image', card);
    cardImage.style.background = `url('${product.thumbnail}') center center / cover`;

    createElement('p', 'card-item__title', card, product.title);
    createElement('p', 'card-item__price', card, `Price: ${product.price}`);
    createElement('p', 'card-item__rating', card, `Rating: ${product.rating}`);
    createElement('p', 'card-item__stock', card, `Stock: ${product.stock}`);
    createElement('button', 'button card-item__add-to-cart', card, 'Add to cart');

    MainPage.cardsContainer.append(card);
    return card;
}

export { brandsCheckedArr, inputBrandListener, renderAllGods, generateCard };
