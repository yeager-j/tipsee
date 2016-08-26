app.controller('graphCtrl', ['$scope', 'c3SimpleService', function($scope, c3SimpleService) {
// Fine Tuning of the chart object
    var chart = {
        // Data to populate chart
        data: {
            x: 'x',
            columns: [],
            types: {},
            groups: [['Total Emp Take', 'Daily Total']]
        },
        // Adjust the stlyes of the axis's
        axis: {
            x: {
                label: {
                    text: 'Day\'s Worked',
                    position: 'outer-left',
                },
                type: 'timeseries',
                tick:{
                    format: '%a-%d-%b',
                    rotate: 10
                }
            },
          y: {
            label: {
              text: 'Money Made',
              position: 'outer-middle'
            },
            tick: {
                format: d3.format('$'),
            }
          }
        },
        // Chart Padding
        padding:{
            bottom: 40
        },
        // Tooltip Formatting
        tooltip: {
            format: {
                name: function (name, ratio, id, i){ return name + " made:";},
                value: function (value, ratio, id) {
                    var format = d3.format('$');
                    return format(value);
                }
            }
        },
        // Show Sub Chart
        subchart: {
            show: true
        },
        legend: {
            position: 'right'
        },
        zoom: {
            rescale: true
        }  
    }
    // Laying out our variables (mostly arrays) we will fill with the subsequent data
    $scope.chart = chart;
    var dailyBP = [];
    var dailyTip = [];
    var dailyTotal = [];
    var current = null;
    var dataArr = {};
    var totalsArr = ['Total Emp Take'];

    // Populate Our chart variable with relevant Data
    // Make the "X" array more dynamic
        for(var i = 0; i < tipData.length; i++){
            for(var j = 0; j < tipData[i].days.length; j++){
                // Push each persons tip into their own array
                tipData.forEach(function(i){         
                    if(!Array.isArray(dataArr[i.name])){
                        dataArr[i.name] = [i.name];
                    }
                    dataArr[i.name].push(i.days[j].tipAmount);
                    // Just for fun I'm including another array to show a stacked bar
                    totalsArr.push(i.days[j].tipAmount + i.days[j].basePay);
                });
                // Daily Personal Tip Amounts
                if(columnArr[i] > 0){
                    // Daily Personal Base Pay
                    // dailyBP.push(tipData[i].days[j].basePay);
                }

                // Linking Array Identifier with graph line types 
                if (tipData[i].name === "Daily Total"){ 
                    chart.data.types[tipData[i].name] = 'bar';
                }else if (tipData[i].name === "Summer"){
                    chart.data.types[tipData[i].name] = 'area-spline';
                }else if(totalsArr[0] === "Total Emp Take"){
                    chart.data.types[totalsArr[0]] = 'bar';
                }else {
                    chart.data.types[tipData[i].name] = 'spline';
                }
            }
        };

        // Push each array uniquely into the Columns array
        for(var employee in dataArr){
            columnArr.push(dataArr[employee]);
        }
        columnArr.push(totalsArr);
        chart.data.columns = columnArr;
}]);

