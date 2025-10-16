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
      document.body.style.overflow = "hidden";

      // ✅ Auto focus first input in form after open
      const firstInput = modal.querySelector("input, textarea, select");
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 150); // delay for Webflow render
      }

      // ✅ Enable focus trap (keep tab inside modal)
      trapFocus(modal);
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
    modal.style.display = "none";
    modal.removeAttribute("style");
    modal.classList.remove("is-centered");
    document.body.style.overflow = "";
  }

  // ✅ Focus trap logic (keeps tabbing inside modal)
  function trapFocus(modal) {
    const focusable = modal.querySelectorAll(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    modal.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }
});