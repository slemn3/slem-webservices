var dbsession;

CommentDAO = function(dbsession){
	 this.dbsession = dbsession;
	 
};

CommentDAO.prototype.getSize = function(){
	this.dbsession.collection('comment', function(error, data){
	 	data.find().toArray(function(error, results){
	 		console.log('Size of comment DB is '+results.length);
	 	});
	 });

};

CommentDAO.prototype.getCommentsPaginate = function(offset, size, res, callback){
	try{
		this.dbsession.collection('comment', function(error, data){
			console.log("getCommentsPaginate "+offset, size);
			data.find().sort({date:-1}).skip(offset).limit(size).toArray(function(err, found){
				console.log("getCommentsPaginate success "+found.toString());
				callback(found, res);
			});
		});
	} catch(err){
		console.log("Error getting Comments "+err);
		return err;
	}

};

CommentDAO.prototype.addComment = function(comment){
		this.dbsession.collection('comment', function(error, data){
	 	data.insert(comment, function(error, results){
	 		if(error != null){
	 			console.log('Error adding Comment: '+error);
	 		} else {
	 			console.log('Successfully retrieved comment '+results);	
	 			return results;
	 		}
	 		
	 	});
	 });

};



App.require("config/database.js")


exports.CommentDAO = CommentDAO;