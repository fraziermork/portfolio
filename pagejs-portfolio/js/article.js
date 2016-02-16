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

  //this builds all of the articles for a particular section (projects, features, about), and puts them into an appropriate array attached to the Article object
  Article.instantiateArticleObjects = function(dataArray, articleArray) {
    if (! Article[articleArray]) {
      Article[articleArray] = [];
      dataArray.forEach(function(inputProject) {
        var newProjectSummaryObject = new Article(inputProject);
        Article[articleArray].push(newProjectSummaryObject);
      });
    }
  };

  //this will take all of the articles from session storage, instantiate instances of Article for them, compile the handlebars template, and append it to the appropriate page content section
  Article.buildFromSessionStorage = function(){
    console.log('Article.buildFromSessionStorage called');
    var pageContentDataArrays = JSON.parse(sessionStorage.getItem('pageContentDataArrays'));
    console.log('contentSections is ', pageContentDataArrays);
    var imageTemplate = Handlebars.compile($('#article-image-template').html());
    var optionTemplate = Handlebars.compile($('#article-option-template').html());

    //take things out of local storage and build the variables needed for each page content section as a whole
    pageContentDataArrays.forEach(function(dataArrayName, dataArraysIndex, pageContentDataArrays){
      // var dataArrayName = current;
      console.log('sectionName is ' + dataArrayName);
      var dataArrayFromSS = JSON.parse(sessionStorage.getItem(dataArrayName));
      var sectionId = dataArrayFromSS[0];
      console.log('sectionId is ' + sectionId);
      Article.instantiateArticleObjects(dataArrayFromSS[1], dataArrayName);
      console.log('Article[dataArrayName] is ');
      console.log(Article[dataArrayName]);
      var $currentSection = $('#' + sectionId);

      //build each individual article
      Article[dataArrayName].forEach(function(currentArticle, thisDataArrayIndex, thisDataArray){
        console.log('currentArticle is ', currentArticle);
        $currentSection.append(currentArticle.returnNewArticle());
        var $currentArticle = $('#' + currentArticle.idString);
        console.log('$currentArticle is ', $currentArticle);


      });//end of forEach Article

    });//end of forEach page content section

  };



  module.Article = Article;
})(window);
