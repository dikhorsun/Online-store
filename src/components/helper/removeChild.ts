function removeAllChilds(parent: HTMLElement): void {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

export default removeAllChilds;
