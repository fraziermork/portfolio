(function(module){
  pageContent = {};

  pageContent.buildPageContentSectionsIn = function(sectionToAppendToId){
    console.log('pageContent.buildPageContentSectionsIn called');
    var pageContentSections = Handlebars.compile($('#page-content-sections-template').html());
    $('#' + sectionToAppendToId).append(pageContentSections);
  };
  pageContent.buildTopNavbar = function(){
    var topNavbar = Handlebars.compile($('#navbar-template').html());
    $('#spiral-chunk-6').append(topNavbar);

  };
  pageContent.buildSectionTitle = function(title, dataNav){
    var sectionTitle = Handlebars.compile($('#section-title-template').html());
    $('#spiral-chunk-7').append(sectionTitle({'title': title, 'dataNav': dataNav}));
  };


  module.pageContent = pageContent;
})(window);
