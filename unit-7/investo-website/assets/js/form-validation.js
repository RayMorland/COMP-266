/*
  Code retrieved from
  https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#validating_forms_using_javascript
  on February 8, 2023

  Purpose for Using the Code

  While I won't be able to fully implement the form until backend processing is available, I wanted 
  to make sure that there is some front-end form validation that occurs. I wanted to change the styles 
  on the inputs when there are errors and this piece of code does just that. This will provide a better
  user experience when the user would like to contact the owners of the site if they need help.
  Not showing errors is one of the most annoying things we all come across while using other websites.

  Explanation of the Code

  This code tests whether an email input contains a valid value and if it does not it applies
  styles to warn the users to put a correct value in. It does this by getting the value of the 
  input using document functions and accessing the input's attributes. It then tests this value
  against a regular expression that defines the sequence of characters that represents an email
  (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#validation). The code
  performs this test for three types of events: window load, email input, and form submit. When
  any of these events occur the test runs then, depending on what kind of event it was that 
  occurred, css classes are added or changed on the elements.

  Critique of the Code
  
  This is another bit of interesting code. Leveraging event listeners, regex 
  (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions), and adding
  classes using classList(). I appreciate the use of some of the more intermediate language
  structures in this code such as the ternary operator 
  (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator).
  However, I think that some of the conditional tests are repetitive and could be condensed and 
  placed in their own separate function. For instance, the line defining isValid is the same in all
  three event listeners, this could be condensed. The comments were very helpful in this one.

*/

/*
  const form = document.querySelector("form");
  const email = document.getElementById("mail");
  const error = email.nextElementSibling;

  // As per the HTML Specification
  const emailRegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  // Now we can rebuild our validation constraint
  // Because we do not rely on CSS pseudo-class, we have to
  // explicitly set the valid/invalid class on our email field
  window.addEventListener("load", () => {
    // Here, we test if the field is empty (remember, the field is not required)
    // If it is not, we check if its content is a well-formed email address.
    const isValid = email.value.length === 0 || emailRegExp.test(email.value);
    email.className = isValid ? "valid" : "invalid";
  });

  // This defines what happens when the user types in the field
  email.addEventListener("input", () => {
    const isValid = email.value.length === 0 || emailRegExp.test(email.value);
    if (isValid) {
      email.className = "valid";
      error.textContent = "";
      error.className = "error";
    } else {
      email.className = "invalid";
    }
  });

  // This defines what happens when the user tries to submit the data
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const isValid = email.value.length === 0 || emailRegExp.test(email.value);
    if (!isValid) {
      email.className = "invalid";
      error.textContent = "I expect an email, darling!";
      error.className = "error active";
    } else {
      email.className = "valid";
      error.textContent = "";
      error.className = "error";
    }
  });
 */

/*
  My Implementation

  I found that the above code worked quite well after I modified it as shown below. The 
  original code only works on a single email input, but I want it to work on all three 
  of my inputs in my contact form. To make this happen I had to add error elements to the
  form underneath each input (check out the HTML to see this). In the code below I condensed
  the testing from the original into functions, one for each input. The email input is the only
  input that requires the regex test because the others, message and name, are just any random
  string equal to or greater than one character long. There could definitely be more validation
  here. The sky's the limit. I decided to keep it as basic as possible just to get the styles 
  looking right. Also, there is still only one window and one form event listener still but there
  are event listeners added for the message and name input. The event type is passed in to the 
  test functions because it aids in determining the validity of the input.

*/

// get the form element
const form = document.querySelector("form");
// get the email element
const email = document.getElementById("contact-email");
// the error span element is the only sibling of the email input
const emailError = email.nextElementSibling;
// get the name element
const contactName = document.getElementById("contact-name");
// the error span element is the only sibling of the name input
const nameError = contactName.nextElementSibling;
// get the message element
const contactMessage = document.getElementById("contact-message");
// the error span element is the only sibling of the message input
const messageError = contactMessage.nextElementSibling;

// this is the regular expression representing a valid email defined by the HTML standard
const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// function to test the validity of the email input
function testEmail(email, event) {
  // default condition
  var isValid = true;
  // when the submit button is pressed only compare against the regex
  if (event == "submit") {
    isValid = emailRegExp.test(email.value);
  } else {
    // if the user removes their input or the form hasn't been touched the input is valid
    // the value in the input has length of zero (nothing is entered)
    isValid = email.value.length == 0 || emailRegExp.test(email.value);
  }

  // if the input is valid remove the invalid class so it goes back to normal
  if (isValid) {
    email.classList.remove("invalid");
    emailError.textContent = "";
  } else {
    // if the input is invalid add the invalid class and display text in the error span
    email.classList.add("invalid");
    emailError.textContent = "Enter valid email";
  }
  return isValid;
}

// function to test the validity of the name input value
function testName(name, event) {
  // default value
  let isValid = true;

  // if the user submits the form the name input can't have zero length, they must enter a name
  if (event == "submit") {
    isValid = name.value.length != 0;
  } else if (event == "input") {
    // if the user enters or deletes characters the input is always valid
    isValid = name.value.length >= 0;
  }


  // if the input is valid remove the invalid class so it goes back to normal
  if (isValid) {
    name.classList.remove("invalid");
    nameError.textContent = "";
  } else {
    // if the input is invalid add the invalid class and display text in the error span
    name.classList.add("invalid");
    nameError.textContent = "Name cannot be empty";
  }

  return isValid;
}

// function that tests the validity of the message input value
function testMessage(message, event) {
  let isValid = true;

  // if the user submits the form the name input can't have zero length, they must enter a name
  if (event == "submit") {
    isValid = message.value.length != 0;
  } else if (event == "input") {
    // if the user enters or deletes characters the input is always valid
    isValid = message.value.length >= 0;
  }

  // if the input is valid remove the invalid class so it goes back to normal
  if (isValid) {
    message.classList.remove("invalid");
    messageError.textContent = "";
  } else {
    // if the input is invalid add the invalid class and display text in the error span
    message.classList.add("invalid");
    messageError.textContent = "Message cannot be empty";
  }

  return isValid;
}

// event listener that triggers when window is loaded
window.addEventListener("load", (event) => {
  testEmail(email, event.type);
  testName(contactName, event.type);
  testMessage(contactMessage, event.type);
});

// event listener that triggers when the email input value is changed
email.addEventListener("input", (event) => {
  testEmail(email, event.type);
});

// event listener that triggers when the name input value is changed
contactName.addEventListener("input", (event) => {
  testName(contactName, event.type);
});

// event listener that triggers when the message input value is changed
contactMessage.addEventListener("input", (event) => {
  testMessage(contactMessage, event.type);
});

// event listener that triggers when the form is submitted
form.addEventListener("submit", (event) => {
  event.preventDefault();

  let emailValid = testEmail(email, event.type);
  let nameValid = testName(contactName, event.type);
  let messageValid = testMessage(contactMessage, event.type);

  if (emailValid && nameValid && messageValid) {
    alert("Form sent!");
    form.reset();
  }
});
