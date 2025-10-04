// ===============================================
// PAGE FADE-IN HANDLER (VisionDevs)
// -----------------------------------------------
// Adds fade-in animation to subpages (except home)
// by toggling `.loaded` class on `.page-fade-wrap`
// ===============================================

document.addEventListener("DOMContentLoaded", () => {
  const fadeWrap = document.querySelector(".page-fade-wrap");

  // Skip homepage (assumes "/" or "/index.html")
  const path = window.location.pathname;
  const isHome = path === "/" || path.endsWith("/index.html");
  if (isHome || !fadeWrap) return;

  // Add fade-in once DOM is ready
  requestAnimationFrame(() => {
    fadeWrap.classList.add("loaded");
  });
});