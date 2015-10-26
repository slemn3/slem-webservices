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
	if(data == null || data == []){
		console.log('Odds for Retrieved Date is null');
		var checkDate = date.replace('-', '');
		oddd = dao;
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				data = xmlhttp.responseText;
				dao(data.DAY);
				res.send(data);
			}
		}
		xmlhttp.open("GET","/odds/feeds/day/20151025", true);
		xmlhttp.send();
	} else {
		res.send(data);
	}
}

//App.require('app/models/Comment');
App.require('config/database');


exports.OddsService = OddsService;