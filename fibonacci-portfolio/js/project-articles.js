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
Article.sectionList = [['about-section', 'aboutData2'], ['projects-section', 'projectsData2'], ['features-section', 'featuresData2']];

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

Article.buildFromSessionStorage = function(){
  console.log('buildFromSessionStorage called');
  var contentSections = JSON.parse(sessionStorage.getItem('contentSections'));
  console.log('contentSections is ');
  console.log(contentSections);
  var imageTemplate = Handlebars.compile($('#article-image-template').html());
  var optionTemplate = Handlebars.compile($('#article-option-template').html());
  contentSections.forEach(function(current, index, array){
    var sectionName = current;
    console.log('sectionName is ' + sectionName);
    var objFromSS = JSON.parse(sessionStorage.getItem(sectionName));
    var sectionId = objFromSS[0];
    console.log('sectionId is ' + sectionId);
    Article.instantiateArticleObjects(objFromSS[1], sectionName);
    console.log('Article[sectionName] is ');
    console.log(Article[sectionName]);
    var $currentSection = $('#' + sectionId);
    Article[sectionName].forEach(function(current, index, array){
      console.log('current is ');
      console.log(current);
      console.log($currentArticle);
      $currentSection.append(current.returnNewArticle());
      var $currentArticle = $('#' + current.idString);
      //need to rewrite this and the data in JSON file so that I can order these in the order they should come in without needing 1-1 image to article options
      current.articleImage.forEach(function(thisImage, index, array) {
        console.log('thisImage is');
        console.log(thisImage);
        $currentArticle.append(imageTemplate(thisImage));
        if (current.articleOptions) {
          $currentArticle.append(optionTemplate(current.articleOptions[index]));
        }
      });
    });
  });
};

Article.ensureData = function(sections, callback) {
  if (! sessionStorage[sections[0][1]]) {
    console.log('not yet in session storage');
    $.ajax({
      url: 'js/data/articles.json',
      method: 'GET',
      dataType: 'json',
      success: function(data, textStatus, xhr) {
        console.log(xhr);
        console.log(textStatus);
        console.log(data);
        var contentSections = [];
        for (var key in data) {
          console.log(key);
          if (key === 'projectsData') {
            console.log('true');
            Article.sortArticlesByDate(data[key][1], key);
          }
          console.log(data[key]);
          sessionStorage.setItem(key, JSON.stringify(data[key]));
          contentSections.push(key);
        }
        console.log('contentSections is');
        console.log(contentSections);
        sessionStorage.setItem('contentSections', JSON.stringify(contentSections));
        Article.buildFromSessionStorage();
        content.completeArticles();

        //callback from setUpPageContent, expect either navclick or bit at end of redrawSpiral to click appropriate sections
        callback();
      },
      error: function(xhr, textStatus, errorThrown) {
        alert('error in AJAX call!!!!!!!!!!!!');
        console.log(xhr);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
  } else {
    console.log('already in session storage');
    Article.buildFromSessionStorage();
    callback();
  }
};

Article.callbackFunction = function() {
  console.log('callbackFunction called in Article.fetchData');
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
