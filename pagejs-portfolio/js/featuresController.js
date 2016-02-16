(function(module){
  var featuresController = {};

  featuresController.index = function(){
    console.log('featuresController.index called');

    var $pageContent = $('.page-content');
    var $spiralChunks = $('.spiral-chunk');
    var mainSpiralChunk = 'spiral-chunk-8';
    if (fibonacci.length === 10){
      mainSpiralChunk = 'spiral-chunk-9';
    }
    //loading /about with no prior history
    if (! $spiralChunks.length ) { //spiral is not yet built, need to make the AJAX call, build the articles, and open the about section
      console.log('SPIRAL NOT YET BUILT, WILL BUILD, MAKE AJAX CALL, AND BUILD ARTICLES');
      fibonacci.initializeSpiral();
      indexContent.ensureArticlesInSessionStorage(function(){
        indexContent.buildTopNavbar();
        $('#spiral-chunk-5').append('<h3 class="navheader external-navheader nav-highlightable" id="navheader-github">G H U B</h3>').wrap('<a href="https://github.com/fraziermork" class="navlink external-link"></a>');
        indexContent.buildPageContentSectionsIn(mainSpiralChunk);
        Article.buildFromSessionStorage();
        indexContent.buildSectionTitle('F E A T U R E S', 'features');
        $('#features-section').slideToggle();
      });

    //coming from index page
    } else if (! $pageContent.length) {//spiral is built and empty, need to build the articles and open the about section
      console.log('SPIRAL BUILT, WILL BUILD ARTICLES');
      indexContent.buildTopNavbar();
      $('#navheader-github').addClass('nav-highlightable');
      indexContent.buildPageContentSectionsIn(mainSpiralChunk);
      Article.buildFromSessionStorage();
      indexContent.buildSectionTitle('F E A T U R E S', 'features');
      $('#features-section').slideToggle();

    //coming here from another page content section,
    } else if ($pageContent.length) {//just need to open the about section
      console.log('COMING FROM ANOTHER CONTENT SECTION, JUST NEED TO BUILD ARTICLES');
      $pageContent.hide();
      $('#spiral-chunk-7').empty();
      indexContent.buildSectionTitle('F E A T U R E S', 'features');
      $('#features-section').slideToggle();
    } else {
      console.log('CRITICAL ERROR IN featuresController.index');
    }
  };


  module.featuresController = featuresController;
})(window);
