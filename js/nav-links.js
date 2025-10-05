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
    // Always open the first tab ("Porada") if no valid tab parameter is provided
    // Otherwise, open the tab corresponding to the parameter if it's "opinia-prawna" or "pomoc-prawna"
    let tabToOpen = "Porada";
    if (tabParam && (tabParam === "opinia-prawna" || tabParam === "pomoc-prawna")) {
      tabToOpen = tabMap[tabParam];
    }

    // Select the tab element with the matching w-tab attribute
    const targetTab = document.querySelector(`[w-tab="${tabToOpen}"]`);
    if (targetTab) {
      // Simulate click to open the tab without changing URL or scrolling
      targetTab.click();
    }

    // After tab activation, fade in content wrapper
    const loadingWrap = document.querySelector(".loading-wrap");
    if (loadingWrap) {
      loadingWrap.classList.add("loaded");
    }
  }, 100);
};