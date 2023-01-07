import Component from '../../templates/components';
import { PageIds } from '../app/app';
import { getStorageCounter, getSumTotal } from '../storage/localStorage';
import createElement from '../helper/createElement';

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
        const headerWrapper = createElement('div', 'wrapper header__wrapper', this.container);
        headerWrapper.innerHTML = `
      <div class="header-container">
      <div class="logo">
          <h1 class="logo__text">Online-store</h1>
          <a href="" class="logo__link"
              ><img src="./assets/images/logo.png" alt="red wings" class="logo__image"
          /></a>
      </div>
      <div class="header-container__cost-container">
          <span class="header-container__cost">0</span>
          <span> $</span>
      </div>

      <div class="header-container__cart">
          <a href="#cart" class="logo__cart-link"></a>
          <div class="header-container__amount">0</div>
      </div>
  </div>
      `;

        const logo = this.container.querySelector('.logo') as HTMLDivElement | null;
        if (logo) {
            console.log('hi');
            logo.addEventListener('click', () => {
                if (localStorage.getItem('urlMain') !== null) {
                    const url = localStorage.getItem('urlMain');
                    if (url) {
                        const hash = url.split('#')[1];
                        console.log(hash);
                        location.hash = hash;
                    }
                } else {
                    location.hash = 'main-page';
                }
            });
        }

        // const headerWrapperTemp = document.querySelector('#headerWrapperTemp') as HTMLTemplateElement;
        // const headerWrapperClone = headerWrapperTemp.content.cloneNode(true) as HTMLTemplateElement;

        // this.container.prepend(headerWrapperClone);
        const cartCounter = this.container.querySelector('.header-container__amount') as HTMLTemplateElement;
        const totalSum = this.container.querySelector('.header-container__cost') as HTMLTemplateElement;
        cartCounter.textContent = getStorageCounter();
        totalSum.textContent = getSumTotal();
    }

    // addListenerToLogo() {
    //     const logoHeader = document.querySelector('.logo');
    //     logoHeader?.addEventListener('click', () => {
    //         console.log('logoHeader');
    //         if (localStorage.getItem('urlMain') !== null) {
    //             const url = localStorage.getItem('urlMain');
    //             if (url) {
    //                 window.location.hash = url?.split('#')[1];
    //             }
    //         } else {
    //             window.location.hash = 'main-page';
    //         }
    //     });
    // }

    render() {
        this.renderHeader();
        return this.container;
    }
}

export default Header;
