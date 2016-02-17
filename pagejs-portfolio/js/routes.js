page('/', indexController.index);
page.exit('/',indexController.onExit);
page('/:currentPageContentSection', pageContentController.index);
page('/:currentPageContentSection/:article', pageContentController.ensurePageContent, pageContentController.onArticleClick);


page();
