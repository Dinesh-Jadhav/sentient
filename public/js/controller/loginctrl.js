stockApp.controller('loginctrl',['$scope','$location', '$http', function ($scope,$location, $http) {
	$scope.login = function() {
	$http.post("/login", {userName:$scope.email, password: $scope.password}).success(function(response){
            if (response.error) 
            {
            	$scope.noError = false;	
            	$scope.ErrorMessage = response.error;
            }
            else
            {
            	$location.path("/dashboard");
            }
	});
   }
 }]);
