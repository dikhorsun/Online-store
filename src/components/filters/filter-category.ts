import MainPage from '../main/index';
import { addQuery, removeQuery } from '../main/query-params/query';
import { brandsCheckedArr } from '../filters/filter-brand';

const categoriesCheckedArr: string[] = [];

function inputCategoryListener(this: HTMLInputElement) {
    const inputId = this.id;

    if (this.checked) {
        categoriesCheckedArr.push(inputId);
        addQuery(categoriesCheckedArr, 'category');
        MainPage.cardsContainer.innerHTML = '';
    } else {
        const indexOfRemovedCategory = categoriesCheckedArr.indexOf(`${inputId}`);
        categoriesCheckedArr.splice(indexOfRemovedCategory, 1);
        removeQuery(categoriesCheckedArr, 'category');
        MainPage.cardsContainer.innerHTML = '';
        if (categoriesCheckedArr.length === 0 && brandsCheckedArr.length === 0) {
            MainPage.sectionTools.innerHTML = '';
            MainPage.regulationContainer.innerHTML = '';
        }
    }
}

export { inputCategoryListener, categoriesCheckedArr };
