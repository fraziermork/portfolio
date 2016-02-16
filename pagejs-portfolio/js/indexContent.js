(function(module){
  var indexContent = {};

  //This just needs to build the initial headers for the whole navigation thing, the links around each will be added once projects are confirmed in sessionstorage
  indexContent.buildIndexPageHeaders = function(){
    console.log('indexContent.buildIndexPageHeaders called');

    $('#spiral-chunk-5').append('<h3 class="navheader external-navheader" id="navheader-github">G H U B</h3>');
    $('#spiral-chunk-6').append('<h3 class="navheader internal-navheader" id="navheader-features" data-nav="features">F E A T U R E S</h3>');
    $('#spiral-chunk-7').append('<h3 class="navheader internal-navheader" id="navheader-about" data-nav="about">A B O U T</h3>');
    $('#spiral-chunk-8').append('<h3 class="navheader internal-navheader" id="navheader-projects" data-nav="projects">P R O J E C T S</h3>');
  };

  indexContent.ensureArticlesInSessionStorage = function(callback){
    console.log('indexContent.ensureArticlesInSessionStorage called');
    //if it's not in session storage we need to make the ajax call and wrap the spiral chunks as a callback
    if (! sessionStorage['pageContentDataArrays']){
      console.log('No pageContentDataArrays in sessionStorage');
      indexContent.makeAjaxCall(callback);
    //if stuff is already in storage, we just need to wrap the spiral chunks
    } else {
      console.log('pageContentDataArrays found in sessionStorage');
      callback();
    }
  };

  indexContent.makeAjaxCall = function(callback){
    console.log('indexContent.makeAjaxCall called');
    $.ajax({
      url: 'js/data/articles.json',
      method: 'GET',
      dataType: 'json',
      success: function(data, textStatus, xhr) {
        console.log(xhr);
        console.log(textStatus);
        console.log(data);
        var pageContentDataArrays = [];
        for (var key in data) {
          console.log(key);
          if (key === 'projectsData') {
            console.log('sorting projectsData');
            indexContent.sortArticlesByDateBeforePuttingInSessionStorage(data[key][1]);
          }
          console.log(data[key]);
          sessionStorage.setItem(key, JSON.stringify(data[key]));
          pageContentDataArrays.push(key);
        }
        console.log('pageContentDataArrays is');
        console.log(pageContentDataArrays);
        sessionStorage.setItem('pageContentDataArrays', JSON.stringify(pageContentDataArrays));

        callback();
      },
      error: function(xhr, textStatus, errorThrown) {
        alert('error in AJAX call!!!!!!!!!!!!');
        console.log(xhr);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
  };

  //this is run inside indexContent.makeAjaxCall to sort the project articles by publishedOn
  indexContent.sortArticlesByDateBeforePuttingInSessionStorage = function(dataArray){
    console.log('indexContent.sortArticlesByDateBeforePuttingInSessionStorage called');

    dataArray.sort(function(a, b){
      return (new Date(b.datePublished)) - (new Date(a.datePublished));
    });
  },

  //this is the callback for indexContent.ensureArticlesInSessionStorage that builds the final interactivity only after
  indexContent.wrapSpiralChunksInLinksAndAddEventListeners = function(){
    console.log('indexContent.wrapSpiralChunksInLinksAndAddEventListeners called');
    //wrap each of them in the appropriate link
    $('#spiral-chunk-5').wrap('<a href="https://github.com/fraziermork" class="navlink external-link"></a>');
    $('#spiral-chunk-6').wrap('<a href="/features" class="navlink internal-link index-link"></a>'); //features
    $('#spiral-chunk-7').wrap('<a href="/about" class="navlink internal-link index-link"></a>'); //about
    $('#spiral-chunk-8').wrap('<a href="/projects" class="navlink internal-link index-link"></a>'); //projects


    console.log('FINISHED BUILDING INITIAL INDEX PAGE');
  };


  //I am placing this here because the listener is generally added on in the indexController, but all pages should have it
  indexContent.onWindowResize = function(event){
    console.log('indexContent.onWindowResize called');
    if (window.innerWidth > fibonacci.redrawScreenWidth - 1 && fibonacci.arrayLength !== 10) {
      // fibonacci.resetFibonacci(10);
      console.log('spiral needs to be redrawn at 10');
    };
    if (window.innerWidth < fibonacci.redrawScreenWidth && fibonacci.arrayLength !== 9) {
      // fibonacci.resetFibonacci(9);
      console.log('spiral needs to be redrawn at 9');
    };
  };

  module.indexContent = indexContent;
})(window);
