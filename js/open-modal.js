document.addEventListener("DOMContentLoaded", () => {
  const openButtons = document.querySelectorAll("[data-open]");
  const dialogs = document.querySelectorAll("dialog");

  if (!openButtons.length || !dialogs.length) {
    return;
  }

  // Function to open dialog
  function openDialog(dialog) {
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    }
  }

  // Function to close dialog
  function closeDialog(dialog) {
    if (typeof dialog.close === "function") {
      dialog.close();
    }
  }

  // Opening dialogs
  openButtons.forEach(button => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-open");
      const targetDialog = document.getElementById(targetId);
      if (targetDialog && targetDialog.tagName.toLowerCase() === "dialog") {
        openDialog(targetDialog);
      }
    });
  });

  // Closing dialogs with close button or clicking outside
  dialogs.forEach(dialog => {
    const closeBtn = dialog.querySelector(".modal-close");

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        closeDialog(dialog);
      });
    }

    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) {
        closeDialog(dialog);
      }
    });
  });
});
