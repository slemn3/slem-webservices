exports.index = function (req,res) {
	var results = oddsService.getDateFull(req.params.date, res);
	console.log("rendering "+results);
	//res.send(results);
};


App.require('app/service/OddsService');