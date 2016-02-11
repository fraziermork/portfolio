// function SpiralChunk(iterator, sidelength, direction, borderColor){
//   this.spiralChunkNumber = iterator;
//   this.sidelength = sidelength;
//   this.direction = direction;
//   this.borderColor = borderColor;
//   this.verticalPositionType = null;
//   this.verticalPosition = 0;
//   this.absVerticalPosition = 0;
//   this.horizontalPositionType = null;
//   this.horizontalPosition = 0;
//   this.absHorizontalPosition = 0;
// }
// SpiralChunk.prototype.initializeDivTypeAndIds = function(){
//   this['spiral-chunk-wrapper-id'] = 'spiral-chunk-wrapper-' + this.spiralChunkNumber;
//   this['spiral-chunk-id'] = 'spiral-chunk-' + this.spiralChunkNumber;
//   if (this.direction === 'counterClockWise'){
//     this['divType'] = fibonacci.divtypesCCW[0][this.spiralChunkNumber % 4];
//     this.borderRadiusPlacement = fibonacci.divtypesCCW[1][this.spiralChunkNumber % 4];
//   } else {
//     console.log('critical error--direction not recognized');
//   }
//   this.percentSize = (0.9 * 100 * this.sidelength / fibonacci.totalWidth);
//   if (this.divType === 'bottom' || this.divType === 'right'){
//     this.verticalPositionType = 'bottom';
//   } else if (this.divType === 'top' || this.divType === 'left'){
//     this.verticalPositionType = 'top';
//   }
//   if (this.divType === 'bottom' || this.divType === 'left'){
//     this.horizontalPositionType = 'left';
//   } else if (this.divType === 'top' || this.divType === 'right'){
//     this.horizontalPositionType = 'right';
//   }
// };
//
// var fibonacci = {
//   redrawScreenWidth: 800,
//   length: 9,
//   numberArray: [1],
//   spiralChunkList: [],
//   totalHeight: 0,
//   totalWidth: 0,
//   aspectRatio: 1,
//   direction: 'counterClockWise',
//   colors:[],
//   divtypesCCW:[['bottom', 'right', 'top', 'left'],['border-bottom-left-radius', 'border-bottom-right-radius', 'border-top-right-radius', 'border-top-left-radius']],
//   divtypesCW:[['bottom', 'left', 'top', 'right'],['border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius', 'border-top-left-radius']],//might need to flip placement of 1st and 3rd element
//
//   populateNumberArray: function(length){
//     var thisNumber=1;
//     var lastNumber=0;
//     var newNumber;
//     for (var i = 0; i < fibonacci.length - 1; i++){
//       newNumber = lastNumber + thisNumber;
//       fibonacci.numberArray.push(newNumber);
//       lastNumber = thisNumber;
//       thisNumber = newNumber;
//     }
//   },
//
//   determineSize: function(){
//     if (fibonacci.length > 1){
//       if (fibonacci.length % 2 === 0){
//         fibonacci.totalHeight = fibonacci.numberArray[fibonacci.length - 1];
//         fibonacci.totalWidth = fibonacci.numberArray[fibonacci.length - 1] + fibonacci.numberArray[fibonacci.length - 2];
//       } else {
//         fibonacci.totalHeight = fibonacci.numberArray[fibonacci.length - 1] + fibonacci.numberArray[fibonacci.length - 2];
//         fibonacci.totalWidth = fibonacci.numberArray[fibonacci.length - 1];
//       }
//     } else {
//       fibonacci.totalHeight = fibonacci.numberArray[0];
//       fibonacci.totalWidth = fibonacci.numberArray[0];
//     }
//     fibonacci.aspectRatio = Math.ceil(fibonacci.totalHeight/fibonacci.totalWidth);
//   },
//
//   populateSpiralChunkList: function(){
//     var topPos = 0, leftPos = 0, bottomPos = 0, rightPos = 0;
//     for (var i = 0; i < fibonacci.numberArray.length; i++){
//       var currentSpiralChunk = new SpiralChunk( i, fibonacci.numberArray[i], fibonacci.direction, 'black');
//       currentSpiralChunk.initializeDivTypeAndIds();
//       fibonacci.spiralChunkList.push(currentSpiralChunk);
//     }
//   },
//
//   setSpiralChunkPosition: function(inputChunk, idx){
//     var vertPos = fibonacci.spiralChunkList.slice(idx + 1)
//       .filter(function(element, index, array){
//         return element.divType === inputChunk.verticalPositionType;
//       }).reduce(function(previous, current, index, array){
//         return previous += current.sidelength;
//       }, 0);
//     if (inputChunk.verticalPositionType === 'bottom'){
//       inputChunk.verticalPosition = fibonacci.totalHeight - inputChunk.sidelength - vertPos;
//       inputChunk.verticalPositionType = 'top';
//     } else {
//       inputChunk.verticalPosition = vertPos;
//     }
//     var horizPos = fibonacci.spiralChunkList.slice(idx + 1)
//       .filter(function(element, index, array){
//         return element.divType === inputChunk.horizontalPositionType;
//       }).reduce(function(previous, current, index, array){
//         return previous += current.sidelength;
//       }, 0);
//     if (inputChunk.horizontalPositionType === 'right'){
//       inputChunk.horizontalPosition = fibonacci.totalWidth - inputChunk.sidelength - horizPos;
//       inputChunk.horizontalPositionType = 'left';
//     } else {
//       inputChunk.horizontalPosition = horizPos;
//     }
//   },
//
//   drawSpiralChunks: function(){
//     var $spiralHolder = $('#spiral-holder');
//     var template = Handlebars.compile( $('#spiral-chunk-template').html() );
//     fibonacci.spiralChunkList.forEach(fibonacci.setSpiralChunkPosition);
//     fibonacci.spiralChunkList.forEach(function(inputChunk, idx){
//       var newChunk = template(inputChunk);
//       $spiralHolder.append(newChunk);
//       inputChunk.absVerticalPosition = (0.9 * 100 * inputChunk.verticalPosition / fibonacci.totalWidth);
//       inputChunk.absHorizontalPosition = (0.9 *100 * inputChunk.horizontalPosition / fibonacci.totalWidth);
//       var unit = 'vw';
//       $('#' + inputChunk['spiral-chunk-wrapper-id']).width( inputChunk.percentSize + unit ).css('top', inputChunk.absVerticalPosition + unit).css('left', inputChunk.absHorizontalPosition + unit);
//       if (idx !== 0){
//         $('#' + inputChunk['spiral-chunk-id']).css(inputChunk.borderRadiusPlacement, '100%');
//       }
//     });
//     $( '#' + fibonacci.spiralChunkList[fibonacci.spiralChunkList.length - 1]['spiral-chunk-id']).addClass('round-border');
//   },
//
//   drawInitialElements: function(){
//     $('#spiral-chunk-5').wrap('<a href="https://github.com/fraziermork" class="navlink"></a>').append('<h3 class="external-link navheader" id="navheader-github">G H U B</h3>');
//     $('#spiral-chunk-6').wrap('<a href="" class="navlink"></a>').append('<h3 class=" internal-link navheader" id="navheader-features" data-nav="features">F E A T U R E S</h3>');
//     $('#spiral-chunk-7').wrap('<a href="" class="navlink"></a>').append('<h3 class=" internal-link navheader" id="navheader-about" data-nav="about">A B O U T</h3>');
//     $('#spiral-chunk-8').wrap('<a href="" class="navlink"></a>').append('<h3 class=" internal-link navheader" id="navheader-projects" data-nav="projects">P R O J E C T S</h3>');
//   },
//
//   onWindowResize: function(){
//     $spiralSizingBox = $('.spiral-sizing-box');
//     if (window.innerWidth > fibonacci.redrawScreenWidth - 1 && fibonacci.length !== 10){
//       fibonacci.length = 10;
//       fibonacci.redrawBigSpiral();
//     };
//     if (window.innerWidth < fibonacci.redrawScreenWidth && fibonacci.length !== 9){
//       fibonacci.length = 9;
//       fibonacci.redrawSmallSpiral();
//     };
//     // windowWidth = $spiralSizingBox.width();
//     // windowHeight = windowWidth;
//     // var displayType = $('#projects-section').css('display');
//     // $('#projects-section').height(projectSummaries.getTotalHeight() + 250).css('display', displayType);
//   },
//
//   redrawSmallSpiral: function(){
//     console.log('redrawSmallSpiral called');
//     var $pageContent = $('#projects-section');
//     if ($pageContent){
//       // var $pageContent = $('.page-content');
//       $pageContent.detach();
//     }
//     fibonacci.numberArray = [1];
//     fibonacci.spiralChunkList = [];
//     $('#spiral-holder').empty();
//     fibonacci.populateNumberArray();
//     fibonacci.determineSize();
//     fibonacci.populateSpiralChunkList();
//     fibonacci.drawSpiralChunks();
//     // fibonacci.drawInitialElements();// need to add a conditional here to see which elements should be added
//     $('spiral-chunk-8').append($pageContent);
//   },
//
//   redrawBigSpiral: function(){
//     console.log('redrawBigSpiral called');
//     var $pageContent = $('.page-content');
//     if ($pageContent.length){
//       $pageContent.detach();
//     }
//     fibonacci.numberArray = [1];
//     fibonacci.spiralChunkList = [];
//     $('#spiral-holder').empty();
//     fibonacci.populateNumberArray();
//     fibonacci.determineSize();
//     fibonacci.populateSpiralChunkList();
//     fibonacci.drawSpiralChunks();
//     // fibonacci.drawInitialElements();
//     $('spiral-chunk-8').append($pageContent);
//   },
//
//   initialize: function(){
//     if (window.innerWidth > fibonacci.redrawScreenWidth - 1 && fibonacci.length !== 10){
//       fibonacci.length = 10;
//       // fibonacci.redrawBigSpiral();
//     };
//     fibonacci.populateNumberArray();
//     fibonacci.determineSize();
//     fibonacci.populateSpiralChunkList();
//     fibonacci.drawSpiralChunks();
//     fibonacci.drawInitialElements();
//     // fibonacci.onWindowResize();
//   },
//
//   firstNavClick: function(event, $this){
//     var $internalLink = $('.internal-link');
//     $internalLink.parent().unwrap();
//     $internalLink.parent().empty();
//     var navbar = Handlebars.compile($('#navbar-template').html());
//     $('#spiral-chunk-6').append(navbar);
//     $('#navbar-list').slideToggle();
//     $('#navheader-github').addClass('nav-highlightable');
//
//     $('#spiral-chunk-8').append('<div class="page-content" id="projects-section"></div><div class="page-content" id="about-section"><h3>A B O U T</h3></div><div class="page-content" id="features-section"><h3>F E A T U R E S</h3></div>');
//     $('body').append('<a href=""><h3 class="backButton nav-highlightable" id="backButton"> &#60</h3></a>');
//     if (fibonacci.length === 10){
//       console.log('fibonacci.length = 10, will use main-image');
//       $('#spiral-chunk-9').append('<div class="main-image-holder"><div class="main-image"></div></div>').removeClass('div-highlightable');
//     }
//     ProjectSummary.constructProjectSummaries();
//     fibonacci.navClick(event, $this);
//
//     $('#spiral-holder').on('click', '.internal-link', function(event){
//       fibonacci.navClick(event, $(this));
//     });
//     $('.page-content').on('click', 'article',function(event){
//       if (! event.target.classList.contains('publish-status')){
//         event.preventDefault();
//       }
//       fibonacci.handleProjectClick($(this));
//     });
//     if (fibonacci.length === 10){
//       $('#projects-section article:first-of-type').trigger('click');
//     }
//   },
//
//   navClick: function(event, $this){
//     event.preventDefault();
//     var $spiralChunk7 = $('#spiral-chunk-7');
//     var $spiralChunk8 = $('#spiral-chunk-8');
//     var $spiralChunk9 = $('#spiral-chunk-9');
//     $spiralChunk7.empty();
//     var $internalLink = $('.internal-link');
//     var currentSection = $this.data('nav');
//     $internalLink.css('color', '#D96459');
//     $internalLink.filter('[data-nav="' + currentSection + '"]').css( 'color', 'darkgrey');
//     var sectionTitle = Handlebars.compile( $('#section-title-template').html());
//     $spiralChunk7.append(sectionTitle({title: $this.text()}));
//     var idString = '#' + currentSection + '-section';
//     console.log('currentSection is ' + currentSection);
//
//     if (fibonacci.length === 10){
//       fibonacci.handleBigSpiralNavClick(idString);
//       // $spiralChunk9.removeClass('div-highlightable').addClass('round-border');
//     } else if (fibonacci.length === 9){
//       fibonacci.handleSmallSpiralNavClick(idString);
//       // $spiralChunk8.removeClass('div-highlightable').addClass('round-border');
//     } else {
//       console.log('critical error');
//     }
//
//   },
//
//   handleSmallSpiralNavClick: function(idString){
//     console.log('handleSmallSpiralNavClick called');
//     console.log('idString is ' + idString);
//     $('.page-content').fadeOut('fast');
//     fibonacci.onWindowResize();
//     $(idString).slideToggle('fast');
//   },
//
//   handleBigSpiralNavClick: function(idString){
//     console.log('handleBigSpiralNavClick called');
//     console.log('idString is ' + idString);
//     $('.page-content').fadeOut('fast');
//     fibonacci.onWindowResize();
//     $(idString).slideToggle('fast');
//   },
//
//   handleProjectClick: function($this){
//     var imageSrc;
//     console.log('imageSrc is ' + imageSrc);
//     if (fibonacci.length === 10){
//       imageSrc = $this.find('.article-image').css('background-image');
//       console.log(' fibonacci.length === 10, imageSrc is');
//       console.log(imageSrc);
//     }
//     if ($this.hasClass('open-article')){
//       console.log('open article was clicked');
//       $this.removeClass('open-article');
//       $this.find('.article-body').slideToggle();
//       if (! imageSrc){
//         console.log('if statement no imageSrc if executed');
//         $this.find('.article-image-holder').slideToggle();
//       }
//     } else {
//       console.log('closed article was clicked');
//       $('.main-image').css('background-image', imageSrc);
//       $('.open-article').find('.article-body').slideToggle();
//       if (! imageSrc){
//         console.log('else statement no imageSrc if executed');
//         $('.open-article').find('.article-image-holder').slideToggle();
//         $this.find('.article-image-holder').slideToggle();
//       }
//       $('.open-article').removeClass('open-article');
//       $this.addClass('open-article');
//       $this.find('.article-body').slideToggle();
//     }
//     var displayType = $('#projects-section').css('display');
//     // $('#projects-section').height(projectSummaries.getTotalHeight() + 250).css('display', displayType);
//   }
//
// };
//
//
// $(function(){
//   $(window).on('resize', fibonacci.onWindowResize);
//   fibonacci.initialize();
//
//   $('#spiral-holder').one('click', '.internal-link', function(event){
//     fibonacci.firstNavClick(event, $(this));
//   });
// });
