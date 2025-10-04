document.addEventListener("DOMContentLoaded", () => {
  // Znajdź wszystkie linki z atrybutem data-open-default-tab="true"
  const serviceLinks = document.querySelectorAll('[data-open-default-tab="true"]');

  serviceLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      // Pobierz href i jeśli prowadzi do /uslugi — zamień na /uslugi#porada
      const href = link.getAttribute("href");
      if (href && href.includes("/uslugi")) {
        e.preventDefault(); // zablokuj domyślną nawigację
        window.location.href = "/uslugi#porada"; // przekieruj z ustawieniem taba
      }
    });
  });
});