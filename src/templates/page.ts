abstract class Page {
    container: HTMLElement;
    id: string;

    constructor(id: string) {
        this.id = id;
        this.container = document.createElement('main');
        this.container.className = 'main';
    }

    render() {
        return this.container;
    }
}

export default Page;
