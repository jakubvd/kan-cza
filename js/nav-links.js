document.addEventListener("DOMContentLoaded", () => {
  // Find all links with the attribute data-open-default-tab="true"
  const serviceLinks = document.querySelectorAll('[data-open-default-tab="true"]');

  serviceLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      // Get href and if it leads to /uslugi, change it to /uslugi#porada
      const href = link.getAttribute("href");
      if (href && href.includes("/uslugi")) {
        e.preventDefault(); // prevent default navigation
        window.location.href = "/uslugi#porada"; // redirect with tab set
      }
    });
  });
});