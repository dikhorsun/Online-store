'use strict';

const list = document.querySelector('.view-list');
const block = document.querySelector('.view-block');
list.addEventListener('click', () => {
    list.classList.toggle('view_active');
});

block.addEventListener('click', () => {
    block.classList.toggle('view_active');
});
