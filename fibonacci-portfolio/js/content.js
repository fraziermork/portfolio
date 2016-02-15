(function(module) {
  var content = {
    redrawScreenWidth: 800,
    redrawFlag: false,
    demoModuleAttachEventListenerFunctionsArray: [],

    initializeSpiral: function() {
      if (window.innerWidth > content.redrawScreenWidth - 1 && fibonacci.arrayLength !== 10) {
        fibonacci.arrayLength = 10;
      };
      fibonacci.setUpSpiral();
    },

    onWindowResize: function() {
      $spiralSizingBox = $('.spiral-sizing-box');
      if (window.innerWidth > content.redrawScreenWidth - 1 && fibonacci.arrayLength !== 10) {
        fibonacci.resetFibonacci(10);
        content.redrawSpiral();
      };
      if (window.innerWidth < content.redrawScreenWidth && fibonacci.arrayLength !== 9) {
        fibonacci.resetFibonacci(9);
        content.redrawSpiral();
      };
      // windowWidth = $spiralSizingBox.width();
      // windowHeight = windowWidth;
      // var displayType = $('#projects-section').css('display');
      // $('#projects-section').height(projectSummaries.getTotalHeight() + 250).css('display', displayType);
    },

    redrawSpiral: function() { //may need to split this into two again if I decide to put the text in the big holder on the large spiral
      console.log('redrawSpiral called');
      if ( $('#navheader-projects').length ) {
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
        if (openArticle.length) {
          openArticle = openArticle[0].id;
          console.log('openArticle is ' + openArticle);
        }
        var currentSection = $('#section-title').data('nav');
        console.log('currentSection is ' + currentSection);
        $('#spiral-holder').empty();
        fibonacci.setUpSpiral();
        $('#spiral-chunk-5').wrap('<a href="https://github.com/fraziermork" class="navlink"></a>').append('<h3 class="external-link navheader nav-highlightable" id="navheader-github">G H U B</h3>');
        content.setUpPageContent();

        //needs to be given to ensuredata callback
        $('.internal-link[data-nav="' + currentSection + '"]').click();
        if (openArticle.length) {
          $('#' + openArticle).find('.article-title').click();
          content.redrawFlag = true;
        }
      }
    },

    setUpPageContent: function( callback) {
      console.log('setUpPageContent called');
      var navbar = Handlebars.compile($('#navbar-template').html());
      $('#spiral-chunk-6').append(navbar);
      $('#navbar-list').slideToggle();
      $('#navheader-github').addClass('nav-highlightable');
      $('#spiral-chunk-8').append('<div class="page-content" id="projects-section"></div><div class="page-content" id="about-section"></div><div class="page-content" id="features-section"></div>');
      $('body').append('<a href=""><h3 class="backButton nav-highlightable" id="backButton"> &#60</h3></a>');
      if (fibonacci.arrayLength === 10) {
        console.log('fibonacci.arrayLength = 10, will use main-image');
        $('#spiral-chunk-9').append('<div class="main-image-holder"><div class="main-image"></div></div>').removeClass('div-highlightable');
      }
      $('#spiral-chunk-6').on('click', '.internal-link', function(event) {
        event.preventDefault();
        content.navClick($(this));
      });


      Article.constructArticles(Article.pageContentSections);
      content.completeArticles();
      // Article.ensureData(Article.pageContentSections, Article.callbackFunction);
      // Article.ensureData(Article.pageContentSections, callback);
      //replace content.completeArticles with a callback supplied to setUpPageContent
    },


    //this will be the callback function to run after the AJAX call
    completeArticles: function() {
      $('.article-title').on('click', function(event){
        event.preventDefault();
        console.log($(this));
        content.handleProjectClick($(this), event);
      });

      $('.bugCollectionOption').on('click mouseenter', function() {
        if (fibonacci.arrayLength === 10) {
          $('.main-image').css('background-image', 'url(img/bug-collection/'+ $(this)[0].id + '.png)');
        }
      });
      // colorThemes.buildForm();
    },

    firstNavClick: function($clickedInternalLink) {
      var $internalLink = $('.internal-link');
      $internalLink.parent().unwrap();
      $internalLink.parent().empty();

      content.setUpPageContent();
      //callback likely to be function(){content.navClick($clickedInternalLink)}
      //need to be able to pass this as a callback to ensure data callback
      content.navClick($clickedInternalLink);
    },

    navClick: function($clickedInternalLink) {
      var $spiralChunk7 = $('#spiral-chunk-7');
      var $spiralChunk8 = $('#spiral-chunk-8');
      var $spiralChunk9 = $('#spiral-chunk-9');
      $spiralChunk7.empty();
      var $internalLink = $('.internal-link');
      var currentSection = $clickedInternalLink.data('nav');
      console.log('currentSection is ' + currentSection);
      $internalLink.css('color', '#D96459');
      $internalLink.filter('[data-nav="' + currentSection + '"]').css( 'color', 'darkgrey');
      var sectionTitle = Handlebars.compile( $('#section-title-template').html());
      $spiralChunk7.append(sectionTitle({title: $clickedInternalLink.text(), dataNav: currentSection}));
      var idString = '#' + currentSection + '-section';
      console.log('idString is ' + idString);
      $('.page-content').fadeOut('fast');
      $(idString).slideToggle('fast');

      if (fibonacci.arrayLength === 10 && ! content.redrawFlag) {
        content.redrawFlag = false;
        $(idString + ' article:first-of-type .article-title').click();
      }
    },

    //Switched from using event delegation for this to not using event delegation because it gets infinitely more complicated when demo modules are included that also have click events attached
    handleProjectClick: function($clickedArticleTitle, event) {
      console.log('handleProjectClick called ');
      var $clickedArticle = $clickedArticleTitle.parents('.project-article');
      console.log($clickedArticle);
      var imageSrc;
      console.log('imageSrc is ' + imageSrc);
      if (fibonacci.arrayLength === 10) {
        imageSrc = $clickedArticle.find('.article-image:first-of-type').css('background-image');
        console.log(' fibonacci.arrayLength === 10, imageSrc is');
        console.log(imageSrc);
      }
      if ($clickedArticle.hasClass('open-article')) {
        console.log('open article was clicked');
        $clickedArticle.removeClass('open-article');
        $clickedArticle.find('.article-body').slideToggle();
        $clickedArticle.find('.article-option').slideToggle();
        if (! imageSrc) {
          console.log('if statement no imageSrc if executed');
          $clickedArticle.find('.article-image-holder').slideToggle();
        }
      } else {
        console.log('closed article was clicked');
        $('.main-image').css('background-image', imageSrc);
        $('.open-article').find('.article-body').slideToggle();
        $('.open-article').find('.article-option').slideToggle();
        if (! imageSrc) {
          console.log('else statement no imageSrc if executed');
          $('.open-article').find('.article-image-holder').slideToggle();
          $clickedArticle.find('.article-image-holder').slideToggle();
        }
        $('.open-article').removeClass('open-article');
        $clickedArticle.addClass('open-article');
        $clickedArticle.find('.article-body').slideToggle();
        $clickedArticle.find('.article-option').slideToggle();
      }
      // var displayType = $('#projects-section').css('display');
      // $('#projects-section').height(projectSummaries.getTotalHeight() + 250).css('display', displayType);
    },

    //the purpose of this function is to keep track of which articles have been clicked so that the back button can work
    updateHistory: function(){
      //every time an article or a navlink is clicked, it needs to update the most recent article and navlink in sessionStorage
      //when the back button is clicked, all it needs to do is generate click events on the appropriate navlink and article
    },

    handleDemoModuleCreation: function(inputProject, demoModule) { // use this to handle drawing inserted modules into the box below the article
      //module naming convention--all modules must have a 'buildModule' method that takes a CSS selector as an input to append their content into
      //all demo modules must be written into a div inside of .article-image div with width and height 100%
      //all articles with demo modules must gain class hasDemoModule so that we can determine
      //all articles with demo modules need to have a method called attachModuleEventListener that will put the callback function in an array, demoModuleAttachEventListenerFunctionsArray, so that the appropriate function will fire on an article click


    },


    handeDemoModuleArticleClick: function(currentArticle) {//event listener for article open and close is attached to the article, so will have to navigate down from there
      if (fibonacci.arrayLength === 10) { //if the project is opened and we are in the big spiral, need to set background-image of .main-image to none, need to detach the contents of the .article-image and appendTo the .main-image

      }
      // else if (fibonacci.arrayLength === 9 && currentArticle.fin) {} need to detect whether the article .article-image div is empty but should have contents in it
      // also need to check
    },

    //this is the method that will be called if another article is clicked and the contents need to be hidden. This should take care of itself in the small spiral, because the containing container will be hidden, but for the large spiral we will need to
    handleDemoModuleArticleClose: function() { //slap this in on condition that $('.open-article').hasClass('hasDemoModule')
      //if another article is clicked, we will need to know which article to append this back onto. Probably will need to set a data-category onto the module prototype with a value of the article idString like playWithSpiralArticle to append the content back onto
      //if (fibonacci.arrayLength === 9) {}// set the display of .article-image to none in exactly the same way as we would if
    },

    drawInitialElements: function() {
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
  $('#spiral-holder').one('click', '.internal-link', function(event) {
    event.preventDefault();
    content.firstNavClick($(this));
  });
})(window);
