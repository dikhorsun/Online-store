function createInputRange(
    tag: 'input',
    type: 'range',
    classNames: string,
    value: string,
    max: string,
    min: string,
    step: string,
    inputListener: (this: HTMLInputElement) => void,
    parent?: HTMLElement | null
): HTMLInputElement {
    let input = null;
    try {
        input = document.createElement(tag);
    } catch (error) {
        throw new Error('Unable to create input range');
    }

    input.setAttribute('type', type);

    if (classNames) input.classList.add(...classNames.split(' '));

    input.setAttribute('value', value);
    input.setAttribute('max', max);
    input.setAttribute('min', min);
    input.setAttribute('step', step);

    input.addEventListener('change', inputListener);

    if (parent) {
        parent.appendChild(input);
    }

    return input;
}

export default createInputRange;
