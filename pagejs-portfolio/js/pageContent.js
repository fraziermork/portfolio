(function(module){
  pageContent = {};

  pageContent.buildPageContentSectionsIn = function(sectionToAppendToId){
    console.log('pageContent.buildPageContentSectionsIn called');
    var pageContentSections = Handlebars.compile($('#page-content-sections-template').html());
    $('#' + sectionToAppendToId).append(pageContentSections);
  };
  pageContent.buildTopNavbar = function(){
    var topNavbar = Handlebars.compile($('#navbar-template').html());
    $('#spiral-chunk-6').append(topNavbar);

  };
  pageContent.buildSectionTitle = function(title, dataNav){
    var sectionTitle = Handlebars.compile($('#section-title-template').html());
    $('#spiral-chunk-7').append(sectionTitle({'title': title, 'dataNav': dataNav}));
  };



  pageContent.onArticleClick = function(ctx, next){
    console.log('pageContent.onArticleClick called');
    var clickedArticleIdString = ctx.params.article;
    console.log('clickedArticleIdString is ' + clickedArticleIdString);
    var $clickedArticle = $('#' + clickedArticleIdString);
    console.log('$clickedArticle is ', $clickedArticle);
    if (! $clickedArticle.length){
      alert('invalid article');
      return false;
    }

    //This is for when the main image holder is built
    // var imageSrc;
    // console.log('imageSrc is ' + imageSrc);
    // if (fibonacci.arrayLength === 10) {
    //   imageSrc = $clickedArticle.find('.article-image:first-of-type').css('background-image');
    //   console.log(' fibonacci.arrayLength === 10, imageSrc is');
    //   console.log(imageSrc);
    // }

    if ($clickedArticle.hasClass('open-article')) {
      console.log('open article was clicked');
      $clickedArticle.removeClass('open-article');
      $clickedArticle.find('.article-body').slideToggle();
      $clickedArticle.find('.article-option').slideToggle();
      $clickedArticle.find('.article-image-holder').slideToggle();//will need to be put back into the if statement below after main image holder built
      // if (! imageSrc) {
      //   console.log('if statement no imageSrc if executed');
      // }
    } else {
      console.log('closed article was clicked');
      $('.open-article').find('.article-body').slideToggle();
      $('.open-article').find('.article-option').slideToggle();
      // $('.main-image').css('background-image', imageSrc); //will need to be put back into the if statement below after main image holder built
      $('.open-article').find('.article-image-holder').slideToggle();//will need to be put back into the if statement below after main image holder built
      $clickedArticle.find('.article-image-holder').slideToggle();//will need to be put back into the if statement below after main image holder built
      // if (! imageSrc) {
      //   console.log('else statement no imageSrc if executed');
      // }
      $('.open-article').removeClass('open-article');
      $clickedArticle.addClass('open-article');
      $clickedArticle.find('.article-body').slideToggle();
      $clickedArticle.find('.article-option').slideToggle();
    }

    ctx.handled = true;
    next();
  };

  module.pageContent = pageContent;
})(window);
