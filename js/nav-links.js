document.addEventListener("DOMContentLoaded", () => {
  // Scroll instantly to the top before any tab activation
  window.scrollTo({ top: 0, behavior: "instant" });

  // Get the 'tab' query parameter from the URL (e.g., ?tab=porada-prawna)
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get("tab");

  // Define mapping between query values and tab buttons
  const tabMap = {
    "porada-prawna": "Porada",
    "opinia-prawna": "Opinia",
    "pomoc-prawna": "Pomoc"
  };

  // If a valid tab parameter exists, activate the corresponding Webflow tab
  if (tabParam && tabMap[tabParam]) {
    const targetTab = document.querySelector(`[w-tab="${tabMap[tabParam]}"]`);
    if (targetTab) {
      targetTab.click(); // Simulate click to open the tab
    }
  }

  // After tab activation, fade in content wrapper (if exists)
  const loadingWrap = document.querySelector(".loading-wrap");
  if (loadingWrap) {
    loadingWrap.classList.add("loaded");
  }
});