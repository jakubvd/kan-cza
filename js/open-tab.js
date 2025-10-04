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

  const hashRaw = (window.location.hash || '').replace('#', '').trim().toLowerCase();
  const q = new URLSearchParams(window.location.search);
  const tabParamRaw = (q.get('tab') || '').trim().toLowerCase();

  const key = (hashRaw || tabParamRaw || '');
  const tabName = HASH_TO_TAB[key];
  const wrapper = document.querySelector('.oferta_tabs');
  const defaultTab = (wrapper && wrapper.getAttribute('data-current')) || 'Porada';

  // Hide tabs initially to avoid flicker only if target tab ≠ default tab
  if (tabName && wrapper && tabName !== defaultTab) {
    wrapper.classList.add('hidden-before-init');
    window.scrollTo(0, 0);
  }

  // Helper: activate a tab by its data-w-tab value
  function activateTabByName(tabName) {
    if (!wrapper) return;
    const btn = wrapper.querySelector('.w-tab-menu [data-w-tab="' + tabName + '"]');
    if (!btn) return;

    setTimeout(() => {
      btn.click();

      // Reveal section smoothly after activation
      wrapper.classList.remove('hidden-before-init');
      document.documentElement.classList.remove('targeting-tab'); // Remove guard class

      // === Scroll to oferta_tabs after tab activation ===
      const ofertaSection = document.querySelector('.oferta_tabs');
      const offsetRem = 7; // top offset in rem
      const offset = ofertaSection
        ? ofertaSection.getBoundingClientRect().top + window.scrollY - (offsetRem * 16)
        : 0;

      // Disable scroll animation for better UX by jumping directly to the section
      if (ofertaSection) {
        window.scrollTo({
          top: offset,
          behavior: 'auto'
        });
      }
    }, 60);
  }

  // Activate correct tab if URL has hash
  if (tabName) {
    activateTabByName(tabName);
  }

  // Update hash dynamically when user clicks a tab manually
  if (wrapper) {
    wrapper.querySelectorAll('.w-tab-menu [data-w-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.getAttribute('data-w-tab');
        const pane = wrapper.querySelector('.w-tab-content [data-w-tab="' + name + '"]');
        if (pane && pane.id) {
          history.replaceState(null, '', '#' + pane.id);
        }
      });
    });
  }
});
