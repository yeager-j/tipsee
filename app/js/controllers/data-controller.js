/**
 * Created by Jackson on 8/17/16.
 */
app.controller('dataCtrl', function($scope, $rootScope, $location){
    if($rootScope.currentUser !== 'master'){
        $location.url('/data/' + $rootScope.currentUser);
    }

    $scope.tipData = tipData;
});