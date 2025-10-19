// nav-links.js
document.addEventListener("DOMContentLoaded", () => {
  // Select all links that should open the services page with default tab
  const serviceLinks = document.querySelectorAll('[data-open-default-tab="true"]');

  serviceLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      // Set a flag in sessionStorage to indicate the default tab should be opened
      sessionStorage.setItem("fromServiceButton", "true");
      // Redirect to the services page
      window.location.href = "/uslugi";
    });
  });
});