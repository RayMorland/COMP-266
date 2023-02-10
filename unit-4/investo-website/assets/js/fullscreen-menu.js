/*
  Code Retrieved from
  https://www.w3schools.com/howto/howto_js_fullscreen_overlay.asp
  on February 7, 2023

  Purpose for Using the Code

  One of the goals I have for meeting my user requirements is that the website be equally as usable
  on a mobile or small form factor device as it is on a normal laptop or desktop screen. To make this
  happen I wanted to have a full screen menu when the width of the screen is smaller. This is a very
  popular trend for modern websites and apps. It makes the site feel more intuitive on a smaller 
  screen. I know from previous experience that this functionality is actually quite easy to implement
  and most of the heavy work is done in the CSS and HTML. Nonetheless the following piece of code 
  is more powerful and useful than one might imagine.

  Explanation of Code

  This is a very simple piece of Javascript that uses the document interface 
  to retrieve an element on the page according to the value of it's id attribute 
  (which, in this case, is "myNav") and then one of that elements style attributes. 
  After the element is retrieved it's display attribute is retrieved using dot(.) 
  notation to first access the elements style and then style's
  display attribute. Then myNav's display is set to "block" or "none" depending on which
  function is called, openNav() or closeNav().

  Critique of this code

  There isn't much to critique about this code as it is so short. It is the perfect and most
  vanilla way to add and change a style on an HTML element. The names of the functions make 
  it clear exactly what they are for. The only thing that I'm not a fan of is the use of 
  camelcase (thisIsACamel) for id names. I prefer kebab case (this-is-a-kebab) for ids 
  and classes in HTML and CSS (makes it easy to use String.split('-')).
*/

/*
  function openNav() {
    document.getElementById("myNav").style.display = "block";
  }

  function closeNav() {
    document.getElementById("myNav").style.display = "none";
  } 
*/

/*
    My Implementation

    To implement this code it is required that it be embedded into each page using 
    a <script> tag. I also had to change the ID passed to the getElementById function. Also, 
    because I defined my full screen menu as a flexbox element I had to change the value openNav 
    sets display as to "flex". openNav() must be set as the value of the header-menu-button's
    onclick attribute. closeNav() must be set as the full-screen-menu-button's onclick attribute. 
    I decided to change the function names to openMenu and closeMenu to align with the other naming
    conventions I have been using. Once I added this feature to my menu and tried it, I realized I 
    forgot that I had to finish the CSS for the menu. This didn't take long as it only required
    adding some of the custom classes I defined in unit 3.
*/

// function to open the full screen menu
function openMenu() {
  // change the display to flex when it is open
  document.getElementById("full-screen-menu").style.display = "flex";
}

// function to close the full screen menu
function closeMenu() {
  // change display to none when it is closed
  document.getElementById("full-screen-menu").style.display = "none";
}
