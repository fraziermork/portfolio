(function(module){
  pageContentController = {};
  pageContentController.sectionTitleInfo = {
    projects: ['P R O J E C T S', 'projects'],
    features: ['F E A T U R E S', 'features'],
    about: ['A B O U T', 'about']
  };

  pageContentController.index = function(ctx, next) {
    console.log('pageContentController.index called');
    console.log('fibonacci.length is ' + fibonacci.length);
    var currentPageContentSection = ctx.params.currentPageContentSection;
    console.log('currentPageContentSection is ' + currentPageContentSection);
    if (! pageContentController.sectionTitleInfo[currentPageContentSection]) {
      alert('section not found');
      return false;
    }
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
        pageContent.buildSectionTitle(pageContentController.sectionTitleInfo[currentPageContentSection][0], currentPageContentSection);
        $('#' + currentPageContentSection + '-section').slideToggle();
      });

    //coming from index page
    } else if (! $pageContent.length) {//spiral is built and empty, need to build the articles and open the about section
      console.log('SPIRAL BUILT, WILL BUILD ARTICLES');
      pageContent.buildTopNavbar();
      $('#navheader-github').addClass('nav-highlightable');
      pageContent.buildPageContentSectionsIn(mainSpiralChunk);
      Article.buildFromSessionStorage();
      pageContent.buildSectionTitle(pageContentController.sectionTitleInfo[currentPageContentSection][0], currentPageContentSection);
      $('#' + currentPageContentSection + '-section').slideToggle();

    //coming here from another page content section,
    } else if ($pageContent.length) {//just need to open the about section
      console.log('COMING FROM ANOTHER CONTENT SECTION, JUST NEED TO BUILD ARTICLES');
      $pageContent.hide();
      $('#spiral-chunk-7').empty();
      pageContent.buildSectionTitle(pageContentController.sectionTitleInfo[currentPageContentSection][0], currentPageContentSection);
      $('#' + currentPageContentSection + '-section').slideToggle();
    } else {
      console.log('CRITICAL ERROR IN pageContentController.index');
    }

    $(window).on('resize', indexContent.onWindowResize);

    ctx.handled = true;
    next();
  };






  module.pageContentController = pageContentController;
})(window);