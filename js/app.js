/**
 * Created by Jackson on 8/17/16.
 */
app = angular.module('tipsee', ['ngRoute', 'ngMaterial']);

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
        });
});