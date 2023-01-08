function createInputLabelInContainer(
    parent: HTMLElement,
    classContainer: string,
    inputType: string,
    inputClass: string,
    inputId: string,
    inputListener: (this: HTMLInputElement) => void,
    labelTextContent: string
): HTMLDivElement {
    const containerForInput = document.createElement('div');
    containerForInput.classList.add(classContainer);
    const input: HTMLInputElement = document.createElement('input');
    if (input) {
        input.type = inputType;
        input.classList.add(inputClass);
        input.id = inputId;
        input.addEventListener('change', inputListener);
    }
    containerForInput.append(input);
    const label: HTMLLabelElement = document.createElement('label');
    if (label) {
        label.setAttribute('for', `${inputId}`);
        label.textContent = labelTextContent;
    }
    containerForInput.append(label);
    parent.append(containerForInput);
    return containerForInput;
}

export default createInputLabelInContainer;
