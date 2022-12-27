import Page from '../../templates/page';

class MainPage extends Page {
    static TextObject = {
        MainTitle: 'main-page',
    };

    constructor(id: string) {
        super(id);
    }

    //   renderMainPage() {
    //  вот здесь прописать код по рендерингу, например
    // const pageButtons = document.createElement('div');
    // Buttons.forEach((button) => {
    //   const buttonHTML = document.createElement('a');
    //   buttonHTML.href = `#${button.id}`;
    //   buttonHTML.innerText = button.text;
    //   pageButtons.append(buttonHTML);
    // });
    // this.container.append(pageButtons);
    // }

    render() {
        const title = this.createHeaderTitle(MainPage.TextObject.MainTitle);
        this.container.append(title);
        // а здесь вместо 2-х строчек выше просто вызываешь метод this.renderMainPage()
        return this.container;
    }
}

export default MainPage;
