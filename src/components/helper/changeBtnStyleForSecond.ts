function changeBtnStyleForSecond(button: HTMLButtonElement): void {
    button.classList.add('button_copied');
    button.textContent = 'Copied!';
    setTimeout(() => {
        button.classList.remove('button_copied');
        button.textContent = 'Copy settings!';
    }, 2000);
}

export default changeBtnStyleForSecond;
