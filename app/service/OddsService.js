var 	oddsDAO
	,	crypto = require('crypto')
	,	express = require('express')
	, 	app = express()
	,	XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


OddsService = function(dbsession){
	this.oddsDAO = new OddsDAO(dbsession);
	console.log("Creating OddsService for Session");
};


OddsService.prototype.getDateFull = function(date, res){
	this.oddsDAO.getDateFull(date, this.checkAndSendResponse, this.addDateFull, res);
}

OddsService.prototype.addDateFull = function(data, res){
	console.log(data)
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		data = xmlhttp.responseText;
		res.send(data);
		this.oddsDAO.addDateFull(data.DAY);

	}
}

OddsService.prototype.sendResponse = function(data, res){
	res.send(data);
}

OddsService.prototype.checkAndSendResponse = function(date, data, res, dao){
	if(data == null || data == []){
		console.log('Odds for Retrieved Date is null');
		var url = "/odds/feeds/day/"+date.replace('-','');
		var checkDate = date.replace('-', '');
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			console.log("On Ready State Change Called")
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				console.log("On Ready State "+xmlhttp.readyState+" "+xmlhttp.status)
				data = xmlhttp.responseText;
				var outputdata = JSON.parse(data);
				dao.addDateFull(outputdata.DAY);

				res.send(data);
			}
		}
		xmlhttp.open("GET", url , true);
		xmlhttp.send();
	} else {
		console.log("SEND RES DATA");
		res.send(data);
	}
} 

//App.require('app/models/Comment');
App.require('config/database');


exports.OddsService = OddsService;