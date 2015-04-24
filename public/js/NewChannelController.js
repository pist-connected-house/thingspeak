ConfigurationApp.controller('NewChannelController', ['$scope', '$http', '$interval', function($scope, $http, $interval){
	/*$('.selectpicker').selectpicker({
	    size: 3,
	});	
	$scope.errorMessage = "";
	$scope.errorMessageR = "";
	$scope.errors = false;
	$scope.errorsRequest = false;
	$scope.success = false;
	$scope.key = "";
	$scope.type = 1;
	$scope.count = [1,2,3,4,5,6,7,8];

	$scope.submitAPIkey = function() {
		if ($scope.key === "") {
			$scope.errorMessage = "The field is empty";
			$scope.errors = true;
		}
		else {
			$http.get('http://localhost:3000/appli/configuration/new-channel.json?key='+$scope.key+'&type='+$scope.type)
				.then(function (result) {
					if (result.data[0] == "success") {
						$scope.errors = false;
						$scope.errorsRequest = false;
						$scope.success = true;
					}
					else if (result.data[0] === "error") {
						$scope.errorMessageR = "The key already belongs to a user.";
						$scope.errorsRequest = true;
						$scope.success = false;
					}
					else {
						$scope.errorMessageR = "The key is not valid.";
						$scope.errorsRequest = true;
						$scope.success = false;
					}
				});
		}
	};*/
	$scope.count = [1,2,3,4,5,6,7,8];
	$scope.current_channel = 1;

	$http.get('http://localhost:3000/appli/configuration/get-keys?channel='+$scope.current_channel)
	.then(function(result) {

	});
}]);