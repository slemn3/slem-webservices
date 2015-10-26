var VersionSetterMiddleware      = App.require("app/middleware/versionSetter")
module.exports = function(app) {
  // ROOT ROUTES
  app.all('/*', VersionSetterMiddleware())
  var CommentController = App.require("app/controllers/commentcontroller");
  var OddsController = App.require("app/controllers/OddsController");

  app.get('/comment/get', CommentController.index);
  app.get('/comment/submit/:who/:what', CommentController.addComment);

  app.get('/odds/getDateFull/:date', OddsController.index)

  //app.get('/comment/get', CommentController.index)
 // app.get('/comment/submit/:who/:what', CommentController.addComment);

}
