var content = {
  redrawScreenWidth: 800,

  initializeSpiral: function(){
    if (window.innerWidth > content.redrawScreenWidth - 1 && fibonacci.length !== 10){
      fibonacci.length = 10;
    };
    fibonacci.setUpSpiral();
  },

  setUpPageContent: function(){
    var navbar = Handlebars.compile($('#navbar-template').html());
    $('#spiral-chunk-6').append(navbar);
    $('#navbar-list').slideToggle();
    $('#navheader-github').addClass('nav-highlightable');
    $('#spiral-chunk-8').append('<div class="page-content" id="projects-section"></div><div class="page-content" id="about-section"><h3>A B O U T</h3></div><div class="page-content" id="features-section"><h3>F E A T U R E S</h3></div>');
    ProjectSummary.constructProjectSummaries();
    $('body').append('<a href=""><h3 class="backButton nav-highlightable" id="backButton"> &#60</h3></a>');
    if (fibonacci.length === 10){
      console.log('fibonacci.length = 10, will use main-image');
      $('#spiral-chunk-9').append('<div class="main-image-holder"><div class="main-image"></div></div>').removeClass('div-highlightable');
    }
    $('#spiral-chunk-6').on('click', '.internal-link', function(event){
      content.navClick(event, $(this));
    });
    $('.page-content').on('click', 'article', function(event){
      if (! event.target.classList.contains('publish-status')){
        event.preventDefault();
      }
      content.handleProjectClick($(this));
    });
  },

  firstNavClick: function(event, $this){
    var $internalLink = $('.internal-link');
    $internalLink.parent().unwrap();
    $internalLink.parent().empty();

    content.setUpPageContent();
    content.navClick(event, $this);


    // if (fibonacci.length === 10){
    //   $('#projects-section article:first-of-type').trigger('click');
    // }
  },

  navClick: function(event, $this){
    event.preventDefault();
    var $spiralChunk7 = $('#spiral-chunk-7');
    var $spiralChunk8 = $('#spiral-chunk-8');
    var $spiralChunk9 = $('#spiral-chunk-9');
    $spiralChunk7.empty();
    var $internalLink = $('.internal-link');
    var currentSection = $this.data('nav');
    $internalLink.css('color', '#D96459');
    $internalLink.filter('[data-nav="' + currentSection + '"]').css( 'color', 'darkgrey');
    var sectionTitle = Handlebars.compile( $('#section-title-template').html());
    $spiralChunk7.append(sectionTitle({title: $this.text(), dataNav: currentSection}));
    var idString = '#' + currentSection + '-section';
    console.log('currentSection is ' + currentSection);

    if (fibonacci.length === 10){
      content.handleBigSpiralNavClick(idString);
      // $spiralChunk9.removeClass('div-highlightable').addClass('round-border');
    } else if (fibonacci.length === 9){
      content.handleSmallSpiralNavClick(idString);
      // $spiralChunk8.removeClass('div-highlightable').addClass('round-border');
    } else {
      console.log('critical error');
    }

  },

  handleSmallSpiralNavClick: function(idString){
    console.log('handleSmallSpiralNavClick called');
    console.log('idString is ' + idString);
    $('.page-content').fadeOut('fast');
    content.onWindowResize();
    $(idString).slideToggle('fast');
  },

  handleBigSpiralNavClick: function(idString){
    console.log('handleBigSpiralNavClick called');
    console.log('idString is ' + idString);
    $('.page-content').fadeOut('fast');
    content.onWindowResize();
    $(idString).slideToggle('fast');
  },

  handleProjectClick: function($this){
    var imageSrc;
    console.log('imageSrc is ' + imageSrc);
    if (fibonacci.length === 10){
      imageSrc = $this.find('.article-image').css('background-image');
      console.log(' fibonacci.length === 10, imageSrc is');
      console.log(imageSrc);
    }
    if ($this.hasClass('open-article')){
      console.log('open article was clicked');
      $this.removeClass('open-article');
      $this.find('.article-body').slideToggle();
      if (! imageSrc){
        console.log('if statement no imageSrc if executed');
        $this.find('.article-image-holder').slideToggle();
      }
    } else {
      console.log('closed article was clicked');
      $('.main-image').css('background-image', imageSrc);
      $('.open-article').find('.article-body').slideToggle();
      if (! imageSrc){
        console.log('else statement no imageSrc if executed');
        $('.open-article').find('.article-image-holder').slideToggle();
        $this.find('.article-image-holder').slideToggle();
      }
      $('.open-article').removeClass('open-article');
      $this.addClass('open-article');
      $this.find('.article-body').slideToggle();
    }
    var displayType = $('#projects-section').css('display');
    // $('#projects-section').height(projectSummaries.getTotalHeight() + 250).css('display', displayType);
  },

  drawInitialElements: function(){
    $('#spiral-chunk-5').wrap('<a href="https://github.com/fraziermork" class="navlink"></a>').append('<h3 class="external-link navheader" id="navheader-github">G H U B</h3>');
    $('#spiral-chunk-6').wrap('<a href="" class="navlink"></a>').append('<h3 class=" internal-link navheader" id="navheader-features" data-nav="features">F E A T U R E S</h3>');
    $('#spiral-chunk-7').wrap('<a href="" class="navlink"></a>').append('<h3 class=" internal-link navheader" id="navheader-about" data-nav="about">A B O U T</h3>');
    $('#spiral-chunk-8').wrap('<a href="" class="navlink"></a>').append('<h3 class=" internal-link navheader" id="navheader-projects" data-nav="projects">P R O J E C T S</h3>');
  },

  onWindowResize: function(){
    $spiralSizingBox = $('.spiral-sizing-box');
    if (window.innerWidth > content.redrawScreenWidth - 1 && fibonacci.length !== 10){
      content.redrawBigSpiral();
    };
    if (window.innerWidth < content.redrawScreenWidth && fibonacci.length !== 9){
      content.redrawSmallSpiral();
    };
    // windowWidth = $spiralSizingBox.width();
    // windowHeight = windowWidth;
    // var displayType = $('#projects-section').css('display');
    // $('#projects-section').height(projectSummaries.getTotalHeight() + 250).css('display', displayType);
  },

  redrawSmallSpiral: function(){
    console.log('redrawSmallSpiral called');
    fibonacci.resetFibonacci(9);
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
      $('#' + openArticle).click();
    }
  },

  redrawBigSpiral: function(){
    fibonacci.resetFibonacci(10);
    console.log('redrawBigSpiral called');
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
      $('#' + openArticle).click();
    }
  },

};


$(function(){
  $(window).on('resize', content.onWindowResize);

  content.initializeSpiral();
  content.drawInitialElements();

  $('#spiral-holder').one('click', '.internal-link', function(event){
    content.firstNavClick(event, $(this));
  });
});
