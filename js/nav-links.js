window.onload = () => {
  // Always scroll to top on page load
  window.scrollTo({ top: 0, behavior: "instant" });

  // Wait briefly to ensure Webflow tab structure is initialized
  setTimeout(() => {
    // Always open the first tab ("Porada")
    const targetTab = document.querySelector('.w-tab-menu [data-w-tab="Porada"]');

    if (targetTab) {
      // Remove current classes from all tab links
      const allTabLinks = document.querySelectorAll('.w-tab-menu [data-w-tab]');
      allTabLinks.forEach(tab => tab.classList.remove('w--current'));
      targetTab.classList.add('w--current');

      // Find the related tab pane and activate it
      const ariaControls = targetTab.getAttribute('aria-controls');
      if (ariaControls) {
        const allTabPanes = document.querySelectorAll('.w-tab-pane');
        allTabPanes.forEach(pane => pane.classList.remove('w--tab-active'));
        const activePane = document.getElementById(ariaControls);
        if (activePane) {
          activePane.classList.add('w--tab-active');
        }
      }

      // Trigger click to ensure Webflow recognizes the change
      targetTab.click();
    }

    // Fade in content after setup
    const loadingWrap = document.querySelector(".loading-wrap");
    if (loadingWrap) {
      loadingWrap.classList.add("loaded");
    }
  }, 150);
};