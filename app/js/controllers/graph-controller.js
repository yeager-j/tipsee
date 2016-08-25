app.controller('graphCtrl', function($scope, $interval){
    $scope.datapoints=[];
    $scope.datacolumns=[{"id":"top-1","type":"spline","name":"Danny","color":"green"},
                        {"id":"top-2","type":"spline","name":"Summer","color":"red"}];

    $scope.datax={"id":"x"};

    $scope.datapoints2=[{"x":10,"top-1":10,"top-2":15},
                       {"x":20,"top-1":100,"top-2":35},
                       {"x":30,"top-1":15,"top-2":75},
                       {"x":40,"top-1":50,"top-2":45}];
    $scope.datacolumns2=[{"id":"top-1","type":"line","name":"Top one","color":"green"},
                        {"id":"top-2","type":"spline","name":"Top two","color":"blue"}];
    $scope.datax2={"id":"x"};
});
var chart = c3.generate({
    bindto: '#chart',
    data: {
      columns: [
        ['Danny', 30, 200, 100, 400, 150, 250],
        ['Jackson', 50, 20, 10, 40, 15, 25],
        ['Summer', 50, 20, 10, 40, 15, 25]
      ],
      axes: {
        Jackson: 'y2',
        Summer: 'y2'
      },
      types: {
        Jackson: 'bar',
        Danny: 'y2',
        Summer: 'y2'
      }
    },
    axis: {
      y: {
        label: {
          text: 'Y Label',
          position: 'outer-middle'
        }
      },
      y2: {
        show: true,
        label: {
          text: 'Y2 Label',
          position: 'outer-middle'
        }
      }
    },
    tooltip: {
        format: {
            title: function(x){return 'Today\'s Date ' + x;},
            name: function (name, ratio, id, index){return "On " + index + " " + name + "made:";},
            value: function (value, ratio, id) {
                var format = d3.format('$');
                return format(value);
            }
        }
    }     
});
