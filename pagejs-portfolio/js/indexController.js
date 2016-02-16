(function(module){
  var indexController = {};


  indexController.index = function(){
    console.log('indexController.index called');
    var $spiralChunk = $('.spiral-chunk');

    //if content already exists
    if ($spiralChunk.length){
      console.log('spiral chunks already exist, just going to empty them');
      $spiralChunk.empty();
      indexContent.buildIndexPageHeaders();
      indexContent.ensureArticlesInSessionStorage(indexContent.wrapSpiralChunksInLinksAndAddEventListeners);

    //if content doesn't exist yet and the whole spiral needs to be drawn for the first time
    } else {
      console.log('no spiral chunks exist yet so I will draw them all for the first time');
      fibonacci.initializeSpiral();
      indexContent.buildIndexPageHeaders();
      indexContent.ensureArticlesInSessionStorage(indexContent.wrapSpiralChunksInLinksAndAddEventListeners);
    }





  };


  module.indexController = indexController;
})(window);
