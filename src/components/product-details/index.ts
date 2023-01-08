import Page from '../../templates/page';
import { CartBtnInner, Product } from '../types/types';
import { getStorageElem, updateCart, checkProductInCart } from '../storage/localStorage';
import { createPopup } from '../popup/popup';

class ProductDetails extends Page {
    static TextObject = {
        MainTitle: 'product-details',
    };

    constructor(id: string) {
        super(id);
    }

    async renderProductDetails() {
        try {
            const response = await fetch('./json-data/goods.json');
            const dataGoods = await response.json();
            const idProduct = window.location.hash.slice(1).split('/')[1];
            const product = dataGoods.products.filter((obj: Product) => obj.id.toString() === idProduct)[0];
            const wrapper = document.createElement('div');
            wrapper.classList.add('product__wrapper');

            const productAdded: boolean = checkProductInCart(`${idProduct}`);
            const buttonText = productAdded ? CartBtnInner.remove : CartBtnInner.add;

            wrapper.innerHTML = `     <div class="product__container">
            <div class="product__nav">
                <a href="#main-page">ONLINE STORE</a> &gt;&gt;&gt; <a>${product.category.toUpperCase()}</a> &gt;&gt;&gt;
                <a>${product.brand.toUpperCase()}</a> &gt;&gt;&gt;
                <a>${product.title.toUpperCase()}</a>
            </div>
            <div class="goods-detail">
                <div class="goods-data">
                    <div class="goods-photos">
                        <div class="goods-smallphotos">
                            <img alt="photo" src="${product.thumbnail}" />
                            <img alt="photo" src="${product.background1}" />
                            <img alt="photo" src="${product.background2}" />
                        </div>
                        <div class="goods-main-photo">
                            <img alt="main photo" src="${product.thumbnail}" />
                        </div>
                    </div>
                    <div class="goods-about">
                        <p> <span>${product.description}</p>
                        <p><span>Category: </span>${product.category}</p>
                        <p><span>Brand: </span>${product.brand}</p>
                        <p><span>Discount: </span>${product.discountPercentage}%</p>
                        <p><span>Rating: </span>${product.rating}</p>
                        <p><span>Stock: </span>${product.stock}</p>
                        <p><span>Price: </span>${product.price}$</p>
                    </div>
                    <div class="goods-buy">
                        <div class="goods-buy-btns">
                            <button class="btn-add goods-buy-button${
                                productAdded ? ' button-added' : ''
                            }" >${buttonText}</button>
                            <button id = 'buttonBuy' class="goods-buy-button">BUY NOW</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
            this.container.append(wrapper);
            const smallphotosContainer: Element | null = this.container.querySelector('.goods-smallphotos');
            const mainPhoto = this.container.querySelector('.goods-main-photo img');
            (smallphotosContainer as Element).addEventListener('click', (event) => {
                const smallphoto = (event.target as HTMLImageElement).closest('.goods-smallphotos');
                if (!smallphoto) return;
                (mainPhoto as HTMLImageElement).src = (event.target as HTMLImageElement).src;
            });
            const buttonAdd = this.container.querySelector('.goods-buy-button');
            buttonAdd?.addEventListener('click', (event) => {
                const target = event.target as HTMLElement;
                const productsList: string[] = getStorageElem();
                const productAdded: boolean = productsList.includes(idProduct);
                if (!productAdded) {
                    buttonAdd.classList.add('button-added');
                    buttonAdd.innerHTML = CartBtnInner.remove;
                } else {
                    buttonAdd.classList.remove('button-added');
                    buttonAdd.innerHTML = CartBtnInner.add;
                }
                updateCart(idProduct, target);
            });
            const buttonBuy = this.container.querySelector('#buttonBuy');
            buttonBuy?.addEventListener('click', (event) => {
                const target = event.target as HTMLElement;
                updateCart(idProduct, target);
                window.location.hash = `cart`;
                setTimeout(createPopup, 0);
            });

            return wrapper;
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        this.renderProductDetails();
        return this.container;
    }
}

export default ProductDetails;
