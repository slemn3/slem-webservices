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
	this.oddsDAO.getDateFull(date, this.checkAndSendResponse, res);
}

OddsService.prototype.sendResponse = function(data, res){
	res.send(data);
}

OddsService.prototype.checkAndSendResponse = function(date, data, res, dao){
	console.log(dao.addDateFull);
	if(data == null || data == []){
		console.log('Odds for Retrieved Date is null');
		var checkDate = date.replace('-', '');
		oddd = dao;
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			console.log("On Ready State Change Called")
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				console.log("On Ready State "+xmlhttp.readyState+" "+xmlhttp.status)
				data = xmlhttp.responseText;
				console.log(data);
				dao.addDateFull(data);

				res.send(data);
			}
		}
		xmlhttp.open("GET","/odds/feeds/day/20151026", true);
		xmlhttp.send();
	} else {
		res.send(data);
	}
} 

//App.require('app/models/Comment');
App.require('config/database');


exports.OddsService = OddsService;