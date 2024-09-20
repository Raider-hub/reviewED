const routes = {
    "/": {
      path: "pages/homepage.html",
      title: "ReviewED Home page",
      css: [
        "/assets/css/layouts/faq.css",
        "/assets/css/components/add_company.css",
        "/assets/css/components/new_top_course.css",
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
    // Add more routes here
  };
  
  let currentPageStyles = [];
  
  function loadPageStyles(cssFiles) {
    currentPageStyles.forEach((style) => {
      if (style && style.parentNode) {
        style.parentNode.removeChild(style);
      }
    });
    currentPageStyles = [];
  
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
  
    const href = event.target.closest('a')?.href;
    if (href) {
      window.history.pushState({}, "", href);
      await loadContent();
    }
  }
  
  async function loadContent() {
    showLoading();
  
    let path = window.location.pathname.replace(/\/$/, "");
  
    // Default to homepage only on the initial load when the path is "/"
    if (!path || path === "" || path === "/") {
      path = "/";
    }
  
    
  // Check if the route exists, otherwise load the 404 page
  const route = routes[path];
  const routeToLoad = route || {
    path: "pages/404.html",  // 404 page
    title: "Page Not Found",
  };
  
    try {
      const content = await fetch(routeToLoad.path).then((data) => data.text());
      document.getElementById("main-app").innerHTML = content;
      document.title = `${routeToLoad.title} - ReviewED`;
      window.scrollTo(0, 0); // Scroll to top after loading content
  
      loadPageStyles(routeToLoad.css || []);
  
    } catch (error) {
      console.error("Error loading page:", error);
      document.getElementById("main-app").innerHTML =
      document.getElementById("main-app").innerHTML = `
      <h1>Error loading page</h1>
      <p>${error.message}</p>
      <pre>${error.stack}</pre>
    `;
    } finally {
      hideLoading();
    }
  }
  
  function navigateTo(path) {
    window.history.pushState({}, "", path);
    loadContent();
  }
  
  // Handle browser back/forward navigation
  window.onpopstate = loadContent;
  
  window.route = route;
  window.navigateTo = navigateTo;
  
  // Initial page load (first load)
  loadContent();
  