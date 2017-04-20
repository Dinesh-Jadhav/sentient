stockApp.directive('header', ['$compile', '$http', '$location', '$route', function($compile, $http, $location, $route) {
    return {
        restrict: 'E',
        templateUrl: 'js/html/header.html',
        transclude: true,
        link: function(scope, element, attrs) {
                scope.$emit('LOAD');
                $http.get("/authentication/admin").success(function(response, status, headers, config) {
                    scope.$emit('UNLOAD');
                    if (response.status == 'success') {

                    } else {
                        $location.path("/");
                    }
                });
            

          /*  var i = 1;
            scope.openModel = function() {
                if (i % 2 == 1) {
                    angular.element('.dropdown-menu').css('display', 'block');
                } else {
                    angular.element('.dropdown-menu').css('display', 'none');
                }
                i++;
            }*/
            scope.logout = function() {
                scope.$emit('LOAD');
                $http.get("/logout", { logout: 'admin' }).success(function(response, status, headers, config) {
                    scope.$emit('UNLOAD');
             
                    $location.path("/");
                });
            };
        }
    }
}]);
