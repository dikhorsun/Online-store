import replaceAndFormNewHash from '../../helper/replaceAndFormNewHash';

function addQuery(inputIdArr: string[], filter: string): void {
    let currentURL: string = window.location.href;
    // currentURL without ?
    if (!currentURL.includes('?')) {
        if (inputIdArr.length > 0) {
            if (filter === 'price' || filter === 'stock') {
                inputIdArr = inputIdArr.sort((a, b) => Number(a) - Number(b));
                currentURL = `main-page?${filter}=${inputIdArr[0]},${inputIdArr[1]}`;
                location.hash = currentURL;
            } else {
                inputIdArr.forEach((inputId) => {
                    currentURL = `main-page?${filter}=${inputId}`;
                    location.hash = currentURL;
                });
            }
        }
        // currentURL with some ?
    } else {
        // if no ?filter
        if (!currentURL.includes(filter)) {
            if (inputIdArr.length > 0) {
                if (filter === 'price' || filter === 'stock') {
                    const currentHash = currentURL.split('#')[1];
                    inputIdArr = inputIdArr.sort((a, b) => Number(a) - Number(b));
                    location.hash = `${currentHash}?${filter}=${inputIdArr[0]},${inputIdArr[1]}`;
                } else {
                    inputIdArr.forEach((inputId) => {
                        const currentHash = currentURL.split('#')[1];
                        location.hash = `${currentHash}?${filter}=${inputId}`;
                    });
                }
            }
            // filter q-p exists
        } else {
            const splitedURL: string[] = currentURL.split('?');
            let filterQP: string | undefined = splitedURL.find((item) => item.includes(filter));
            if (filterQP) {
                const indexOfFilterElem: number = splitedURL.indexOf(filterQP);
                if (filterQP && inputIdArr.length > 0) {
                    if (filter === 'price' || filter === 'stock') {
                        inputIdArr = inputIdArr.sort((a, b) => Number(a) - Number(b));
                        filterQP = `${filter}=${inputIdArr[0]},${inputIdArr[1]}`;
                        replaceAndFormNewHash(splitedURL, filterQP, indexOfFilterElem);
                    } else if (filter === 'sort') {
                        filterQP = `${filter}=${inputIdArr[0]}`;
                        replaceAndFormNewHash(splitedURL, filterQP, indexOfFilterElem);
                    } else {
                        filterQP = `${filterQP},${inputIdArr[inputIdArr.length - 1]}`;
                        replaceAndFormNewHash(splitedURL, filterQP, indexOfFilterElem);
                    }
                }
            }
        }
    }
}

function removeQuery(filterInputIdArr: string[], filter: string): void {
    const currentURL: string = window.location.href;
    const splitedURL: string[] = currentURL.split('?');
    const filterQP: string | undefined = splitedURL.find((item) => item.includes(filter));
    if (filterQP) {
        const indexOfFilterElem: number = splitedURL.indexOf(filterQP);
        if (filterQP && filterInputIdArr.length > 0) {
            const filtersStr = filterInputIdArr.join(',');
            const newFilterQP = `${filter}=${filtersStr}`;
            replaceAndFormNewHash(splitedURL, newFilterQP, indexOfFilterElem);
        } else if (filterQP && filterInputIdArr.length === 0) {
            const newFilterQP = '';
            replaceAndFormNewHash(splitedURL, newFilterQP, indexOfFilterElem);
        }
    }
}

export { addQuery, removeQuery };
