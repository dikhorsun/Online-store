import Page from '../../templates/page';

class MainPage extends Page {
    static TextObject = {
        MainTitle: 'main-page',
    };

    constructor(id: string) {
        super(id);
    }

    //   renderMainPage() {
    //  вот здесь прописать код по рендерингу
    // }

    render() {
        const title = this.createHeaderTitle(MainPage.TextObject.MainTitle);
        this.container.append(title);
        return this.container;
    }
}

export default MainPage;
