var menuButton = document.querySelector(".menu-toggle");
var navigation = document.querySelector(".site-nav");

if (menuButton && navigation) {
  menuButton.onclick = function () {
    navigation.classList.toggle("open");
  };
}

var contactForm = document.getElementById("contactForm");
var statusMessage = document.getElementById("formStatus");

if (contactForm) {
  contactForm.onsubmit = function (event) {
    event.preventDefault();

    var isValid = true;
    var fields = contactForm.querySelectorAll("[required]");

    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      var row = field.parentElement;
      var errorMessage = row.querySelector(".error-message");

      field.classList.remove("field-error");
      errorMessage.textContent = "";

      if (field.value.trim() === "") {
        field.classList.add("field-error");
        errorMessage.textContent = "Please fill this in.";
        isValid = false;
      }
    }

    if (isValid) {
      statusMessage.textContent = "Message sent. We will reply soon.";
      statusMessage.style.color = "#1d6f42";
      contactForm.reset();
    } else {
      statusMessage.textContent = "Please fix the form and try again.";
      statusMessage.style.color = "#b42318";
    }
  };
}
