(function(module){
  pageContent = {};


  //draws the page content sections into a section with id sectionToAppendToId
  pageContent.buildPageContentSectionsIn = function(sectionToAppendToId){
    console.log('pageContent.buildPageContentSectionsIn called');
    var pageContentSections = Handlebars.compile($('#page-content-sections-template').html());
    $('#' + sectionToAppendToId).append(pageContentSections);
  };

  //appends the top navbar to chunk6 for pages after the index page
  //should I add the thing that draws the link to github in here?
  pageContent.buildTopNavbar = function(){
    var topNavbar = Handlebars.compile($('#navbar-template').html());
    $('#spiral-chunk-6').append(topNavbar);

  };
  //builds the title in chunk7 for page content section
  pageContent.buildSectionTitle = function(title, dataNav){
    var sectionTitle = Handlebars.compile($('#section-title-template').html());
    $('#spiral-chunk-7').append(sectionTitle({'title': title, 'dataNav': dataNav}));
  };

  //export to window
  module.pageContent = pageContent;
})(window);
