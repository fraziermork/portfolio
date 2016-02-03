//constructor function
function ProjectSummary(inputProject){
  this.projectTitleLink = inputProject.projectTitleLink;
  this.publicationDate = inputProject.publicationDate;
  this.articleTitle = inputProject.articleTitle;
  this.summaryContent = inputProject.summaryContent;
}

ProjectSummary.prototype.returnProjectSummary = function() {
  var $newProject = $('.template').clone();
  $newProject.find('.projectTitleLink').attr('href', this.projectTitleLink);
  $newProject.find('.articleTitle').text(this.articleTitle);
  $newProject.find('.articleContent').html(this.summaryContent);
  $newProject.find('.publicationDate').attr('datetime', this.publicationDate).html('<em>Project last updated about ' + parseInt( (new Date() - new Date(this.publicationDate))/60/60/24/1000 ) + ' days ago.</em>');

  $newProject.removeClass('template');
  return $newProject;
};


projectSummaries = {
  projects: []
};

//build the page content
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
