//constructor function
function ProjectSummary(inputProject){
  this.projectTitleLink = inputProject.projectTitleLink;
  this.publicationDate = inputProject.publicationDate;
  this.articleTitle = inputProject.articleTitle;
  this.summaryContent = inputProject.summaryContent;
  this.iconClass = inputProject.iconClass;
  this.category = inputProject.category;
  this.projectImage = inputProject.projectImage;
}

//Use handlebars to generate page content
ProjectSummary.prototype.returnProjectSummary = function() {
  var template = Handlebars.compile($('#project-summary-template').html());
  this.publishStatus = 'Published about ' + parseInt( (new Date() - new Date(this.publicationDate))/60/60/24/1000 ) + ' days ago.';
  this.publicationDateObj = new Date(this.publicationDate);
  return template(this);
};

//build the page content and store the completed article objects
projectSummaries = {
  projects: []
};
projectSummaries.drawProjectSummaries = function(){
  var $projects = $('#projects');
  projectData.sort(function(a,b){
    return (new Date(b.publicationDate)) - (new Date(a.publicationDate));
  });
  projectData.forEach(function(inputProject){
    projectSummaries.projects.push(new ProjectSummary(inputProject));
  });
  projectSummaries.projects.forEach(function(thisProjectObject){
    $projects.append(thisProjectObject.returnProjectSummary());
  });
};
projectSummaries.drawProjectSummaries();
