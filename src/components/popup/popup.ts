function getPopup(){
  const body = document.querySelector('body') as HTMLBodyElement;
  const btnBuyNow = document.querySelectorAll('.btn_buy-now');

  for (let i = 0; i < btnBuyNow.length; i++) {
      btnBuyNow[i].addEventListener('click', createPopup);
  }
  function createPopup() {
    const popupItemTemp = document.querySelector(
      '#popupItemTemp'
  ) as HTMLTemplateElement;
    const popupClone = popupItemTemp.content.cloneNode(
      true
  ) as HTMLTemplateElement;
  const popupContent = popupClone.querySelector(
    '.popup-content')  as Element;
      const wrapPopup = document.createElement('div');
      wrapPopup.classList.add('popup');
      wrapPopup.innerHTML = '<div class="popup_back"></div>';
      const wrapClose = document.createElement('div');
      wrapClose.innerHTML = '<div class="popup_close"></div>';
      popupContent.append(wrapClose);
      wrapPopup.prepend(popupClone);
      body.prepend(wrapPopup);

      document.body.classList.add('scroll-none');

      function popUpClose() {
          wrapPopup.remove();
          document.body.classList.remove('scroll-none');
      }
      const popup_back = document.querySelector('.popup_back') as Element;
      const popup_close = document.querySelector('.popup_close') as Element;
      popup_back.addEventListener('click', popUpClose);
      popup_close.addEventListener('click', popUpClose);
  }
}

export default getPopup




