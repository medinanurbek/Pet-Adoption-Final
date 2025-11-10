

$(document).ready(function() {
  console.log("jQuery is ready!");
  
  $("#searchInput").on("keyup", function () {
  const value = $(this).val().toLowerCase().trim();
  const $items = $(".gallery-item");
  let visibleCount = 0;

  $items.each(function () {
    const type = $(this).data("type").toLowerCase();
    const match = type.includes(value) || value === "";
    $(this).toggleClass("show", match);
    $(this).toggle(match);
    if (match) visibleCount++;
  });

  if (value === "") {
    $("#searchMessage").text("Start typing to filter by animal type 🐾");
  } else if (visibleCount > 0) {
    $("#searchMessage").text(`Showing ${visibleCount} result(s) for "${value}" ✅`);
  } else {
    $("#searchMessage").text(`No results found for "${value}" ❌`);
  }
});


$(".gallery-item").each(function (i) {
  $(this).delay(i * 100).queue(function (next) {
    $(this).addClass("show");
    next();
  });
});
});


$(document).ready(function() {
  const availableTypes = ["cat", "dog", "rabbit", "parrot", "hamster", "bird"];
  const $input = $("#searchInput");
  const $suggestions = $("#suggestions");

  $input.on("input", function() {
    const value = $(this).val().toLowerCase().trim();
    $suggestions.empty();

    if (value.length === 0) {
      $suggestions.hide();
      return;
    }


    const filtered = availableTypes.filter(type => type.includes(value));
    if (filtered.length > 0) {
      filtered.forEach(item => {
        $suggestions.append(`<li>${item}</li>`);
      });
      $suggestions.show();
    } else {
      $suggestions.hide();
    }
  });


  $suggestions.on("click", "li", function() {
    const text = $(this).text();
    $input.val(text);
    $suggestions.hide();
    $input.trigger("keyup"); 
  });


  $(document).on("click", function(e) {
    if (!$(e.target).closest(".search-box-container").length) {
      $suggestions.hide();
    }
  });
});

$(document).ready(function() {
  const $input = $("#searchInput");

  function removeHighlights() {
    $(".highlighted").each(function() {
      $(this).replaceWith($(this).text());
    });
  }

  function highlightText(element, keyword) {
    const regex = new RegExp(`(${keyword})`, "gi");
    element.contents().each(function() {
      if (this.nodeType === 3) { // text node
        const newText = this.nodeValue.replace(regex, '<span class="highlighted">$1</span>');
        $(this).replaceWith(newText);
      } else {
        highlightText($(this), keyword); 
      }
    });
  }

  $input.on("input", function() {
    const keyword = $(this).val().trim();
    removeHighlights();

    if (keyword.length < 2) return;


    $(".features, .card-row, .faq, .adopt-form, .rating-section").each(function() {
      highlightText($(this), keyword);
    });
  });
});


$(window).on("scroll", function() {
  const scrollTop = $(window).scrollTop();
  const docHeight = $(document).height() - $(window).height();
  const scrollPercent = (scrollTop / docHeight) * 100;
  $("#scrollProgress").css("width", scrollPercent + "%");
});


$(document).ready(function() {
  const counters = $(".counter");
  let started = false; 

  $(window).on("scroll", function() {
    const triggerPoint = $(".stats-section").offset().top - window.innerHeight + 150;

    if (!started && $(window).scrollTop() > triggerPoint) {
      started = true;
      counters.each(function() {
        const $this = $(this);
        const target = +$this.attr("data-target");
        $({ countNum: 0 }).animate(
          { countNum: target },
          {
            duration: 2000,
            easing: "swing",
            step: function() {
              $this.text(Math.floor(this.countNum));
            },
            complete: function() {
              $this.text(this.countNum + "+");
            }
          }
        );
      });
    }
  });
});

$(document).ready(function() {
  $("#adoptForm").on("submit", function(e) {
    e.preventDefault();

    const $btn = $(this).find("button[type='submit']");
    $btn.addClass("loading").text("Please wait…").prop("disabled", true);

    setTimeout(() => {
      $btn.removeClass("loading").text("Submit Application").prop("disabled", false);
      $("<div class='notification success'>✅ Form submitted successfully!</div>")
        .appendTo("body")
        .fadeIn(200)
        .delay(2000)
        .fadeOut(400, function() { $(this).remove(); });
    }, 2000);
  });
});

$(document).ready(function() {
  window.showNotification = function(message, type = "info", duration = 2500) {
    const $note = $(`<div class="notification ${type}">${message}</div>`);
    $("body").append($note);
    $note.fadeIn(300);

    setTimeout(() => {
      $note.fadeOut(400, function() { $(this).remove(); });
    }, duration);
  };

  $("#themeToggle").on("click", function() {
    const isDark = $("body").hasClass("dark");
    showNotification(isDark ? "🌙 Switched to Night Mode" : "☀️ Back to Day Mode", "info");
  });

  $(".gallery-item img").on("click", function() {
    showNotification("🐶 Added to favorites!", "success");
  });
});




$(document).ready(function() {
  $("#copyBtn").on("click", function() {
    const textToCopy = $("#copyText").text();
    const $btn = $(this);

    
    const temp = $("<textarea>");
    $("body").append(temp);
    temp.val(textToCopy).select();
    document.execCommand("copy");
    temp.remove();


    $btn.addClass("copied").text("✅ Copied!");
    showNotification("Text copied to clipboard!", "success");

    setTimeout(() => {
      $btn.removeClass("copied").text("Copy");
    }, 2000);
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const headerRight = document.querySelector(".header-right");
  const loggedIn = localStorage.getItem("loggedIn");
  const user = JSON.parse(localStorage.getItem("user"));

  if (loggedIn === "true" && user) {
    const nameSpan = document.createElement("span");
    nameSpan.textContent = `👋 ${user.name}`;
    nameSpan.style.fontWeight = "600";
    headerRight.prepend(nameSpan);
    const loginBtn = headerRight.querySelector(".login-btn");
    if (loginBtn) loginBtn.remove();
  }
});
