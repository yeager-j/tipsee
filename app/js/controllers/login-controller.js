/**
 * Created by Jackson on 8/22/16.
 */
app.controller('loginCtrl', function($scope, $rootScope, $cookies, $location){
    $scope.submit = function(){
        $cookies.put('currentUser', $scope.username);
        $location.url('/');
    };

    $scope.logOut = function(){
        $cookies.put('currentUser', '');
    };

    $scope.isLoggedIn = function(){
        return $cookies.get('currentUser') !== '';
    };

    $scope.$watch(function() {return $cookies.get('currentUser');}, function(val){
        $rootScope.currentUser = val;
    })

    if($scope.isLoggedIn()){
        $location.url('/dashboard');
    }
});