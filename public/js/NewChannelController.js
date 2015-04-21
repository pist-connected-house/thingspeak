ConfigurationApp.controller('NewChannelController', ['$scope', '$http', '$interval', function($scope, $http, $interval){
	$('.selectpicker').selectpicker({
	    size: 3,
	});	
	$scope.errorMessage = "";
	$scope.errorMessageR = "";
	$scope.errors = false;
	$scope.errorsRequest = false;
	$scope.success = false;
	$scope.api_key = "";
	$scope.type = "electricity";

	$scope.submitAPIkey = function() {
		if ($scope.api_key === "") {
			$scope.errorMessage = "The field is empty";
			$scope.errors = true;
		}
		else {
			$http.get('http://localhost:3000/appli/configuration/new-channel.json?api_key='+$scope.api_key+'&type='+$scope.type)
				.then(function (result) {
					if (result.data[0] == "success") {
						$scope.errors = false;
						$scope.errorsRequest = false;
						$scope.success = true;
					}
					else {
						$scope.errorMessageR = "The API key already exists or is invalid";
						$scope.errorsRequest = true;
						$scope.success = false;
					}
				});
		}
	};
}]);