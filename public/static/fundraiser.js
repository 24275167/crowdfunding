const itemContent = (fundraiser) => `
    <div class="item">
    <h3>${fundraiser.CAPTION}</h3>
    <p>Organizer: ${fundraiser.ORGANIZER}</p>
    <p>Category: ${fundraiser.CATEGORY_NAME}</p>
    <p>Target Funding: $${fundraiser.TARGET_FUNDING}</p>
    <p>Current Funding: $${fundraiser.CURRENT_FUNDING}</p>
    <p>City: ${fundraiser.CITY}</p>
    <a href="/fundraiser.html?id=${fundraiser.FUNDRAISER_ID}">View Details</a>
    </div>
`
const renderFundraisers = (data) => {
    const list = document.querySelector('.list');
    list.innerHTML = ''; // 清空已有内容
    // 检查是否有募款活动
    if (list.length === 0) {
        list.innerHTML = 'Content is empty';
        return;
    }
    for (const item of data) {
        list.innerHTML += itemContent(item)
    }
}
function getFundraisers() {
    fetch('/fundraisers')
        .then(response => response.json())
        .then(data => {
            renderFundraisers(data)
        })
}


// search.js
function searchFundraisers() {
    const organizer = document.getElementById('organizer').value;
    const city = document.getElementById('city').value;
    const category = document.getElementById('category').value;
    if (!organizer && !city && !category) {
        alert('Search content is empty');
        return;
    }
    fetch(`http://localhost:3000/search?organizer=${organizer}&city=${city}&category=${category}`)
        .then(response => response.json())
        .then(data => {
            renderFundraisers(data)
        });
}


function renderCategories(data) {
    const category = document.getElementById('category')
    for (const item of data) {
        const option = document.createElement('option')
        option.value = item.CATEGORY_ID
        option.textContent = item.NAME
        category.appendChild(option)
    }
}
function getCategories() {
    fetch(`/categories`)
        .then(response => response.json())
        .then(data => {
            renderCategories(data);
        })
}



function details() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    document.querySelector('.title').innerHTML = `Fundraiser Details  ${id}`;
    fetch(`/fundraiser/${id}`)
        .then(response => response.json())
        .then(data => {
            renderFundraisers(data)
        })
}