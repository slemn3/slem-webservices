var dbsession;

OddsDAO = function(dbsession){
	 this.dbsession = dbsession;
	 
};



OddsDAO.prototype.getDateFull = function(date, callback, res){
	try{
		this.dbsession.collection('oddsfull', function(error, data){
			data.find().sort({dateandtime:date})(function(err, found){
				console.log("getCommentsPaginate success "+found.toString());
				callback(date, found, res);
			});
		});
	} catch(err){
		console.log("Error getting Full Odds "+err);
		callback(date, null, res, this.addDateFull);
	}

};

OddsDAO.prototype.addDateFull = function(obj){
	this.dbsession.collection('oddsfull', function(error, data){
	 	data.insert(obj, function(error, results){
	 		if(error != null){
	 			console.log('Error adding oddsfull: '+error);
	 		} else {
	 			console.log('Successfully saved oddsfull');	
	 		}
	 	});
	 });
};



App.require("config/database.js")


exports.OddsDAO = OddsDAO;