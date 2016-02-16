page('/', indexController.index);
page.exit('/',indexController.onExit);
page('/:currentPageContentSection', pageContentController.index);
// page('/:currentPageContentSection/.*', pageContentController.index); //not sure why this doesn't work yet.
page('/:currentPageContentSection/:article', pageContentController.ensurePageContent, pageContentController.onArticleClick);


page();
