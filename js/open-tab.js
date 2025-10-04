  // Run after Webflow finished initializing components
  window.Webflow = window.Webflow || [];
  window.Webflow.push(function () {
    // Map URL hash (or query) -> Webflow tab name (data-w-tab)
    const HASH_TO_TAB = {
      'porada': 'Porada',
      'porada-prawna': 'Porada',
      'opinia': 'Opinia',
      'opinia-prawna': 'Opinia',
      'pomoc': 'Pomoc',
      'pomoc-prawna': 'Pomoc'
    };

    // Helper: activate a tab by its data-w-tab value
    function activateTabByName(tabName) {
      const wrapper = document.querySelector('.oferta_tabs'); // your tabs component root
      if (!wrapper) return;

      // Only click a TAB BUTTON (in the menu), not the pane
      const btn = wrapper.querySelector('.w-tab-menu [data-w-tab="' + tabName + '"]');
      if (!btn) return;

      // Prevent browser from scrolling to hidden pane from the hash
      window.scrollTo(0, 0);

      // Click after a tick to ensure Webflow tabs are fully ready
      setTimeout(() => {
        btn.click();

        // Optional: smooth scroll to the tabs section for better UX
        wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
    }

    // 1) Read target from hash (#porada-prawna) or from ?tab=opinia
    const hashRaw = (window.location.hash || '').replace('#', '').trim();
    const q = new URLSearchParams(window.location.search);
    const tabParamRaw = (q.get('tab') || '').trim();

    const key = (hashRaw || tabParamRaw || '').toLowerCase();
    const tabName = HASH_TO_TAB[key];

    if (tabName) {
      activateTabByName(tabName);
    }

    // 2) Bonus: when user clicks tabs manually, keep the URL shareable
    const wrapper = document.querySelector('.oferta_tabs');
    if (wrapper) {
      wrapper.querySelectorAll('.w-tab-menu [data-w-tab]').forEach(btn => {
        btn.addEventListener('click', () => {
          const name = btn.getAttribute('data-w-tab');
          const pane = wrapper.querySelector('.w-tab-content [data-w-tab="' + name + '"]');
          // If the pane has an ID (e.g. porada-prawna), reflect it in the URL hash
          if (pane && pane.id) {
            history.replaceState(null, '', '#' + pane.id);
          }
        });
      });
    }
  });
