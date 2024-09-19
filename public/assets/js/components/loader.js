// components/loading.js
const loadingIndicator = document.getElementById('loader');

function showLoading() {
    loadingIndicator.style.display = 'block';
}

function hideLoading() {
    loadingIndicator.style.display = 'none';
}

// Modify the loadContent function in router.js to use the loading indicator
async function loadContent() {
    showLoading();
    const path = window.location.pathname;
    const route = routes[path] || routes['/'];
    const content = await fetch(route).then((data) => data.text());
    document.getElementById("app").innerHTML = content;
    hideLoading();
}