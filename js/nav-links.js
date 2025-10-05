window.onload = () => {
  // Instantly scroll to top before rendering
  window.scrollTo({ top: 0, behavior: "instant" });

  // Get ?tab= parameter from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get("tab");

  // Define mapping between query values and Webflow tab names
  const tabMap = {
    "porada-prawna": "Porada",
    "opinia-prawna": "Opinia",
    "pomoc-prawna": "Pomoc"
  };

  // Wait briefly to ensure Webflow initialized tabs
  setTimeout(() => {
    // If a valid tab parameter exists, activate it
    if (tabParam && tabMap[tabParam]) {
      const targetTab = document.querySelector(`[w-tab="${tabMap[tabParam]}"]`);
      if (targetTab) {
        targetTab.click(); // Simulate click to open the tab
      }
    } else {
      // Default behavior: open the first tab ("Porada")
      const firstTab = document.querySelector('[w-tab="Porada"]');
      if (firstTab) firstTab.click();
    }

    // After tab activation, fade in content wrapper
    const loadingWrap = document.querySelector(".loading-wrap");
    if (loadingWrap) {
      loadingWrap.classList.add("loaded");
    }
  }, 100);
};