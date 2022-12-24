type Product = {
    brand: string;
    category: string;
    description: string;
    discountPercentage: number;
    id: number;
    images: string[];
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
    title: string;
};

const brandsCheckedArr: string[] = [];
const filterBrandInput = document.querySelectorAll('.filter-brand__input') as NodeListOf<HTMLInputElement>;
const cardsContainer = document.querySelector('.cards-container') as HTMLDivElement;

filterBrandInput.forEach((input: HTMLInputElement): void => {
    input.addEventListener('change', async () => {
        const inputId = input.id;
        const label = document.querySelector(`label[for=${inputId}`) as HTMLLabelElement;
        if (input.checked) {
            const labelTextContent: string = label.textContent || '';
            brandsCheckedArr.push(labelTextContent);
            cardsContainer.innerHTML = '';
            const filteredJsonGoods = await filterGoodsByBrand();
            if (filteredJsonGoods) {
                for (let i = 0; i < filteredJsonGoods.length; i += 1) {
                    generateCard(filteredJsonGoods[i]);
                }
            }
        } else {
            const indexOfRemovedBrand = brandsCheckedArr.indexOf(`${label?.textContent}`);
            brandsCheckedArr.splice(indexOfRemovedBrand, 1);
            cardsContainer.innerHTML = '';
            if (brandsCheckedArr.length === 0) {
                const allGoods = await renderAllGods();
            } else {
                const filteredJsonGoods = await filterGoodsByBrand();
                if (filteredJsonGoods) {
                    for (let i = 0; i < filteredJsonGoods.length; i += 1) {
                        generateCard(filteredJsonGoods[i]);
                    }
                }
            }
        }
    });
});

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

async function filterGoodsByBrand(): Promise<Product[] | undefined> {
    try {
        const response = await fetch('./json-data/goods.json');
        const dataGoods = await response.json();
        const goodsArray: Array<Product> = dataGoods.products;
        const filterdByBrand: Array<Product> = goodsArray.filter((product: Product) =>
            brandsCheckedArr.includes(product.brand)
        );
        return filterdByBrand;
    } catch (error) {
        console.log(error);
    }
}

function generateCard(product: Product) {
    const card = document.createElement('div');
    card.classList.add('card-item');
    const cardImage = document.createElement('div');
    cardImage.classList.add('card-item__image');
    cardImage.style.background = `url('../assets/images/goods/${product.id}/thumbnail.jpg') center center / cover`;
    card.append(cardImage);

    const cardTitle = document.createElement('p');
    cardTitle.classList.add('card-item__title');
    cardTitle.textContent = product.title;
    card.append(cardTitle);

    const cardPrice = document.createElement('p');
    cardPrice.classList.add('card-item__price');
    cardPrice.textContent = `Price: ${product.price}`;
    card.append(cardPrice);

    const cardRating = document.createElement('p');
    cardRating.classList.add('card-item__rating');
    cardRating.textContent = `Rating: ${product.rating}`;
    card.append(cardRating);

    const cardStock = document.createElement('p');
    cardStock.classList.add('card-item__stock');
    cardStock.textContent = `Stock: ${product.stock}`;
    card.append(cardStock);

    const cardButton = document.createElement('button');
    cardButton.classList.add('button');
    cardButton.classList.add('card-item__add-to-cart');
    cardButton.textContent = 'Add to cart';
    card.append(cardButton);

    cardsContainer.append(card);
    return card;
}
