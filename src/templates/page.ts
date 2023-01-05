abstract class Page {
    container: HTMLElement;

    constructor(id: string) {
        this.container = document.createElement('main');
        this.container.className = 'main';
    }

    render() {
        return this.container;
    }
}

export default Page;
