ConfigurationApp.controller('ConfigurationController', ['$scope', '$http', '$interval', function($scope, $http, $interval){
	$scope.channels = [];

	$http.get('http://localhost:3000/appli/configuration.json')
		.then(function(result) {
			data = result.data;
			data.forEach(function(element) {
			    $scope.channels.push(element.channel);
			});
		});
}]);