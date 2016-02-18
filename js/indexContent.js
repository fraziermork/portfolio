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

  //Checks if there is stuff in session storage--if not, it makes the ajax call and puts it in storage, otherwise it just goes to the callback
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

  //make an ajax call to articles.json to build the article objects
  indexContent.makeAjaxCall = function(callback){
    console.log('indexContent.makeAjaxCall called');
    $.ajax({
      url: '/js/data/articles.json',
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
            Article.sortArticlesByDateBeforePuttingInSessionStorage(data[key][1]);
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




  //this is the callback for indexContent.ensureArticlesInSessionStorage that builds the final interactivity only after the ajax call is done
  indexContent.wrapSpiralChunksInLinksAndAddEventListeners = function(){
    console.log('indexContent.wrapSpiralChunksInLinksAndAddEventListeners called');
    //wrap each of them in the appropriate link
    $('#spiral-chunk-5').wrap('<a href="https://github.com/fraziermork" class="navlink external-link"></a>');
    $('#spiral-chunk-6').wrap('<a href="/features" class="navlink internal-link index-link"></a>');
    $('#spiral-chunk-7').wrap('<a href="/about" class="navlink internal-link index-link"></a>');
    $('#spiral-chunk-8').wrap('<a href="/projects" class="navlink internal-link index-link"></a>');
    console.log('FINISHED BUILDING INITIAL INDEX PAGE');
  };


  //I am placing this here because the listener is generally added on in the indexController, but all pages should have it
  indexContent.onWindowResize = function(event){
    console.log('indexContent.onWindowResize called');
    //These two should be combined with a logical OR
    if ((window.innerWidth > fibonacci.redrawScreenWidth - 1 && fibonacci.arrayLength !== 10) || (window.innerWidth < fibonacci.redrawScreenWidth && fibonacci.arrayLength !== 9)) {
      console.log('spiral needs to be redrawn');
      $('#spiral-holder').empty();
      fibonacci.initializeSpiral();
      console.log(history.state);
      indexContent.restoreHistoryState();
    };
  };

  //When the window is resized, this uses the stored history state to determine whether things need to be shown
  //can probably replace with ctx.params instead of history.state
  indexContent.restoreHistoryState = function(){
    console.log('indexContent.restoreHistoryState called');
    var historyState = history.state.path;
    var pageState = historyState.match(/^(\/)(?:([a-zA-Z]+))?(?:\/([a-zA-Z]+))?$/);
    console.log(pageState);

    if (pageState[2]){//in a page-content section, needs to run the same stuff as in pageContentController index on fresh page except that stuff is already in session storage
      var mainSpiralChunk = 'spiral-chunk-8';
      if (fibonacci.arrayLength === 10){ //if its the big spiral
        mainSpiralChunk = 'spiral-chunk-9';
        $('#spiral-chunk-8').append('<div class="main-image-holder" id="main-image-holder"><div class="main-image" id="main-image"></div></div>');
      }
      pageContent.buildTopNavbar();
      $('#spiral-chunk-5').append('<h3 class="navheader external-navheader nav-highlightable" id="navheader-github">G H U B</h3>').wrap('<a href="https://github.com/fraziermork" class="navlink external-link"></a>');
      pageContent.buildPageContentSectionsIn(mainSpiralChunk); //this will need to be changed once the main image holder is built
      Article.buildFromSessionStorage(pageState[2]);
      pageContent.buildSectionTitle(pageContentController.sectionTitleInfo[pageState[2]][0], pageState[2]);
      $('#' + pageState[2] + '-section').slideToggle();
      if(pageState[3]){ //on a particular project's article
        console.log('pageState[3] is ' + pageState[3]);
        $('#' + pageState[3]).find('.article-title').click();//as is, this probably adds the page into history again, which could be confusing, but it's a minor problem that can be fixed later
      } else if (fibonacci.arrayLength === 10){
        $('#' + pageState[2] + '-section').find('.project-article:first-of-type .article-title').click();
      }
    } else { //on the index page, need to run same stuff as indexController index except stuff already in session storage
      indexContent.buildIndexPageHeaders();
      indexContent.wrapSpiralChunksInLinksAndAddEventListeners();
    }
  };


  //makes the ajax call to github for page updated text
  indexContent.buildPageUpdatedOn = function() {
    console.log('indexContent.buildPageUpdatedOn');
    ghApi.getRepo('portfolio', function(portfolioDataObj){
      console.log(new Date(portfolioDataObj.updated_at));
      $('body').append('<meta http-equiv="last-modified" content="' + new Date(portfolioDataObj.updated_at) +'">');
    });
  };

  //makes the ajax call to github for number of github repos and makes it a title for the navbar link to github
  indexContent.addGHTitle = function() {
    console.log('indexContent.addGHTitle');
    ghApi.queryMe(function(fraziermorkGHObj){
      $('#navheader-github').attr('title', fraziermorkGHObj.public_repos + ' public repositories on GitHub');
    });
  };

  //export to window
  module.indexContent = indexContent;
})(window);
