document.addEventListener("DOMContentLoaded", () => {
  // Find all links with the attribute data-open-default-tab="true"
  const serviceLinks = document.querySelectorAll('[data-open-default-tab="true"]');

  serviceLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      // Get href and check if it leads to /uslugi
      const href = link.getAttribute("href");
      if (href && href.includes("/uslugi")) {
        e.preventDefault(); // Prevent default navigation

        // Build a clean URL to /uslugi with default tab hash
        const targetUrl = "/uslugi#porada-prawna";

        // Redirect user normally (page loads from top)
        window.location.assign(targetUrl);
      }
    });
  });
});