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
                <!-- <div class="goods-title">
                    <h1>perfume Oil</h1>
                </div> -->
                <div class="goods-data">
                    <div class="goods-photos">
                        <div class="goods-smallphotos">
                            <img alt="photo" src="assets/images/goods/11/thumbnail.jpg" />
                            <img alt="photo" src="assets/images/goods/11/1.jpg" />
                            <img alt="photo" src="assets/images/goods/11/2.jpg" />
                        </div>
                        <div class="goods-main-photo">
                            <img alt="" src="assets/images/goods/11/thumbnail.jpg" />
                        </div>
                    </div>
                    <div class="goods-about">
                        <p>
                            <span>Description: </span>Mega Discount, Impression of Acqua Di Gio by GiorgioArmani
                            concentrated attar perfume Oil
                        </p>
                        <p><span>Category: </span>smartphones</p>
                        <p><span>Brand: </span>Apple</p>
                        <p><span>Discount: </span>17.94%</p>
                        <p><span>Rating: </span>4.44</p>
                        <p><span>Stock: </span>34</p>
                        <p><span>Price: </span>€13</p>

                        <!-- <div class="goods-about-element">
                            <h3>Description:</h3>
                            <p>
                                Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar
                                perfume Oil
                            </p>
                        </div>
                        <div class="goods-about-element">
                            <h3>Discount Percentage:</h3>
                            <p>8.4</p>
                        </div>
                        <div class="goods-about-element">
                            <h3>Rating:</h3>
                            <p>4.26</p>
                        </div>
                        <div class="goods-about-element">
                            <h3>Stock:</h3>
                            <p>65</p>
                        </div>
                        <div class="goods-about-element">
                            <h3>Brand:</h3>
                            <p>Impression of Acqua Di Gio</p>
                        </div>
                        <div class="goods-about-element">
                            <h3>Category:</h3>
                            <p>fragrances</p>
                        </div> -->
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
