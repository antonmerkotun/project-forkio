'use strict'

const burgerMenu = document.querySelector('#burger-menu');
const burgerMenuList = document.querySelector('#burger-menu-list');
burgerMenu.addEventListener('click', burgerMenuFn);
function burgerMenuFn() {
    burgerMenu.classList.toggle('burger-menu-active');
    burgerMenuList.classList.toggle('header__nav__list-active')
}