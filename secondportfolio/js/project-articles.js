//constructor function
function ProjectSummary(inputProject){
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
  this.articlePublishStatus = 'Published about ' + parseInt( (new Date() - new Date(this.publicationDate))/60/60/24/1000 ) + ' days ago.';
  this.articlePublicationDateObj = new Date(this.publicationDate);
  return template(this);
};

//build the page content and store the completed article objects
var projectSummaries = {};
projectSummaries.drawProjectSummaries = function(projectData){
  console.log('projectData is ');
  console.log(projectData);
  var $projectArticleSection = $('#project-article-section');
  projectData.sort(function(a,b){
    return (new Date(b.publicationDate)) - (new Date(a.publicationDate));
  });
  console.log('projectData after sort is');
  console.log(projectData);
  console.log(projectData instanceof Array);
  projectData.forEach(function(inputProject){
    ProjectSummary.all.push(new ProjectSummary(inputProject));
  });
  console.log('ProjectSummary.all is');
  console.log(ProjectSummary.all);
  ProjectSummary.all.forEach(function(thisProjectObject){
    $projectArticleSection.append(thisProjectObject.returnProjectSummary());
  });
};

projectSummaries.makeAjaxCall = function(){
  console.log('going to make ajax call');
  if (localStorage.rawData){
    console.log('stuff in storage');
    $.ajax({
      type: 'HEAD',
      url: 'js/project-data.json',
      success: function(data, message, xhr){
        console.log(data);
        console.log(message);
        console.log(xhr);
        var eTag = xhr.getResponseHeader('eTag');
        if (! localStorage.eTag || localStorage.eTag !== eTag){
          localStorage.eTag = eTag;
          $.ajax({
            type: 'GET',
            url: 'js/project-data.json',
            success: function(data, message, xhr){
              localStorage.setItem('rawData', JSON.stringify(data));
              localStorage.setItem('eTag', xhr.getResponseHeader('eTag'));
              projectSummaries.initializePage();
            }
          });
        } else {
          projectSummaries.initializePage();
        }
      }
    });
  } else {
    console.log('nothing in storage');
    $.ajax({
      type: 'GET',
      url: 'js/project-data.json',
      success: function(data, message, xhr){
        console.log(data);
        console.log(message);
        console.log(xhr);
        localStorage.setItem('rawData', JSON.stringify(data));
        localStorage.setItem('eTag', xhr.getResponseHeader('eTag'));
        projectSummaries.initializePage();
      }
    });
  }
};

projectSummaries.initializePage = function(){
  console.log('initializePage');
  console.log(JSON.parse(localStorage.rawData));
  projectSummaries.drawProjectSummaries(JSON.parse(localStorage.rawData));
  topNavBarObject.handleTopNav();
};

// $(function(){
//
//   // projectSummaries.drawProjectSummaries();
// });
