/**
 * Created by Jackson on 8/17/16.
 */
app.controller('mainCtrl', function($scope, $location, $cookies){
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
});
