function createPopup() {
    const body = document.querySelector('body') as HTMLBodyElement;
    const popupItemTemp = document.querySelector('#popupItemTemp') as HTMLTemplateElement;
    const popupClone = popupItemTemp.content.cloneNode(true) as HTMLTemplateElement;
    const popupContent = popupClone.querySelector('.popup-content') as Element;

    const popupForm = popupClone.querySelector('.popup-form') as Element;
    const inputs = popupForm.querySelectorAll('input');
    const cardNumber = popupForm.querySelector('.number') as HTMLInputElement;
    const cardImg = popupForm.querySelector('.number img') as HTMLInputElement;
    const dateCard = popupForm.querySelector('.date-data input') as HTMLInputElement;
    const cvvData = popupForm.querySelector('.cvv-data input') as HTMLInputElement;

    const wrapPopup = document.createElement('div');
    wrapPopup.classList.add('popup');
    wrapPopup.innerHTML = '<div class="popup_back"></div>';
    const wrapClose = document.createElement('div');
    wrapClose.innerHTML = '<div class="popup_close"></div>';
    popupContent.append(wrapClose);
    wrapPopup.prepend(popupClone);
    body.prepend(wrapPopup);
    body.classList.add('scroll-none');

    function popUpClose() {
        wrapPopup.remove();
        body.classList.remove('scroll-none');
    }
    const popup_back = document.querySelector('.popup_back') as Element;
    const popup_close = document.querySelector('.popup_close') as Element;
    popup_back.addEventListener('click', popUpClose);
    popup_close.addEventListener('click', popUpClose);
    window.addEventListener('hashchange', popUpClose);

    popupForm.addEventListener('submit', (even) => {
        validateForm(even);
    });
    inputs.forEach((elem: HTMLInputElement) => {
        elem.addEventListener('blur', () => {
            validateElem(elem);
        });
    });

    cardNumber.addEventListener('keydown', (even) => {
        validateCardNumber(even);
    });
    dateCard.addEventListener('keydown', (even) => {
        validateCardNumber(even);
    });
    cvvData.addEventListener('keydown', (even) => {
        validateCardNumber(even);
    });

    cardNumber.addEventListener('input', (even) => {
        createMaskCardNumber(even);
    });
    dateCard.addEventListener('input', (even) => {
        createMaskDateCard(even);
    });
    cvvData.addEventListener('input', (even) => {
        createMaskCvvData(even);
    });

    function createMaskCardNumber(even: Event) {
        const evenTarget = even.target as HTMLInputElement;

        if ((evenTarget.value as string)[0] == '3') {
            cardImg.src = './assets/images/american.png';
        } else if ((evenTarget.value as string)[0] == '4') {
            cardImg.src = './assets/images/visa.png';
        } else if ((evenTarget.value as string)[0] == '5') {
            cardImg.src = './assets/images/mastercard.png';
        } else {
            cardImg.src = './assets/images/card.png';
        }
        const vcc = evenTarget.value.replace(/\D/g, '');
        evenTarget.value = '';
        for (let i = 0; i < vcc.length; i++) {
            evenTarget.value += (i % 4 == 0 && i != 0 ? ' ' : '') + vcc[i];
        }
        if (evenTarget.value.length > 19) evenTarget.value = (evenTarget.value as string).slice(0, 19);
    }

    function createMaskDateCard(even: Event) {
        const evenTarget = even.target as HTMLInputElement;
        const vcc = evenTarget.value.replace(/\D/g, '');
        evenTarget.value = '';
        for (let i = 0; i < vcc.length; i++) {
            evenTarget.value += (i % 2 == 0 && i != 0 ? '/' : '') + vcc[i];
        }
        if (evenTarget.value.length > 5) evenTarget.value = (evenTarget.value as string).slice(0, 5);
    }

    function createMaskCvvData(even: Event) {
        const evenTarget = even.target as HTMLInputElement;
        if (evenTarget.value.length > 3) evenTarget.value = (evenTarget.value as string).slice(0, 3);
    }

    function validateElem(elem: HTMLInputElement) {
        const nextElem = elem.nextElementSibling as Element;
        const regExpName = /^[а-яА-ЯёЁa-zA-Z]{3,}(\s+[а-яА-ЯёЁa-zA-Z]{3,}){1,}$/i;
        // ^[а-яА-ЯёЁa-zA-Z]{3,}\s+[а-яА-ЯёЁa-zA-Z]{3,}$
        const regExpPhone = /^[+][0-9]{9,}$/;
        const regExpAddress = /^[а-яА-ЯёЁa-zA-Z]{5,}(\s+[а-яА-ЯёЁa-zA-Z]{5,}){2,}$/i;
        // const regExpAddress = /^[а-яА-ЯёЁa-zA-Z]{5,}\s+[а-яА-ЯёЁa-zA-Z]{5,}\s+[а-яА-ЯёЁa-zA-Z]{5,}$/i;
        const regExpEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;

        if (elem.name === 'username') {
            if (!regExpName.test(elem.value.trim()) && elem.value !== '') {
                nextElem.textContent = 'At least 2 words of at least 3 letters each';
            } else nextElem.textContent = '';
        }
        if (elem.name === 'phone') {
            if (!regExpPhone.test(elem.value) && elem.value !== '') {
                nextElem.textContent = "Start with '+', no shorter than 9 characters";
            } else nextElem.textContent = '';
        }
        if (elem.name === 'address') {
            if (!regExpAddress.test(elem.value.trim()) && elem.value !== '') {
                nextElem.textContent = 'At least 3 words of at least 5 letters each';
            } else nextElem.textContent = '';
        }
        if (elem.name === 'email') {
            if (!regExpEmail.test(elem.value.trim()) && elem.value !== '') {
                nextElem.textContent = 'Incorrect email';
            } else nextElem.textContent = '';
        }
        if (elem.name === 'credit-card') {
            if (elem.value.replace(/\D/g, '').length !== 16 && elem.value !== '') {
                nextElem.textContent = 'Error';
            } else nextElem.textContent = '';
        }
        if (elem.name === 'date') {
            if ((elem.value.replace(/\D/g, '').length !== 4 || +elem.value.slice(0, 2) > 12) && elem.value !== '') {
                nextElem.textContent = 'Error';
            } else nextElem.textContent = '';
        }
        if (elem.name === 'cvv') {
            if (elem.value.replace(/\D/g, '').length !== 3 && elem.value !== '') {
                nextElem.textContent = 'Error';
            } else nextElem.textContent = '';
        }
    }

    function validateCardNumber(even: KeyboardEvent) {
        if (
            even.keyCode == 46 ||
            even.keyCode == 8 ||
            even.keyCode == 9 ||
            even.keyCode == 27 ||
            (even.keyCode == 65 && even.ctrlKey === true) ||
            (even.keyCode >= 35 && even.keyCode <= 39)
        ) {
            return;
        } else {
            if ((even.keyCode < 48 || even.keyCode > 57) && (even.keyCode < 96 || even.keyCode > 105)) {
                even.preventDefault();
            }
        }
    }

    function validateForm(even: Event): void {
        even.preventDefault();
        const form = document.querySelector('form') as HTMLFormElement;
        inputs.forEach((elem: HTMLInputElement) => {
            const nextElem = elem.nextElementSibling as Element;
            if (nextElem.textContent !== '') {
                return;
            }
            if (elem.value === '') {
                nextElem.textContent = 'This field is empty';
            } else {
                nextElem.textContent = '';
            }
        });

        if (
            Array.from(inputs).every((elem: HTMLInputElement) => {
                return elem.value !== '' && (elem.nextElementSibling as Element).textContent === '';
            })
        ) {
            form.reset();
            popupContent.textContent = 'Order is processed. You will be taken to the main page in 3 seconds.';
            setTimeout(() => {
                const url = window.location.href;
                window.location.href = url.replace('#cart', '#main-page');
            }, 3000);
            body.classList.remove('scroll-none');
        }
    }
}

export { createPopup };
