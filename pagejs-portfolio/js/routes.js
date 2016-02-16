page('/', indexController.index);
page.exit('/',indexController.onExit);
page('/about', aboutController.index);
page('/about/:article', pageContent.onArticleClick);
page('/features', featuresController.index);
page('/features/:article', pageContent.onArticleClick);
page('/projects', projectsController.index);
page('/projects/:article', pageContent.onArticleClick);
// page('/projects/:article/:otherInput', pageContent.testArticleClick);
page();


//TODO: questions to ask
// why can't i prevent the default behavior from happening?
