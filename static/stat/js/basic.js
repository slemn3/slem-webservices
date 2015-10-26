$(document).ready(function(){
	//getOdds();
});

function getOdds(){
	$.get('/odds/feeds/day/20151025')
	.success(function(data){console.log(data)})
	.error(function(err){console.log(err)});
}


angular.module('Odds', []).controller('OddsController', function($scope, $http) {
	var url = '/odds/feeds/day/20151025';
	$scope.docs = ["a"];
	$http.get(url)
	.success(function(data){
		$scope.docs = data;
	})
	.error(function(err){});
    

    $scope.getGameList = function(index){
    	$scope.gamelist = $scope.docs.DAY.LEAGUE[index];
    }

    $scope.getGameDetails = function(index){
    	$scope.gameDetails = $scope.gamelist[index];
    }
	

});

