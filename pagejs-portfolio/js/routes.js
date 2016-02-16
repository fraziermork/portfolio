page('/', indexController.index);
page.exit('/',indexController.onExit);
page('/:currentPageContentSection', pageContentController.index);
// page('/:currentPageContentSection/.*', pageContentController.index); //not sure why this doesn't work yet.
page('/:currentPageContentSection/:article', pageContent.onArticleClick);
page();


//TODO: questions to ask
// why can't i prevent the default behavior from happening?
