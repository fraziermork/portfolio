(function(module) {
  pageContentController = {};

  //relates the text for the section titles in chunk7 to the urls for pagejs
  pageContentController.sectionTitleInfo = {};
  pageContentController.sectionTitleInfo.projects = ['P R O J E C T S', 'projects'];
  pageContentController.sectionTitleInfo.features = ['F E A T U R E S', 'features'];
  pageContentController.sectionTitleInfo.about = ['A B O U T', 'about'];



  //runs on page load
  pageContentController.index = function(ctx, next) {
    console.log('pageContentController.index called');
    console.log('fibonacci.arrayLength is ' + fibonacci.arrayLength);
    var currentPageContentSection = ctx.params.currentPageContentSection;
    console.log('currentPageContentSection is ' + currentPageContentSection);
    if (! pageContentController.sectionTitleInfo[currentPageContentSection]) {
      alert('section not found');
      return false;
    }
    var $pageContent = $('.page-content');
    var $spiralChunks = $('.spiral-chunk');
    var mainSpiralChunk = 'spiral-chunk-8';

    //loading with no prior history
    if (! $spiralChunks.length ) { //spiral is not yet built, need to make the AJAX call, build the articles, and open the about section
      console.log('SPIRAL NOT YET BUILT, WILL BUILD, MAKE AJAX CALL, AND BUILD ARTICLES');
      fibonacci.initializeSpiral();
      if (fibonacci.arrayLength === 10){
        mainSpiralChunk = 'spiral-chunk-9';
        $('#spiral-chunk-8').append('<div class="main-image-holder" id="main-image-holder"><div class="main-image" id="main-image"></div></div>');
      }
      indexContent.ensureArticlesInSessionStorage(function(){
        pageContent.buildTopNavbar();
        $('#spiral-chunk-5').append('<h3 class="navheader external-navheader nav-highlightable" id="navheader-github">G H U B</h3>').wrap('<a href="https://github.com/fraziermork" class="navlink external-link"></a>');
        pageContent.buildPageContentSectionsIn(mainSpiralChunk);
        Article.buildFromSessionStorage(currentPageContentSection);
        pageContent.buildSectionTitle(pageContentController.sectionTitleInfo[currentPageContentSection][0], currentPageContentSection);
        $('#' + currentPageContentSection + '-section').slideToggle();
        if (fibonacci.arrayLength === 10 && ! $('#' + currentPageContentSection + '-section').find('.open-article').length){ //probably should cache this jqobject
          $('#' + currentPageContentSection + '-section').find('.project-article:first-of-type .article-title').click();
        }
      });

    //coming from index page
    } else if (! $pageContent.length) {//spiral is built and empty, need to build the articles and open the about section
      console.log('SPIRAL BUILT, WILL BUILD ARTICLES');
      if (fibonacci.arrayLength === 10) {
        mainSpiralChunk = 'spiral-chunk-9';
        $('#spiral-chunk-8').append('<div class="main-image-holder" id="main-image-holder"><div class="main-image" id="main-image"></div></div>');
      }
      pageContent.buildTopNavbar();
      $('#navheader-github').addClass('nav-highlightable');
      pageContent.buildPageContentSectionsIn(mainSpiralChunk);
      Article.buildFromSessionStorage(currentPageContentSection);
      pageContent.buildSectionTitle(pageContentController.sectionTitleInfo[currentPageContentSection][0], currentPageContentSection);
      $('#' + currentPageContentSection + '-section').slideToggle();
      if (fibonacci.arrayLength === 10 && ! $('#' + currentPageContentSection + '-section').find('.open-article').length) { //probably should cache this jqobject
        $('#' + currentPageContentSection + '-section').find('.project-article:first-of-type .article-title').click();
      }
    //coming here from another page content section,
    } else if ($pageContent.length) {//just need to open the about section
      console.log('COMING FROM ANOTHER CONTENT SECTION, JUST NEED TO BUILD ARTICLES');
      $pageContent.hide();
      $('#spiral-chunk-7').empty();
      pageContent.buildSectionTitle(pageContentController.sectionTitleInfo[currentPageContentSection][0], currentPageContentSection);
      $('#' + currentPageContentSection + '-section').slideToggle();
      if (fibonacci.arrayLength === 10 && ! $('#' + currentPageContentSection + '-section').find('.open-article').length) { //probably should cache this jqobject
        $('#' + currentPageContentSection + '-section').find('.project-article:first-of-type .article-title').click();
      }
    } else {
      console.log('CRITICAL ERROR IN pageContentController.index');
    }

    $(window).on('resize', indexContent.onWindowResize);

    //click the first article on big spiral
    // if (fibonacci.arrayLength === 10 && ! $('#' + currentPageContentSection + '-section').find('.open-article').length){ //probably should cache this jqobject
    //   $('#' + currentPageContentSection + '-section').find('.project-article:first-of-type .article-title').click();
    // }
    ctx.handled = true;
    next();
  };



  //runs first when a url for a pagecontent section is hit
  pageContentController.ensurePageContent = function(ctx, next) {
    console.log('pageContentController.ensurePageContent called');
    var currentPageContentSection = ctx.params.currentPageContentSection;
    var $currentPageContentSection = $('#' + currentPageContentSection + '-section');
    if (! $('.spiral-chunk').length){
      console.log('Inside pageContentController.ensurePageContent, no spiral chunks');
      console.log('SPIRAL NOT YET BUILT, WILL BUILD, MAKE AJAX CALL, AND BUILD ARTICLES');
      fibonacci.initializeSpiral();
      indexContent.ensureArticlesInSessionStorage(function() {
        var mainSpiralChunk = 'spiral-chunk-8';
        if (fibonacci.arrayLength === 10){
          mainSpiralChunk = 'spiral-chunk-9';
          $('#spiral-chunk-8').append('<div class="main-image-holder" id="main-image-holder"><div class="main-image" id="main-image"></div></div>');
        }
        pageContent.buildTopNavbar();
        $('#spiral-chunk-5').append('<h3 class="navheader external-navheader nav-highlightable" id="navheader-github">G H U B</h3>').wrap('<a href="https://github.com/fraziermork" class="navlink external-link"></a>');
        pageContent.buildPageContentSectionsIn(mainSpiralChunk);
        Article.buildFromSessionStorage(currentPageContentSection);
        pageContent.buildSectionTitle(pageContentController.sectionTitleInfo[currentPageContentSection][0], currentPageContentSection);
        $currentPageContentSection.slideToggle();
        $(window).on('resize', indexContent.onWindowResize);
        ctx.handled = true;
        next();
      });
      // pageContentController.index(ctx, next);
    } else if ($currentPageContentSection.css('display') === 'none') {
      console.log('currentPageContentSection display was none');
      $('.page-content').hide();
      $('#spiral-chunk-7').empty();
      pageContent.buildSectionTitle(pageContentController.sectionTitleInfo[currentPageContentSection][0], currentPageContentSection);
      $currentPageContentSection.slideToggle();
      ctx.handled = true;
      next();
    } else {
      console.log('Inside pageContentController.ensurePageContent, spiral chunks exist already');
      ctx.handled = true;
      next();
    }
  };




  //runs when we go to an article page
  pageContentController.onArticleClick = function(ctx, next) {
    console.log('pageContentController.onArticleClick called');
    var clickedArticleIdString = ctx.params.article;
    console.log('clickedArticleIdString is ' + clickedArticleIdString);
    var $clickedArticle = $('#' + clickedArticleIdString);
    console.log('$clickedArticle is ', $clickedArticle);
    if (! $clickedArticle.length){
      alert('invalid article');
      return false;
    }
    $mainImage = $('#main-image');
    var imageSrc;
    console.log('imageSrc is ' + imageSrc);
    if (fibonacci.arrayLength === 10) {
      imageSrc = $clickedArticle.find('.article-image:first-of-type').css('background-image');
      console.log(' fibonacci.arrayLength === 10, imageSrc is');
      console.log(imageSrc);
      console.log(imageSrc == false);
    }

    if ($clickedArticle.hasClass('open-article')) {
      console.log('open article was clicked');
      $clickedArticle.removeClass('open-article');
      $clickedArticle.find('.article-body').slideToggle();
      $clickedArticle.find('.article-option').slideToggle();
      if (! $mainImage.length) {
        console.log('if statement no $mainImage.length if executed');
        $clickedArticle.find('.article-image-holder').slideToggle();
      }
    } else {
      console.log('closed article was clicked');
      $('.open-article').find('.article-body').slideToggle();
      $('.open-article').find('.article-option').slideToggle();
      if (! $mainImage.length) {
        console.log('else statement no imageSrc if executed');
        $('.open-article').find('.article-image-holder').slideToggle();
        $clickedArticle.find('.article-image-holder').slideToggle();
      } else {
        $mainImage.css('background-image', imageSrc);
      }
      $('.open-article').removeClass('open-article');
      $clickedArticle.addClass('open-article');
      $clickedArticle.find('.article-body').slideToggle();
      $clickedArticle.find('.article-option').slideToggle();
    }

    ctx.handled = true;
    next();
  };

  //export to window
  module.pageContentController = pageContentController;
})(window);
