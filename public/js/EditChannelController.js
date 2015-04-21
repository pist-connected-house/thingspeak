ConfigurationApp.controller('EditChannelController', ['$scope', '$http', '$interval', '$timeout', function($scope, $http, $interval, $timeout){
	$scope.channels_and_keys = [];
	$scope.show = [];
	$scope.show_api_key = false;
	$scope.green = false;
	$scope.rm = [];
	

	$http.get('http://localhost:3000/appli/configuration/edit-channel.json')
	.then(function(result) {
		$scope.channels_and_keys = [];
		$scope.show = [];
		$scope.green = [];
		data = result.data;
		for (var i = 0; i < data.channels.length; i++) {
			$scope.channels_and_keys.push({channel: data.channels[i].channel, api_key: data.api_keys[i]});
			$scope.show.push(false);
			$scope.rm.push(false);
		}
	});

	$scope.closeEverything = function() {
		$scope.rm.forEach(function(element, index) {
			$scope.rm[index] = false;
		});
		$scope.show.forEach(function(element, index) {
			$scope.show[index] = false;
		});
	};

	$scope.editApiKey = function(index) {
		if ($scope.show[index]) {
			$scope.closeEverything();
			$scope.show[index] = true;
			var api_key = $scope.channels_and_keys[index].api_key;
			var id = $scope.channels_and_keys[index].channel.id;
			var name = $scope.channels_and_keys[index].channel.name;
			var req = {
				method: 'POST',
				url: 'http://localhost:3000/appli/configuration/update-api?api_key='+api_key+'&id='+id+'&name='+name,
				headers: {
					'Content-Type': 'application/json'
			 	},
			};
			$http(req).
			success(function(data, status, headers, config) {
				$scope.show[index] = !$scope.show[index];
				$scope.green[index] = true;
				$timeout(function() {
					$scope.green[index] = false;
				}, 1000);
			}).
			error(function(data, status, headers, config) {

			});
		}
		else {
			$scope.closeEverything();
			$scope.show[index] = !$scope.show[index];
		}		
	};

	$scope.remove = function(index) {
		if (!$scope.rm[index]) {
			$scope.closeEverything();
			$scope.rm[index] = true;
		}
		else {
			$scope.rm[index] = false;
		}
	};

	$scope.removeApiKey = function(index) {
		var id = $scope.channels_and_keys[index].channel.id;
		var req = {
			method: 'POST',
			url: 'http://localhost:3000/appli/configuration/unbind-api?id='+id,
			headers: {
				'Content-Type': 'application/json'
		 	},
		};
		$http(req).
		success(function(data, status, headers, config) {
			$scope.channels_and_keys.pop(index);
		}).
		error(function(data, status, headers, config) {
		});

	};


	function sleep(seconds){
	    var waitUntil = new Date().getTime() + seconds*1000;
	    while(new Date().getTime() < waitUntil) true;
	}

}]);