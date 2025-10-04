// Run after Webflow finished initializing components
window.Webflow = window.Webflow || [];
window.Webflow.push(function () {
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

  const key = hashRaw || tabParamRaw || '';
  const tabName = HASH_TO_TAB[key];
  const wrapper = document.querySelector('.oferta_tabs');
  const defaultTab = (wrapper && wrapper.getAttribute('data-current')) || 'Porada';

  // Helper: activate a tab by its data-w-tab value
  function activateTabByName(tabName) {
    if (!wrapper) return;
    const btn = wrapper.querySelector('.w-tab-menu [data-w-tab="' + tabName + '"]');
    if (!btn) return;

    // Activate tab
    btn.click();

    // Scroll to oferta_tabs position
    const ofertaSection = document.querySelector('.oferta_tabs');
    const offsetRem = 7; // top offset in rem
    const offset = ofertaSection
      ? ofertaSection.getBoundingClientRect().top + window.scrollY - (offsetRem * 16)
      : 0;

    window.scrollTo({
      top: offset,
      behavior: 'auto'
    });

    // Finally reveal page
    document.querySelector('.page-wrapper').classList.add('loaded');
  }

  // Activate tab or just show page if no hash
  if (tabName) {
    setTimeout(() => {
      activateTabByName(tabName);
    }, 50);
  } else {
    // No tab specified – just show page
    document.querySelector('.page-wrapper').classList.add('loaded');
  }

  // Update hash when switching tabs manually
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