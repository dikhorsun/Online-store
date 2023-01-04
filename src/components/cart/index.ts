import Page from '../../templates/page';
import { createPopup } from '../popup/popup';

class Cart extends Page {
    // static TextObject = {
    //     MainTitle: 'cart',
    // };

    constructor(id: string) {
        super(id);
    }

    render() {
        const button = document.createElement('button');
        button.className = 'btn btn_confirm';
        button.type = 'submit';
        button.textContent = 'CONFIRM';
        this.container.append(button);
        button.addEventListener('click', createPopup);
        return this.container;
    }
}

export default Cart;
