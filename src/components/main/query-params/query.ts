import replaceAndFormNewHash from '../../helper/replaceAndFormNewHash';

function addQuery(inputIdArr: string[], filter: string): void {
    let currentURL: string = window.location.href;
    // currentURL without ?
    if (!currentURL.includes('?')) {
        if (inputIdArr.length > 0) {
            inputIdArr.forEach((inputId) => {
                currentURL = `main-page?${filter}=${inputId}`;
                location.hash = currentURL;
            });
        }
        // currentURL with some ?
    } else {
        // if no ?filter
        if (!currentURL.includes(filter)) {
            if (inputIdArr.length > 0) {
                inputIdArr.forEach((inputId) => {
                    const currentHash = currentURL.split('#')[1];
                    location.hash = `${currentHash}?${filter}=${inputId}`;
                });
            }
            // filter q-p exists
        } else {
            const splitedURL: string[] = currentURL.split('?');
            let filterQP: string | undefined = splitedURL.find((item) => item.includes(filter));
            if (filterQP) {
                const indexOfFilterElem: number = splitedURL.indexOf(filterQP);
                if (filterQP && inputIdArr.length > 0) {
                    filterQP = `${filterQP},${inputIdArr[inputIdArr.length - 1]}`;
                    replaceAndFormNewHash(splitedURL, filterQP, indexOfFilterElem);
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
