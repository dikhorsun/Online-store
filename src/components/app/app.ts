import Page from '../../templates/page';
import MainPage from '../main/index';
import ProductDetails from '../product-details/index';
import Cart from '../cart/index';
import Header from '../header/index';
import ErrorPage, { ErrorTypes } from '../error/index';

export const enum PageIds {
    MainPage = 'main-page',
    ProductDetails = 'product-details',
    Cart = 'cart',
}

class App {
    private static container: HTMLElement = document.body;
    private static defaultPageId: string = 'current-page';
    private header: Header;

    static renderNewPage(idPage: string) {
        const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
        if (currentPageHTML) {
            currentPageHTML.remove();
        }
        let page: Page | null = null;

        if (idPage === PageIds.MainPage) {
            page = new MainPage(idPage);
        } else if (idPage === PageIds.ProductDetails) {
            page = new ProductDetails(idPage);
        } else if (idPage === PageIds.Cart) {
            page = new Cart(idPage);
        } else {
            page = new ErrorPage(idPage, ErrorTypes.Error_404);
        }

        if (page) {
            const pageHTML = page.render();
            pageHTML.id = App.defaultPageId;
            App.container.append(pageHTML);
        }
    }

    private enableRouteChange() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            App.renderNewPage(hash);
        });
    }

    constructor() {
        this.header = new Header('header', 'header');
    }

    run() {
        App.container.append(this.header.render());
        App.renderNewPage('main-page');
        this.enableRouteChange();
    }
}

export default App;
