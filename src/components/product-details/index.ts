import Page from '../../templates/page';

class ProductDetails extends Page {
    static TextObject = {
        MainTitle: 'product-details',
    };

    constructor(id: string) {
        super(id);
    }

    render() {
        const title = this.createHeaderTitle(ProductDetails.TextObject.MainTitle);
        this.container.append(title);
        return this.container;
    }
}

export default ProductDetails;
