document.addEventListener("DOMContentLoaded", () => {
  // Check if there are any modals on the page
  const openButtons = document.querySelectorAll("[data-open]");
  const modals = document.querySelectorAll(".modal-overlay");

  // Opening modals
  openButtons.forEach(button => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-open");
      const targetModal = document.getElementById(targetId);
      if (targetModal) {
        targetModal.style.display = "flex";
        document.body.style.overflow = "hidden"; // block scroll in the background
      }
    });
  });

  // Closing modals with × button or clicking outside
  modals.forEach(modal => {
    const closeBtn = modal.querySelector(".modal-close");

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.style.overflow = "";
      });
    }

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }
    });
  });
});
