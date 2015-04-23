ConfigurationApp.controller('NewChannelController', ['$scope', '$http', '$interval', function($scope, $http, $interval){
	$('.selectpicker').selectpicker({
	    size: 3,
	});	
	$scope.errorMessage = "";
	$scope.errorMessageR = "";
	$scope.errors = false;
	$scope.errorsRequest = false;
	$scope.success = false;
	$scope.key = "";
	$scope.type = "electricity";

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
						$scope.errorMessageR = "The key already exists or is invalid.";
						$scope.errorsRequest = true;
						$scope.success = false;
					}
				});
		}
	};
}]);