//constructor function
function ProjectSummary(inputProject){
  this.articleTitleLink = inputProject.articleTitleLink;
  this.publicationDate = inputProject.publicationDate;
  this.articleTitle = inputProject.articleTitle;
  this.articleContent = inputProject.articleContent;
  this.articleIconClass = inputProject.articleIconClass;
  this.articleCategory = inputProject.articleCategory;
  this.articleImage = inputProject.articleImage;
  this.idString = inputProject.idString;
}

//Use handlebars to generate page content
ProjectSummary.prototype.returnProjectSummary = function() {
  var template = Handlebars.compile($('#project-article-template').html());
  this.articlePublishStatus = 'Github page updated about ' + parseInt( (new Date() - new Date(this.publicationDate))/60/60/24/1000 ) + ' days ago.';
  this.articlePublicationDateObj = new Date(this.publicationDate);
  return template(this);
};

//build the page content and store the completed article objects
projectSummaries = {
  projects: [],
  jqProjectObjects:[],
};
projectSummaries.constructProjectSummaries = function(){
  var $projectsSection = $('#projects-section');

  projectsData.sort(function(a,b){
    return (new Date(b.publicationDate)) - (new Date(a.publicationDate));
  });
  projectsData.forEach(function(inputProject){
    var newProjectSummaryObject = new ProjectSummary(inputProject);
    projectSummaries.projects.push(newProjectSummaryObject);
  });
  projectSummaries.projects.forEach(function(thisProjectObject){
    $projectsSection.append(thisProjectObject.returnProjectSummary());
  });
  projectSummaries.projects.forEach(function(thisProjectObject){
    projectSummaries.jqProjectObjects.push( $('#' + thisProjectObject.idString) );
  });
  // $projectsSection.toggleSlide();
};
projectSummaries.getTotalHeight = function(){
  var totalHeight = 0;
  $('#projects-section').show();
  projectSummaries.jqProjectObjects.forEach(function($thisProjectObject){
    // console.log($thisProjectObject);
    // console.log($thisProjectObject.height());
    totalHeight += $thisProjectObject.height();
  });
  // $('footer').css('top', function(){
  //   return $(document).height();
  // });
  $('#projects-section').hide();
  console.log('totalHeight is ' + totalHeight);
  return totalHeight;
};
