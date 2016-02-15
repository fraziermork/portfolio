(function(module) {
  var articleController = {};

  // : Create the `articles` table when the controller first loads, with the code that used to be in index.html:
  ProjectSummary.makeAjaxCall();
  // : Setup a function that kicks off the fetching and rendering of articles, using the same
  // code that used to be in index.html.
  // Also be sure to hide all the main section elements, and reveal the #articles section:
  articleController.index = function() {
    Article.fetchAll(articleView.initIndexPage);
    $('body > section').hide();
    $('#project-article-section').show();
  };

  module.articleController = articleController;
})(window);
