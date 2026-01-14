// Using JS
// document.getElementById("myForm").addEventListener("submit", function (event) {
//   event.preventDefault(); // Stop form from submitting

//   const name = document.getElementById("name").value.trim();
//   const email = document.getElementById("email").value.trim();
//   let error = "";

//   if (name === "") {
//     error = "Name is required";
//   } else if (!validateEmail(email)) {
//     error = "Invalid email address";
//   }

//   document.getElementById("error").innerText = error;

//   if (error === "") {
//     alert("form submitted successfully");
//     // form.submit() if required
//   }
// });

// // Email validation using regex
// function validateEmail(email) {
//   const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return pattern.test(email);
// }

// Using jQuery
$(function () {
  $("#myForm").submit(function (event) {
    event.preventDefault();

    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    let error = "";

    if (name === "") {
      error = "Name is required";
    } else if (!validateEmail(email)) {
      error = "Invalid email address";
    }

    $("#error").text(error);

    if (error === "") {
      alert("form submitted successfully");
    }
  });
  
  function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }
});
