const refs = {
  inventoryListRef: document.querySelector('.inventory'),
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

const onClick = (e) => {
  if (e.target.className !== 'itemBtn') {
    return
  }
}

refs.inventoryListRef.addEventListener('click', onClick)
