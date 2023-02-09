/*
  Code Retrieved from
  https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_onresize_window
  on February 7, 2023
  
  Purpose for Using the Code

  Explanation of Code
  The following code detects when the window is resized and, when it is, it calls the
  myFunction function which changes the innerHTML of the element with id demo.
  
  Critique of the Code
  The third line of the code is hard to look at. While it makes the code shorter
  and works fine.
*/

/*
  window.addEventListener("resize", myFunction);

  var x = 0;
  function myFunction() {
    var txt = x += 1;
    document.getElementById("demo").innerHTML = txt;
  }
*/

/*
  My Implementation
  
  When I added the code to open and close the full screen menu I ran into a
  problem. When the menu is open and window is resized the menu doesn't
  disappear! This is not good. This happens because the openMenu() and closeMenu()
  functions add inline styles to the element. The only way to remove them is to use
  more javascript. That is why i tracked down this bit of code that detects window
  resizes. When the window is resized the closeMenu() function can be called and that
  will set the style to none without having to press the close menu button. I also
  renamed the function to make it clear what it does. Also, a conditional test is
  required to detect whether the window innerWidth is greater than 640px.
 */

window.addEventListener("resize", myFunction);

function myFunction() {
  if (window.innerWidth > 640) {
    closeMenu();
  }
}
