/**
 * Retrieved code from
 * https://www.w3docs.com/snippets/javascript/how-to-detect-a-click-outside-an-element.html
 * on February 8, 2023
 */

// document.addEventListener("click", (evt) => {
//     const flyoutEl = document.getElementById("flyout-example");
//     let targetEl = evt.target; // clicked element
//     do {
//       if(targetEl == flyoutEl) {
//         // This is a click inside, does nothing, just return.
//         document.getElementById("flyout-debug").textContent = "Clicked inside!";
//         return;
//       }
//       // Go up the DOM
//       targetEl = targetEl.parentNode;
//     } while (targetEl);
//     // This is a click outside.
//     document.getElementById("flyout-debug").textContent = "Clicked outside!";
//   });

/**
 * My Implementation
 */

document.addEventListener("click", (evt) => {
  const contactForm = document.getElementById("contact-form");
  let targetEl = evt.target;
  do {
    if (targetEl == contactForm) {
      return;
    }
    // Go up the DOM
    targetEl = targetEl.parentNode;
  } while (targetEl);
  
  console.log("Clicked outside!");
  testEmail(email, "input");
  testMessage(contactMessage, "input");
  testName(contactName, "input");
});
