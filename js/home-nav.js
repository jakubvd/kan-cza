

// ============================================================
// HOME NAVBAR SCROLL ANIMATION
// ============================================================

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {

  // Run only on the homepage (root path)
  if (window.location.pathname === "/" || window.location.pathname === "/index.html") {

    // Register the ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Select both hero section and navbar elements by ID
    const hero = document.getElementById("hero-sec");
    const navbar = document.getElementById("navbar-wrap-home");

    // Safety check: prevent errors if elements are not found
    if (!hero || !navbar) return;

    // Set the initial position of the navbar (hidden above the screen)
    gsap.set(navbar, { y: -100 });

    // Create the ScrollTrigger animation
    ScrollTrigger.create({
      trigger: hero,             // Trigger element is the hero section
      start: "bottom top",       // When bottom of hero hits the top of viewport
      toggleActions: "play none none reverse", // Play on scroll down, reverse on scroll up
      onEnter: () => {
        // Animate navbar sliding down into view
        gsap.to(navbar, {
          y: 0,
          duration: 1,
          ease: "expo.out"
        });
      },
      onLeaveBack: () => {
        // Animate navbar sliding back up (mirror animation)
        gsap.to(navbar, {
          y: -100,
          duration: 1,
          ease: "expo.in"
        });
      }
    });
  }
});