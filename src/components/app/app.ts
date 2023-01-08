import Page from '../../templates/page';
import Header from '../header/index';
import Cart from '../cart/index';
import ProductDetails from '../product-details/index';
import MainPage from '../main/index';
// import { getMainByUrl } from '../main/renderByUrl/renderMain';

import ErrorPage, { ErrorTypes } from '../error/index';

export const enum PageIds {
    MainPage = 'main-page',
    ProductDetails = 'product-details',
    Cart = 'cart',
}

class App {
    private static container: HTMLElement = document.body;
    private static defaultPageId = 'current-page';
    private header: Header;

    static renderNewPage(idPage: string, currentUrl?: string) {
        const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
        if (currentPageHTML) {
            currentPageHTML.remove();
        }
        let page: Page | null = null;

        if (idPage === PageIds.MainPage && currentUrl) {
            page = new MainPage(idPage, currentUrl);
        } else if (idPage === PageIds.MainPage) {
            page = new MainPage(idPage);
        } else if (idPage.split('/')[0] === PageIds.ProductDetails) {
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
            const currentUrl = window.location.href;
            const currentHash = window.location.hash;
            if (currentHash.slice(1).split('?')[0] !== 'main-page') {
                const hash = window.location.hash.slice(1).split('?')[0];
                App.renderNewPage(hash);
            } else {
                const hash = 'main-page';
                App.renderNewPage(hash, currentUrl);

            }
        });
    }

    constructor() {
        this.header = new Header('header', 'header');
    }

    run() {
        App.container.append(this.header.render());

        let pageRout = '';
        if (!window.location.hash || window.location.hash.slice(1).split('?')[0] == 'main-page') {
            pageRout = PageIds.MainPage;
        } else if (window.location.hash.slice(1).split('/')[0] === PageIds.ProductDetails) {
            pageRout = PageIds.ProductDetails;
        } else if (window.location.hash.slice(1) === PageIds.Cart) {
            pageRout = PageIds.Cart;
        } else {
            pageRout = window.location.hash.slice(1);
        }
        App.renderNewPage(pageRout);

        this.enableRouteChange();
    }
}

export default App;
