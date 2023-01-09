function createOptions(value = '', textContent: string, parent: HTMLElement): HTMLOptionElement {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = textContent;
    parent.append(option);
    return option;
}

export default createOptions;
