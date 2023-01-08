abstract class Page {
    container: HTMLElement;
    // id: string

    constructor(id: string) {
        this.container = document.createElement('main');
        this.container.className = 'main';
        // this.id = id;
    }

    render() {
        return this.container;
    }
}

export default Page;
