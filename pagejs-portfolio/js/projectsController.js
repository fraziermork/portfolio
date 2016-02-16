(function(module){
  var projectsController = {};

  projectsController.index = function(){
    console.log('projectsController.index called');
    console.log('fibonacci.length is ' + fibonacci.length);
    var $pageContent = $('.page-content');
    var $spiralChunks = $('.spiral-chunk');
    var mainSpiralChunk = 'spiral-chunk-8';
    // if (fibonacci.length === 10){
    //   mainSpiralChunk = 'spiral-chunk-9';
    // }
    //loading /about with no prior history
    if (! $spiralChunks.length ) { //spiral is not yet built, need to make the AJAX call, build the articles, and open the about section
      console.log('SPIRAL NOT YET BUILT, WILL BUILD, MAKE AJAX CALL, AND BUILD ARTICLES');
      fibonacci.initializeSpiral();
      indexContent.ensureArticlesInSessionStorage(function(){
        pageContent.buildTopNavbar();
        $('#spiral-chunk-5').append('<h3 class="navheader external-navheader nav-highlightable" id="navheader-github">G H U B</h3>').wrap('<a href="https://github.com/fraziermork" class="navlink external-link"></a>');
        pageContent.buildPageContentSectionsIn(mainSpiralChunk);
        Article.buildFromSessionStorage();
        pageContent.buildSectionTitle('P R O J E C T S', 'projects');
        $('#projects-section').slideToggle();
      });

    //coming from index page
    } else if (! $pageContent.length) {//spiral is built and empty, need to build the articles and open the about section
      console.log('SPIRAL BUILT, WILL BUILD ARTICLES');
      pageContent.buildTopNavbar();
      $('#navheader-github').addClass('nav-highlightable');
      pageContent.buildPageContentSectionsIn(mainSpiralChunk);
      Article.buildFromSessionStorage();
      pageContent.buildSectionTitle('P R O J E C T S', 'projects');
      $('#projects-section').slideToggle();

    //coming here from another page content section,
    } else if ($pageContent.length) {//just need to open the about section
      console.log('COMING FROM ANOTHER CONTENT SECTION, JUST NEED TO BUILD ARTICLES');
      $pageContent.hide();
      $('#spiral-chunk-7').empty();
      pageContent.buildSectionTitle('P R O J E C T S', 'projects');
      $('#projects-section').slideToggle();
    } else {
      console.log('CRITICAL ERROR IN projectsController.index');
    }
  };


  module.projectsController = projectsController;
})(window);