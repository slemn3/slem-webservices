var VersionSetterMiddleware      = App.require("app/middleware/versionSetter")
module.exports = function(app) {
  // ROOT ROUTES
  app.all('/*', VersionSetterMiddleware())
  var CommentController = App.require("app/controllers/commentcontroller")
  app.get('/comment/get', CommentController.index)
  app.get('/comment/submit/:who/:what', CommentController.addComment);


}
