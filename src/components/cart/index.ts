import Page from '../../templates/page';
import { createPopup } from '../popup/popup';
import {
    getStorageCounter,
    getSumTotal,
    updateCart,
    getStorageElem,
    checkProductInCart,
} from '../storage/localStorage';
import { CartBtnInner, Product } from '../types/types';
import createElement from '../helper/createElement';

class Cart extends Page {
    constructor(id: string) {
        super(id);
    }

    createTotalCart() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('cart__wrapper');
        this.container.append(wrapper);
        wrapper.innerHTML = `
        <div class="products__container">
        </div>
        <div class="cart__general">
            <div class="cart__general-price cart__general-number"></div>
            <div class="cart__general-price cart__general-price-new"></div>

            <div class="cart__general-promo">
                <input type="search" placeholder="Promo ex: 'js', 'css'" />
            </div>
            <div class="cart__general-used-promos">
            </div>
            <button type = 'submit' class="btn btn_confirm">BUY</button>
        </div>`;

        const totalNumber = this.container.querySelector('.cart__general-number') as HTMLElement;
        const totaPrice = this.container.querySelector('.cart__general-price-new') as HTMLElement;
        const btnBuy = this.container.querySelector('.btn_confirm') as HTMLElement;
        totalNumber.innerHTML = `<span>Total products:</span> ${getStorageCounter()}`;
        totaPrice.innerHTML = `<span>Total payable:</span> ${getSumTotal()}$`;

        btnBuy.addEventListener('click', createPopup);
    }

    createProductCard(product: Product, i: number) {
        const productsContainer = this.container.querySelector('.products__container') as HTMLElement;
        const goodsDetail = createElement('div', 'goods-detail', productsContainer);
        goodsDetail.id = product.id.toString();

        goodsDetail.innerHTML = `
        <div class="goods-data">
            <div class="goods-number">${i + 1}</div>
            <div class="goods-main-photo">
                <img alt="photo" src="${product.thumbnail}" />
            </div>
            <div class="goods-about">
                <div class="about-blocks">
                    <div class="about-block">
                        <p><span>Category: </span>${product.category}</p>
                        <p><span>Brand: </span>${product.brand}</p>
                    </div>
                    <div class="about-block">
                        <p><span>Discount: </span>${product.discountPercentage}%</p>
                        <p><span>Rating: </span>${product.rating}</p>
                    </div>
                </div>
                <p class="description">
                ${product.description}
                </p>
            </div>
            <div class="goods-buy">
                <div class="goods-buy-btn">
                    <div class="btn-control">
                        <button>-</button>
                        <span class="btn-control-num">1</span>
                        <button>+</button>
                    </div>
                    <div class="about-block">
                        <p><span>Stock: </span>${product.stock}</p>
                        <p><span>Price: </span>${product.price}$</p>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    async renderAllGods(): Promise<Product[] | undefined> {
        const productsContainer = this.container.querySelector('.products__container') as HTMLElement;
        try {
            const response = await fetch('./json-data/goods.json');
            const dataGoods = await response.json();
            const goodsArray: Array<Product> = dataGoods.products;
            const productsList: string[] = getStorageElem();
            for (let i = 0; i < productsList.length; i += 1) {
                this.createProductCard(
                    goodsArray.filter((obj: Product) => obj.id.toString() === productsList[i])[0],
                    i
                );
            }

            productsContainer.addEventListener('click', this.cartListener);

            return goodsArray;
        } catch (error) {
            console.log(error);
        }
    }
    cartListener(event: MouseEvent): void {
        const target = event.target as HTMLElement;
        const card = target.closest('.goods-detail') as HTMLElement;
        const main = target.closest('.main') as HTMLElement;
        const productsContainer = target.closest('.products__container') as HTMLElement;
        const btnControlNum = card.querySelector('.btn-control-num') as HTMLElement;

        if (target.tagName === 'BUTTON') {
            if (target.textContent === '-') {
                btnControlNum.textContent = `${Number(btnControlNum.textContent) - 1}`;
                if (btnControlNum.textContent === '0') {
                    updateCart(card.id);
                    main.remove();
                    const page = new Cart('cart');
                    const pageHTML = page.render();
                    pageHTML.id = 'current-page';
                    document.body.append(pageHTML);
                    console.log(getStorageCounter());

                    if (getStorageCounter() === '1') {
                        const main = document.querySelector('.main') as HTMLElement;
                        main.innerHTML = `<div class="cart-empty">Cart is empty</div>`;
                    }
                }
            }
            if (target.textContent === '+') {
                btnControlNum.textContent = `${Number(btnControlNum.textContent) + 1}`;
            }
        } else if (!card) {
            return;
        } else {
            window.location.hash = `product-details/${card.id}`;
        }
    }

    render() {
        if (getStorageCounter() === '0') {
            const cartEmptyDiv = createElement('div', 'cart-empty', this.container, 'Cart is empty');
        } else {
            this.createTotalCart();
            this.renderAllGods();
        }
        return this.container;
    }
}

export default Cart;
