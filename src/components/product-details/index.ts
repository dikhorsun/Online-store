import Page from '../../templates/page';

import createElement from '../helper/createElement';
import { inputBrandListener } from '../filters/filter-brand';
import { Product } from '../types/types';

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
            const product = dataGoods.products[idProduct];
            // const product = dataGoods.products.filter(item => item.id = event?.target.id)
            const wrapper = document.createElement('div');
            wrapper.classList.add('product__wrapper');
            // createElement('div', 'product__container', wrapper);

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
                        <p><span>Price: </span>€${product.price}</p>
                    </div>
                    <div class="goods-buy">
                        <div class="goods-buy-btn">
                            <button>ADD TO CART</button>
                            <button>BUY</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
            this.container.append(wrapper);
            const smallphotosContainer: Element | null = this.container.querySelector('.goods-smallphotos');
            const mainPhoto = this.container.querySelector('.goods-main-photo img');
            (smallphotosContainer as Element).addEventListener('click', (event) => {
                let smallphoto = (event.target as HTMLImageElement).closest('.goods-smallphotos');
                if (!smallphoto) return;
                console.log(mainPhoto);
                (mainPhoto as HTMLImageElement).src = (event.target as HTMLImageElement).src;
            });
            return wrapper;
            // const goodsArray: Array<Product> = dataGoods.products;
            // for (let i = 0; i < goodsArray.length; i += 1) {
            //     this.generateCard(goodsArray[i]);
            // }
            // return goodsArray;
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        this.renderProductDetails();
        // const wrapper = this.renderBreadcrumbs('0');
        // console.log(wrapper);
        // // this.container.append(wrapper);
        return this.container;
    }
}

export default ProductDetails;
