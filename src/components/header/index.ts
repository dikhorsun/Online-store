import Component from '../../templates/components';
import { PageIds } from '../app/app';
import { getStorageCounter, getSumTotal } from '../storage/localStorage';
import createElement from '../helper/createElement';

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
          <a href="#main-page" class="logo__link"
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
