ConfigurationApp.controller('NewChannelController', ['$scope', '$http', '$interval', function($scope, $http, $interval){
	$('.selectpicker').selectpicker({
	    size: 3,
	});	

	$scope.type = "electricity";
}]);