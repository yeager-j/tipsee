/**
 * Created by Jackson on 8/17/16.
 */
app.controller('mainCtrl', function($scope, $location){
    $scope.isActive = function (viewLocation) {
        var location = $location.path().split('/');

        return viewLocation === location[1];
    };
});
