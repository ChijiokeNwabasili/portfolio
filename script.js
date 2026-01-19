"use strict";

// Uncheck the menu toggle checkbox to close the menu after a nav link is clicked
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("menu-toggle").checked = false;
  });
});

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelectorAll("nav a");

// Close menu and remove scroll lock when any nav link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.checked = false;
    document.body.classList.remove("no-scroll");
  });
});

// Add or remove scroll lock based on toggle state
menuToggle.addEventListener("change", () => {
  if (menuToggle.checked) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
});

// Contact Form Validation & Submission
function setupFormValidation(formId) {
  const form = document.getElementById(formId);

  // Inputs
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  // Error containers
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");

  // Success container
  const successMessage = document.getElementById("success-message");

  // Validation functions
  function validateName() {
    if (nameInput.value.trim().length < 2) {
      nameError.textContent = "Please enter at least 2 characters.";
      return false;
    }
    nameError.textContent = "";
    return true;
  }

  function validateEmail() {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    if (!pattern.test(emailInput.value.trim())) {
      emailError.textContent = "Enter a valid email address.";
      return false;
    }
    emailError.textContent = "";
    return true;
  }

  function validateMessage() {
    if (messageInput.value.trim().length < 10) {
      messageError.textContent = "Message must be at least 10 characters.";
      return false;
    }
    messageError.textContent = "";
    return true;
  }

  // Real-time validation
  nameInput.addEventListener("input", validateName);
  emailInput.addEventListener("input", validateEmail);
  messageInput.addEventListener("input", validateMessage);

  // On form submit
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      return; // Stop if any field is invalid
    }

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
      });

      if (response.ok) {
        form.reset();
        if (successMessage) {
          successMessage.style.display = "block";
          successMessage.textContent =
            "Thanks! Your message is on its way. I'll get back to you within 1-2 business days.";

          // Hide after 5 seconds
          setTimeout(() => {
            successMessage.style.display = "none";
            successMessage.textContent = "";
          }, 5000);
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  });
}

setupFormValidation("contact-form");

// Update the copyright year automatically to always show the current year
document.querySelector(
  ".copyright"
).innerHTML = `© ${new Date().getFullYear()} Chijioke Nwabasili. All rights reserved.`;
