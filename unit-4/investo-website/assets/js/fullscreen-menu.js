/*
    Code Retrieved from
    https://www.w3schools.com/howto/howto_js_fullscreen_overlay.asp
    on February 7, 2023

    Explanation of Code
    This is a very simple piece of Javascript that uses the document interface 
    to retrieve an element on the page according to the value of it's id attribute 
    (which, in this case, is "myNav") and then one of that elements style attributes. 
    After the element is retrieved it's display attribute is retrieved using dot(.) 
    notation to first access the elements style and then style's
    display attribute. Then myNav's display is set to "block" or "none" depending on which
    function is called, openNav() or closeNav().

    Critique of this code
*/
// function openNav() {
//   document.getElementById("myNav").style.display = "block";
// }

// function closeNav() {
//   document.getElementById("myNav").style.display = "none";
// }

/*
    My Implementation
    I will be using this code to display my full screen menu when the user
    is using a smaller width device.
    To implement this code it is required that it be embedded into
    each page using a <script> tag. I also had to change the ID passed
    to the getElementById function. Also, because I defined my full screen
    menu as a flexbox element I had to change the value openNav sets display
    as to "flex". openNav() must be set as the value of the header-menu-button's
    onclick attribute. closeNav() must be set as the full-screen-menu-button's
    onclick attribute. I decided to change the function names to openMenu and
    closeMenu to align with the other naming conventions I have been using.

    Once I added this feature to my menu and tried it I realized I forgot that
    I had to finish the CSS for the menu. This didn't take long as it only required
    adding some of the custom classes I defined in unit 3.
*/

function openMenu() {
  document.getElementById("full-screen-menu").style.display = "flex";
}

function closeMenu() {
  document.getElementById("full-screen-menu").style.display = "none";
}
