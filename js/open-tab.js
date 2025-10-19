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

    // Scope all operations to the tabs component that contains the target tab
    const tabsWrapper = targetTab.closest('.w-tabs') || document;

    // Remove active classes from all tab links and panes within the same tabs component
    tabsWrapper.querySelectorAll('.w-tab-menu [data-w-tab]').forEach(tab => tab.classList.remove('w--current'));
    tabsWrapper.querySelectorAll('.w-tab-pane').forEach(pane => pane.classList.remove('w--tab-active'));

    // Add active state to target tab
    targetTab.classList.add('w--current');
    const ariaControls = targetTab.getAttribute('aria-controls');
    if (ariaControls) {
      const activePane = tabsWrapper.querySelector(`#${ariaControls}`) || document.getElementById(ariaControls);
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

// --- Beauty Tab Activation Fix (using Webflow.push) ---
window.Webflow = window.Webflow || [];
window.Webflow.push(function () {
  // 1. Select the Owner tab link and corresponding pane in the Beauty tabs
  const beautyTab = document.querySelector('.oferta-beauty_tab-link[data-w-tab="Owner"]');
  const beautyPane = document.querySelector('.oferta-beauty_tabs-content .w-tab-pane[data-w-tab="Owner"]');

  // 2. Proceed only if both elements exist and the tab is not already active
  if (beautyTab && beautyPane && !beautyTab.classList.contains('w--current')) {
    // 3. Remove 'w--current' from all Beauty tab links
    document.querySelectorAll('.oferta-beauty_tab-link').forEach(tab => {
      tab.classList.remove('w--current');
    });

    // 4. Remove 'w--tab-active' from all Beauty tab panes
    document.querySelectorAll('.oferta-beauty_tabs-content .w-tab-pane').forEach(pane => {
      pane.classList.remove('w--tab-active');
    });

    // 5. Add 'w--current' to the Owner tab link
    beautyTab.classList.add('w--current');

    // 6. Add 'w--tab-active' to the Owner tab pane
    beautyPane.classList.add('w--tab-active');

    // 7. Trigger a click on the Owner tab link to sync Webflow's internal tab state properly
    beautyTab.click();
  }
});