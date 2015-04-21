ConfigurationApp.controller('ConfigurationController', ['$scope', '$http', '$interval', function($scope, $http, $interval){
	$scope.channels = [];

	function configuration() {
		$scope.channels = [];
		$http.get('http://localhost:3000/appli/configuration.json')
		.then(function(result) {
			data = result.data;
			data.forEach(function(element) {
			    $scope.channels.push(element.channel);
			});
		});
	}


	configuration();
	var intervalConfig = $interval(configuration, 10000);

	$scope.$on('$destroy', function () { 
		$interval.cancel(intervalConfig);		
	});
}]);