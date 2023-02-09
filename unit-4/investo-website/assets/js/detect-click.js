/*
  Code Retrieved from
  https://www.w3docs.com/snippets/javascript/how-to-detect-a-click-outside-an-element.html
  on February 8, 2023
  
  Purpose for Using the Code

  When I added the code to perform form validation I noticed that if the user leaves the form 
  and leaves it in a state with errors still showing they stick around unless the user goes 
  back into the form and corrects them. I wanted a solution that cleared the form of errors when
  the user started doing something else and would leave the form looking nice. I thought it would
  be interesting to make it a simple click outside the form the would clear the errors. I went 
  and found the following code. (I also thought about using a timeout and making it more 
  complicated, but this works fine).

  Explanation of the Code
  
  The following code listens for a "click" event on the document (the web page) and determines
  whether the click happened on a particular element or not. It does this by starting at the
  element that was actually clicked (targetEl = evt.target) and loops up the DOM tree through the clicked
  on element's ancestors until there are no more parent nodes or the current parent element is
  equal to the target element (flyoutEl). If none of the ancestral elements of the element that was clicked
  on are the element we didn't want to click on than we know the click occurred outside of that
  element. If a match occurs we know we clicked within the target element.

  Critique of the Code

  I like this code. It is a neat trick that applies knowledge of the DOM tree structure and 
  Document interface as well as event listeners and the EventTarget interface 
  (https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener and 
  https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model). The placement
  of the comments within the code are helpful for understanding what is going on at each line 
  of the code. However, there could be more and they could be slightly more descriptive. The 
  naming of the targetEl (target element) makes sense but the flyoutEl doesn't make that much sense out of 
  context without the HTML that is also found in the article the code was provided in. I don't
  think that the textContent function is the best choice here. Node.textContent removes and 
  replaces all of the child nodes of the element with the text provided. You need to be very
  careful when using code that removes elements like that (read this article to learn 
  more: https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent).

*/

/*
document.addEventListener("click", (evt) => {
    const flyoutEl = document.getElementById("flyout-example");
    let targetEl = evt.target; // clicked element
    do {
      if(targetEl == flyoutEl) {
        // This is a click inside, does nothing, just return.
        document.getElementById("flyout-debug").textContent = "Clicked inside!";
        return;
      }
      // Go up the DOM
      targetEl = targetEl.parentNode;
    } while (targetEl);
    // This is a click outside.
    document.getElementById("flyout-debug").textContent = "Clicked outside!";
  });
*/

/*
  My Implementation
  
  For my code I removed the code related to the flyout elements. All I am concerned with is that
  the user clicks somewhere outside the bounding box of the form. I had to add my form element
  (#contact-form). Also, to clear the errors I rely on the methods that I created in the form
  validation script. These will only actually clear the errors when there are no errors. So if
  a user clicks outside the form and there are errors, the expected behavior is that the errors
  are still there. Test this by hitting submit with all the inputs empty and then clicking 
  outside the form to clear the errors Of course to do this the form validation script must be 
  included in the HTML with this script.
*/

// code to test whether a user clicks within the contact form
document.addEventListener("click", (evt) => {
  // get the contact form element
  const contactForm = document.getElementById("contact-form");
  // set the target element to the element the user clicks on
  let targetEl = evt.target;
  // while there are still parent nodes test whether targetEl is the contact form
  do {
    if (targetEl == contactForm) {
      return;
    }
    // if targetEl is not the contact form continue up the DOM tree
    targetEl = targetEl.parentNode;
  } while (targetEl);

  // call tests on the contact form email, message, and name to reset error formatting
  testEmail(email, "input");
  testMessage(contactMessage, "input");
  testName(contactName, "input");
});
