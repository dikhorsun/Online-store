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
        console.log(
            'Самооценка: \nСтраница товаров с фильтрами(85): 1.Реализована фильтрация продуктов 30/40. 2.Реализована сортировка продуктов 20/20 3.Реализован текстовый поиск по всем данным продуктов 0/15 4. Реализовано переключение вида найденных продуктов 0/10 (функционал готов, но не успели залить) 5. Реализован роутинг с query-параметрами 10/10 6. Реализованы кнопки сброса и копирования поиска 10/10 7. Реализован блок кол-ва найденных товаров 5/5 8. Поведение карточек найденных товаров 10/10.  \nСтраница корзины товаров (45): 1.Реализован блок отображения добавленных продуктов +5 2.Реализовано увеличение кол-ва конкретного товара и его удаление +10 3.Хранение данных в localStorage +10 4.Реализован промокод блок +10 5.Реализована кнопка открытия модального окна оформления покупки + 5 6.Реализован блок с общей суммой и кол-вом всех выбранных товаров +5  \n Модальное окно оформления товара (50): 1.Реализован блок ввода персональной информации с валидацией +20 2.Реализован блок ввода данных банковской карты с валидацией +20 3.Реализована кнопка завершения заказа +10  \n Страница с описанием товара(40): 1.Реализованы блоки страницы +30 2.Страница открывается в новом окне по ссылке с id/name товара +10;  \nHeader(20): 1.Header содержит корзину товаров +10 2.Header содержит общую сумму покупок +10;  \nСтраница 404(10): 1.Страница существует +6 2.Страница не реагирует на некорректные query-параметры +4 /n Итого 250 баллов'
        );
    }
}

export default App;
