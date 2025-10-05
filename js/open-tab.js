// open-tab.js (load only on /uslugi)
window.Webflow = window.Webflow || [];
window.Webflow.push(function () {
  const wrapper = document.querySelector('.oferta_tabs');
  const loadingWrap = document.querySelector('.loading-wrap');

  // Map hash -> Webflow tab name
  const HASH_TO_TAB = {
    'porada': 'Porada',
    'porada-prawna': 'Porada',
    'opinia': 'Opinia',
    'opinia-prawna': 'Opinia',
    'pomoc': 'Pomoc',
    'pomoc-prawna': 'Pomoc'
  };

  // --- helper: aktywacja taba po nazwie Webflow (data-w-tab="...") ---
  function activateTabByName(name) {
    if (!wrapper) return;
    const link = wrapper.querySelector('.w-tab-menu [data-w-tab="' + name + '"]');
    if (!link) return;

    // Zsynchronizuj klasy linków
    wrapper.querySelectorAll('.w-tab-menu [data-w-tab]').forEach(a => a.classList.remove('w--current'));
    link.classList.add('w--current');

    // Zsynchronizuj klasy paneli
    const paneId = link.getAttribute('aria-controls');
    if (paneId) {
      wrapper.querySelectorAll('.w-tab-pane').forEach(p => p.classList.remove('w--tab-active'));
      const pane = document.getElementById(paneId);
      if (pane) pane.classList.add('w--tab-active');
    }

    // Kliknij, żeby Webflow wewnętrznie też „wiedział”
    link.click();
  }

  // --- 1) Przyszliśmy z „Usługi” (nav/footer)? ---
  const fromServiceButton = sessionStorage.getItem("fromServiceButton") === "true";
  sessionStorage.removeItem("fromServiceButton"); // ważne: FLAGA MA BYĆ JEDNORAZOWA

  if (fromServiceButton) {
    // Otwórz PORADĘ, ale NIE przewijaj do tabs; strona startuje od góry
    activateTabByName('Porada');

    // pokaż content (fade-in)
    if (loadingWrap) loadingWrap.classList.add('loaded');
    return;
  }

  // --- 2) Przyszliśmy z homepage z hashem? (np. #opinia-prawna) ---
  const hashKey = (window.location.hash || '').replace('#', '').trim().toLowerCase();
  const tabName = HASH_TO_TAB[hashKey];

  if (tabName) {
    activateTabByName(tabName);

    // Ustaw widok na sekcję tabs (jump, bez animacji) – to jest flow „homepage -> sekcja”
    const oferta = document.querySelector('.oferta_tabs');
    if (oferta) {
      const offset = oferta.getBoundingClientRect().top + window.scrollY - (7 * 16); // 7rem
      window.scrollTo({ top: offset, behavior: 'auto' });
    }

    if (loadingWrap) loadingWrap.classList.add('loaded');
    return;
  }

  // --- 3) Inne przypadki (direct load /uslugi bez hash/flag) ---
  if (loadingWrap) loadingWrap.classList.add('loaded');
});