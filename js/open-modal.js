// === Modal logic & animations ===
// Handles native <dialog> elements with smooth transitions

document.addEventListener('DOMContentLoaded', () => {
  const openButtons = document.querySelectorAll('[data-open]');
  const dialogs = document.querySelectorAll('dialog');

  // Open modal
  openButtons.forEach(button => {
    const targetId = button.getAttribute('data-open');
    const dialog = document.getElementById(targetId);

    if (!dialog) return;

    button.addEventListener('click', () => {
      // showModal handles focus and scroll lock automatically
      dialog.showModal();

      // small delay to trigger CSS transition (for Safari fixes)
      requestAnimationFrame(() => {
        dialog.classList.add('is-visible');
      });
    });
  });

  // Close modal (by close button, Esc, or click outside)
  dialogs.forEach(dialog => {
    const closeBtn = dialog.querySelector('.modal-close');

    // Click on × button
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        closeModal(dialog);
      });
    }

    // Click on backdrop (outside content)
    dialog.addEventListener('click', (e) => {
      const rect = dialog.querySelector('.modal-content')?.getBoundingClientRect();
      if (!rect) return;
      const clickedOutside =
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom;
      if (clickedOutside) closeModal(dialog);
    });

    // Press Esc
    dialog.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal(dialog);
    });
  });

  // Helper function: smooth closing
  function closeModal(dialog) {
    dialog.classList.remove('is-visible');
    // Wait for CSS transition before fully closing
    setTimeout(() => dialog.close(), 300);
  }
});