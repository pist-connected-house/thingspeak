ConfigurationApp.controller('NewChannelController', ['$scope', '$http', '$interval', function($scope, $http, $interval){
	$scope.count = [];
	$scope.current_channel = 1;
	$scope.keys = [];
	$scope.errors = false;
	$scope.disabled = [];
	$scope.success = false;
	$scope.field_name =[];

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
		$scope.field_association();
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
	
	$scope.field_association = function() {
		cchannel = $scope.current_channel;
		if (cchannel%3 == 0) {
			$scope.count.push(1);
			field_name.push("electricity sensor key");
		}
		else if (cchannel%3 == 2) {
			$scope.count.push(1);
			$scope.count.push(2);
			$scope.count.push(3);
			$scope.count.push(4);
			$scope.count.push(5);
			$scope.count.push(6);
			$scope.count.push(7);
			field_name.push("humidity sensor key");
			field_name.push("outside temperature sensor key");
			field_name.push("pressure sensor key");
			field_name.push("wind direction sensor key");
			field_name.push("wind speed sensor key");
			field_name.push("pluviometry sensor key");
			field_name.push("luminosity sensor key");
		}
		else {
			$scope.count.push(1);
			$scope.count.push(2);
			$scope.count.push(3);
			$scope.count.push(4);
			$scope.count.push(5);
			$scope.count.push(6);
			$scope.count.push(7);
			$scope.count.push(8);
			field_name.push("inside temperature sensor key 1");
			field_name.push("inside temperature sensor key 2");
			field_name.push("inside temperature sensor key 3");
			field_name.push("inside temperature sensor key 4");
			field_name.push("inside temperature sensor key 5");
			field_name.push("inside temperature sensor key 6");
			field_name.push("inside temperature sensor key 7");
			field_name.push("inside temperature sensor key 8");
		}
	}

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
	
	
}]);