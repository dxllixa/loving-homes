var menuButton = document.querySelector(".menu-toggle");
var navigation = document.querySelector(".site-nav");
var searchForms = document.querySelectorAll(".site-search");
var sitePages = [
  { url: "index.html", keywords: ["home", "loving homes", "dog hotel", "dogs", "stay"] },
  { url: "about.html", keywords: ["about", "team", "staff", "story"] },
  { url: "services.html", keywords: ["services", "service", "care", "play", "rooms"] },
  { url: "packages.html", keywords: ["packages", "pricing", "prices", "book", "booking"] },
  { url: "premium.html", keywords: ["premium", "premium package", "luxury"] },
  { url: "classic.html", keywords: ["classic", "classic package", "standard"] },
  { url: "day.html", keywords: ["day", "day care", "daycare"] },
  { url: "gallery.html", keywords: ["gallery", "photos", "images", "pictures"] },
  { url: "contact.html", keywords: ["contact", "message", "email", "phone"] }
];

if (menuButton && navigation) {
  menuButton.onclick = function () {
    navigation.classList.toggle("open");
  };
}

for (var s = 0; s < searchForms.length; s++) {
  var searchForm = searchForms[s];
  var searchInput = searchForm.querySelector('input[name="q"]');
  var searchStatus = searchForm.querySelector(".search-status");

  searchForm.onsubmit = function (event) {
    event.preventDefault();

    var form = event.currentTarget;
    var input = form.querySelector('input[name="q"]');
    var status = form.querySelector(".search-status");
    var query = input.value.trim().toLowerCase();

    if (!query) {
      status.textContent = "Type something to search.";
      return;
    }

    var match = null;

    for (var p = 0; p < sitePages.length; p++) {
      var page = sitePages[p];
      var haystack = page.url + " " + page.keywords.join(" ");

      if (haystack.indexOf(query) !== -1 || query.indexOf(page.keywords[0]) !== -1) {
        match = page;
        break;
      }
    }

    if (match) {
      status.textContent = "Opening " + match.url.replace('.html', '') + "...";
      window.location.href = match.url;
    } else {
      status.textContent = "No matching page found. Try home, services, packages, gallery, or contact.";
    }
  };

  if (searchInput && searchStatus) {
    searchInput.oninput = function () {
      var activeForm = this.closest(".site-search");
      var activeStatus = activeForm.querySelector(".search-status");
      activeStatus.textContent = "";
    };
  }
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
