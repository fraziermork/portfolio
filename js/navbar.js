var topNavBarObject = {};

topNavBarObject.handleTopNav = function(){
  $('.topNavBar').on('click','.navBarLink', function(event){
    $('section').hide();
    if( $(this).attr('data-nav')){
      event.preventDefault();
      var sectionId = '#' + $(this).attr('data-nav');
      $(sectionId).fadeIn().css('display', 'flex').css('flex-direction', 'column').css('justify-content', 'space-between').css('align-items', 'center').css('width', '100%');
    }
  });
  $('.topNavBar .navBarLink:first').click();
};



$(function(){
  console.log('ready');
  topNavBarObject.handleTopNav();
});
