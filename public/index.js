const URL = 'http://localhost:8080/inventory'
const main_container = document.querySelector('#main-container');
const form = document.querySelector('#item-form');

function buyStockRequest(id) {
    fetch(`${URL}/${id}/stock`, {
        method: 'POST'
    })
        .catch(err => console.error(err))
        .finally(() => getAllItemsRequest())
}

function getAllItemsRequest() {
    main_container.innerHTML = '';
    fetch(URL, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(json => {
            json.forEach(item => {
                const item_element = document.querySelector('#item-template')
                    .content.cloneNode(true);
                item_element.querySelector('.id').value = item['id'];
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

function get_form() {
    const id = form.querySelector('#item-form-id').value;
    fetch(`${URL}/${id}`, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(json => {
            fill_form(json);
        })
        .catch(err => console.error(err))
}

function delete_form() {
    const id = form.querySelector('#item-form-id').value;
    fetch(`${URL}/${id}`, {
        method: 'DELETE'
    })
        .then(() => {
            form.reset();
            getAllItemsRequest();
        })
        .catch(err => console.error(err))
}

function register_form() {
    const data = new FormData(form);
    fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data.entries()))
    })
        .then(res => res.json())
        .then(json => {
            fill_form(json);
            getAllItemsRequest();
        })
        .catch(err => console.error(err))
}

function update_form() {
    const data = new FormData(form);
    const id = form.querySelector('#item-form-id').value;
    fetch(`${URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data.entries()))
    })
        .then(res => res.json())
        .then(json => {
            fill_form(json);
            getAllItemsRequest();
        })
        .catch(err => console.error(err))
}

function fill_form(item) {
    // Clear all form items
    form.reset();

    form.querySelector('#item-form-id').value = item['id'];
    form.querySelector('#item-form-productName').value = item['productName'];
    form.querySelector('#item-form-stock').value = item['stock'];
    form.querySelector('#item-form-unit').value = item['unit'];
    form.querySelector('#item-form-sellPrice').value = item['sellPrice'];
    form.querySelector('#item-form-sellCapacity').value = item['sellCapacity'];
    form.querySelector('#item-form-capacity').value = item['capacity'];
    form.querySelector('#item-form-purchaseCapacity').value = item['purchaseCapacity'];
    form.querySelector('#item-form-purchasePrice').value = item['purchasePrice'];
}

// Setup update button
document.querySelector('#getAllItems-button').addEventListener('click', () => getAllItemsRequest())

// Setup form button
document.querySelector('#get-form-button').addEventListener('click', () => get_form())
document.querySelector('#update-form-button').addEventListener('click', () => update_form())
document.querySelector('#register-form-button').addEventListener('click', () => register_form())
document.querySelector('#delete-form-button').addEventListener('click', () => delete_form())

// Get all items after loading everything
getAllItemsRequest();