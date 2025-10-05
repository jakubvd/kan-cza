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
    // Default to "Porada" tab
    let tabToOpen = "Porada";

    // Use parameter if valid
    if (tabParam && (tabParam === "opinia-prawna" || tabParam === "pomoc-prawna")) {
      tabToOpen = tabMap[tabParam];
    }

    // Select target tab
    const targetTab = document.querySelector(`[w-tab="${tabToOpen}"]`);

    if (targetTab) {
      // Simulate Webflow "current" behavior
      const allTabs = document.querySelectorAll('[w-tab]');
      allTabs.forEach(tab => tab.classList.remove('w--current'));
      targetTab.classList.add('w--current');

      // Trigger tab click to ensure correct Webflow sync
      targetTab.click();
    }

    // Fade in after tab setup
    const loadingWrap = document.querySelector(".loading-wrap");
    if (loadingWrap) {
      loadingWrap.classList.add("loaded");
    }
  }, 100);
};