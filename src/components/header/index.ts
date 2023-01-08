import Component from '../../templates/components';
import { PageIds } from '../app/app';
import { getStorageCounter, getSumTotal } from '../storage/localStorage';

const Buttons = [
    {
        id: PageIds.MainPage,
        text: 'main-page',
    },
    {
        id: PageIds.ProductDetails,
        text: 'product-details',
    },
    {
        id: PageIds.Cart,
        text: 'cart',
    },
];

class Header extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderHeader() {
        const headerWrapperTemp = document.querySelector('#headerWrapperTemp') as HTMLTemplateElement;
        const headerWrapperClone = headerWrapperTemp.content.cloneNode(true) as HTMLTemplateElement;

        this.container.prepend(headerWrapperClone);

        const cartCounter = this.container.querySelector('.header-container__amount') as HTMLTemplateElement;
        const totalSum = this.container.querySelector('.header-container__cost') as HTMLTemplateElement;
        cartCounter.textContent = getStorageCounter();
        totalSum.textContent = getSumTotal();
    }

    render() {
        this.renderHeader();
        return this.container;
    }
}

export default Header;
