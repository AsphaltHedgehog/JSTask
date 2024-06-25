const refs = {
  inventoryListRef: document.querySelector('.inventory'),
  backdrop: null,
  page: document.querySelector('.container'),
}

const mockData = await fetch('data/mockData.json')
  .then((response) => response.json())
  .catch((err) => console.error(err))

const itemTemplate = (i) => {
  const { name, image, id } = i

  const li = document.createElement('li')
  li.classList.add('item')

  const img = document.createElement('img')
  img.classList.add('item__img')
  img.src = image
  img.alt = `${name} image`
  li.appendChild(img)

  const p = document.createElement('p')
  p.classList.add('item__name')
  p.textContent = name
  li.appendChild(p)

  const button = document.createElement('button')
  button.type = 'button'
  button.classList.add('item__btn')
  button.dataset.itemId = id
  button.textContent = 'Details'
  li.appendChild(button)

  return li
}

function inventoryListRender() {
  const itemsFragment = document.createDocumentFragment()

  mockData.forEach((i) => {
    itemsFragment.appendChild(itemTemplate(i))
  })
  refs.inventoryListRef.appendChild(itemsFragment)
}

inventoryListRender()

function onClick(e) {
  if (!e.target.classList.contains('item__btn')) {
    return
  }

  scrollDisable()
  document.activeElement.blur()
  openModal(e.target.dataset.itemId)
}

// modal

function scrollDisable() {
  let VerticalScroll = 0
  VerticalScroll = window.scrollY || document.documentElement.scrollTop
  window.onscroll = function () {
    window.scrollTo(0, VerticalScroll)
  }
}

function scrollEnable() {
  window.onscroll = function () {}
}

const modalCloseLogic = () => {
  refs.backdrop.removeEventListener('click', onClickCloseModal)
  refs.backdrop.removeEventListener('keydown', onClickCloseModal)
  refs.backdrop.remove()
  scrollEnable()
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

  const backdrop = document.createElement('div')
  backdrop.classList.add('modal__backdrop')

  const windowDiv = document.createElement('div')
  windowDiv.classList.add('modal__window')
  backdrop.appendChild(windowDiv)

  const button = document.createElement('button')
  button.type = 'button'
  button.classList.add('modal__btn')
  windowDiv.appendChild(button)

  const img = document.createElement('img')
  img.classList.add('modal_img')
  img.src = image
  img.alt = `${name} image`
  windowDiv.appendChild(img)

  const h2 = document.createElement('h2')
  h2.classList.add('modal_name')
  h2.textContent = name
  windowDiv.appendChild(h2)

  const p = document.createElement('p')
  p.classList.add('modal_text')
  p.textContent = description
  windowDiv.appendChild(p)

  return backdrop
}

function openModal(itemId) {
  const item = mockData.find((item) => item.id === itemId)

  const modal = modalInstance(item)

  refs.page.appendChild(modal)
  refs.backdrop = document.querySelector('.modal__backdrop')

  refs.backdrop.addEventListener('click', onClickCloseModal)
  document.addEventListener('keydown', onClickCloseModal)
}

refs.inventoryListRef.addEventListener('click', onClick)
