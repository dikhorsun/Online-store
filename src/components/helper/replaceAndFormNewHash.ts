function replaceAndFormNewHash(splitedURL: string[], replacement: string, index: number): void {
    if (replacement) {
        splitedURL.splice(index, 1, replacement);
    } else {
        splitedURL.splice(index, 1);
    }

    const allFiltersHash = splitedURL.splice(1).join('?');
    if (allFiltersHash.length > 0) {
        const newHash = `main-page?${allFiltersHash}`;
        location.hash = newHash;
    } else {
        location.hash = 'main-page';
    }
}

export default replaceAndFormNewHash;
