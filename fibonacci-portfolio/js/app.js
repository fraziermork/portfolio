function SpiralChunk(iterator, sidelength, direction, borderColor){
  this.spiralChunkNumber = iterator;
  this.sidelength = sidelength;
  this.direction = direction;
  this.borderColor = borderColor;
  this.verticalPositionType = null;
  this.verticalPosition = 0;
  this.absVerticalPosition = 0;
  this.horizontalPositionType = null;
  this.horizontalPosition = 0;
  this.absHorizontalPosition = 0;
}
SpiralChunk.prototype.initializeDivTypeAndIds = function(){
  this['spiral-chunk-wrapper-id'] = 'spiral-chunk-wrapper-' + this.spiralChunkNumber;
  this['spiral-chunk-id'] = 'spiral-chunk-' + this.spiralChunkNumber;
  if (this.direction === 'counterClockWise'){
    this['divType'] = fibonacci.divtypesCCW[0][this.spiralChunkNumber % 4];
    this.borderRadiusPlacement = fibonacci.divtypesCCW[1][this.spiralChunkNumber % 4];
  } else {
    console.log('critical error--direction not recognized');
  }
  this.percentSize = (0.9 * 100 * this.sidelength / fibonacci.totalWidth);
};

var fibonacci = {
  scale: 10,
  length: 9,
  numberArray: [1],
  spiralChunkList: [],
  totalHeight: 0,
  totalWidth: 0,
  aspectRatio: 1,
  direction: 'counterClockWise',
  colors:[],
  divtypesCCW:[['bottom', 'right', 'top', 'left'],['border-bottom-left-radius', 'border-bottom-right-radius', 'border-top-right-radius', 'border-top-left-radius']],
  divtypesCW:[['bottom', 'left', 'top', 'right'],['border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius', 'border-top-left-radius']],//might need to flip placement of 1st and 3rd element

  populateNumberArray: function(length){
    var thisNumber=1;
    var lastNumber=0;
    var newNumber;
    for (var i = 0; i < fibonacci.length - 1; i++){
      newNumber = lastNumber + thisNumber;
      fibonacci.numberArray.push(newNumber);
      lastNumber = thisNumber;
      thisNumber = newNumber;
    }
  },

  determineSize: function(){
    if (fibonacci.length > 1){
      if (fibonacci.length % 2 === 0){
        fibonacci.totalHeight = fibonacci.numberArray[fibonacci.length - 1];
        fibonacci.totalWidth = fibonacci.numberArray[fibonacci.length - 1] + fibonacci.numberArray[fibonacci.length - 2];
      } else {
        fibonacci.totalHeight = fibonacci.numberArray[fibonacci.length - 1] + fibonacci.numberArray[fibonacci.length - 2];
        fibonacci.totalWidth = fibonacci.numberArray[fibonacci.length - 1];
      }
    } else {
      fibonacci.totalHeight = fibonacci.numberArray[0];
      fibonacci.totalWidth = fibonacci.numberArray[0];
    }
    fibonacci.aspectRatio = Math.ceil(fibonacci.totalHeight/fibonacci.totalWidth);
  },

  populateSpiralChunkList: function(){
    var topPos = 0, leftPos = 0, bottomPos = 0, rightPos = 0;
    for (var i = 0; i < fibonacci.numberArray.length; i++){
      var currentSpiralChunk = new SpiralChunk( i, fibonacci.numberArray[i], fibonacci.direction, 'black');
      currentSpiralChunk.initializeDivTypeAndIds();
      fibonacci.spiralChunkList.push(currentSpiralChunk);
    }
  },

  setSpiralChunkPosition: function(inputChunk, idx){
    if (inputChunk.divType === 'bottom' || inputChunk.divType === 'right'){
      inputChunk.verticalPositionType = 'bottom';
      var bottomPos = 0;
      if (inputChunk.divType === 'bottom'){
        var j = inputChunk.spiralChunkNumber + 4;
      } else if (inputChunk.divType === 'right'){
        var j = inputChunk.spiralChunkNumber + 3;
      }
      // console.log('setSpiralChunkPosition j is ');
      // console.log(j);
      for (j; j < fibonacci.numberArray.length ; j+=4){
        bottomPos += fibonacci.numberArray[j];
      }
      // console.log('bottomPos is ' + bottomPos);
      var topPos = fibonacci.totalHeight - inputChunk.sidelength - bottomPos;
      inputChunk.verticalPosition = topPos;
      inputChunk.verticalPositionType = 'top';
    } else if (inputChunk.divType === 'top' || inputChunk.divType === 'left'){
      inputChunk.verticalPositionType = 'top';
      var topPos = 0;
      if (inputChunk.divType === 'top'){
        var j = inputChunk.spiralChunkNumber + 4;
      } else if (inputChunk.divType === 'left'){
        var j = inputChunk.spiralChunkNumber + 3;
      }
      // console.log('setSpiralChunkPosition j is ');
      // console.log(j);
      for (j; j < fibonacci.numberArray.length ; j+=4){
        topPos += fibonacci.numberArray[j];
      }
      // console.log('topPos is ' + topPos);
      inputChunk.verticalPosition = topPos;
    } else {
      console.log('inputChunk.divType is ' + inputChunk.divType + ' and is inconsistent.');
    }



    if (inputChunk.divType === 'left' || inputChunk.divType === 'bottom'){
      inputChunk.horizontalPositionType = 'left';
      var leftPos = 0;
      if (inputChunk.divType === 'left'){
        var j = inputChunk.spiralChunkNumber + 4;
      } else if (inputChunk.divType === 'bottom'){
        var j = inputChunk.spiralChunkNumber + 3;
      }
      // console.log('setSpiralChunkPosition j is ');
      // console.log(j);
      for (j; j < fibonacci.numberArray.length ; j+=4){
        leftPos += fibonacci.numberArray[j];
      }
      // console.log('leftPos is ' + leftPos);
      inputChunk.horizontalPosition = leftPos;
    } else if (inputChunk.divType === 'right' || inputChunk.divType === 'top'){
      inputChunk.horizontalPositionType = 'right';
      var rightPos = 0;
      if (inputChunk.divType === 'right'){
        var j = inputChunk.spiralChunkNumber + 4;
      } else if (inputChunk.divType === 'top'){
        var j = inputChunk.spiralChunkNumber + 3;
      }
      // console.log('setSpiralChunkPosition j is ');
      // console.log(j);
      for (j; j < fibonacci.numberArray.length ; j+=4){
        rightPos += fibonacci.numberArray[j];
      }
      // console.log('rightPos is ' + rightPos);
      var leftPos = fibonacci.totalWidth - inputChunk.sidelength - rightPos;
      inputChunk.horizontalPosition = leftPos;
      inputChunk.horizontalPositionType = 'left';
    } else {
      console.log('inputChunk.divType is ' + inputChunk.divType + ' and is inconsistent.');
    }
  },

  drawSpiralChunks: function(){
    var $spiralHolder = $('#spiral-holder');
    var template = Handlebars.compile( $('#spiral-chunk-template').html() );
    fibonacci.spiralChunkList.forEach(fibonacci.setSpiralChunkPosition);
    fibonacci.spiralChunkList.forEach(function(inputChunk, idx){
      var newChunk = template(inputChunk);
      $spiralHolder.append(newChunk);
      inputChunk.absVerticalPosition = (0.9 * 100 * inputChunk.verticalPosition / fibonacci.totalWidth);
      inputChunk.absHorizontalPosition = (0.9 *100 * inputChunk.horizontalPosition / fibonacci.totalWidth);
      var unit = 'vw';
      $('#' + inputChunk['spiral-chunk-wrapper-id']).width( inputChunk.percentSize + unit ).css('top', inputChunk.absVerticalPosition + unit).css('left', inputChunk.absHorizontalPosition + unit);
      if (idx !== 0){
        $('#' + inputChunk['spiral-chunk-id']).css(inputChunk.borderRadiusPlacement, '100%');
      }
    });
  },

  drawElements: function(){
    $('#spiral-chunk-5').wrap('<a href="https://github.com/fraziermork" class="navlink"></a>').append('<h3 class="external-link navheader" id="navheader-github">G H U B</h3>');
    $('#spiral-chunk-6').wrap('<a href="" class="navlink"></a>').append('<h3 class=" internal-link navheader" id="navheader-features" data-nav="features">F E A T U R E S</h3>');
    $('#spiral-chunk-7').wrap('<a href="" class="navlink"></a>').append('<h3 class=" internal-link navheader" id="navheader-about" data-nav="about">A B O U T</h3>');
    $('#spiral-chunk-8').wrap('<a href="" class="navlink"></a>').append('<h3 class=" internal-link navheader" id="navheader-projects" data-nav="projects">P R O J E C T S</h3>');
  },

  onWindowResize: function(){
    console.log('resize');
    $spiralSizingBox = $('spiral-sizing-box');
    var windowWidth = $spiralSizingBox.width();
    var windowHeight = windowWidth;
    var displayType = $('#projects-section').css('display');
    $('#projects-section').height(projectSummaries.getTotalHeight() + 250).css('display', displayType);

  },


  initialize: function(){
    fibonacci.populateNumberArray();
    fibonacci.determineSize();
    fibonacci.populateSpiralChunkList();
    fibonacci.drawSpiralChunks();
    fibonacci.drawElements();
  },

  firstNavClick: function(event, $this){
    var $internalLink = $('.internal-link');
    $internalLink.parent().unwrap();
    $internalLink.parent().empty();
    var navbar = Handlebars.compile($('#navbar-template').html());
    $('#spiral-chunk-6').append(navbar);
    $('#spiral-chunk-8').append('<div class="page-content" id="projects-section"></div><div class="page-content" id="about-section"><h3>A B O U T</h3></div><div class="page-content" id="features-section"><h3>F E A T U R E S</h3></div>');
    $('#navbar-list').slideToggle();
    $('#navheader-github').addClass('nav-highlightable');
    $('#spiral-chunk-8').css('background-color', '#F0A384');
    // $('#spiral-chunk-8').removeClass('div-highlightable').css('background-color', '#F0A384');
    projectSummaries.constructProjectSummaries();
    fibonacci.navClick(event, $this);

    $('#spiral-holder').on('click', '.internal-link', function(event){
      fibonacci.navClick(event, $(this));
    });
  },

  navClick: function(event, $this){
    event.preventDefault();
    $('#spiral-chunk-7').empty();
    $('.page-content').fadeOut('fast');
    var $internalLink = $('.internal-link');
    var currentSection = $this.data('nav');
    console.log('currentSection is ' + currentSection);
    $internalLink.css('color', '#D96459');
    $internalLink.filter('[data-nav="' + currentSection + '"]').css( 'color', 'darkgrey');
    var sectionTitle = Handlebars.compile( $('#section-title-template').html());
    $('#spiral-chunk-7').append(sectionTitle({title: $this.text()}));
    var idString = '#' + currentSection + '-section';
    console.log('idString is ' + idString);
    console.log($(idString).text());
    fibonacci.onWindowResize();
    $(idString).slideToggle('fast');
  },

  getArticleHeight: function(){

  }


};



$(function(){
  $(window).on('resize', fibonacci.onWindowResize);
  fibonacci.initialize();

  $('#spiral-holder').one('click', '.internal-link', function(event){
    fibonacci.firstNavClick(event, $(this));
  });
});

//TODO implement appropriate border radii
//TODO fix setSpiralChunkPosition and make it less awful
//TODO get the content centered in the body so there is a gutter on both sides
//TODO try putting hover classes on the divs to see what they do
//TODO add window resize event listener
//TODO add debounce function on window resize
//TODO add a way to change the theme colors as a game, maybe with the gold palette
//TODO maybe add something hidden in the middle so that people can add extra spiral segments
//TODO see if I can get rid of the square lines and if that looks good, maybe add them back on hover or something
//TODO get the navbar working for mobile-navbar
//TODO build the page for larger view sizes
//TODO get dynamic content generation working
//TODO see about getting dynamic color generation working
//TODO fix sizing of textboxes in features and about
//TODO give text in boxes rollover highlighting
//TODO make it so that clicking the thing that says projects opens a menu that lets you select articles by name or filter them or something
//TODO break up the outline highlighting feature into another class so it can be removed from elements if needed
//use unwrap
