
Comment = function(id, submitter, date, content){
	this.id = id;
	this.submitter = submitter;
	this.content = content;
	this.date = date;
}



Comment.prototype.toString = function(){
	return "id: " + this.id
			+ ", submitter: " + this.submitter
			+ ", content: " + this.content
			+ ", date: " + this.date
};

exports.Comment = Comment;