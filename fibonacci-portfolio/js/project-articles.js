function Article(inputProject){
  Object.keys(inputProject).forEach(function(key, idx, array){
    this[key] = inputProject[key];
  }, this);
};

Article.prototype.returnNewArticle = function() {
  this.articlePublishStatus = 'Github page updated about ' + parseInt( (new Date() - new Date(this.publicationDate))/60/60/24/1000 ) + ' days ago.';
  this.articlePublicationDateObj = new Date(this.publicationDate);
  var template = Handlebars.compile($('#article-template').html());
  return template(this);
};

Article.pageContentSections = [['#projects-section', projectsData, 'projects'], ['#about-section', aboutData, 'about'], ['#features-section', featuresData, 'features']];

Article.sortArticlesByDate = function(dataArray, articleArray){
  if (! Article[articleArray]){
    dataArray.sort(function(a,b){
      return (new Date(b.publicationDate)) - (new Date(a.publicationDate));
    });
  }
};

Article.instantiateArticleObjects = function(dataArray, articleArray){
  if (! Article[articleArray]){
    Article[articleArray] = [];
    dataArray.forEach(function(inputProject){
      var newProjectSummaryObject = new Article(inputProject);
      Article[articleArray].push(newProjectSummaryObject);
    });
  }
};

Article.constructArticles = function(sections){
  sections.forEach(function(section, idx, sectionsArray){
    if (section[0] === '#projects-section'){
      Article.sortArticlesByDate(section[1], section[2]);
    }
    Article.instantiateArticleObjects(section[1], section[2]);
    var $currentSection = $(section[0]);
    Article[section[2]].forEach(function(thisProjectObject){
      $currentSection.append(thisProjectObject.returnNewArticle());
    });

  });
};


// Article.getTotalHeight = function(){
//   var totalHeight = 0;
//   $('#projects-section').show();
//   Article.jqProjectObjects.forEach(function($thisProjectObject){
//     totalHeight += $thisProjectObject.height();
//   });
//   $('#projects-section').hide();
//   console.log('totalHeight is ' + totalHeight);
//   return totalHeight;
// };
