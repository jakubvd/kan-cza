document.addEventListener("DOMContentLoaded", function () {
  const hash = location.hash.toLowerCase();
  const fromServiceButton = sessionStorage.getItem("fromServiceButton") === "true";

  // Taby, które muszą startować z góry
  const tabHashes = ["porada", "opinia", "pomoc"];

  // Sekcje, których NIE DOTYKAMY (zero scrollTo)
  const staticHashes = [
    "#klienci-indywidualni",
    "#klienci-biznesowi",
    "#oferta-beauty"
  ];

  // Otwieranie tabów
  function openTab(tabName) {
    const targetTab = document.querySelector(`[data-w-tab="${tabName}"]`);
    if (!targetTab) return;

    const tabsWrapper = targetTab.closest(".w-tabs");

    tabsWrapper.querySelectorAll(".w-tab-menu [data-w-tab]")
      .forEach(t => t.classList.remove("w--current"));

    tabsWrapper.querySelectorAll(".w-tab-pane")
      .forEach(p => p.classList.remove("w--tab-active"));

    targetTab.classList.add("w--current");

    const paneId = targetTab.getAttribute("aria-controls");
    const pane = tabsWrapper.querySelector(`#${paneId}`);
    if (pane) pane.classList.add("w--tab-active");

    targetTab.click();
  }

  function openTabFromHash(h) {
    if (h.includes("opinia")) return openTab("Opinia");
    if (h.includes("pomoc")) return openTab("Pomoc");
    return openTab("Porada");
  }

  setTimeout(() => {

    // 1. HASH NALEŻY DO SEKCJI → NIE DOTYKAMY SCROLLA
    if (staticHashes.includes(hash)) {
      const loadingWrap = document.querySelector(".loading-wrap");
      if (loadingWrap) loadingWrap.classList.add("loaded");
      return;
    }

    // 2. HASH NALEŻY DO TABÓW → SCROLL TO TOP
    if (hash && tabHashes.some(k => hash.includes(k))) {
      window.scrollTo(0, 0);
      openTabFromHash(hash);
    }

    // 3. Przejście z menu/footer
    else if (fromServiceButton) {
      sessionStorage.removeItem("fromServiceButton");
      window.scrollTo(0, 0);
      openTab("Porada");
    }

    // 4. Wejście bez hasha → Porada od góry
    else if (!hash) {
      window.scrollTo(0, 0);
      openTab("Porada");
    }

    // 5. Loading-wrap znika ZAWSZE
    const loadingWrap = document.querySelector(".loading-wrap");
    if (loadingWrap) loadingWrap.classList.add("loaded");

  }, 50);
});