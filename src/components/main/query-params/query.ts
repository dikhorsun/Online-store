function addQueryBrand(inputIdArray: string[]): void {
    let currentURL: string = window.location.href;
    if (inputIdArray.length > 0) {
        inputIdArray.forEach((inputId) => {
            const currentInput = document.getElementById(`${inputId}`) as HTMLElement | null;
            const filterParent = currentInput?.parentElement as HTMLElement | null;
            if (filterParent) {
                const filter: string = filterParent.className.split('-')[1].split('__')[0]; // brand
                if (!currentURL.includes(filter)) {
                    currentURL = `main-page?${filter}=${inputId}`;
                    location.hash = currentURL;
                } else {
                    const currentHash: string = currentURL.split('?')[1];
                    location.hash = `main-page?${currentHash},${inputId}`;
                }
            }
        });
    }
}

function removeQueryBrand(inputIdArray: string[]): void {
    const currentURL: string = window.location.href;
    const hashFilter: string = currentURL.substring(currentURL.indexOf('?'), currentURL.indexOf('=') + 1);
    const currentBrandHashArr: string[] = currentURL.split('=')[1].split(','); // [b, b, b]
    if (currentBrandHashArr.length > 1) {
        location.hash = `main-page${hashFilter}${inputIdArray.join()}`;
    } else {
        location.hash = 'main-page';
    }
}

export { addQueryBrand, removeQueryBrand };
