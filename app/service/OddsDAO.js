var dbsession;

OddsDAO = function(dbsession){
	 this.dbsession = dbsession;
	 
};


//OddsService.prototype.checkAndSendResponse = function(date, data, res, dao){

OddsDAO.prototype.getDateFull = function(date, callback, errorcallback, res){
	var self = this;
	try{
		console.log('date: '+date)
		var collection = this.dbsession.collection('oddsfull', function(error, primresults){

			primresults.count(function(err, count){			console.log("*** Size of oddsfull collection is: "+count);});
			primresults.find({dateandtime: date}).toArray( function(err, found){
				if(err != null || found == null || found == [] || found == ""){
					console.log("Error getting Full Odds "+err);
					callback(date, null, res, self);
				} else {
					console.log("getCommentsPaginate success "+found.toString());
					callback(date, found, res);
				}
			});
		});
		
	} catch(err){
		console.log("Error getting Full Odds "+err);
	}


};

OddsDAO.prototype.addDateFull = function(obj){
	console.log("Calling addDateFull");
	var collection = this.dbsession.collection('oddsfull',function(err, data){

		data.insert(obj, function(error, results){
	 		if(error != null){
	 			console.log('Error adding oddsfull: '+error);
	 		} else {
	 			console.log('Successfully saved oddsfull');	
	 		}
	 	});
	});
	// collection.find().toArray(function(error, data){console.log(data);});
	
};



App.require("config/database.js")


exports.OddsDAO = OddsDAO;