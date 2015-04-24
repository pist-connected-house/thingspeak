ConfigurationApp.controller('NewChannelController', ['$scope', '$http', '$interval', function($scope, $http, $interval){
	$scope.count = [1,2,3,4,5,6,7,8];
	$scope.current_channel = 1;
	$scope.keys = [];
	$scope.errors = false;
	$scope.disabled = [];
	$scope.success = false;

	$scope.index = function() {
		$http.get('http://localhost:3000/appli/configuration/get-keys.json?channel='+$scope.current_channel)
		.then(function(result) {
			$scope.keys = [];
			$scope.disabled = [];
			result.data.keys.forEach(function(element) {
				if (element === "") {
					$scope.keys.push("");
					$scope.disabled.push(false);
				}
				else {
					$scope.keys.push(element);
					$scope.disabled.push(true);
				}
				
			});
		});
	};
	
	$scope.index();

	$scope.current = function(i) {
		$scope.errors = false;
		$scope.success = false;
		$scope.current_channel = i;
		$scope.index();
	};

	$scope.remove = function(key) {
		$scope.success = false;
		$scope.errors = false;
		$http.get('http://localhost:3000/appli/configuration/unbind-key.json?key='+key)
		.then(function(result) {
			if (result.data[0] === "success") {
				$scope.success = true;
				$scope.successMessage = "Key removed.";
				$scope.index();
			}
			
		});
	};

	$scope.newchannel = function(field, key) {
		$scope.success = false;
		$scope.errors = false;
		$http.get('http://localhost:3000/appli/configuration/new-channel.json?channel='+$scope.current_channel+'&field='+field+'&key='+key)
		.then(function(result) {
			if (result.data[0] === "success") {
				$scope.success = true;
				$scope.disabled[field-1] = true;
				$scope.successMessage = "Key added.";
			}
			else {
				if (result.data[0] === "belongs_to_you") {
					$scope.errorMessage = "The key you entered has already been saved by you previously.";
				}
				else if (result.data[0] === "belongs_to_another") {
					$scope.errorMessage = "The key you entered belongs to another user.";
				}
				else if (result.data[0] === "absent") {
					$scope.errorMessage = "The key you entered does not exist.";
				}
				else {
					$scope.errorMessage = "An error has occured, please try again.";
				}
				$scope.errors = true;
			}
		});
	};
	
	$scope.firstnewchannel = function(field, key) {
		$scope.success = false;
		$scope.errors = false;
		$http.get('http://localhost:3000/appli/configuration/key-registrations.json?channel='+$scope.current_channel+'&field='+field+'&key='+key)
		.then(function(result) {
			if (result.data[0] === "success") {
				$scope.success = true;
				$scope.disabled[field-1] = true;
				$scope.successMessage = "Key added.";
			}
			else {
				if (result.data[0] === "belongs_to_you") {
					$scope.errorMessage = "The key you entered has already been saved by you previously.";
				}
				else if (result.data[0] === "belongs_to_another") {
					$scope.errorMessage = "The key you entered belongs to another user.";
				}
				else if (result.data[0] === "absent") {
					$scope.errorMessage = "The key you entered does not exist.";
				}
				else {
					$scope.errorMessage = "An error has occured, please try again.";
				}
				$scope.errors = true;
			}
		});
	};
}]);