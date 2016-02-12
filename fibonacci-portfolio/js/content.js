(function(module){
  var content = {
    redrawScreenWidth: 800,
    redrawFlag: false,
    demoModuleAttachEventListenerFunctionsArray: [],

    initializeSpiral: function(){
      if (window.innerWidth > content.redrawScreenWidth - 1 && fibonacci.length !== 10){
        fibonacci.length = 10;
      };
      fibonacci.setUpSpiral();
    },

    onWindowResize: function(){
      $spiralSizingBox = $('.spiral-sizing-box');
      if (window.innerWidth > content.redrawScreenWidth - 1 && fibonacci.length !== 10){
        fibonacci.resetFibonacci(10);
        content.redrawSpiral();
      };
      if (window.innerWidth < content.redrawScreenWidth && fibonacci.length !== 9){
        fibonacci.resetFibonacci(9);
        content.redrawSpiral();
      };
      // windowWidth = $spiralSizingBox.width();
      // windowHeight = windowWidth;
      // var displayType = $('#projects-section').css('display');
      // $('#projects-section').height(projectSummaries.getTotalHeight() + 250).css('display', displayType);
    },

    redrawSpiral: function(){
      console.log('redrawSpiral called');
      if ( $('#navheader-projects').length ){
        console.log('on home page');
        $('#spiral-holder').empty();
        content.initializeSpiral();
        content.drawInitialElements();
      } else {
        console.log('page-content section open');
        var openArticle = $('.open-article');
        console.log('openArticle is');
        console.log(openArticle);
        console.log(openArticle.length);
        if (openArticle.length){
          openArticle = openArticle[0].id;
          console.log('openArticle is ' + openArticle);
        }
        var currentSection = $('#section-title').data('nav');
        console.log('currentSection is ' + currentSection);
        $('#spiral-holder').empty();
        fibonacci.setUpSpiral();
        content.setUpPageContent();
        $('.internal-link[data-nav="' + currentSection + '"]').click();
        if (openArticle.length){
          $('#' + openArticle).click();
          content.redrawFlag = true;
        }
        $('#spiral-chunk-5').wrap('<a href="https://github.com/fraziermork" class="navlink"></a>').append('<h3 class="external-link navheader" id="navheader-github">G H U B</h3>');
      }
    },

    setUpPageContent: function(){
      var navbar = Handlebars.compile($('#navbar-template').html());
      $('#spiral-chunk-6').append(navbar);
      $('#navbar-list').slideToggle();
      $('#navheader-github').addClass('nav-highlightable');
      $('#spiral-chunk-8').append('<div class="page-content" id="projects-section"></div><div class="page-content" id="about-section"></div><div class="page-content" id="features-section"></div>');
      Article.constructArticles(Article.pageContentSections);
      $('body').append('<a href=""><h3 class="backButton nav-highlightable" id="backButton"> &#60</h3></a>');
      if (fibonacci.length === 10){
        console.log('fibonacci.length = 10, will use main-image');
        $('#spiral-chunk-9').append('<div class="main-image-holder"><div class="main-image"></div></div>').removeClass('div-highlightable');
      }
      $('#spiral-chunk-6').on('click', '.internal-link', function(event){
        content.navClick(event, $(this));
      });
      $('.page-content').on('click', 'article', function(event){
        if (! event.target.classList.contains('article-subtitle')){
          event.preventDefault();
        }
        content.handleProjectClick($(this), event);
      });
      content.individualizeArticles();
    },

    individualizeArticles: function(){
      $('.bugCollectionOption').on('click mouseenter', function(){
        if (fibonacci.length === 10){
          $('.main-image').css('background-image', 'url(img/bug-collection/'+ $(this)[0].id + '.png)');
        }
      });
      // colorThemes.buildForm();
    },

    firstNavClick: function(event, $this){
      event.preventDefault();
      var $internalLink = $('.internal-link');
      $internalLink.parent().unwrap();
      $internalLink.parent().empty();

      content.setUpPageContent();
      content.navClick(event, $this);
    },

    navClick: function(event, $this){
      event.preventDefault();
      var $spiralChunk7 = $('#spiral-chunk-7');
      var $spiralChunk8 = $('#spiral-chunk-8');
      var $spiralChunk9 = $('#spiral-chunk-9');
      $spiralChunk7.empty();
      var $internalLink = $('.internal-link');
      var currentSection = $this.data('nav');
      console.log('currentSection is ' + currentSection);
      $internalLink.css('color', '#D96459');
      $internalLink.filter('[data-nav="' + currentSection + '"]').css( 'color', 'darkgrey');
      var sectionTitle = Handlebars.compile( $('#section-title-template').html());
      $spiralChunk7.append(sectionTitle({title: $this.text(), dataNav: currentSection}));
      var idString = '#' + currentSection + '-section';
      console.log('idString is ' + idString);
      $('.page-content').fadeOut('fast');
      $(idString).slideToggle('fast');

      if (fibonacci.length === 10 && ! content.redrawFlag){ //need to know trigger clicks on first articles in all three sections
        content.redrawFlag = false;
        $(idString + ' article:first-of-type').click();
      }
    },

    handleProjectClick: function($this, event){
      console.log(event.target);
      if (event.target.classList.contains('dontCloseOnClick')){
        // if(event.target.id === 'playWithSpiralFormSubmit'){
          // colorThemes.onSubmit();
        // }
      } else if ($this.hasClass('hasDemoModule')){
        console.log('hasDemoModule clicked');

      } else {
        var imageSrc;
        console.log('imageSrc is ' + imageSrc);
        if (fibonacci.length === 10){
          imageSrc = $this.find('.article-image:first-of-type').css('background-image');
          console.log(' fibonacci.length === 10, imageSrc is');
          console.log(imageSrc);
        }
        if ($this.hasClass('open-article')){
          console.log('open article was clicked');
          $this.removeClass('open-article');
          $this.find('.article-body').slideToggle();
          $this.find('.article-option').slideToggle();
          if (! imageSrc){
            console.log('if statement no imageSrc if executed');
            $this.find('.article-image-holder').slideToggle();
          }
        } else {
          console.log('closed article was clicked');
          $('.main-image').css('background-image', imageSrc);
          $('.open-article').find('.article-body').slideToggle();
          $('.open-article').find('.article-option').slideToggle();
          if (! imageSrc){
            console.log('else statement no imageSrc if executed');
            $('.open-article').find('.article-image-holder').slideToggle();
            $this.find('.article-image-holder').slideToggle();
          }
          $('.open-article').removeClass('open-article');
          $this.addClass('open-article');
          $this.find('.article-body').slideToggle();
          $this.find('.article-option').slideToggle();
        }
        // var displayType = $('#projects-section').css('display');
        // $('#projects-section').height(projectSummaries.getTotalHeight() + 250).css('display', displayType);
      }
    },

    handleDemoModuleCreation: function(demoModule){ // use this to handle drawing inserted modules into the box below the article
      //module naming convention--all modules must have a 'buildModule' method that takes a CSS selector as an input to append their content into
      //all demo modules must be written into a div inside of .article-image div with width and height 100%
      //all articles with demo modules must gain class hasDemoModule so that we can determine
      //all articles with demo modules need to have a method called attachModuleEventListener that will put the callback function in an array, demoModuleAttachEventListenerFunctionsArray, so that the appropriate function will fire on an article click


    },


    handeDemoModuleArticleClick: function(currentArticle){//event listener for article open and close is attached to the article, so will have to navigate down from there
      if (fibonacci.length === 10){ //if the project is opened and we are in the big spiral, need to set background-image of .main-image to none, need to detach the contents of the .article-image and appendTo the .main-image

      }
      // else if (fibonacci.length === 9 && currentArticle.fin){} need to detect whether the article .article-image div is empty but should have contents in it
      // also need to check
    },

    //this is the method that will be called if another article is clicked and the contents need to be hidden. This should take care of itself in the small spiral, because the containing container will be hidden, but for the large spiral we will need to
    handleDemoModuleArticleClose: function(){
      //if another article is clicked, we will need to know which article to append this back onto. Probably will need to set a data-category onto the module prototype with a value of the article idString like playWithSpiralArticle to append the content back onto
      //if (fibonacci.length === 9){}// set the display of .article-image to none in exactly the same way as we would if
    },

    drawInitialElements: function(){
      $('#spiral-chunk-5').wrap('<a href="https://github.com/fraziermork" class="navlink"></a>').append('<h3 class="external-link navheader" id="navheader-github">G H U B</h3>');
      $('#spiral-chunk-6').wrap('<a href="" class="navlink"></a>').append('<h3 class=" internal-link navheader" id="navheader-features" data-nav="features">F E A T U R E S</h3>');
      $('#spiral-chunk-7').wrap('<a href="" class="navlink"></a>').append('<h3 class=" internal-link navheader" id="navheader-about" data-nav="about">A B O U T</h3>');
      $('#spiral-chunk-8').wrap('<a href="" class="navlink"></a>').append('<h3 class=" internal-link navheader" id="navheader-projects" data-nav="projects">P R O J E C T S</h3>');
    },

  };

  module.content = content;
  content.initializeSpiral();
  content.drawInitialElements();
  $(window).on('resize', content.onWindowResize);
  $('#spiral-holder').one('click', '.internal-link', function(event){
    // event.preventDefault();
    content.firstNavClick(event, $(this));
  });
})(window);
