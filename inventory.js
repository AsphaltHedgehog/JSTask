const refs = {
  inventoryListRef: document.querySelector('.inventory'),
  backdrop: null,
  modalCloseBtn: document.querySelector('.modal__btn'),
  page: document.querySelector('.container'),
}

const mockData = await fetch('./data/mockData.json')
  .then((response) => response.json())
  .catch((err) => console.error(err))

const itemTemplate = (i) => {
  const { name, image, id } = i
  return `<li class="item">
    <img class="item__img" src='${image}' alt='${name} image'></img>
    <p class="item__name">${name}</p>
    <button type='button' class="item__btn" data-item-id="${id}">Details</button>
  </li>`
}

function inventoryListRender() {
  const list = mockData.map(itemTemplate).join('')
  refs.inventoryListRef.innerHTML = list
}

inventoryListRender()

function onClick(e) {
  if (!e.target.classList.contains('item__btn')) {
    return
  }

  document.activeElement.blur()
  openModal(e.target.dataset.itemId)
}

// modal

const modalCloseLogic = () => {
  refs.backdrop.removeEventListener('click', onClickCloseModal)
  refs.backdrop.removeEventListener('keydown', onClickCloseModal)
  refs.backdrop.remove()
}

const onClickCloseModal = (e) => {
  if (e.key === 'Escape') {
    modalCloseLogic()
  }

  switch (e.target.className) {
    case 'modal__backdrop':
      modalCloseLogic()
      break

    case 'modal__btn':
      modalCloseLogic()
      break

    default:
      return
  }
}

const modalInstance = (itemInf) => {
  const { name, image, description } = itemInf
  return `
  <div class="modal__backdrop">
    <div class="modal__window">
      <button type="button" class="modal__btn">
        <img class="modal__icon" src=${new URL('./svg/icon-x.svg', import.meta.url)} alt="close icon"/>
      </button>
      <img class="modal_img" src='${image}' alt='${name} image'></img>
      <h2 class="modal_name">${name}</h2>
      <p>${description}</p>
    </div>
  </div>`
}

function openModal(itemId) {
  const item = mockData.find((item) => item.id === itemId)

  refs.page.insertAdjacentHTML('afterend', modalInstance(item))
  refs.backdrop = document.querySelector('.modal__backdrop')

  refs.backdrop.addEventListener('click', onClickCloseModal)
  document.addEventListener('keydown', onClickCloseModal)
}

refs.inventoryListRef.addEventListener('click', onClick)
