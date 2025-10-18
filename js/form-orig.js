document.addEventListener("DOMContentLoaded", () => {
  // Select all forms with an ID
  const forms = document.querySelectorAll("form[id]");

  forms.forEach(form => {
    // Get the form ID (e.g. "form-beata")
    const formId = form.getAttribute("id");

    // Find or create a hidden input with the name "form_origin"
    let hiddenInput = form.querySelector('input[name="form_origin"]');
    if (!hiddenInput) {
      hiddenInput = document.createElement("input");
      hiddenInput.type = "hidden";
      hiddenInput.name = "form_origin";
      form.appendChild(hiddenInput);
    }

    // Set the form ID as the value of the hidden input
    hiddenInput.value = formId;
  });
});
