/**
 * Created by Jackson on 8/17/16.
 */
app = angular.module('tipsee', ['ngRoute', 'ngCookies','mwl.calendar', 'ngAnimate', 'ui.bootstrap', 'colorpicker.module', 'gridshore.c3js.chart']);

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

        .when('/data/:person/add', {
            templateUrl: 'js/views/add-entry.html',
            controller: 'addEntryCtrl'
        })

        .when('/login', {
            templateUrl: 'js/views/login.html',
            controller: 'loginCtrl'
        })

        .when ('/mastersched',{
            templateUrl: 'js/views/master-sched.html',
            controller: 'masterSchedCtrl'

        })

        .when('/graph', {
            templateUrl: 'js/views/graph.html',
            controller: 'graphCtrl'
        })

        .when('/dashboard', {
            templateUrl: 'js/views/dashboard.html',
            controller: 'userCtrl'
        })
});