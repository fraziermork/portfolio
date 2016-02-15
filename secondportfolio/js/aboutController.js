(function(module) {
  var aboutController = {};

  // : Create the `articles` table when the controller first loads, with the code that used to be in index.html
  // : Setup a function that kicks off the fetching and rendering of articles, using the same
  // code that used to be in index.html.
  // Also be sure to hide all the main section elements, and reveal the #articles section:
  aboutController.index = function() {
    $('body > section').hide();
    $('#about-frazier-section').show();
  };

  module.aboutController = aboutController;
})(window);