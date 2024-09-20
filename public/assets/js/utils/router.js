const routes = {
  "/": {
    path: "pages/homepage.html",
    title: "ReviewED Home page",
    css: [
      "/assets/css/layouts/faq.css",
      "/assets/css/components/add_company.css",
      " /assets/css/components/new_top_course.css",
      "/assets/css/components/top_company_section.css",
      "/assets/css/components/search_section.css",
      "/assets/css/components/hero_section.css",
    ],
  },
  "/clp": {
    path: "pages/clp/course_list_page.html",
    title: "Course List page",
    css: ["/assets/css/layouts/clp.css"],
  },
  // '/contact': { path: 'pages/contact.html', title: 'Contact' },
};

let currentPageStyles = [];

function loadPageStyles(cssFiles) {
  // Remove all current page styles
  currentPageStyles.forEach((style) => {
    if (style && style.parentNode) {
      style.parentNode.removeChild(style);
    }
  });
  currentPageStyles = [];

  // Add new styles
  cssFiles.forEach((href) => {
    if (href) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
      currentPageStyles.push(link);
    }
  });
}

async function route(event) {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  await loadContent();
}

async function loadContent() {
  showLoading();
  let path = window.location.pathname.replace(/\/$/, "");
  // Always default to home if path is not in routes
  if (!routes[path]) {
    path = "/";
    window.history.replaceState({}, "", path);
  }

  const route = routes[path] || {
    path: "pages/404.html",
    title: "Page Not Found",
  };

  try {
    const content = await fetch(route.path).then((data) => data.text());
    document.getElementById("main-app").innerHTML = content;
    document.title = `${route.title} - ReviewED`;
    console.log("Log Route Error:", route.path, route);

    // Load page-specific CSS
    loadPageStyles(route.css);

    // Apply dynamic styling
    // document.body.className = path.substr(1) || 'home';
  } catch (error) {
    console.error("Error loading page:", error);
    document.getElementById("main-app").innerHTML =
      "<h1>Error loading page</h1>";
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
