app.controller('graphCtrl', function($scope, $interval, dataService){
    $scope.datapoints=[];
    $scope.datacolumns=[{"id":"top-1","type":"spline","name":"Danny","color":"green"},
                        {"id":"top-2","type":"spline","name":"Summer","color":"red"}];
    $scope.datax={"id":"x"};

    $interval(function(){
        dataService.loadData(function(data){
            $scope.datapoints.push(data);
        });
    },1000,10);
});
