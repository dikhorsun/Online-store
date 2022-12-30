function createElement(
    tag: string,
    classNames: string,
    parent?: HTMLElement | null,
    textContent?: string
): HTMLElement {
    let element = null;
    try {
        element = document.createElement(tag);
    } catch (error) {
        throw new Error('Unable to create HTMLElement! You should give a proper HTML tag name');
    }

    if (classNames) element.classList.add(...classNames.split(' '));

    if (textContent) {
        element.textContent = textContent;
    }

    if (parent) {
        parent.appendChild(element);
    }

    return element;
}

export default createElement;
