document.getElementById('adoptForm').addEventListener('submit', function(event) {
  event.preventDefault(); 

  let isValid = true;
  let errorMessage = "";

  const nameField = document.getElementById('name');
  const emailField = document.getElementById('email');
  const petField = document.getElementById('pet');
  const messageField = document.getElementById('message');
  const errorBox = document.getElementById('error-message');

  errorBox.innerHTML = "";
  nameField.style.border = emailField.style.border = petField.style.border = messageField.style.border = '';

 
  if (!nameField.value.trim()) {
    isValid = false;
    errorMessage += "Name is required.<br>";
    nameField.style.border = '2px solid orange';  
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailField.value.match(emailPattern)) {
    isValid = false;
    errorMessage += "Please enter a valid email address.<br>";
    emailField.style.border = '2px solid red';  
  }

  if (!petField.value) {
    isValid = false;
    errorMessage += "Please select a pet to adopt.<br>";
    petField.style.border = '2px solid red';  
  }

  if (!messageField.value.trim()) {
    isValid = false;
    errorMessage += "Message is required.<br>";
    messageField.style.border = '2px solid red';  
  }

 
  if (!isValid) {
    errorBox.innerHTML = errorMessage;
    showNotification("❌ Please correct the highlighted fields.", "error");
    return; 
  }

  
  showNotification("✅ Form submitted successfully!", "success");


  nameField.value = "";
  emailField.value = "";
  petField.value = "";
  messageField.value = "";
});




document.addEventListener('DOMContentLoaded', function () {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', function () {
      const content = header.nextElementSibling;

      if (content.style.display === 'block') {
        content.style.display = 'none';
      } else {
        content.style.display = 'block';
      }
    });
  });
});



document.addEventListener('DOMContentLoaded', function () {
  const dateTimeBlock = document.getElementById('dateTimeBlock');

  function updateDateTime() {
    const now = new Date();  

    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true  
    };

    const formatted = now.toLocaleString('en-EN', options);

    dateTimeBlock.textContent = formatted;
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);
});

document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll(".star");
  const msg = document.getElementById("ratingMessage");
  let selected = 0;

  if (stars.length > 0) {
    stars.forEach(star => {
      star.addEventListener("click", () => {
        selected = parseInt(star.dataset.value);
        stars.forEach((s, i) => {
          s.style.color = i < selected ? "#ff9a3b" : "#ccc";
        });

        switch (selected) {
          case 1:
            msg.textContent = "😿 We're sorry to hear that...";
            msg.style.color = "#d9534f";
            break;
          case 2:
            msg.textContent = "😕 We'll try to improve!";
            msg.style.color = "#f0ad4e";
            break;
          case 3:
            msg.textContent = "😺 Thanks for your feedback!";
            msg.style.color = "#f7c04a";
            break;
          case 4:
            msg.textContent = "🐶 Great! We're glad you liked it!";
            msg.style.color = "#5cb85c";
            break;
          case 5:
            msg.textContent = "🐾 Thank you! You made our day!";
            msg.style.color = "#3cba54";
            break;
        }
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("themeToggle");
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️ Day";
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");

    toggleBtn.textContent = isDark ? "☀️ Day" : "🌙 Night";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});


$(document).ready(function() {
  console.log("jQuery is ready!");
});