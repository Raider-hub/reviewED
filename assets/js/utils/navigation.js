
document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content');

  // Function to load external HTML files dynamically
    function loadPage(page) {
      fetch(page)
          .then(response => {
              if (!response.ok) {
                  throw new Error(`Error: ${response.statusText}`);
              }
              return response.text();
          })
          .then(html => {
              content.innerHTML = html;
              console.log('Page loaded successfully.');
               addEventListeners(); // Add event listeners after content is loaded
          })
          .catch(error => {
              content.innerHTML = `<p>Error loading the page.</p>`;
              console.error('Error:', error);
          });
  }

  // Load the homepage by default
  loadPage('index.html');

  // Event listeners for pages

  // document.getElementById('homeBtn').addEventListener('click', () => {
  //     loadPage('home.html');
  //     window.history.pushState({}, '', '/home');
  // });


  // document.getElementById('header-button').addEventListener('click', () => {
  //     loadPage('clp/course_list_page.html');
  //     window.history.pushState({}, '', '/clp');
  // });
  function addEventListeners() {
    const clpPage = document.getElementById('clp-page');
    console.log('clpPage:', clpPage); // Check if element is found


    if (clpPage) {
        clpPage.addEventListener('click', () => {
          console.log('clpPage clicked'); // Confirm click event
            loadPage('clp/course_list_page.html');
            window.history.pushState({}, '', '/clp');
        });

    } else {
        console.error();
    }
}
   // Initial event listeners for the default page
   addEventListeners();


  // Handle back/forward navigation
  window.onpopstate = () => {
      const path = window.location.pathname;
      if (path === '/clp') {
          loadPage('clp/course_list_page.html');
      // } else if (path === '/contact') {
      //     loadPage('contact.html');
      } else {
          loadPage('index.html');
      }
  };
});
