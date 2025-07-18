const classSelect = document.getElementById("class");
const eventSelect = document.getElementById("event");
const emailInput = document.getElementById("email");
const extraFields = document.getElementById("extra-fields");


const eventsByClass = {
  "4": ["Scratch Xplorers (Game Dev)"],
  "5": ["Scratch Xplorers (Game Dev)"],
  "6": ["Byte the Site", "QWERTY 3.0", "Visual Wit"],
  "7": ["Byte the Site", "QWERTY 3.0", "Visual Wit"],
  "8": ["Byte the Site", "QWERTY 3.0", "Visual Wit", "PixelPulse", "Mission: Decrypt"],
  "9": ["Mission: Decrypt", "PixelPulse", "Visual Wit"],
  "10": ["Mission: Decrypt", "PixelPulse", "Visual Wit"],
  "11": ["Mission: Decrypt", "Portfolio Design", "PixelPulse", "Visual Wit", "Byte the Site"],
  "12": ["Mission: Decrypt", "Portfolio Design", "PixelPulse", "Visual Wit", "Byte the Site"]
};

classSelect.addEventListener("change", () => {
  const selected = classSelect.value;
  const options = eventsByClass[selected] || [];
  if (options.length) {
    eventSelect.innerHTML = options
      .map(ev => `<option value="${ev}">${ev}</option>`)
      .join('');
    eventSelect.disabled = false;
    eventSelect.size = Math.max(Math.min(options.length, 10), 1);
  } else {
    eventSelect.innerHTML = '<option value="">No events available</option>';
    eventSelect.disabled = true;
    eventSelect.size = 1;
  }
});


if (!classSelect.value) {
  eventSelect.innerHTML = '<option value="">Select class first</option>';
  eventSelect.disabled = true;
  eventSelect.size = 1;
}

emailInput.addEventListener("input", () => {
  const emailValue = emailInput.value.trim();
  if (emailValue.length > 3 && emailValue.includes("@")) {
    extraFields.classList.add("show");
  } else {
    extraFields.classList.remove("show");
  }
});

document.addEventListener("DOMContentLoaded", function() {
  // ... (all your other existing JavaScript code for the hamburger menu, etc., stays here)

  const form = document.getElementById("eventForm");
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault(); // Prevents the default form submission

      // Validation for the event selection
      if (eventSelect && eventSelect.multiple && ![...eventSelect.options].some(opt => opt.selected)) {
        alert("Please select at least one event.");
        eventSelect.focus();
        return; // Stop the function if no event is selected
      }

      const zapierWebhookUrl = "https://hooks.zapier.com/hooks/catch/23851277/u2equrs/"; // <-- PASTE YOUR ZAPIER WEBHOOK URL HERE

      const formData = new FormData(form);
      const data = {
        email: formData.get("email"),
        name: formData.get("name"),
        class: formData.get("class"),
        section: formData.get("section"),
        events: formData.getAll("event[]").join(", ") // Joins multiple events into a single string
      };

      fetch(zapierWebhookUrl, {
        method: "POST",
        body: JSON.stringify(data),
      })
      .then(response => {
        if (response.ok) {
          alert("Thank you for registering!");
          form.reset(); // Optionally reset the form
          extraFields.classList.remove("show"); // Hide the extra fields again
        } else {
          // This will handle network errors, but not necessarily errors from Zapier's execution
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              alert(data["errors"].map(error => error["message"]).join(", "));
            } else {
              alert("An error occurred. Please try again.");
            }
          })
        }
      })
      .catch(error => {
        console.error("Error submitting form:", error);
        alert("An error occurred while submitting the form. Please check the console for more details.");
      });
    });
  }
});