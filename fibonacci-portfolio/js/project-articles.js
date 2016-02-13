function Article(inputProject) {
  Object.keys(inputProject).forEach(function(key, idx, array) {
    this[key] = inputProject[key];
  }, this);
};

Article.prototype.returnNewArticle = function() {
  if(this.datePublished) {
    this.articleSubtitle = 'Github repo updated ' + parseInt( (new Date() - new Date(this.datePublished))/60/60/24/1000 ) + ' days ago.';
  }
  //may need to put the article into an array containing which articles have demo modules
  var articleTemplate = Handlebars.compile($('#article-template').html());
  return articleTemplate(this);
};

Article.pageContentSections = [['#projects-section', projectsData, 'projects'], ['#about-section', aboutData, 'about'], ['#features-section', featuresData, 'features']];

Article.sortArticlesByDate = function(dataArray, articleArray) {
  if (! Article[articleArray]) {
    dataArray.sort(function(a,b) {
      return (new Date(b.datePublished)) - (new Date(a.datePublished));
    });
  }
};

Article.instantiateArticleObjects = function(dataArray, articleArray) {
  if (! Article[articleArray]) {
    Article[articleArray] = [];
    dataArray.forEach(function(inputProject) {
      var newProjectSummaryObject = new Article(inputProject);
      Article[articleArray].push(newProjectSummaryObject);
    });
  }
};

Article.constructArticles = function(sections) {
  sections.forEach(function(section, idx, sectionsArray) {
    if (section[0] === '#projects-section') {
      Article.sortArticlesByDate(section[1], section[2]);
    }
    Article.instantiateArticleObjects(section[1], section[2]);
    var $currentSection = $(section[0]);
    var imageTemplate = Handlebars.compile($('#article-image-template').html());
    var optionTemplate = Handlebars.compile($('#article-option-template').html());
    Article[section[2]].forEach(function(thisProjectObject) {
      $currentSection.append(thisProjectObject.returnNewArticle());

      var $thisProject = $('#' + thisProjectObject.idString);
      thisProjectObject.articleImage.forEach(function(thisImage, index, array) {
        if (thisProjectObject.articleOptions) {
          $thisProject.append(optionTemplate(thisProjectObject.articleOptions[index]));
        }
        $thisProject.append(imageTemplate(thisImage));
      });


    });

  });
};


// Article.getTotalHeight = function() {
//   var totalHeight = 0;
//   $('#projects-section').show();
//   Article.jqProjectObjects.forEach(function($thisProjectObject) {
//     totalHeight += $thisProjectObject.height();
//   });
//   $('#projects-section').hide();
//   console.log('totalHeight is ' + totalHeight);
//   return totalHeight;
// };
