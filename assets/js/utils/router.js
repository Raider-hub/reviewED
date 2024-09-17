const routes = {
    '/': { path: 'pages/homepage.html', title: 'ReviewED Home page' },
    '/clp': { path: 'pages/clp/course_list_page.html', title: 'Course List page' },
    // '/contact': { path: 'pages/contact.html', title: 'Contact' },
};

async function route(event) {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    await loadContent();
}

async function loadContent() {
    showLoading();
    const path = window.location.pathname;
        // Always default to home if path is not in routes
        if (!routes[path]) {
            path = '/';
            window.history.replaceState({}, "", path);
        }
    
    const route = routes[path] || { path: 'pages/404.html', title: 'Page Not Found' };
    
    try {
        const content = await fetch(route.path).then((data) => data.text());
        document.getElementById("main-app").innerHTML = content;
        document.title = `${route.title} - SPA Router Example`;
        
        // Apply dynamic styling
        // document.body.className = path.substr(1) || 'home';
    } catch (error) {
        console.error('Error loading page:', error);
        document.getElementById("main-app").innerHTML = '<h1>Error loading page</h1>';
    } finally {
        hideLoading();
    }
}

function navigateTo(path) {
    window.history.pushState({}, "", path);
    loadContent();
}

window.onpopstate = loadContent;
window.route = route;
window.navigateTo = navigateTo;

loadContent();