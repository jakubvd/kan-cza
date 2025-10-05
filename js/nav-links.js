// nav-links.js
document.addEventListener("DOMContentLoaded", () => {
  // ONLY these links (navbar/footer) mają wywołać Poradę po wejściu na /uslugi
  const serviceLinks = document.querySelectorAll('[data-open-default-tab="true"]');

  serviceLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      // Flaga dla /uslugi, że przyszliśmy z „Usługi” (nav/footer)
      sessionStorage.setItem("fromServiceButton", "true");
      // Czysty URL (bez hash/paramów) — strona ma zacząć od góry
      window.location.href = "/uslugi";
    });
  });
});