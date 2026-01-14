document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const errorElement = document.getElementById("error");
  let error = "";

  if (name === "") {
    error = "Name is required";
  } else if (email === "") {
    error = "Email is required";
  } else if (!validateEmail(email)) {
    error = "Invalid email address";
  } else if (message === "") {
    error = "Message is required";
  }

  if (error) {
    errorElement.innerText = error;
    errorElement.style.display = "block";
  } else {
    errorElement.style.display = "none";
    alert("Message sent successfully!");
    document.getElementById("contactForm").reset();
  }
});

const validateEmail = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};
