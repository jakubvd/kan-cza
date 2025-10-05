// ============================================================
// VisionDevs - Tab Initialization Logic (Webflow - /uslugi)
// ------------------------------------------------------------
// Handles tab opening behavior depending on how the user arrived:
// 1. From homepage buttons (with hash) → opens corresponding tab
// 2. From nav/footer "Usługi" button → opens "Porada" tab at top
// 3. Direct visit (no hash, no flag) → opens "Porada" by default
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  // Get current URL hash (e.g., #opinia-prawna)
  const hash = location.hash.toLowerCase();
  // Check if user came from navbar/footer
  const fromServiceButton = sessionStorage.getItem("fromServiceButton") === "true";

  // Function: Open tab by its Webflow name
  function openTab(tabName) {
    const targetTab = document.querySelector(`.w-tab-menu [data-w-tab="${tabName}"]`);
    if (!targetTab) return;

    // Remove active classes from all tab links and panes
    document.querySelectorAll('.w-tab-menu [data-w-tab]').forEach(tab => tab.classList.remove('w--current'));
    document.querySelectorAll('.w-tab-pane').forEach(pane => pane.classList.remove('w--tab-active'));

    // Add active state to target tab
    targetTab.classList.add('w--current');
    const ariaControls = targetTab.getAttribute('aria-controls');
    if (ariaControls) {
      const activePane = document.getElementById(ariaControls);
      if (activePane) activePane.classList.add('w--tab-active');
    }

    // Ensure Webflow syncs internal state
    targetTab.click();
  }

  // Function: Open tab based on hash (from homepage)
  function openTabFromHash(h) {
    if (h.includes("opinia")) openTab("Opinia");
    else if (h.includes("pomoc")) openTab("Pomoc");
    else openTab("Porada");
  }

  // Execute logic depending on entry type
  setTimeout(() => {
    if (fromServiceButton) {
      // Case 1: Clicked "Usługi" from nav/footer
      sessionStorage.removeItem("fromServiceButton");
      window.scrollTo({ top: 0, behavior: "instant" }); // Start at top
      openTab("Porada");
    } else if (hash && hash !== "#porada" && hash !== "#porada-prawna") {
      // Case 2: Came from homepage buttons (with hash)
      openTabFromHash(hash);
    } else {
      // Case 3: Direct visit (no hash, no flag)
      openTab("Porada");
    }

    // Reveal content after tab setup
    const loadingWrap = document.querySelector(".loading-wrap");
    if (loadingWrap) loadingWrap.classList.add("loaded");
  }, 100);
});