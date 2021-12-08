const main_container = document.querySelector('#main-container');

function buyStockRequest(id) {
    fetch(`http://localhost:8080/inventory/${id}/stock`, {
        method: 'POST'
    })
        .catch(err => console.error(err))
        .finally(() => getAllItemsRequest())
}

function getAllItemsRequest() {
    main_container.innerHTML = '';
    fetch('http://localhost:8080/inventory', {
        method: 'GET'
    })
        .then(res => res.json())
        .then(json => {
            json.forEach(item => {
                const item_element = document.querySelector('#item-template')
                    .content.cloneNode(true);
                item_element.querySelector('.id').textContent = item['id'];
                item_element.querySelector('.productName').textContent = item['productName'];
                item_element.querySelector('.sellPrice').textContent = item['sellPrice'];
                item_element.querySelector('.sellCapacity').textContent = item['sellCapacity'];
                item_element.querySelector('.stock').textContent = item['stock'];
                item_element.querySelector('.capacity').textContent = item['capacity'];
                item_element.querySelector('.purchaseCapacity').textContent = item['purchaseCapacity'];
                item_element.querySelector('.purchasePrice').textContent = item['purchasePrice'];
                item_element.querySelectorAll('.unit')
                    .forEach(unit => unit.textContent = item['unit']);
                item_element.querySelector('button').addEventListener('click', () => buyStockRequest(item['id']))
                main_container.appendChild(item_element);
            })
        })
        .catch(err => console.error(err))
}

document.querySelector('#getAllItems-button').addEventListener('click', () => getAllItemsRequest())

getAllItemsRequest();