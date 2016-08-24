app.controller('graphCtrl', function($scope, $interval, dataService){
    $scope.datapoints=[];
    $scope.datacolumns=[{"id":"top-1","type":"spline","name":"Top one","color":"black"},
                        {"id":"top-2","type":"spline","name":"Top two"}];
    $scope.datax={"id":"x"};
    console.log($scope.datax);
    $interval(function(){
        dataService.loadData(function(data){
        console.log(data);

            $scope.datapoints.push(data);
        });
    },1000,10);
});


    // $scope.datapoints=[{"x":10,"Danny":10,"Summer":15,"Jackson":32},
    //                    {"x":20,"Danny":100,"Summer":35,"Jackson":80},
    //                    {"x":30,"Danny":15,"Summer":75,"Jackson":23},
    //                    {"x":40,"Danny":50,"Summer":45,"Jackson":68}];
    // $scope.datacolumns=[{"id":tipData[0].name,"type":"spline"},
    //                     {"id":tipData[1].name,"type":"spline"},
    //                     {"id":tipData[2].name,"type":"spline"}];
    // $scope.datax={"id":"x"};
