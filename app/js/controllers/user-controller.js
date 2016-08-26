/**
 * Created by Jackson on 8/25/16.
 */
app.controller('userCtrl', function($scope, $rootScope){
    $scope.username = $rootScope.currentUser;
});