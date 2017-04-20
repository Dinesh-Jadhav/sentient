
'use strict';
var stockApp = angular.module('stockApp', ['ngRoute']);
	
stockApp.config(['$routeProvider',function($routeProvider){

	$routeProvider
	.when('/',{
    templateUrl:'/js/html/login.html',
    controller:'loginctrl'
	}).when('/dashboard',{
    templateUrl:'/js/html/dashboard.html',
    controller:'dashboardctrl'
	}).when('/addTicker',{
    templateUrl:'/js/html/ticker/add_ticker.html',
    controller:'addticker_ticker'
	}).when('/ticker-list',{
    templateUrl:'/js/html/ticker/ticker_list.html',
    controller:'tickerlist_ticker'
	}).otherwise({redirectTo:'/'});
}]);


stockApp.controller('headerController', function($scope, $route) {
    $scope.$route = $route;
});


