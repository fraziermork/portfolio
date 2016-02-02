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


//build the page content
function drawProjectSummaries(){
  var projects = [];
  var $projectSummariesHolder = $('#projectSummariesHolder');

  projectData.sort(function(a,b){
    return (new Date(b.publicationDate)) - (new Date(a.publicationDate));
  });
  projectData.forEach(function(inputProject){
    projects.push(new ProjectSummary(inputProject));
  });

  projects.forEach(function(thisProjectObject){
    $projectSummariesHolder.append(thisProjectObject.returnProjectSummary());
  });

}
drawProjectSummaries();
