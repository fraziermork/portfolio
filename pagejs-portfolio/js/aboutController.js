(function(module){
  var aboutController = {};

  aboutController.index = function(){
    console.log('aboutController.index called');
    console.log('fibonacci.arrayLength is ' + fibonacci.arrayLength);
    //needs to check if the spiral exists--if not, build it and all page content and open the articles section
    //else if needs to check if pagecontent exists, if not, build pagecontent and open to the articles section
    //else just needs to open the articles section


    //PROBABLY NO LONGER NEEDED ASSUMING THAT THE EXIT FUNCTION WORKS
    // if ($indexLinks.length){ //came here from the index page
    //   console.log('found index links, came here from index page');
    //   //return to initial spiral state
    //   $indexLinks.find('.spiral-chunk').empty().unwrap();
    //   //build all page content sections
    //   pageContent.buildPageContentSectionsIn('spiral-chunk-8');
    //   Article.buildFromSessionStorage();
    //   //build the navbar
    //
    // } else

    var $indexLinks = $('.index-link');
    var $pageContent = $('.page-content');
    var $spiralChunks = $('.spiral-chunk');
    var mainSpiralChunk = 'spiral-chunk-8';
    // if (fibonacci.arrayLength === 10){
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
        pageContent.buildSectionTitle('A B O U T', 'about');
        $('#about-section').slideToggle();
      });

    //coming from index page
    } else if (! $pageContent.length) {//spiral is built and empty, need to build the articles and open the about section
      console.log('SPIRAL BUILT, WILL BUILD ARTICLES');
      pageContent.buildTopNavbar();
      $('#navheader-github').addClass('nav-highlightable');
      pageContent.buildPageContentSectionsIn(mainSpiralChunk);
      Article.buildFromSessionStorage();
      pageContent.buildSectionTitle('A B O U T', 'about');
      $('#about-section').slideToggle();

    //coming here from another page content section,
    } else if ($pageContent.length) {//just need to open the about section
      console.log('COMING FROM ANOTHER CONTENT SECTION, JUST NEED TO BUILD ARTICLES');
      $pageContent.hide();
      $('#spiral-chunk-7').empty();
      pageContent.buildSectionTitle('A B O U T', 'about');
      $('#about-section').slideToggle();
    } else {
      console.log('CRITICAL ERROR IN aboutController.index');
    }

    // var $pageContentSections = $('.page-content');
    // if (! $pageContentSections.length){
    //   console.log('came here from index page');
    //   indexContent.firstNavClick($('#about-section'));
    //
    // } else if ($pageContentSections.length){
    //   console.log('did not come here from index page');
    //
    //
    // } else {
    //   console.log('critical error');
    // }

  };


  module.aboutController = aboutController;
})(window);
