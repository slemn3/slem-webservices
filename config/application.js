var env         = process.env.NODE_ENV || 'development'
  , packageJson = require("../package.json")
  , express     = require("express")
  , fs          = require("fs")
  , commentService

console.log("Loading App in " + env + " mode.")

global.App = {
  app:     express()
, config:  require("./config")[env]
, version: packageJson.version
, port:    process.env.PORT || 3000
, root:    __dirname + "/.." //process.cwd()
, require: function(path) {
    console.log("NEWREQUIRE "+path)
    return require(this.appPath(path))
  }
, appPath: function(path) {
    return this.root + "/" + path
  }
, command:   function(path) {
    return this.require("app/commands/" + path)
  }
, controller:   function(path) {
    return this.require("app/controllers/" + path + "Controller")
  }
, model:   function(path) {
    return this.require("app/models/" + path)
  }
, presenter: function(path) {
    return this.require("app/presenters/" + path)
  }
, route:   function(path) {
    return this.require("app/routes/" + path)
  }
, util:   function(path) {
    return this.require("app/utils/" + path)
  }
, log: function() {
    if (process.env.V) {
      console.log.apply(console,arguments)
    }
  }
, env: env
, start: function() {
    if (!this.started) {
      this.started = true
      this.app.listen(this.port)
      console.log("Running App Version " + App.version + " on port " + App.port + " in " + App.env + " mode "+App.DB)
      
      
      App.DB.startup('localhost', 27017, 'comments', function(error, dbsession){
         console.log("DB start");
         var commentService = new CommentService(dbsession);
         this.commentService = commentService;
      });

      
    }
  }
, shutdown: function() {
    console.log("Manually shutting down App.")
    if (App.DB) {
      App.DB.shutdown()
    }
  }
}

if (!App.config) {
  console.log("ERROR: No config specified for " + env + " environment.")
  process.exit(1)
}

// Middlewarez
if (App.env != "test") {
  App.app.use(express.logger())
}
App.app.use(App.app.router)

// Bootstrap teh [sic] routes
App.require("config/routes")(App.app)
App.require('app/service/CommentDAO').CommentDAO
