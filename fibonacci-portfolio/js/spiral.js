(function(module) {

  function SpiralChunk(iterator, sidelength, direction, borderColor) {
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

  SpiralChunk.prototype.initializeDivTypeAndIds = function() {
    this['spiral-chunk-wrapper-id'] = 'spiral-chunk-wrapper-' + this.spiralChunkNumber;
    this['spiral-chunk-id'] = 'spiral-chunk-' + this.spiralChunkNumber;
    if (this.direction === 'counterClockWise') {
      this['divType'] = fibonacci.divtypesCCW[0][this.spiralChunkNumber % 4];
      this.borderRadiusPlacement = fibonacci.divtypesCCW[1][this.spiralChunkNumber % 4];
    }
    this.percentSize = (0.9 * 100 * this.sidelength / fibonacci.totalWidth);
    if (this.divType === 'bottom' || this.divType === 'right') {
      this.verticalPositionType = 'bottom';
    } else if (this.divType === 'top' || this.divType === 'left') {
      this.verticalPositionType = 'top';
    }
    if (this.divType === 'bottom' || this.divType === 'left') {
      this.horizontalPositionType = 'left';
    } else if (this.divType === 'top' || this.divType === 'right') {
      this.horizontalPositionType = 'right';
    }
  };

  var fibonacci = {
    arrayLength: 9,
    numberArray: [1],
    spiralChunkList: [],
    totalHeight: 0,
    totalWidth: 0,
    aspectRatio: 1,
    direction: 'counterClockWise',
    colors:[],
    divtypesCCW:[['bottom', 'right', 'top', 'left'],['border-bottom-left-radius', 'border-bottom-right-radius', 'border-top-right-radius', 'border-top-left-radius']],
    divtypesCW:[['bottom', 'left', 'top', 'right'],['border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius', 'border-top-left-radius']],//might need to flip placement of 1st and 3rd element

    resetFibonacci: function(newLength) {
      fibonacci.arrayLength = newLength;
      fibonacci.numberArray = [1];
      fibonacci.spiralChunkList = [];
    },

    populateNumberArray: function(length ) {
      var thisNumber=1;
      var lastNumber=0;
      var newNumber, array = [1];
      for (var i = 0; i < length - 1; i++) {
        newNumber = lastNumber + thisNumber;
        array.push(newNumber);
        lastNumber = thisNumber;
        thisNumber = newNumber;
      }
      return array;
    },

    determineSize: function(array) {
      var totalHeight, totalWidth;
      if (array.length > 1) {
        if (array.length % 2 === 0) {
          totalHeight = array[array.length - 1];
          totalWidth = array[array.length - 1] + array[array.length - 2];
        } else {
          totalHeight = array[array.length - 1] + array[array.length - 2];
          totalWidth = array[array.length - 1];
        }
      } else {
        totalHeight = array[0];
        totalWidth = array[0];
      }
      return [totalWidth, totalHeight];
    },

    populateSpiralChunkList: function(array, direction, color) {
      return array.map(function(currentFibonacciArrayValue, idx, array) {
        var currentSpiralChunk = new SpiralChunk( idx, currentFibonacciArrayValue, direction, color);
        currentSpiralChunk.initializeDivTypeAndIds();
        return currentSpiralChunk;
      });
    },

    setSpiralChunkPosition: function(inputChunk, idx, array, width, height) {
      var vertPos = array.slice(idx + 1)
      .filter(function(chunk, index, array) {
        return chunk.divType === inputChunk.verticalPositionType;
      }).reduce(function(previous, current, index, array) {
        return previous += current.sidelength;
      }, 0);
      if (inputChunk.verticalPositionType === 'bottom') {
        inputChunk.verticalPosition = height - inputChunk.sidelength - vertPos;
        inputChunk.verticalPositionType = 'top';
      } else {
        inputChunk.verticalPosition = vertPos;
      }
      var horizPos = array.slice(idx + 1)
      .filter(function(chunk, index, array) {
        return chunk.divType === inputChunk.horizontalPositionType;
      }).reduce(function(previous, current, index, array) {
        return previous += current.sidelength;
      }, 0);
      if (inputChunk.horizontalPositionType === 'right') {
        inputChunk.horizontalPosition = width - inputChunk.sidelength - horizPos;
        inputChunk.horizontalPositionType = 'left';
      } else {
        inputChunk.horizontalPosition = horizPos;
      }
      inputChunk.absVerticalPosition = (0.9 * 100 * inputChunk.verticalPosition / width);
      inputChunk.absHorizontalPosition = (0.9 *100 * inputChunk.horizontalPosition / width);
    },

    drawSpiralChunks: function(array) {
      var $spiralHolder = $('#spiral-holder');
      var template = Handlebars.compile( $('#spiral-chunk-template').html() );
      array.forEach(function(inputChunk, idx, array){
        fibonacci.setSpiralChunkPosition(inputChunk, idx, array, fibonacci.totalWidth, fibonacci.totalHeight);
      });
      array.forEach(function(inputChunk, idx) {
        var newChunk = template(inputChunk);
        $spiralHolder.append(newChunk);
        var unit = 'vw';
        $('#' + inputChunk['spiral-chunk-wrapper-id'])
          .width( inputChunk.percentSize + unit )
          .css('top', inputChunk.absVerticalPosition + unit)
          .css('left', inputChunk.absHorizontalPosition + unit);
        if (idx !== 0) {
          $('#' + inputChunk['spiral-chunk-id']).css(inputChunk.borderRadiusPlacement, '100%');
        }
      });
      $( '#' + array[array.length - 1]['spiral-chunk-id']).addClass('round-border');
    },

    setUpSpiral: function() {
      fibonacci.numberArray = fibonacci.populateNumberArray(fibonacci.arrayLength);
      var heightWidth = fibonacci.determineSize(fibonacci.numberArray);
      console.log(heightWidth);
      fibonacci.totalWidth = heightWidth[0];
      fibonacci.totalHeight = heightWidth[1];
      fibonacci.spiralChunkList = fibonacci.populateSpiralChunkList(fibonacci.numberArray, fibonacci.direction, 'black');
      fibonacci.drawSpiralChunks(fibonacci.spiralChunkList);
    },
  };


  module.fibonacci = fibonacci;
})(window);
