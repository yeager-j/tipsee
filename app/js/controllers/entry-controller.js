/**
 * Created by Jackson on 8/24/16.
 */
app.controller('addEntryCtrl', function($scope, $routeParams, $location){
    $scope.add = function(){
        switch($routeParams.person){
            case 'Danny':
                tipData[0].days.push({
                    date: Date.now(),
                    tipAmount: $scope.tipAmount,
                    hours: $scope.hours,
                    basePay: 120
                });
                break;
            case 'Summer':
                tipData[1].days.push({
                    date: Date.now(),
                    tipAmount: $scope.tipAmount,
                    hours: $scope.hours,
                    basePay: 120
                });
                break;
            case 'Jackson':
                tipData[2].days.push({
                    date: Date.now(),
                    tipAmount: $scope.tipAmount,
                    hours: $scope.hours,
                    basePay: 120
                });
                break;
            default:
                $location.url('/');
                break;
        }


    }
});