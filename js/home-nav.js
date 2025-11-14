// ============================================================
// HOME NAVBAR SCROLL ANIMATION (Webflow)
// ============================================================
// Requirements:
// - GSAP core + ScrollTrigger loaded in <head> (with `defer`)
// - Navbar wrapper ID:    #navbar-wrap-home (CSS has margin-top: -100px on load)
// - Hero section ID:      #hero-sec
// - We DO NOT set initial position in JS; CSS controls the hidden state.
// - Mirror behavior: play on scroll down, reverse on scroll up.

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Fail fast if GSAP/ScrollTrigger are unavailable
  if (typeof gsap === "undefined") return;
  if (typeof ScrollTrigger === "undefined") return;

  // Register ScrollTrigger (safe even if called multiple times)
  gsap.registerPlugin(ScrollTrigger);

  // Cache elements
  const hero = document.getElementById("hero-sec");
  const navbar = document.getElementById("navbar-wrap-home");

  if (!hero || !navbar) return; // nothing to do without required elements

  // Disable animation on mobile 480px and below
  if (window.innerWidth <= 480) {
    return; // skip scroll animation entirely
  }

  // Animate CSS margin-top from current value (e.g., -100px) to 0 when
  // the bottom of the hero hits the top of the viewport. Reverse on scroll up.
  ScrollTrigger.create({
    trigger: hero,
    start: "90% top",
    onEnter: () => {
      gsap.to(navbar, {
        marginTop: 0,
        duration: 1.4,  // slightly slower scroll-in
        ease: "expo.out",
        overwrite: "auto"
      });
    },
    onLeaveBack: () => {
      gsap.to(navbar, {
        marginTop: -100,
        duration: 0.4,  // faster reverse
        ease: "sine.in",
        overwrite: "auto"
      });
    }
    // markers: true,
  });
});