stockApp.controller('tickerlist_ticker',['$scope','$location','$http',function($scope,$location,$http){
$http.get('/ticker_list').success(function(response){
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
