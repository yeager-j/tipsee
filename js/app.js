/**
 * Created by Jackson on 8/17/16.
 */
app = angular.module('tipsee', ['ngRoute', 'ngCookies']);

app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'js/views/home.html',
            controller: 'homeCtrl'
        })

        .when('/schedule', {
            templateUrl: 'js/views/schedule.html',
            controller: 'scheduleCtrl'
        })

        .when('/data', {
            templateUrl: 'js/views/data.html',
            controller: 'dataCtrl'
        })

        .when('/data/:person', {
            templateUrl: 'js/views/data-view.html',
            controller: 'dataViewCtrl'
        })

        .when('/login', {
            templateUrl: 'js/views/login.html',
            controller: 'loginCtrl'
        })
});