/**
 * Created by Jackson on 8/19/16.
 */
app.controller('dataViewCtrl', function($scope, $routeParams) {
    switch($routeParams.person){
        case 'Danny':
            $scope.entry = tipData[0];
            break;
        case 'Summer':
            $scope.entry = tipData[1];
            break;
        case 'Jackson':
            $scope.entry = tipData[2];
            break;
    }
});