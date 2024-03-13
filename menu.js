document.addEventListener('DOMContentLoaded', function() {
    // Select the menu button and menu elements
    const menuButton = document.querySelector('.menu-button');
    const menu = document.querySelector('.menu');

    // Add a click event listener to the menu button
    menuButton.addEventListener('click', function() {
      // Toggle the 'active' class on the menu button
      menuButton.classList.toggle('active');
      // Toggle the 'show' class on the menu to trigger the sliding effect
      menu.classList.toggle('show');
    });
  });