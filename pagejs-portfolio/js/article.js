(function(module){
  //object constructor function
  function Article(inputProject) {
    Object.keys(inputProject).forEach(function(key, idx, array) {
      this[key] = inputProject[key];
    }, this);
  };

  Article.prototype.returnNewArticle = function() {
    if(this.datePublished && ! this.articleSubtitle) {
      this.articleSubtitle = 'Github repo updated ' + parseInt( (new Date() - new Date(this.datePublished))/60/60/24/1000 ) + ' days ago.';
    }
    //may need to put the article into an array containing which articles have demo modules
    var articleTemplate = Handlebars.compile($('#article-template').html());
    return articleTemplate(this);
  };

  Article.sortArticlesByDateBeforePuttingInSessionStorage = function(dataArray){
    console.log('Article.sortArticlesByDateBeforePuttingInSessionStorage called');

    dataArray.sort(function(a, b){
      return (new Date(b.datePublished)) - (new Date(a.datePublished));
    });
  },

  //this builds all of the articles for a particular section (projects, features, about), and puts them into an appropriate array attached to the Article object
  Article.instantiateArticleObjects = function(dataArray, articleArray) {
    // console.log('Article.instantiateArticleObjects called for ' + articleArray);
    if (! Article[articleArray]) {
      Article[articleArray] = [];
      dataArray.forEach(function(inputProject) {
        var newProjectSummaryObject = new Article(inputProject);
        Article[articleArray].push(newProjectSummaryObject);
      });
    }
  };

  //this will take all of the articles from session storage, instantiate instances of Article for them, compile the handlebars template, and append it to the appropriate page content section
  Article.buildFromSessionStorage = function(sectionToClickArticleIn){
    // console.log('Article.buildFromSessionStorage called');

    var pageContentDataArrays = JSON.parse(sessionStorage.getItem('pageContentDataArrays'));
    // console.log('contentSections is ', pageContentDataArrays);
    var imageTemplate = Handlebars.compile($('#article-image-template').html());
    var optionTemplate = Handlebars.compile($('#article-option-template').html());
    // Article['pageContentDataArrays'] = pageContentDataArrays;

    //take things out of local storage and build the variables needed for each page content section as a whole
    pageContentDataArrays.forEach(function(currentDataArrayName, dataArraysIndex, pageContentDataArrays){
      // var currentDataArrayName = current;
      // console.log('sectionName is ' + currentDataArrayName);
      var dataArrayFromSS = JSON.parse(sessionStorage.getItem(currentDataArrayName));
      var sectionId = dataArrayFromSS[0];
      // console.log('sectionId is ' + sectionId);
      Article.instantiateArticleObjects(dataArrayFromSS[1], currentDataArrayName);
      // console.log('Article[currentDataArrayName] is ');
      // console.log(Article[currentDataArrayName]);
      var $currentSection = $('#' + sectionId);
      //build each individual article
      Article[currentDataArrayName].forEach(function(currentArticle, thisDataArrayIndex, thisDataArray){
        // console.log('currentArticle is ', currentArticle);
        $currentSection.append(currentArticle.returnNewArticle());
        var $currentArticle = $('#' + currentArticle.idString);
        // console.log('$currentArticle is ', $currentArticle);
        //need to rewrite this and the data in JSON file so that I can order these in the order they should come in without needing 1-1 image to article options
        currentArticle.articleImage.forEach(function(currentImage, articleImageIndex, articleImageArray){
          if (currentArticle.articleOptions){
            $currentArticle.append(optionTemplate(currentArticle.articleOptions[articleImageIndex]));
          }
          $currentArticle.append(imageTemplate(currentImage));
        });//end of for each article image
      });//end of forEach Article
    });//end of forEach page content section

    
  };



  module.Article = Article;
})(window);
