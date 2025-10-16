document.addEventListener("DOMContentLoaded", () => {
  // Check if there are any modals on the page
  const openButtons = document.querySelectorAll("[data-open]");
  const modals = document.querySelectorAll(".modal-overlay");

  // Easing cubic-bezier for sineInOut equivalent
  const easing = "cubic-bezier(0.445, 0.05, 0.55, 0.95)";
  const transitionDuration = 300; // ms

  // Prepare modals for animation
  modals.forEach(modal => {
    const content = modal.querySelector(".modal-content");
    // Set initial styles for animation
    modal.style.opacity = 0;
    modal.style.transition = `opacity ${transitionDuration}ms ${easing}`;
    if (content) {
      content.style.opacity = 0;
      content.style.transform = "translateY(20px)";
      content.style.transition = `opacity ${transitionDuration}ms ${easing}, transform ${transitionDuration}ms ${easing}`;
    }
    modal.style.display = "none";
  });

  // Function to open modal with animation
  function openModal(modal) {
    const content = modal.querySelector(".modal-content");
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // block scroll in the background

    // Force reflow to reset transitions
    modal.offsetHeight;

    modal.style.opacity = 1;
    if (content) {
      content.style.opacity = 1;
      content.style.transform = "translateY(0)";
    }
  }

  // Function to close modal with animation
  function closeModal(modal) {
    const content = modal.querySelector(".modal-content");
    modal.style.opacity = 0;
    if (content) {
      content.style.opacity = 0;
      content.style.transform = "translateY(20px)";
    }
    document.body.style.overflow = "";

    // After transition ends, set display none
    const transitionEndHandler = (e) => {
      if (e.target === modal && e.propertyName === "opacity") {
        modal.style.display = "none";
        modal.removeEventListener("transitionend", transitionEndHandler);
      }
    };
    modal.addEventListener("transitionend", transitionEndHandler);
  }

  // Opening modals
  openButtons.forEach(button => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-open");
      const targetModal = document.getElementById(targetId);
      if (targetModal) {
        openModal(targetModal);
      }
    });
  });

  // Closing modals with × button or clicking outside
  modals.forEach(modal => {
    const closeBtn = modal.querySelector(".modal-close");

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        closeModal(modal);
      });
    }

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });
});
