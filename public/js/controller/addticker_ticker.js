stockApp.controller('addticker_ticker',['$scope','$location', '$http', function ($scope,$location, $http) {
		// $scope.addticker =function(){


		// 	console.log($scope.ticker_name);
		// }
$http.post('/addTicker').success(function(response){
            if (response.error) 
            {
            	$scope.noError = false;	
            	$scope.ErrorMessage = response.error;
            }
            else
            {
             console.log(response);
             
            }
           });


 }]);
