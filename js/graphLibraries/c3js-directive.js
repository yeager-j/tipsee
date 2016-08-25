angular.module('gridshore.c3js.chart', []);
angular.module('gridshore.c3js.chart')
    .directive('chartAxes', ChartAxes);

function ChartAxes () {
    var axesLinker = function (scope, element, attrs, chartCtrl) {
        var x = attrs.valuesX;
        if (x) {
            chartCtrl.addXAxisValues(x);
        }

        var xs = attrs.valuesXs;
        var xsValues = {};
        if (xs) {
            xsItems = xs.split(",");
            for (var xsI in xsItems) {
                xsItem = xsItems[xsI].split(":");
                xsValues[xsItem[0]] = xsItem[1];
            }
            chartCtrl.addXSValues(xsValues);
        }

        var y = attrs.y;
        var y2 = attrs.y2;
        var yAxis = {};
        if (y2) {
            var items = y2.split(",");
            for (var item in items) {
                yAxis[items[item]] = "y2";
            }
            if (y) {
                var yItems = y.split(",");
                for (var yItem in yItems) {
                    yAxis[yItems[yItem]] = "y";
                }
            }
            chartCtrl.addYAxis(yAxis);
        }
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {},
        "replace": true,
        "link": axesLinker
    };
};

angular.module('gridshore.c3js.chart')
    .directive('chartAxis', ChartAxis);

function ChartAxis () {
    var axisLinker = function (scope, element, attrs, chartCtrl) {
        var rotate = attrs.axisRotate;
        if (rotate) {
            chartCtrl.rotateAxis();
        }
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {},
        "transclude": true,
        "template": "<div ng-transclude></div>",
        "replace": true,
        "link": axisLinker
    };
};

angular.module('gridshore.c3js.chart')
    .directive('chartAxisX', ChartAxisX);

function ChartAxisX () {
    var axisLinker = function (scope, element, attrs, chartCtrl) {
        var position = attrs.axisPosition;
        var label = attrs.axisLabel;

        var axis = {"label": {"text": label, "position": position}};

        var paddingLeft = attrs.paddingLeft;
        var paddingRight = attrs.paddingRight;
        if (paddingLeft || paddingRight) {
            paddingLeft = (paddingLeft) ? paddingLeft : 0;
            paddingRight = (paddingRight) ? paddingRight : 0;
            axis.padding = {"left": parseInt(paddingLeft), "right": parseInt(paddingRight)};
        }
        var height=attrs.axisHeight;
        if (height) {
            axis.height = parseInt(height);
        }
        
        if (attrs.show === 'false') {
            axis.show = false;
        }
        if (attrs.axisLocaltime === 'true') {
            axis.localtime=true;
        }
        var max=attrs.axisMax;
        if (max) {
            axis.max=max;
        }
        var min=attrs.axisMin;
        if (min) {
            axis.min=min;
        }
        var type=attrs.axisType;
        if (type) {
            axis.type=type;   
        }
        chartCtrl.addAxisProperties('x', axis);

        var xFormat = attrs.axisXFormat;
        if (xFormat) {
            chartCtrl.setXFormat(xFormat);
        }
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {},
        "transclude": true,
        "template": "<div ng-transclude></div>",
        "replace": true,
        "link": axisLinker
    };
}
angular.module('gridshore.c3js.chart')
    .directive('chartAxisXTick', ChartAxisXTick);

function ChartAxisXTick() {
    var tickLinker = function (scope, element, attrs, chartCtrl) {
        var tick = {};

        var count = attrs.tickCount;
        if (count) {
            tick.count = count;
        }

        var culling = attrs.tickCulling;
        if (culling) {
            culling = angular.lowercase(culling);
            if (culling === 'true') {
                tick.culling = true;
            }
            else if (culling === 'false') {
                tick.culling = false;
            }
        }

        var cullingMax = attrs.tickCullingMax;
        if (cullingMax) {
            tick.culling = { max: parseInt(cullingMax) }
        }

        var multiline = attrs.tickMultiline;
        if (multiline) {
            multiline = angular.lowercase(multiline);
            if (multiline === 'true') {
                tick.multiline = true;
            }
            else if (multiline === 'false') {
                tick.multiline = false;
            }
        }

        var centered = attrs.tickCentered;
        if (centered) {
            centered = angular.lowercase(centered);
            if (centered === 'true') {
                tick.centered = true;
            }
            else if (centered === 'false') {
                tick.centered = false;
            }
        }

        var rotate = attrs.tickRotate;
        if (rotate) {
            tick.rotate = rotate;
        }

        var fit = attrs.tickFit;
        if (fit) {
            fit = angular.lowercase(fit);
            if (fit === 'true') {
                tick.fit = true;
            }
            else if (fit === 'false') {
                tick.fit = false;
            }
        }

        var tickValues = attrs.tickValues;
        if (tickValues) {
            if (tickValues) {
                if (tickValues.indexOf(',') > -1) {
                    tick.values = tickValues.split(',');
                } else {
                    tick.values = tickValues;
                }
            }
        }

        var outer = attrs.tickOuter;
        if (outer) {
            outer = angular.lowercase(outer);
            if (outer === 'true') {
                tick.outer = true;
            }
            else if (outer === 'false') {
                tick.outer = false;
            }
        }

        var format = attrs.format;
        if (format) {
            tick.format = d3.format(format);
        }

        var formatTime = attrs.formatTime;
        if (formatTime) {
            tick.format = d3.time.format(formatTime);
        }

        chartCtrl.addXTick(tick);

        if (attrs.tickFormatFunction) {
            chartCtrl.addXTickFormatFunction(scope.tickFormatFunction());
        }

    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {
            "tickFormatFunction": "&"
        },
        "replace": true,
        "link": tickLinker
    };
}

angular.module('gridshore.c3js.chart')
    .directive('chartAxisY', ChartAxisY);

function ChartAxisY() {
    var axisLinker = function (scope, element, attrs, chartCtrl) {
        var id = attrs.axisId;
        var position = attrs.axisPosition;
        var label = attrs.axisLabel;

        id = ( id == undefined ? 'y' : id );

        var axis = {"label": {"text": label, "position": position}};
        if (attrs.show === 'false') {
            axis.show = false;
        } else if (id === 'y2') {
            axis.show = true;
        }
        var paddingTop = attrs.paddingTop;
        var paddingBottom = attrs.paddingBottom;
        if (paddingTop || paddingBottom) {
            paddingTop = (paddingTop) ? paddingTop : 0;
            paddingBottom = (paddingBottom) ? paddingBottom : 0;
            axis.padding = {"top": parseInt(paddingTop), "bottom": parseInt(paddingBottom)};
        }
        var axisMax = attrs.axisMax;
        var axisMin = attrs.axisMin;
        if (axisMax) {
            axis.max = parseInt(axisMax);
        }
        if (axisMin) {
            axis.min = parseInt(axisMin);
        }
        if (attrs.axisInverted === 'true') {
            axis.inverted=true;
        }
        if (attrs.axisInner === 'true') {
            axis.inner=true;
        }
        var axisCenter = attrs.axisCenter;
        if (axisCenter) {
            axis.center = parseInt(axisCenter);
        }

        chartCtrl.addAxisProperties(id, axis);
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {},
        "replace": true,
        "link": axisLinker
    };
}
angular.module('gridshore.c3js.chart')
    .directive('chartAxisYTick', ChartAxisYTick);

function ChartAxisYTick() {
    var tickLinker = function (scope, element, attrs, chartCtrl) {
        var tick = {};

        var count = attrs.tickCount;
        if (count) {
            tick.count = count;
        }

        var outer = attrs.tickOuter;
        if (outer) {
            outer = angular.lowercase(outer);
            if (outer === 'true') {
                tick.outer = true;
            }
            else if (outer === 'false') {
                tick.outer = false;
            }
        }

        var tickValues = attrs.tickValues;
        if (tickValues) {
            if (tickValues.indexOf(',') > -1) {
                tick.values = tickValues.split(',');
            } else {
                tick.values = tickValues;
            }
        }

        var format = attrs.tickFormat;
        if (format) {
            tick.format = d3.format(format);
        }

        chartCtrl.addYTick(tick);

        if (attrs.tickFormatFunction) {
            chartCtrl.addYTickFormatFunction(scope.tickFormatFunction());
        }
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {
            "tickFormatFunction": "&"
        },
        "replace": true,
        "link": tickLinker
    };
}
angular.module('gridshore.c3js.chart')
    .directive('chartBar', ChartBar);

function ChartBar() {
    var barLinker = function (scope, element, attrs, chartCtrl) {
        var bar = {};
        if (attrs.width) {
            bar.width = parseInt(attrs.width);
        }
        if (attrs.ratio) {
            if (!bar.width) {
                bar.width = {};
            }
            bar.width.ratio = parseFloat(attrs.ratio);
        }
        if (attrs.zerobased) {
            bar.zerobased = (attrs.zerobased === 'true');
        }
        chartCtrl.addBar(bar);
    };

    return {
        require: '^c3chart',
        restrict: 'E',
        scope: {},
        replace: true,
        link: barLinker
    };
}
angular.module('gridshore.c3js.chart')
    .directive('c3chart', ['$timeout', function(timeout) {
        return C3Chart(timeout);
    }]);

function C3Chart ($timeout) {
    var chartLinker = function (scope, element, attrs, chartCtrl) {
        var paddingTop = attrs.paddingTop;
        var paddingRight = attrs.paddingRight;
        var paddingBottom = attrs.paddingBottom;
        var paddingLeft = attrs.paddingLeft;
        var sortData = attrs.sortData;
        var transitionDuration = attrs.transitionDuration;
        var initialConfig = attrs.initialConfig;

        if (paddingTop) {
            chartCtrl.addPadding('top', paddingTop);
        }
        if (paddingRight) {
            chartCtrl.addPadding('right', paddingRight);
        }
        if (paddingBottom) {
            chartCtrl.addPadding('bottom', paddingBottom);
        }
        if (paddingLeft) {
            chartCtrl.addPadding('left', paddingLeft);
        }
        if (sortData) {
            chartCtrl.addSorting(sortData);
        }
        if (attrs.labelsFormatFunction) {
            chartCtrl.addDataLabelsFormatFunction(scope.labelsFormatFunction());
        }
        if (attrs.onZoomEndFunction) {
            chartCtrl.addOnZoomEndFunction(scope.onZoomEndFunction());
        }
        if (attrs.subchartOnBrushFunction){
          chartCtrl.addSubchartOnBrushFunction(scope.subchartOnBrushFunction());          
        }         
        if (attrs.callbackFunction) {
            chartCtrl.addChartCallbackFunction(scope.callbackFunction());
        }
        if (transitionDuration) {
            chartCtrl.addTransitionDuration(transitionDuration);
        }
        if (initialConfig) {
            chartCtrl.addInitialConfig(initialConfig);
        }
        // Trick to wait for all rendering of the DOM to be finished.
        $timeout(function () {
            chartCtrl.showGraph();
        });
    };

    return {
        "restrict": "E",
        "controller": "ChartController",
        "scope": {
            "bindto": "@bindtoId",
            "showLabels": "@showLabels",
            "labelsFormatFunction": "&",
            "onZoomEndFunction": "&",            
            "showSubchart": "@showSubchart",
            "subchartOnBrushFunction": "&",
            "enableZoom": "@enableZoom",
            "chartData": "=chartData",
            "chartColumns": "=chartColumns",
            "chartX": "=chartX",
            "callbackFunction": "&",
            "emptyLabel": "@emptyLabel"
        },
        "template": "<div><div id='{{bindto}}'></div><div ng-transclude></div></div>",
        "replace": true,
        "transclude": true,
        "link": chartLinker
    };
}

angular.module('gridshore.c3js.chart')
    .directive('chartColors', ChartColors);

function ChartColors () {
    var colorsLinker = function (scope, element, attrs, chartCtrl) {
        var pattern = attrs.colorPattern;
        if (pattern) {
            chartCtrl.addColorPatterns(pattern.split(","));
        }

        var thresholds = attrs.thresholds;
        if(thresholds){
            chartCtrl.addColorThresholds(thresholds.split(","));
        }
        
        if (attrs.colorFunction) {
            chartCtrl.addColorFunction(scope.colorFunction());
        }
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {
            "colorFunction": "&"
        },
        "replace": true,
        "link": colorsLinker
    };
}

angular.module('gridshore.c3js.chart')
    .directive('chartColumn', ChartColumn);

function ChartColumn () {
    var columnLinker = function (scope, element, attrs, chartCtrl) {
        var column = attrs.columnValues.split(",");
        column.unshift(attrs.columnId);
        chartCtrl.addColumn(column, attrs.columnType, attrs.columnName, attrs.columnColor);
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {},
        "replace": true,
        "link": columnLinker
    };
}

angular.module('gridshore.c3js.chart')
/**
 * @controller
 */
    .controller('ChartController', ChartController);

ChartController.$inject = ['$scope', '$timeout'];
function ChartController($scope, $timeout) {
    this.showGraph = showGraph;

    this.addColumn = addColumn;
    this.addAxisProperties = addAxisProperties;
    this.rotateAxis = rotateAxis;
    this.addPadding = addPadding;
    this.addSorting = addSorting;
    this.addSize = addSize;
    this.addEmptyLabel = addEmptyLabel;

    this.addColorPatterns = addColorPatterns;
    this.addColorThresholds = addColorThresholds;
    this.addColorFunction = addColorFunction;

    this.addGrid = addGrid;
    this.addGridLine = addGridLine;
    this.hideGridFocus = hideGridFocus;

    this.addLegend = addLegend;

    this.addTooltip = addTooltip;
    this.addTooltipTitleFormatFunction = addTooltipTitleFormatFunction;
    this.addTooltipNameFormatFunction = addTooltipNameFormatFunction;
    this.addTooltipValueFormatFunction = addTooltipValueFormatFunction;
    this.addTooltipContentFormatFunction = addTooltipContentFormatFunction;

    this.addYAxis = addYAxis;
    this.addYTick = addYTick;
    this.addYTickFormatFunction = addYTickFormatFunction;

    this.addXAxisValues = addXAxisValues;
    this.addXTick = addXTick;
    this.addXTickFormatFunction = addXTickFormatFunction;
    this.addXType = addXType;
    this.addXSValues = addXSValues;

    this.addChartCallbackFunction = addChartCallbackFunction;
    this.addInitialConfig = addInitialConfig;

    this.addDataLabelsFormatFunction = addDataLabelsFormatFunction;
    this.addTransitionDuration = addTransitionDuration;
    
    this.addSubchartOnBrushFunction = addSubchartOnBrushFunction;    
    this.addOnZoomEndFunction = addOnZoomEndFunction;    

    this.addGauge = addGauge;
    this.addGaugeLabelFormatFunction = addGaugeLabelFormatFunction;

    this.addBar = addBar;

    this.addLine = addLine;

    this.addRegion = addRegion;

    this.addPie = addPie;
    this.addPieLabelFormatFunction = addPieLabelFormatFunction;

    this.addDonut = addDonut;
    this.addDonutLabelFormatFunction = addDonutLabelFormatFunction;

    this.addGroup = addGroup;

    this.addPoint = addPoint;

    this.addOnInitFunction = addOnInitFunction;
    this.addOnMouseoverFunction = addOnMouseoverFunction;
    this.addOnMouseoutFunction = addOnMouseoutFunction;
    this.addOnRenderedFunction = addOnRenderedFunction;
    this.addOnResizeFunction = addOnResizeFunction;
    this.addOnResizedFunction = addOnResizedFunction;
    this.addDataOnClickFunction = addDataOnClickFunction;
    this.addDataOnMouseoverFunction = addDataOnMouseoverFunction;
    this.addDataOnMouseoutFunction = addDataOnMouseoutFunction;

    this.setXFormat = setXFormat;

    this.addSelection = addSelection;

    resetVars();

    function resetVars() {
        $scope.chart = null;
        $scope.columns = [];
        $scope.types = {};
        $scope.regions = {};
        $scope.axis = {};
        $scope.axes = {};
        $scope.padding = null;
        $scope.emptyLabel = null;
        $scope.xValues = null;
        $scope.xFormat = null;
        $scope.xsValues = null;
        $scope.xTick = null;
        $scope.yTick = null;
        $scope.names = null;
        $scope.grid = null;
        $scope.legend = null;
        $scope.tooltip = null;
        $scope.chartSize = null;
        $scope.colors = null;
        $scope.colorThresholds = null;
        $scope.gauge = null;
        $scope.jsonKeys = null;
        $scope.groups = null;
        $scope.sorting = null;
        $scope.transitionDuration = null;
        $scope.initialConfig = null;
        $scope.selection = null;
    }

    function showGraph() {
        var config = {};
        if ($scope.initialConfig) {
            config = $scope.initialConfig;
        }
        config.bindto = "#" + $scope.bindto;
        config.data = config.data || {};

        if ($scope.xValues) {
            config.data.x = $scope.xValues;
        }
        if ($scope.xsValues) {
            config.data.xs = $scope.xsValues;
        }
        if ($scope.columns) {
            config.data.columns = $scope.columns;
        }
        if ($scope.xFormat) {
            config.data.xFormat = $scope.xFormat;
        }
        config.data.types = config.data.types || $scope.types;
        config.data.axes = config.data.axes || $scope.axes;
        if ($scope.names) {
            config.data.names = $scope.names;
        }
        if ($scope.emptyLabel != null) {
            config.data.empty = {
                label: {
                    text: $scope.emptyLabel
                }
            }
        }
        if ($scope.padding != null) {
            config.padding = $scope.padding;
        }
        if ($scope.sorting != null) {
            if ($scope.sorting == "null") {
                config.data.order = null;
            } else {
                config.data.order = $scope.sorting;
            }
        }
        if ($scope.transitionDuration != null) {
            config.transition = config.transition || {};
            config.transition.duration = $scope.transitionDuration;
        }
        if ($scope.showLabels && $scope.showLabels === "true") {
            config.data.labels = true;
        }
        if ($scope.dataLabelsFormatFunction) {
            config.data.labels = config.data.labels || {};
            config.data.labels.format = $scope.dataLabelsFormatFunction;
        }
        if ($scope.groups != null) {
            config.data.groups = $scope.groups;
        }
        if ($scope.showSubchart && $scope.showSubchart === "true") {
            config.subchart = {"show": true};
        }
        if ($scope.subchartOnBrushFunction){
            config.subchart = config.subchart || {};
            config.subchart.onbrush = $scope.subchartOnBrushFunction;
        }           
        if ($scope.enableZoom && $scope.enableZoom === "true") {
            config.zoom = {"enabled": true};
        }
        if ($scope.onZoomEndFunction){
            config.zoom = config.zoom || {};
            config.zoom.onzoomend = $scope.onZoomEndFunction;
        }          
        config.axis = config.axis || $scope.axis;
        if ($scope.xTick) {
            config.axis.x.tick = $scope.xTick;
        }
        if ($scope.xTickFormatFunction) {
            config.axis.x.tick = config.axis.x.tick || {};
            config.axis.x.tick.format = $scope.xTickFormatFunction;
        }

        if ($scope.xType) {
            config.axis.x.type = $scope.xType;
        }
        if ($scope.yTick) {
            config.axis.y.tick = $scope.yTick;
        }
        if ($scope.yTickFormatFunction) {
            config.axis.y.tick = config.axis.y.tick || {};
            config.axis.y.tick.format = $scope.yTickFormatFunction;
        }

        if ($scope.grid != null) {
            config.grid = $scope.grid;
        }
        if ($scope.legend != null) {
            config.legend = $scope.legend;
        }
        if ($scope.tooltip != null) {
            config.tooltip = $scope.tooltip;
        } else {
            config.tooltip = {}
        }
        if ($scope.tooltipTitleFormatFunction) {
            config.tooltip.format = config.tooltip.format || {};
            config.tooltip.format.title = $scope.tooltipTitleFormatFunction;
        }
        if ($scope.tooltipNameFormatFunction) {
            config.tooltip.format = config.tooltip.format || {};
            config.tooltip.format.name = $scope.tooltipNameFormatFunction;
        }
        if ($scope.tooltipValueFormatFunction) {
            config.tooltip.format = config.tooltip.format || {};
            config.tooltip.format.value = $scope.tooltipValueFormatFunction;
        }

        if ($scope.tooltipContentFormatFunction) {
            config.tooltip.contents = $scope.tooltipContentFormatFunction;
        }

        if ($scope.chartSize != null) {
            config.size = $scope.chartSize;
        }

        if ($scope.colors != null) {
            // Colors per data column shoule be specified in $scope.colors
            config.data.colors = $scope.colors;
        }

        if ($scope.colorFunction) {
            config.data.color = $scope.colorFunction;
        }

        if ($scope.colorPatterns != null) {
            // The colorPatters should contain an array with color patterns
            if (config.color === undefined) {
                config.color = {};
            }
            config.color.pattern = $scope.colorPatterns;
        }

        if ($scope.colorThresholds != null) {
            if (config.color === undefined) {
                config.color = {};
            }
            config.color.threshold = {"values": $scope.colorThresholds};
        }

        if ($scope.gauge != null) {
            config.gauge = $scope.gauge;
        } else {
            config.gauge = {}
        }
        if ($scope.gaugeLabelFormatFunction) {
            config.gauge.label = config.gauge.label || {};
            config.gauge.label.format = $scope.gaugeLabelFormatFunction;
        }
        if ($scope.point != null) {
            config.point = $scope.point;
        }
        if ($scope.bar != null) {
            config.bar = $scope.bar;
        }
        if ($scope.line != null) {
            config.line = $scope.line;
        }
        if ($scope.regions != null) {
            config.data.regions = $scope.regions;
        }
        if ($scope.pie != null) {
            config.pie = $scope.pie;
        }
        if ($scope.pieLabelFormatFunction) {
            config.pie.label = config.pie.label || {};
            config.pie.label.format = $scope.pieLabelFormatFunction;
        }
        if ($scope.donut != null) {
            config.donut = $scope.donut;
        } else {
            config.donut = {}
        }
        if ($scope.donutLabelFormatFunction) {
            config.donut.label = config.donut.label || {};
            config.donut.label.format = $scope.donutLabelFormatFunction;
        }
        if ($scope.onInit != null) {
            config.oninit = $scope.onInit;
        }
        if ($scope.onMouseover != null) {
            config.onmouseover = $scope.onMouseover;
        }
        if ($scope.onMouseout != null) {
            config.onmouseout = $scope.onMouseout;
        }
        if ($scope.onRendered != null) {
            config.onrendered = $scope.onRendered;
        }
        if ($scope.onResize != null) {
            config.onresize = $scope.onResize;
        }
        if ($scope.onResized != null) {
            config.onresized = $scope.onResized;
        }
        if ($scope.dataOnClick != null) {
            config.data.onclick = function (data, element) {
                $scope.$apply(function () {
                    $scope.dataOnClick({"data": data});
                });
            };
        }
        if ($scope.dataOnMouseover != null) {
            config.data.onmouseover = function (data) {
                $scope.$apply(function () {
                    $scope.dataOnMouseover({"data": data});
                });
            };
        }
        if ($scope.dataOnMouseout != null) {
            config.data.onmouseout = function (data) {
                $scope.$apply(function () {
                    $scope.dataOnMouseout({"data": data});
                });
            };
        }
        if ($scope.selection != null) {
            config.data.selection = $scope.selection;
        }

        $scope.config = config;

        if ($scope.chartData && $scope.chartColumns) {
            $scope.$watch('chartData', function () {
                loadChartData();
            }, true);
        } else {
            $scope.chart = c3.generate($scope.config);
            if ($scope.chartCallbackFunction) {
                $scope.chartCallbackFunction($scope.chart);
            }
        }

        $scope.$on('$destroy', function () {
            $timeout(function () {
                if (angular.isDefined($scope.chart)) {
                    $scope.chart = $scope.chart.destroy();
                    resetVars();
                }
            }, 10000)
        });
    }

    function addColumn(column, columnType, columnName, columnColor) {
        $scope.columns.push(column);
        addColumnProperties(column[0], columnType, columnName, columnColor);
    }

    function addYAxis(yAxis) {
        $scope.axes = yAxis;
        if (!$scope.axis.y2) {
            $scope.axis.y2 = {"show": true};
        }
    }

    function addDataLabelsFormatFunction(dataLabelsFormatFunction) {
        $scope.dataLabelsFormatFunction = dataLabelsFormatFunction;
    }
    
    function addSubchartOnBrushFunction(subchartOnBrushFunction) {
        $scope.subchartOnBrushFunction = subchartOnBrushFunction;
    }
    
    function addOnZoomEndFunction(onZoomEndFunction) {
        $scope.onZoomEndFunction = onZoomEndFunction;
    }    

    function addChartCallbackFunction(chartCallbackFunction) {
        $scope.chartCallbackFunction = chartCallbackFunction;
    }

    function addTransitionDuration(transitionDuration) {
        $scope.transitionDuration = transitionDuration;
    }

    function addXAxisValues(xValues) {
        $scope.xValues = xValues;
    }

    function addXSValues(xsValues) {
        $scope.xsValues = xsValues;
    }

    function addAxisProperties(id, axis) {
        $scope.axis[id] = axis;
    }

    function addXTick(tick) {
        $scope.xTick = tick;
    }

    function addXTickFormatFunction(xTickFormatFunction) {
        $scope.xTickFormatFunction = xTickFormatFunction;
    }

    function addXType(type) {
        $scope.xType = type;
    }

    function addYTick(tick) {
        $scope.yTick = tick;
    }

    function addYTickFormatFunction(yTickFormatFunction) {
        $scope.yTickFormatFunction = yTickFormatFunction;
    }

    function rotateAxis() {
        $scope.axis.rotated = true;
    }

    function addEmptyLabel(text) {
        $scope.emptyLabel = text;
    }

    function addPadding(side, amount) {
        if ($scope.padding == null) {
            $scope.padding = {};
        }
        $scope.padding[side] = parseInt(amount);
    }

    function addSorting(sorting) {
        $scope.sorting = sorting;
    }

    function addGrid(axis) {
        if ($scope.grid == null) {
            $scope.grid = {};
        }
        if ($scope.grid[axis] == null) {
            $scope.grid[axis] = {};
        }
        $scope.grid[axis].show = true;
    }

    function addGridLine(axis, value, text, gridClass, position) {
        if ($scope.grid == null) {
            $scope.grid = {};
        }
        if (axis === "x") {
            if ($scope.grid.x === undefined) {
                $scope.grid.x = {};
            }
            if ($scope.grid.x.lines === undefined) {
                $scope.grid.x.lines = [];
            }
        } else {
            if ($scope.grid.y === undefined) {
                $scope.grid.y = {};
            }
            if ($scope.grid.y.lines === undefined) {
                $scope.grid.y.lines = [];
            }

        }
        var theGridLine = {};
        theGridLine.value = isNaN(+value) ? value : +value;
        theGridLine.text = text;
        if (gridClass) {
            theGridLine.class = gridClass;
        }
        if (position) {
            theGridLine.position = position;
        }
        if (axis === "y2") {
            theGridLine.axis = "y2";
            $scope.grid.y.lines.push(theGridLine);
        } else {
            $scope.grid[axis].lines.push(theGridLine);
        }
    }

    function addLegend(legend) {
        $scope.legend = legend;
    }

    function addTooltip(tooltip) {
        $scope.tooltip = tooltip;
    }

    function addTooltipTitleFormatFunction(tooltipTitleFormatFunction) {
        $scope.tooltipTitleFormatFunction = tooltipTitleFormatFunction;
    }

    function addTooltipNameFormatFunction(tooltipNameFormatFunction) {
        $scope.tooltipNameFormatFunction = tooltipNameFormatFunction;
    }

    function addTooltipValueFormatFunction(tooltipValueFormatFunction) {
        $scope.tooltipValueFormatFunction = tooltipValueFormatFunction;
    }

    function addTooltipContentFormatFunction(tooltipContentFormatFunction) {
        $scope.tooltipContentFormatFunction = tooltipContentFormatFunction;
    }

    function addSize(chartSize) {
        $scope.chartSize = chartSize;
    }

    function addColorPatterns(colors) {
        $scope.colorPatterns = colors;
    }

    function addColorThresholds(thresholds) {
        $scope.colorThresholds = thresholds;
        if ($scope.colors) {
            $scope.colors.threshold = {
                "values": $scope.colorThresholds
            }
        }
    }

    function addColorFunction(colorFunction) {
        $scope.colorFunction = colorFunction;
    }

    function addOnInitFunction(onInitFunction) {
        $scope.onInit = onInitFunction;
    }

    function addOnMouseoverFunction(onMouseoverFunction) {
        $scope.onMouseover = onMouseoverFunction;
    }

    function addOnMouseoutFunction(onMouseoutFunction) {
        $scope.onMouseout = onMouseoutFunction;
    }

    function addOnRenderedFunction(onRederedFunction) {
        $scope.onRendered = onRederedFunction;
    }

    function addOnResizeFunction(onResizeFunction) {
        $scope.onResize = onResizeFunction;
    }

    function addOnResizedFunction(onResizedFuncton) {
        $scope.onResized = onResizedFuncton;
    }

    function addDataOnClickFunction(theFunction) {
        $scope.dataOnClick = theFunction;
    }

    function addDataOnMouseoverFunction(theFunction) {
        $scope.dataOnMouseover = theFunction;
    }

    function addDataOnMouseoutFunction(theFunction) {
        $scope.dataOnMouseout = theFunction;
    }

    function addGauge(gauge) {
        $scope.gauge = gauge;
    }

    function addGaugeLabelFormatFunction(gaugeLabelFormatFunction) {
        $scope.gaugeLabelFormatFunction = gaugeLabelFormatFunction;
    }

    function addBar(bar) {
        $scope.bar = bar;
    }

    function addLine(line) {
        $scope.line = line;
    }

    function addRegion(id, intervals) {
        $scope.regions[id] = intervals;
    }

    function addPie(pie) {
        $scope.pie = pie;
    }

    function addPieLabelFormatFunction(pieLabelFormatFunction) {
        $scope.pieLabelFormatFunction = pieLabelFormatFunction;
    }

    function addDonut(donut) {
        $scope.donut = donut;
    }

    function addDonutLabelFormatFunction(donutLabelFormatFunction) {
        $scope.donutLabelFormatFunction = donutLabelFormatFunction;
    }

    function addGroup(group) {
        if ($scope.groups == null) {
            $scope.groups = [];
        }
        $scope.groups.push(group);
    }

    function addPoint(point) {
        $scope.point = point;
    }

    function hideGridFocus() {
        if ($scope.grid == null) {
            $scope.grid = {};
        }
        $scope.grid["focus"] = {"show": false};
    }

    function setXFormat(xFormat) {
        $scope.xFormat = xFormat;
    }

    function addInitialConfig(initialConfig) {
        $scope.initialConfig = initialConfig;
    }

    function addColumnProperties(id, columnType, columnName, columnColor) {
        if (columnType !== undefined) {
            $scope.types[id] = columnType;
        }
        if (columnName !== undefined) {
            if ($scope.names === null) {
                $scope.names = {};
            }
            $scope.names[id] = columnName;
        }
        if (columnColor !== undefined) {
            if ($scope.colors === null) {
                $scope.colors = {};
            }
            $scope.colors[id] = columnColor;
        }
    }

    function addSelection(selection) {
        $scope.selection = selection;
    }

    function loadChartData() {
        $scope.jsonKeys = {};
        $scope.jsonKeys.value = [];
        angular.forEach($scope.chartColumns, function (column) {
            $scope.jsonKeys.value.push(column.id);
            addColumnProperties(column.id, column.type, column.name, column.color);
        });
        if ($scope.chartX) {
            $scope.jsonKeys.x = $scope.chartX.id;
        }
        if ($scope.names) {
            $scope.config.data.names = $scope.names;
        }
        if ($scope.colors) {
            $scope.config.data.colors = $scope.colors;
        }
        if ($scope.groups) {
            $scope.config.data.groups = $scope.groups;
        }

        $scope.config.data.keys = $scope.jsonKeys;
        $scope.config.data.json = $scope.chartData;

        if (!$scope.chartIsGenerated) {
            $scope.chart = c3.generate($scope.config);
            $scope.chartIsGenerated = true;

            // Use the API as documented here to interact with the chart object
            // http://c3js.org/reference.html#api
            if ($scope.chartCallbackFunction) {
                $scope.chartCallbackFunction($scope.chart);
            }
        } else {
            $scope.config.data.unload = true;
            $scope.chart.load($scope.config.data);
        }
    }
}
angular.module('gridshore.c3js.chart')
    .directive('chartDonut', ChartDonut);

function ChartDonut() {
    var donutLinker = function (scope, element, attrs, chartCtrl) {
        var donut = {};
        if (attrs.showLabel) {
            donut.label = {"show": (attrs.showLabel === 'true')};
        }
        if (attrs.thresholdLabel) {
            if (!donut.label) {
                donut.label = {};
            }
            donut.label.threshold = parseFloat(attrs.thresholdLabel);
        }
        if (attrs.expand) {
            donut.expand = (attrs.expand === 'true');
        }
        if (attrs.width) {
            donut.width = parseInt(attrs.width);
        }
        if (attrs.title) {
            donut.title = attrs.title;
        }
        chartCtrl.addDonut(donut);
        if (attrs.labelFormatFunction) {
            chartCtrl.addDonutLabelFormatFunction(scope.labelFormatFunction());
        }
    };

    return {
        require: '^c3chart',
        restrict: 'E',
        scope: {
            "labelFormatFunction": "&"
        },
        replace: true,
        link: donutLinker
    };
}

angular.module('gridshore.c3js.chart')
    .directive('chartEvents', ChartEvents);

function ChartEvents() {
    var eventsLinker = function (scope, element, attrs, chartCtrl) {
        if (attrs.onInit) {
            chartCtrl.addOnInitFunction(scope.onInit);
        }
        if (attrs.onMouseover) {
            chartCtrl.addOnMouseoverFunction(scope.onMouseover);
        }
        if (attrs.onMouseout) {
            chartCtrl.addOnMouseoutFunction(scope.onMouseout);
        }
        if (attrs.onResize) {
            chartCtrl.addOnResizeFunction(scope.onResize);
        }
        if (attrs.onResized) {
            chartCtrl.addOnResizedFunction(scope.onResized);
        }
        if (attrs.onRendered) {
            chartCtrl.addOnRenderedFunction(scope.onRendered);
        }
        if (attrs.onClickData) {
            chartCtrl.addDataOnClickFunction(scope.onClickData);
        }
        if (attrs.onMouseoverData) {
            chartCtrl.addDataOnMouseoverFunction(scope.onMouseoverData);
        }
        if (attrs.onMouseoutData) {
            chartCtrl.addDataOnMouseoutFunction(scope.onMouseoutData);
        }
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {
            "onInit": "&",
            "onMouseover": "&",
            "onMouseout": "&",
            "onResize": "&",
            "onResized": "&",
            "onRendered": "&",
            "onClickData": "&",
            "onMouseoverData": "&",
            "onMouseoutData": "&"
        },
        "replace": true,
        "link": eventsLinker
    };
}

angular.module('gridshore.c3js.chart')
    .directive('chartGauge', ChartGauge);

function ChartGauge () {
    var gaugeLinker = function (scope, element, attrs, chartCtrl) {
        var gauge = {};
        if (attrs.min) {
            gauge.min = parseInt(attrs.min);
        }
        if (attrs.max) {
            gauge.max = parseInt(attrs.max);
        }
        if (attrs.width) {
            gauge.width = parseInt(attrs.width);
        }
        if (attrs.units) {
            gauge.units = attrs.units
        }
        if (attrs.showLabel) {
            gauge.label = {"show": (attrs.showLabel === 'true')};
        }
        if (attrs.expand) {
            gauge.expand = (attrs.expand === 'true');
        }
        chartCtrl.addGauge(gauge);
        if (attrs.labelFormatFunction) {
            chartCtrl.addGaugeLabelFormatFunction(scope.labelFormatFunction());
        }
    };

    return {
        require: '^c3chart',
        restrict: 'E',
        scope: {
            'labelFormatFunction': "&"
        },
        replace: true,
        link: gaugeLinker
    };
}

angular.module('gridshore.c3js.chart')
    .directive('chartGrid', ChartGrid);

function ChartGrid () {
    var gridLinker = function (scope, element, attrs, chartCtrl) {
        var showX = attrs.showX;
        if (showX && showX === "true") {
            chartCtrl.addGrid("x");
        }
        var showY = attrs.showY;
        if (showY && showY === "true") {
            chartCtrl.addGrid("y");
        }
        var showY2 = attrs.showY2;
        if (showY2 && showY2 === "true") {
            chartCtrl.addGrid("y2");
        }
        var showFocus = attrs.showFocus;
        if (showFocus && showFocus === "false") {
            chartCtrl.hideGridFocus();
        }
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {},
        "replace": true,
        "link": gridLinker,
        "transclude": true,
        "template": "<div ng-transclude></div>"
    };
}
angular.module('gridshore.c3js.chart')
    .directive('chartGridOptional', ChartGridOptional);

function ChartGridOptional() {
    var gridLinker = function (scope, element, attrs, chartCtrl) {
        var axisId = attrs.axisId;
        var value = attrs.gridValue;
        var text = attrs.gridText;
        var gridClass = attrs.gridClass;
        var position = attrs.position;

        chartCtrl.addGridLine(axisId, value, text, gridClass, position);
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {},
        "replace": true,
        "link": gridLinker
    };
}

angular.module('gridshore.c3js.chart')
    .directive('chartGroup', ChartGroup);

function ChartGroup () {
    var groupLinker = function (scope, element, attrs, chartCtrl) {
        var group = attrs.groupValues.split(",");
        chartCtrl.addGroup(group);
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {},
        "replace": true,
        "link": groupLinker
    };
}

angular.module('gridshore.c3js.chart')
    .directive('chartLegend', ChartLegend);

function ChartLegend () {
    var legendLinker = function (scope, element, attrs, chartCtrl) {
        var legend = null;
        var show = attrs.showLegend;
        if (show && show === "false") {
            legend = {"show": false};
        } else {
            var position = attrs.legendPosition;
            if (position) {
                legend = {"position": position};
            }
            var inset = attrs.legendInset;
            if (inset) {
                legend = {"position":"inset","inset":{"anchor":inset}};

                var insetX = attrs.legendInsetX;
                if (insetX) {
                    legend.inset.x = parseInt(insetX);
                }
                var insetY = attrs.legendInsetY;
                if (insetY) {
                    legend.inset.y = parseInt(insetY);
                }
                var insetStep = attrs.legendInsetStep;
                if (insetStep) {
                    legend.inset.step = parseInt(insetStep);
                }
            }
        }

        if (attrs.onMouseover) {
            legend = legend || {};
            legend.item = legend.item || {};
            legend.item.onmouseover = function (data) {
                scope.$apply(function () {
                    scope.onMouseover({"data": data});
                });
            };
        }
        if (attrs.onMouseout) {
            legend = legend || {};
            legend.item = legend.item || {};
            legend.item.onmouseout = function (data) {
                scope.$apply(function () {
                    scope.onMouseout({"data": data});
                });
            };
        }
        if (attrs.onClick) {
            legend = legend || {};
            legend.item = legend.item || {};

            legend.item.onclick = function (data) {
                scope.$apply(function () {
                    scope.onClick({"data": data});
                });
            };
        }

        if (legend != null) {
            chartCtrl.addLegend(legend);
        }
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {
            "onMouseover": "&",
            "onMouseout": "&",
            "onClick": "&"
        },
        "replace": true,
        "link": legendLinker
    };
}
angular.module('gridshore.c3js.chart')
    .directive('chartLine', ChartLine);

function ChartLine() {
    var lineLinker = function (scope, element, attrs, chartCtrl) {
        var line = {};
        if (attrs.stepType) {
            line.step = line.step || {};
            line.step.type = attrs.stepType;
        }
        if (attrs.connectNull) {
            line.connectNull = (attrs.connectNull === 'true');
        }
        chartCtrl.addLine(line);
    };

    return {
        require: '^c3chart',
        restrict: 'E',
        scope: {},
        replace: true,
        link: lineLinker
    };
}


angular.module('gridshore.c3js.chart')
    .directive('chartPie', ChartPie);

function ChartPie () {
    var pieLinker = function (scope, element, attrs, chartCtrl) {
        var pie = {};
        if (attrs.showLabel) {
            pie.label = {"show": (attrs.showLabel === 'true')};
        }
        if (attrs.thresholdLabel) {
            if (!pie.label) {
                pie.label = {};
            }
            pie.label.threshold = parseFloat(attrs.thresholdLabel);
        }
        if (attrs.expand) {
            pie.expand = (attrs.expand === 'true');
        }
        chartCtrl.addPie(pie);
        if (attrs.labelFormatFunction) {
            chartCtrl.addPieLabelFormatFunction(scope.labelFormatFunction());
        }
    };

    return {
        require: '^c3chart',
        restrict: 'E',
        scope: {
            "labelFormatFunction": "&"
        },
        replace: true,
        link: pieLinker
    };
}

angular.module('gridshore.c3js.chart')
    .directive('chartPoints', ChartPoints);

function ChartPoints () {
    var pointLinker = function (scope, element, attrs, chartCtrl) {
        var point = {};
        if (attrs.showPoint) {
            point.show =  (attrs.showPoint === 'true');
        }
        if (attrs.pointExpandEnabled) {
            if (!point.focus) {
                point.focus = {"expand":{}};
            }
            point.focus.expand.enabled = (attrs.pointsFocusEnabled !== 'false');
        }
        if (attrs.pointExpandRadius) {
            if (!point.focus) {
                pie.focus = {"expand":{}};
            }
            point.focus.expand.r = parseInt(attrs.pointFocusRadius);
        }
        if (attrs.pointRadius) {
            point.r = parseInt(attrs.pointRadius);
        }
        if (attrs.pointSelectRadius) {
            point.select = {"r":parseInt(attrs.pointSelectRadius)};
        }
        chartCtrl.addPoint(point);
    };

    return {
        require: '^c3chart',
        restrict: 'E',
        scope: {},
        replace: true,
        link: pointLinker
    };
}
angular.module('gridshore.c3js.chart')
    .directive('chartRegion', ChartRegion);

function ChartRegion() {
    var regionLinker = function (scope, element, attrs, chartCtrl) {
        var style = 'dashed',
            starts = [],
            ends = [],
            intervals = [];
        if (attrs.regionStyle) {
            style = attrs.regionStyle;
        }
        if (attrs.regionStarts){
            starts = attrs.regionStarts.split(",");
        }
        if (attrs.regionEnds){
            ends = attrs.regionEnds.split(",");
        }
        if (starts.length > ends.length) {
            intervals.push({'start': starts.pop(), 'style': style});
        }
        if (starts.length < ends.length) {
            intervals.push({'end': ends.shift(), 'style': style});
        }
        starts.forEach(function (value, i) {
             intervals.push({'start': starts[i], 'end': ends[i], 'style': style});
        });
        chartCtrl.addRegion(attrs.regionId, intervals);
    };

    return {
        require: '^c3chart',
        restrict: 'E',
        scope: {},
        replace: true,
        link: regionLinker
    };
}

angular.module('gridshore.c3js.chart')
    .directive('selection', Selection);

function Selection () {
    var selectionLinker = function (scope, element, attrs, chartCtrl) {
        var enabled = attrs.enabled;
        var grouped = attrs.grouped;
        var multiple = attrs.multiple;

        if (enabled && enabled === 'true') {
            var selection = {"enabled": true};
            if (grouped && grouped === 'true') {
                selection.grouped = true;
            }
            if (multiple && multiple === 'true') {
                selection.multiple = true;
            }
            chartCtrl.addSelection(selection);
        }
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {},
        "replace": true,
        "link": selectionLinker
    };
}

angular.module('gridshore.c3js.chart')
    .directive('chartSize', ChartSize);

function ChartSize() {
    var sizeLinker = function (scope, element, attrs, chartCtrl) {
        var chartSize = null;
        var width = attrs.chartWidth;
        var height = attrs.chartHeight;
        if (width || height) {
            chartSize = {};
            if (width) {
                chartSize.width = parseInt(width);
            }
            if (height) {
                chartSize.height = parseInt(height);
            }
            chartCtrl.addSize(chartSize);
        }
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {},
        "replace": true,
        "link": sizeLinker
    };
}

angular.module('gridshore.c3js.chart')
    .directive('chartTooltip', ChartTooltip);

function ChartTooltip () {
    var tooltipLinker = function (scope, element, attrs, chartCtrl) {
        var tooltip = null;
        var show      = attrs.showTooltip;
        var hideTitle = attrs.hideTooltipTitle;
        var joined    = attrs.joinedTooltip;

        if (show && show === "false") {
            tooltip = {"show": false};
        } else {
            var grouped = attrs.groupTooltip;
            if (grouped && grouped === "false") {
                tooltip = {"grouped": false};
            }
        }

        if (joined && joined === "true") {
            tooltip = tooltip || {};
            tooltip.contents = function (d, defaultTitleFormat, defaultValueFormat, color) {
                var $$ = this, config = $$.config,
                    titleFormat = config.tooltip_format_title || defaultTitleFormat,
                    nameFormat  = config.tooltip_format_name || function (name) { return name; },
                    valueFormat = config.tooltip_format_value || defaultValueFormat,
                    text, i, title, value, name, bgcolor, CLASS;
                CLASS = {
                    tooltipContainer: 'c3-tooltip-container',
                    tooltip         : 'c3-tooltip',
                    tooltipName     : 'c3-tooltip-name'
                };
                for (i = d[0].x; i < (d[0].x + 1); i++) {
                    if (! (d[i] && (d[i].value || d[i].value === 0))) { continue; }

                    if (! text) {
                        title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                        text = "<table class='" + CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
                    }

                    value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
                    if (value !== undefined) {
                        name = nameFormat(d[i].name, d[i].ratio, d[i].id, d[i].index);
                        bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);

                        text += "<tr class='" + CLASS.tooltipName + "-" + d[i].id + "'>";
                        text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
                        text += "<td class='value'>$" + 'l' + "</td>";
                        text += "</tr>";
                    }
                }
                return text + "</table>";
            }
        }

        if (tooltip != null) {
            chartCtrl.addTooltip(tooltip);
        }
        if (attrs.titleFormatFunction) {
            chartCtrl.addTooltipTitleFormatFunction(scope.titleFormatFunction());
        }
        if (attrs.nameFormatFunction) {
            chartCtrl.addTooltipNameFormatFunction(scope.nameFormatFunction());
        }
        if (attrs.valueFormatFunction) {
            chartCtrl.addTooltipValueFormatFunction(scope.valueFormatFunction());
        }
        if (attrs.contentFormatFunction) {
            chartCtrl.addTooltipContentFormatFunction(scope.contentFormatFunction());
        }

    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {
            "valueFormatFunction": "&",
            "nameFormatFunction": "&",
            "titleFormatFunction": "&",
            "contentFormatFunction": "&"
        },
        "replace": true,
        "link": tooltipLinker
    };
}
