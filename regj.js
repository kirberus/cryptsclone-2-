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
  const hamburger = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function() {
      navMenu.classList.toggle("active");
      hamburger.setAttribute(
        "aria-expanded",
        navMenu.classList.contains("active")
      );
    });

    navMenu.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }


  const form = document.getElementById("eventForm");
  if (form) {
    form.addEventListener("submit", function(e) {
      if (eventSelect && eventSelect.multiple && ![...eventSelect.options].some(opt => opt.selected)) {
        alert("Please select at least one event.");
        eventSelect.focus();
        e.preventDefault();
      }
    });
  }
});