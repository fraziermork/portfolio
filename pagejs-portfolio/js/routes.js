page('/', indexController.index);
page.exit('/',indexController.onExit);
page('/about', aboutController.index);
page('/about/dummy', console.log('about'));
page('/features', featuresController.index);
page('/features/dummy', console.log('features'));
page('/projects', projectsController.index);
page('/projects/dummy', console.log('projects'));
// page('/dummy', function(event){
//   event.preventDefault();
// });
page();


//TODO: questions to ask
// why can't i prevent the default behavior from happening?
// I want to run identical code for all three sections--how do I do this without explicitly writing it out three times while still knowing which section I'm on i.e. how does :id work?
