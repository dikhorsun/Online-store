import createElement from '../helper/createElement';
import createOptions from '../helper/createOption';
import createInputLabelInContainer from '../helper/createInputLabelInContainer';
import MainPage from '../main';
import { getLabelsBrand, getLabelsCategory } from '../../json-data/label-contents';
import { brandInputId } from '../../json-data/input-id';
import { inputBrandListener } from '../filters/filter-brand';
import { inputCategoryListener } from '../filters/filter-category';

function renderSelect() {
    const selectSort = createElement('select', 'tools__sort', MainPage.sectionTools);
    selectSort.id = 'sort-goods';
    const firstOption = createOptions('', 'Sort goods...', selectSort);
    firstOption.setAttribute('selected', 'selected');
    createOptions('priceA', 'By price: low to high', selectSort);
    createOptions('priceD', 'By price: high to low', selectSort);
    createOptions('ratingA', 'By rating: low to high', selectSort);
    createOptions('ratingD', 'By rating: high to low', selectSort);
}

async function renderBrand() {
    // fieldset with brand inputs
    const fieldsetBrand = createElement('fieldset', 'filter-brand', MainPage.sectionTools);
    createElement('legend', 'filter-brand__legend', fieldsetBrand, 'Filter goods by brand');
    const brandLabelsArray = await getLabelsBrand();
    if (brandLabelsArray) {
        for (let i = 0; i < brandInputId.length; i++) {
            createInputLabelInContainer(
                fieldsetBrand,
                'filter-brand__line',
                'checkbox',
                'filter-brand__input',
                brandInputId[i],
                inputBrandListener,
                brandLabelsArray[i]
            );
        }
    }
}

async function renderCategory() {
    const fieldsetCategory = createElement('fieldset', 'filter-category', MainPage.sectionTools);
    createElement('legend', 'filter-category__legend', fieldsetCategory, 'Filter goods by category');
    const categoryLabelsArray = await getLabelsCategory();
    if (categoryLabelsArray) {
        for (let i = 0; i < 6; i++) {
            createInputLabelInContainer(
                fieldsetCategory,
                'filter-category__line',
                'checkbox',
                'filter-category__input',
                categoryLabelsArray[i],
                inputCategoryListener,
                categoryLabelsArray[i]
            );
        }
    }
}

export { renderSelect, renderBrand, renderCategory };
