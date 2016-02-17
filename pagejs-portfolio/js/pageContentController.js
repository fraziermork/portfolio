(function(module){
  pageContentController = {};
  pageContentController.sectionTitleInfo = {
    projects: ['P R O J E C T S', 'projects'],
    features: ['F E A T U R E S', 'features'],
    about: ['A B O U T', 'about']
  };

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
      if (fibonacci.arrayLength === 10){
        mainSpiralChunk = 'spiral-chunk-9';
        $('#spiral-chunk-8').append('<div class="main-image-holder" id="main-image-holder"><div class="main-image" id="main-image"></div></div>');
      }
      pageContent.buildTopNavbar();
      $('#navheader-github').addClass('nav-highlightable');
      pageContent.buildPageContentSectionsIn(mainSpiralChunk);
      Article.buildFromSessionStorage(currentPageContentSection);
      pageContent.buildSectionTitle(pageContentController.sectionTitleInfo[currentPageContentSection][0], currentPageContentSection);
      $('#' + currentPageContentSection + '-section').slideToggle();
      if (fibonacci.arrayLength === 10 && ! $('#' + currentPageContentSection + '-section').find('.open-article').length){ //probably should cache this jqobject
        $('#' + currentPageContentSection + '-section').find('.project-article:first-of-type .article-title').click();
      }
    //coming here from another page content section,
    } else if ($pageContent.length) {//just need to open the about section
      console.log('COMING FROM ANOTHER CONTENT SECTION, JUST NEED TO BUILD ARTICLES');
      $pageContent.hide();
      $('#spiral-chunk-7').empty();
      pageContent.buildSectionTitle(pageContentController.sectionTitleInfo[currentPageContentSection][0], currentPageContentSection);
      $('#' + currentPageContentSection + '-section').slideToggle();
      if (fibonacci.arrayLength === 10 && ! $('#' + currentPageContentSection + '-section').find('.open-article').length){ //probably should cache this jqobject
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


  pageContentController.ensurePageContent = function(ctx, next){
    console.log('pageContentController.ensurePageContent called');
    var currentPageContentSection = ctx.params.currentPageContentSection;
    if (! $('.spiral-chunk').length){
      console.log('Inside pageContentController.ensurePageContent, no spiral chunks');
      console.log('SPIRAL NOT YET BUILT, WILL BUILD, MAKE AJAX CALL, AND BUILD ARTICLES');
      fibonacci.initializeSpiral();
      indexContent.ensureArticlesInSessionStorage(function(){
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
        $('#' + currentPageContentSection + '-section').slideToggle();
        $(window).on('resize', indexContent.onWindowResize);
        ctx.handled = true;
        next();
      });
      // pageContentController.index(ctx, next);
    } else {
      console.log('Inside pageContentController.ensurePageContent, spiral chunks exist already');
      ctx.handled = true;
      next();
    }
  };





  pageContentController.onArticleClick = function(ctx, next){
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
        $clickedArticle.find('.article-image-holder').slideToggle();//will need to be put back into the if statement below after main image holder built
      }
    } else {
      console.log('closed article was clicked');
      $('.open-article').find('.article-body').slideToggle();
      $('.open-article').find('.article-option').slideToggle();
      if (! $mainImage.length) {
        console.log('else statement no imageSrc if executed');
        $('.open-article').find('.article-image-holder').slideToggle();//will need to be put back into the if statement below after main image holder built
        $clickedArticle.find('.article-image-holder').slideToggle();//will need to be put back into the if statement below after main image holder built
      } else {
        $mainImage.css('background-image', imageSrc); //will need to be put back into the if statement below after main image holder built
      }
      $('.open-article').removeClass('open-article');
      $clickedArticle.addClass('open-article');
      $clickedArticle.find('.article-body').slideToggle();
      $clickedArticle.find('.article-option').slideToggle();
    }

    ctx.handled = true;
    next();
  };

  // pageContentController.testArticleClick = function(ctx, next){
  //   console.log('happened ');
  //   console.log('article is ' + ctx.params.article);
  //   console.log('currentPageContentSection is ' + ctx.params.currentPageContentSection);
  //   ctx.handled = true;
  //   next();
  // };




  module.pageContentController = pageContentController;
})(window);
