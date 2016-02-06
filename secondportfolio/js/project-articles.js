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

//Use handlebars to generate page content
ProjectSummary.prototype.returnProjectSummary = function() {
  var template = Handlebars.compile($('#project-article-template').html());
  this.articlePublishStatus = 'Published about ' + parseInt( (new Date() - new Date(this.publicationDate))/60/60/24/1000 ) + ' days ago.';
  this.articlePublicationDateObj = new Date(this.publicationDate);
  return template(this);
};

//build the page content and store the completed article objects
projectSummaries = {
  projects: []
};
projectSummaries.drawProjectSummaries = function(){
  var $projectArticleSection = $('#project-article-section');
  projectData.sort(function(a,b){
    return (new Date(b.publicationDate)) - (new Date(a.publicationDate));
  });
  projectData.forEach(function(inputProject){
    projectSummaries.projects.push(new ProjectSummary(inputProject));
  });
  projectSummaries.projects.forEach(function(thisProjectObject){
    $projectArticleSection.append(thisProjectObject.returnProjectSummary());
  });
};

$(function(){
  projectSummaries.drawProjectSummaries();
});
