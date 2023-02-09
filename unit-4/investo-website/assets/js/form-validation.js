/**
 * Code retrieved from
 * https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#validating_forms_using_javascript
 * on February 8, 2023
 *
 *
 */

// const form = document.querySelector("form");
// const email = document.getElementById("mail");
// const error = email.nextElementSibling;

// // As per the HTML Specification
// const emailRegExp =
//   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// // Now we can rebuild our validation constraint
// // Because we do not rely on CSS pseudo-class, we have to
// // explicitly set the valid/invalid class on our email field
// window.addEventListener("load", () => {
//   // Here, we test if the field is empty (remember, the field is not required)
//   // If it is not, we check if its content is a well-formed email address.
//   const isValid = email.value.length === 0 || emailRegExp.test(email.value);
//   email.className = isValid ? "valid" : "invalid";
// });

// // This defines what happens when the user types in the field
// email.addEventListener("input", () => {
//   const isValid = email.value.length === 0 || emailRegExp.test(email.value);
//   if (isValid) {
//     email.className = "valid";
//     error.textContent = "";
//     error.className = "error";
//   } else {
//     email.className = "invalid";
//   }
// });

// // This defines what happens when the user tries to submit the data
// form.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const isValid = email.value.length === 0 || emailRegExp.test(email.value);
//   if (!isValid) {
//     email.className = "invalid";
//     error.textContent = "I expect an email, darling!";
//     error.className = "error active";
//   } else {
//     email.className = "valid";
//     error.textContent = "";
//     error.className = "error";
//   }
// });

/**
 * My Implementation
 */

const form = document.querySelector("form");
const email = document.getElementById("contact-email");
const emailError = email.nextElementSibling;
const contactName = document.getElementById("contact-name");
const nameError = contactName.nextElementSibling;
const contactMessage = document.getElementById("contact-message");
const messageError = contactMessage.nextElementSibling;

// As per the HTML Specification
const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function testEmail(email, event) {
  var isValid = true;
  if (event == "submit") {
    isValid = emailRegExp.test(email.value);
  } else {
    isValid = email.value.length == 0 || emailRegExp.test(email.value);
  }

  if (isValid) {
    email.classList.remove("invalid");
    emailError.textContent = "";
  } else {
    email.classList.add("invalid");
    emailError.textContent = "Enter valid email";
  }
  return isValid;
}

function testName(name, event) {
  let isValid = true;
  if (event == "submit") {
    isValid = name.value.length != 0;
  } else if (event == "input") {
    isValid = name.value.length >= 0;
  }

  if (isValid) {
    name.classList.remove("invalid");
    nameError.textContent = "";
  } else {
    name.classList.add("invalid");
    nameError.textContent = "Name cannot be empty";
  }
}

function testMessage(message, event) {
  let isValid = true;
  if (event == "submit") {
    isValid = message.value.length != 0;
  } else if (event == "input") {
    isValid = message.value.length >= 0;
  }

  if (isValid) {
    message.classList.remove("invalid");
    messageError.textContent = "";
  } else {
    message.classList.add("invalid");
    messageError.textContent = "Message cannot be empty";
  }
}

window.addEventListener("load", (event) => {
  testEmail(email, event.type);
  testName(contactName, event.type);
  testMessage(contactMessage, event.type);
});

email.addEventListener("input", (event) => {
  testEmail(email, event.type);
});

contactName.addEventListener("input", (event) => {
  testName(contactName, event.type);
});

contactMessage.addEventListener("input", (event) => {
  testMessage(contactMessage, event.type);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  testEmail(email, event.type);
  testName(contactName, event.type);
  testMessage(contactMessage, event.type);
});
