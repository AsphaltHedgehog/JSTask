const refs = {
  inventoryListRef: document.querySelector('.inventory'),
}

const itemTemplate = (i) => {
  const { name, image } = i
  return `<li class="item">
    <img class="itemImg" src='${image}' alt='${name} image'></img>
    <p class="itemName">${name}</p>
    <button type='button' class="itemBtn">Details</button>
  </li>`
}

const inventoryListRender = async () => {
  const mockData = await fetch('./data/mockData.json')
    .then((response) => response.json())
    .catch((err) => console.error(err))

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
