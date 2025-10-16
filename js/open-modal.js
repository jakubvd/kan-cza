// === Modal logic for Webflow modals ===
// Only controls state and display — NO layout or animation logic

document.addEventListener("DOMContentLoaded", () => {
  const openButtons = document.querySelectorAll("[data-open]");
  const modals = document.querySelectorAll(".modal-overlay");

  // Open modal
  openButtons.forEach((button) => {
    const targetId = button.getAttribute("data-open");
    const modal = document.getElementById(targetId);

    if (!modal) return;

    button.addEventListener("click", () => {
      // show modal - only apply logic, no styling overrides
      modal.classList.add("is-centered");
      modal.style.display = "flex";
      modal.style.alignItems = "center";
      modal.style.justifyContent = "center";
      modal.style.flexDirection = "column";

      // optional: block scroll behind
      document.body.style.overflow = "hidden";
    });
  });

  // Close modal (by close button or click outside)
  modals.forEach((modal) => {
    const closeBtn = modal.querySelector(".modal-close");

    if (closeBtn) {
      closeBtn.addEventListener("click", () => closeModal(modal));
    }

    modal.addEventListener("click", (e) => {
      const content = modal.querySelector(".modal-content");
      if (!content) return;

      const rect = content.getBoundingClientRect();
      const outside =
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom;

      if (outside) closeModal(modal);
    });

    modal.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal(modal);
    });
  });

  function closeModal(modal) {
    // remove inline styles and restore scroll
    modal.style.display = "none";
    modal.removeAttribute("style");
    document.body.style.overflow = "";
  }
});