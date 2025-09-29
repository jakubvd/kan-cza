


document.addEventListener("DOMContentLoaded", () => {
  const component = document.querySelector(".home-testimonial_component");
  const cards = document.querySelectorAll(".home-testimonial_card");

  if (!component || cards.length === 0) return;

  // Accessibility: detect reduced motion (handled in CSS), but still allow hover pause
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let pauseTimeout;

  const pauseAnimation = () => {
    clearTimeout(pauseTimeout);
    component.style.transition = "animation-play-state 0.3s ease-in-out";
    component.style.animationPlayState = "paused";
  };

  const resumeAnimation = () => {
    clearTimeout(pauseTimeout);
    // Add a small delay to avoid flicker on quick hover out
    pauseTimeout = setTimeout(() => {
      component.style.animationPlayState = "running";
    }, 150);
  };

  cards.forEach(card => {
    card.addEventListener("mouseenter", pauseAnimation);
    card.addEventListener("mouseleave", resumeAnimation);

    // Touch devices
    card.addEventListener("touchstart", pauseAnimation);
    card.addEventListener("touchend", resumeAnimation);
  });
});