ConfigurationApp.controller('EditChannelController', ['$scope', '$http', '$interval', '$timeout', function($scope, $http, $interval, $timeout){
	$scope.channels_and_keys = [];
	$scope.show = [];
	$scope.show_api_key = false;
	$scope.green = false;
	$scope.rm = [];
	$scope.errors = false;
	$scope.errorMessage = "";
	

	$http.get('http://localhost:3000/appli/configuration/edit-channel.json')
	.then(function(result) {
		$scope.channels_and_keys = [];
		$scope.show = [];
		$scope.green = [];
		data = result.data;
		for (var i = 0; i < data.channels.length; i++) {
			$scope.channels_and_keys.push({
				channel: data.channels[i].channel, 
				key: data.keys[i],
				field: data.fields[i],
				id: data.ids[i],
			});
			$scope.show.push(false);
			$scope.rm.push(false);
		}
	});

	$scope.refresh = function(index) {
		$http.get('http://localhost:3000/appli/configuration/refresh.json?id='+$scope.channels_and_keys[index].id)
		.then(function(result) {
			if (result.data.key !== "error") {
				$scope.channels_and_keys[index].key = result.data.key;
			}
		});
	};

	$scope.closeEverything = function() {
		$scope.errors = false;
		$scope.rm.forEach(function(element, index) {
			$scope.rm[index] = false;
		});
		$scope.show.forEach(function(element, index) {
			if ($scope.show[index])
				$scope.refresh(index);
			$scope.show[index] = false;
		});
	};

	$scope.editApiKey = function(index) {
		if ($scope.show[index]) {
			$scope.closeEverything();
			$scope.show[index] = true;
			var key = $scope.channels_and_keys[index].key;
			var id = $scope.channels_and_keys[index].id;
			var req = {
				method: 'POST',
				url: 'http://localhost:3000/appli/configuration/update-key.json?key='+key+'&id='+id,
				headers: {
					'Content-Type': 'application/json'
			 	},
			};
			$http(req).
			success(function(data, status, headers, config) {
				if (data[0] === 'success' || data[0] == 'nothing') {
					$scope.show[index] = !$scope.show[index];
					$scope.green[index] = true;
					$timeout(function() {
						$scope.green[index] = false;
					}, 1000);
				}
				else {
					$scope.errors = true;
					if (data[0] === 'belongs1') {
						$scope.errorMessage = "The new key already belongs to another user.";
					}
					else if (data[0] == 'invalid') {
						$scope.errorMessage = "The key is not valid.";
					}
					else if (data[0] == 'belongs2') {
						$scope.errorMessage = "You are not allowed to edit this key.";
					}
					else {
						$scope.errorMessage = "Unknown error.";
					}
				}
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
		var id = $scope.channels_and_keys[index].id;
		var req = {
			method: 'POST',
			url: 'http://localhost:3000/appli/configuration/unbind-key.json?id='+id,
			headers: {
				'Content-Type': 'application/json'
		 	},
		};
		$http(req).
		success(function(data, status, headers, config) {
			if (data[0] === 'success') {
				$scope.channels_and_keys.pop(index);
			}
			else {
				$scope.errors = true;
				$scope.errorMessage = "You are not allowed to remove this key.";
			}
		}).
		error(function(data, status, headers, config) {
		});

	};


	function sleep(seconds){
	    var waitUntil = new Date().getTime() + seconds*1000;
	    while(new Date().getTime() < waitUntil) true;
	}

}]);