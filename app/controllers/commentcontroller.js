exports.index = function (req,res) {
	var results = commentService.getComments(0, 5, res);
	console.log("rendering "+results);
	//res.send(results);
};

exports.addComment = function (req,res) {
	console.log(req.param("text"));
	var response = commentService.newComment(req.params.who, req.params.what, res);
	res.send(response);
};



App.require('app/service/CommentService');