app.controller('graphCtrl', [$scope, c3SimpleService, function($scope, c3SimpleService) {
    $scope.chart = {
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
    }
}]);

