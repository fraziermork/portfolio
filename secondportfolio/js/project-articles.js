(function(module) {

  //constructor function
  function ProjectSummary(inputProject) {
    this.articleTitleLink = inputProject.articleTitleLink;
    this.publicationDate = inputProject.publicationDate;
    this.articleTitle = inputProject.articleTitle;
    this.articleContent = inputProject.articleContent;
    this.articleIconClass = inputProject.articleIconClass;
    this.articleCategory = inputProject.articleCategory;
    this.articleImage = inputProject.articleImage;
  }
  ProjectSummary.all = [];

  //Use handlebars to generate page content
  ProjectSummary.prototype.returnProjectSummary = function() {
    var template = Handlebars.compile($('#project-article-template').html());
    this.articlePublishStatus = 'Published about ' + parseInt( (new Date() - new Date(this.publicationDate))/60/60/24/1000 ) + ' days ago, ';
    this.totalWords = this.articleContent.split(' ').length;
    this.articlePublicationDateObj = new Date(this.publicationDate);
    return template(this);
  };

  //build the page content and store the completed article objects

  ProjectSummary.drawProjectSummaries = function(projectData) {
    var $projectArticleSection = $('#project-article-section');
    projectData.sort(function(a,b) {
      return (new Date(b.publicationDate)) - (new Date(a.publicationDate));
    });

    ProjectSummary.all = projectData.map(function(inputProject) {
      return new ProjectSummary(inputProject);
    });

    ProjectSummary.all.forEach(function(thisProjectObject) {
      $projectArticleSection.append(thisProjectObject.returnProjectSummary());
    });

    var totalWordsOnPage = ProjectSummary.all.reduce(function(previous, current, index, array) {
      return previous + current.totalWords;
    }, 0);
    $('footer').append('<p>' + totalWordsOnPage + ' total words. </p>');
  };

  ProjectSummary.makeAjaxCall = function() {
    console.log('going to make ajax call');
    if (localStorage.rawData) {
      console.log('stuff in storage');
      $.ajax({
        type: 'HEAD',
        url: 'js/project-data.json',
        success: function(data, message, xhr) {
          console.log(data);
          console.log(message);
          console.log(xhr);
          var eTag = xhr.getResponseHeader('eTag');
          if (! localStorage.eTag || localStorage.eTag !== eTag) {
            localStorage.eTag = eTag;
            $.ajax({
              type: 'GET',
              url: 'js/project-data.json',
              success: function(data, message, xhr) {
                localStorage.setItem('rawData', JSON.stringify(data));
                localStorage.setItem('eTag', xhr.getResponseHeader('eTag'));
                ProjectSummary.initializePage();
              }
            });
          } else {
            ProjectSummary.initializePage();
          }
        }
      });
    } else {
      console.log('nothing in storage');
      $.ajax({
        type: 'GET',
        url: 'js/project-data.json',
        success: function(data, message, xhr) {
          console.log(data);
          console.log(message);
          console.log(xhr);
          localStorage.setItem('rawData', JSON.stringify(data));
          localStorage.setItem('eTag', xhr.getResponseHeader('eTag'));
          ProjectSummary.initializePage();
        }
      });
    }
  };

  ProjectSummary.initializePage = function() {
    console.log('initializePage');
    console.log(JSON.parse(localStorage.rawData));
    ProjectSummary.drawProjectSummaries(JSON.parse(localStorage.rawData));
    // topNavBarObject.handleTopNav();
  };




  module.ProjectSummary = ProjectSummary;
}(window));


// $(function() {
//
//   // projectSummaries.drawProjectSummaries();
// });
