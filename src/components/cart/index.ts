import Page from '../../templates/page';
import { createPopup } from '../popup/popup';
import {
    getStorageCounter,
    getSumTotal,
    updateCart,
    getStorageElem,
    getStorageElemCount,
    getStoragePromo,
    setStoragePromo,
    checkPromoInCart,
} from '../storage/localStorage';
import { Product } from '../types/types';
import createElement from '../helper/createElement';
import { promoCods, keyPromo } from '../../json-data/input-id';

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
            <div class="cart__general-price price"></div>
            <div class="cart__general-price cart__general-price-new"></div>
            <div class="cart__general-discounts">
            </div>
            <div class="cart__general-promo">
                <input type="search" placeholder="Promo ex: 'html', 'css'" />
            </div>
            <div class="cart__general-used-promos">
            </div>
            <button type = 'submit' class="btn btn_confirm">BUY</button>
        </div>`;

        const totalNumber = this.container.querySelector('.cart__general-number') as HTMLElement;
        const totaPrice = this.container.querySelector('.price') as HTMLElement;
        const btnBuy = this.container.querySelector('.btn_confirm') as HTMLElement;
        const promoInput = this.container.querySelector('.cart__general-promo input') as HTMLElement;
        totalNumber.innerHTML = `<span>Total products:</span> ${getStorageCounter()}`;
        totaPrice.innerHTML = `<span>Total payable:</span> ${getSumTotal()}$`;

        btnBuy.addEventListener('click', createPopup);
        promoInput.addEventListener('input', this.createPromo);
    }

    createPromo(event: Event) {
        const target = event.target as HTMLInputElement;
        const totalContainer = target.closest('.cart__general') as HTMLElement;
        const totaPrice = totalContainer.querySelector('.price') as HTMLElement;
        const usedPromos = totalContainer.querySelector('.cart__general-used-promos') as HTMLElement;
        const totaPriceNew = totalContainer.querySelector('.cart__general-price-new') as HTMLElement;

        for (const key in promoCods) {
            if (target.value === key) {
                const valuePromo = promoCods[key as keyPromo];
                const promoAdded: boolean = checkPromoInCart(`${key}`);
                if (!promoAdded) {
                    const usedProm = createElement(
                        'div',
                        'used-promo',
                        usedPromos,
                        `"${key}"-cod (${valuePromo}%)     `
                    );
                    usedProm.id = key;
                    const usedPromBtn = createElement('span', '', usedProm, `add`);
                    usedPromBtn.addEventListener('click', addPromo);
                }
            }
        }
        function addPromo(event: Event) {
            const target = event.target as HTMLElement;
            const usedPromTargetId = (target.closest('.used-promo') as HTMLElement).id;
            setStoragePromo(usedPromTargetId);
            target.remove();
            const addedPromArr = totalContainer.querySelectorAll('.cart__general-disc');
            const totaPriceText = totaPrice.textContent as string;
            const addedPromos = totalContainer.querySelector('.cart__general-discounts') as HTMLElement;
            const usedPromArr = totalContainer.querySelectorAll('.used-promo');
            const usedProm = usedPromArr[usedPromArr.length - 1] as HTMLElement;
            const usedPromText = usedProm.textContent;
            const addedProm = createElement('div', 'cart__general-disc', addedPromos, `${usedPromText} added `);
            const addedPromBtn = createElement('span', '', addedProm, `del`);

            totaPriceNew.innerHTML = `<span>Total payable:</span> ${(
                Number(totaPriceText.slice(15, -1)) *
                (1 - 0.1 * (addedPromArr.length + 1))
            ).toFixed(2)}$`;

            totaPrice.classList.add('cart__general-price-old');

            addedPromBtn.addEventListener('click', delPromo);
            function delPromo(event: Event) {
                const target = event.target as HTMLElement;
                const cartGeneralDisc = target.closest('.cart__general-disc') as HTMLElement;
                const addedPromArr = totalContainer.querySelectorAll('.used-promo');
                const promoId = cartGeneralDisc.textContent?.split('"')[1] as string;
                for (let i = 0; i < addedPromArr.length; i++) {
                    if (addedPromArr[i].id === promoId) {
                        addedPromArr[i].remove();
                        setStoragePromo(addedPromArr[i].id);
                    }

                    cartGeneralDisc.remove();
                }

                if (getStoragePromo().length === 0) {
                    totaPriceNew.innerHTML = '';
                    totaPrice.classList.remove('cart__general-price-old');
                }
                if (getStoragePromo().length === 1) {
                    totaPriceNew.innerHTML = `<span>Total payable:</span> ${(
                        Number(totaPriceText.slice(15, -1)) *
                        (1 - 0.1)
                    ).toFixed(2)}$`;
                }
            }
        }
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
                        <button class="btn-minus">-</button>
                        <span class="btn-control-num">${getStorageElemCount(product.id.toString())}</span>
                        <button class="btn-plus">+</button>
                    </div>
                    <div class="about-block">
                        <p><span>Stock: </span><span class="stock">${product.stock}</span></p>
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
        const btnControlNum = card.querySelector('.btn-control-num') as HTMLElement;
        const stocklNum = card.querySelector('.stock') as HTMLElement;
        const btnPlus = card.querySelector('.btn-plus') as HTMLElement;

        if (target.tagName === 'BUTTON') {
            const totaPriceNew = document.querySelector('.cart__general-price-new') as HTMLElement;

            if (target.textContent === '-') {
                btnPlus.removeAttribute('disabled');
                btnControlNum.textContent = `${Number(btnControlNum.textContent) - 1}`;
                updateCart(card.id, target);
                if (btnControlNum.textContent === '0') {
                    updateCart(card.id);
                    main.remove();
                    const page = new Cart('cart');
                    const pageHTML = page.render();
                    pageHTML.id = 'current-page';
                    document.body.append(pageHTML);
                    if (getStorageCounter() === '1') {
                        const main = document.querySelector('.main') as HTMLElement;
                        main.innerHTML = `<div class="cart-empty">Cart is empty</div>`;
                    }
                }
            }
            if (target.textContent === '+') {
                btnControlNum.textContent = `${Number(btnControlNum.textContent) + 1}`;
                updateCart(card.id, target);
                if (btnControlNum.textContent === stocklNum.textContent) {
                    target.setAttribute('disabled', 'true');
                }
            }
        } else if (!card) {
            return;
        } else {
            window.location.hash = `product-details/${card.id}`;
        }
    }

    render() {
        if (getStorageCounter() === '0') {
            createElement('div', 'cart-empty', this.container, 'Cart is empty');
        } else {
            this.createTotalCart();
            this.renderAllGods();
        }
        return this.container;
    }
}

export default Cart;
