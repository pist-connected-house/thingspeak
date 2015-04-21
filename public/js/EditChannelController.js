ConfigurationApp.controller('EditChannelController', ['$scope', '$http', '$interval', function($scope, $http, $interval){
	$scope.channels_and_keys = [];
	$scope.show = [];
	$scope.show_api_key = false;
	
	$http.get('http://localhost:3000/appli/configuration/edit-channel.json')
	.then(function(result) {
		$scope.channels_and_keys = [];
		$scope.show = [];
		data = result.data;
		for (var i = 0; i < data.channels.length; i++) {
			$scope.channels_and_keys.push({channel: data.channels[i].channel, api_key: data.api_keys[i]});
			$scope.show.push(false);
		}
	});

	$scope.showApiKey = function(index) {
		$scope.show[index] = !$scope.show[index];
	};

}]);