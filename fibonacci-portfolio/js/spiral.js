(function(module){

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
    }
    this.percentSize = (0.9 * 100 * this.sidelength / fibonacci.totalWidth);
    if (this.divType === 'bottom' || this.divType === 'right'){
      this.verticalPositionType = 'bottom';
    } else if (this.divType === 'top' || this.divType === 'left'){
      this.verticalPositionType = 'top';
    }
    if (this.divType === 'bottom' || this.divType === 'left'){
      this.horizontalPositionType = 'left';
    } else if (this.divType === 'top' || this.divType === 'right'){
      this.horizontalPositionType = 'right';
    }
  };

  var fibonacci = {
    /* TODO: Any of these variables that you are only referencing from inside
    functions should probably be refactored into those functions as parameters; likewise
    anything that is being set from these functions should also probably be
    your return values. Anything you're keeping in your live state can be
    stored in another module entirely; you want this module to just include
    the functions that make it happen, and leave the results to be managed
    by your core module. */

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

    resetFibonacci: function(newLength){
      fibonacci.length = newLength;
      fibonacci.numberArray = [1];
      fibonacci.spiralChunkList = [];
    },

    /* TODO: Refactor this to be a pure function that simply returns the array;
    probably also rename it along with that to reflet this. */
    populateNumberArray: function(){
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
      fibonacci.numberArray.forEach(function(currentFibonacciArrayValue, idx, array){
        var currentSpiralChunk = new SpiralChunk( idx, currentFibonacciArrayValue, fibonacci.direction, 'black');
        currentSpiralChunk.initializeDivTypeAndIds();
        fibonacci.spiralChunkList.push(currentSpiralChunk);
      });
    },

    setSpiralChunkPosition: function(inputChunk, idx){
      var vertPos = fibonacci.spiralChunkList.slice(idx + 1)
      .filter(function(element, index, array){
        return element.divType === inputChunk.verticalPositionType;
      }).reduce(function(previous, current, index, array){
        return previous += current.sidelength;
      }, 0);
      if (inputChunk.verticalPositionType === 'bottom'){
        inputChunk.verticalPosition = fibonacci.totalHeight - inputChunk.sidelength - vertPos;
        inputChunk.verticalPositionType = 'top';
      } else {
        inputChunk.verticalPosition = vertPos;
      }
      var horizPos = fibonacci.spiralChunkList.slice(idx + 1)
      .filter(function(element, index, array){
        return element.divType === inputChunk.horizontalPositionType;
      }).reduce(function(previous, current, index, array){
        return previous += current.sidelength;
      }, 0);
      if (inputChunk.horizontalPositionType === 'right'){
        inputChunk.horizontalPosition = fibonacci.totalWidth - inputChunk.sidelength - horizPos;
        inputChunk.horizontalPositionType = 'left';
      } else {
        inputChunk.horizontalPosition = horizPos;
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
      $( '#' + fibonacci.spiralChunkList[fibonacci.spiralChunkList.length - 1]['spiral-chunk-id']).addClass('round-border');
    },

    setUpSpiral: function(){
      fibonacci.populateNumberArray();
      fibonacci.determineSize();
      fibonacci.populateSpiralChunkList();
      fibonacci.drawSpiralChunks();

      /* TODO: Look towards potentially doing the layout of the page with
      nested containers, each with 1 corner of the spiral:

      master container
      	spiral part (with a class for which corner...)
      	container that takes up the rest of the space
      		spiral part (corner...)
      		container
      			spiral part (...)
      			container
      				spiral part
      				container
      					...
      with corner classes that have (golden ratio%) width and 100% height or w/e

      This can be done in a single function call that returns you the spiral
      leaf elements in an array from the outside in, allowing you to give them
      their special classes and add contents for your UI functionality etc.
      */
    },
  };


  module.fibonacci = fibonacci;
})(window);
