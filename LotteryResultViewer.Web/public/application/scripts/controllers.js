
(function (module) {
    //var list = [];
    //var sliderMenuItem;
    //var columnDefsFactory;
    //var columnDefRegisterRangeFilter;
    //var columnDefRegisterDropdownFilter;
    //var columnDefCellFilter;
    //var sliderMenuItem;
    //var colorRangeManager;
    //var columnDefRegisterColorSlider;
    //var columnDefRoundAggregate;
    //var columnDefBuilder;

    //function gridReportBuilder($scope, gridUIFactory, ColorRangeManager, reportName, apiService, next) {
    //    columnDefRegisterColorSlider = function (columndef) {
    //        columndef.menuItems = [sliderMenuItem];
    //        columndef.cellClass = colorRangeManager.AddOrGetColumn(columndef['name'], $scope.gridOptions.data).cellClasscb;
    //    }

    //    columnDefRoundAggregate = function (columndef) {
    //        columndef.customTreeAggregationFinalizerFn = function (aggregation) {
    //            aggregation.rendered = aggregation.type + ' : ' + aggregation.value.toFixed(2);
    //        }
    //    }

    //    columnDefBuilder = function (columndef, fns) {
    //        if (!fns) return;
    //        fns.forEach(function (fn) {
    //            fn(columndef);
    //        });
    //        return columndef;
    //    }

    //    columnDefRegisterRangeFilter = function (columndef) {
    //        columndef.filters = gridUIFactory.Filter('Range');
    //    }

    //    columnDefRegisterDropdownFilter = function (columndef) {
    //        columndef.filter = gridUIFactory.Filter('Dropdown');
    //    }

    //    columnDefCellFilter = function (columndef) {
    //        columndef.filter = gridUIFactory.Filter('Dropdown');
    //        columndef.type = 'date';
    //        columndef.cellFilter = 'date:\'MM/dd/yyyy\'';
    //    }

    //    sliderMenuItem = new (gridUIFactory.Filter('SliderMenuItem'))(function (column) {
    //        $scope.slider = colorRangeManager.GetColumn(column.field).slider;
    //        $scope.Status.ColorRangerVisible = true;
    //        angular.element(document.getElementsByClassName('grid')[0]).css('height', '80%');
    //    });

    //    colorRangeManager = new ColorRangeManager();

    //    $scope.gridSetting = {
    //        groupBy: ''
    //    };

    //    $scope.gridOptions = {
    //        enableGridMenu: true,
    //        enableFiltering: true,
    //        showColumnFooter: true,
    //        // exporterMenuPdf: false,
    //        exporterCsvFilename: reportName + '.csv',
    //        exporterPdfDefaultStyle: { fontSize: 9 },
    //        exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
    //        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
    //        exporterPdfHeader: { text: "My Header", style: 'headerStyle' },
    //        exporterPdfFooter: function (currentPage, pageCount) {
    //            return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
    //        },
    //        exporterPdfCustomFormatter: function (docDefinition) {
    //            docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
    //            docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
    //            return docDefinition;
    //        },
    //        exporterPdfOrientation: 'portrait',
    //        exporterPdfPageSize: 'LETTER',
    //        exporterPdfMaxGridWidth: 500,
    //        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
    //        columnDefs: [],
    //        onRegisterApi: function (gridApi) {
    //            $scope.gridApi = gridApi;
    //        }
    //    };

    //    $scope.Status = {
    //        Loading: true,
    //        Error: '',
    //        ColorRangerVisible: false
    //    };

    //    $scope.CloseColorRanger = function () {
    //        $scope.Status.ColorRangerVisible = false;
    //        angular.element(document.getElementsByClassName('grid')[0]).css('height', '90%');
    //    }


    //    apiService().then(function (result) {
    //        $scope.gridOptions.data = result;
    //        list = angular.copy(result);
    //        $scope.gridOptions.columnDefs = columnDefsFactory(result);
    //        $scope.$on("slideEnded", function () {
    //            $scope.gridOptions.columnDefs = columnDefsFactory($scope.gridOptions.data);
    //            $scope.$apply();
    //        });
    //        if (typeof next === 'function') next(result);
    //    }, function (error) {
    //        $scope.Status.Error = error;
    //    }).finally(function () {
    //        $scope.Status.Loading = false;
    //    });
    //}


    module.controller('MainCtrl', ['$scope', function ($scope) {
        $scope.data = {
            Name:'Ramtin'
        };
        //apiServices.Locations().then(function (result) {
        //    $scope.Locations = result;
        //    if (!$scope.data.LocationId) {
        //        $scope.data.LocationId = _.head(result).key;
        //        localStorage.setItem('LocationId', $scope.data.LocationId);
        //    }
        //    $route.reload();
        //});
        //$scope.LocationChanged = function (locationCode) {
        //    localStorage.setItem('LocationId', locationCode);
        //    $route.reload();
        //};
    }]);

    //module.controller('chartMoveOutAvgIncreaseCtrl', ['$scope', 'apiServices', 'timeFrameFactory', function ($scope, apiServices, timeFrameFactory) {
    //    $scope.series = ['Average Increase'];
    //    $scope.locationId = localStorage.getItem('LocationId');
    //    function calcFn(item) {
    //        return item.AvgIncrease;
    //    }
    //    apiServices.MovedOutRentChangesPerTime().then(timeFrameFactory.TimeFrameCbFactory($scope, [calcFn]));
    //}]);

    //module.controller('chartMoveOutTotalIncreaseCtrl', ['$scope', 'apiServices', 'timeFrameFactory', function ($scope, apiServices, timeFrameFactory) {
    //    $scope.series = ['Total Increase'];
    //    $scope.locationId = localStorage.getItem('LocationId');
    //    var sum = 0;
    //    function calcFn(item) {
    //        sum += item.AvgIncrease;
    //        return sum.toFixed(2);
    //    }
    //    apiServices.MovedOutRentChangesPerTime().then(timeFrameFactory.TimeFrameCbFactory($scope, [calcFn]));
    //}]);



    //module.controller('MovedOutRentChangesCtrl', ['$scope', 'apiServices', 'gridUIFactory', 'uiGridConstants', 'colorRangeManager', 'uiGridGroupingConstants', function ($scope, apiServices, gridUIFactory, uiGridConstants, ColorRangeManager, uiGridGroupingConstants) {

    //    var list = [];

    //    $scope.gridSetting = {
    //        groupBy: ''
    //    };

    //    $scope.movedOutRentChangesOptions = {
    //        enableGridMenu: true,
    //        enableFiltering: true,
    //        showColumnFooter: true,
    //        // exporterMenuPdf: false,
    //        exporterCsvFilename: 'moveoutRentChanges.csv',
    //        exporterPdfDefaultStyle: { fontSize: 9 },
    //        exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
    //        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
    //        exporterPdfHeader: { text: "My Header", style: 'headerStyle' },
    //        exporterPdfFooter: function (currentPage, pageCount) {
    //            return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
    //        },
    //        exporterPdfCustomFormatter: function (docDefinition) {
    //            docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
    //            docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
    //            return docDefinition;
    //        },
    //        exporterPdfOrientation: 'portrait',
    //        exporterPdfPageSize: 'LETTER',
    //        exporterPdfMaxGridWidth: 500,
    //        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
    //        columnDefs: [],
    //        onRegisterApi: function (gridApi) {
    //            $scope.gridApi = gridApi;
    //        }
    //    };

    //    $scope.Status = {
    //        Loading: true,
    //        Error: '',
    //        ColorRangerVisible: false
    //    };

    //    $scope.CloseColorRanger = function () {
    //        $scope.Status.ColorRangerVisible = false;
    //        angular.element(document.getElementsByClassName('grid')[0]).css('height', '90%');
    //    }

    //    $scope.GroupByChanged = function (value) {
    //        var WLColumn = _.find($scope.movedOutRentChangesOptions.columnDefs, { name: 'WL' });
    //        if (value) {
    //            WLColumn.visible = true;
    //            $scope.gridApi.grouping.groupColumn('UnitType');
    //            $scope.gridApi.grouping.groupColumn('WL');
    //            $scope.gridApi.grouping.aggregateColumn('FinalRate', uiGridGroupingConstants.aggregation.AVG);
    //            $scope.gridApi.grouping.aggregateColumn('LatestRateIncrease', uiGridGroupingConstants.aggregation.AVG);
    //            $scope.gridApi.grouping.aggregateColumn('PERCIncrease', uiGridGroupingConstants.aggregation.AVG);
    //            $scope.gridApi.grouping.aggregateColumn('DaysTillMoveOut', uiGridGroupingConstants.aggregation.AVG);
    //            $scope.gridApi.grouping.aggregateColumn('DaysToScheduleChange', uiGridGroupingConstants.aggregation.AVG);
    //            $scope.gridApi.grouping.aggregateColumn('NumChanges', uiGridGroupingConstants.aggregation.AVG);
    //            //$scope.gridApi.grouping.aggregateColumn('AvgIncrease', uiGridGroupingConstants.aggregation.AVG);
    //            //$scope.gridApi.grouping.aggregateColumn('AvgPercIncrease', uiGridGroupingConstants.aggregation.AVG);
    //            $scope.gridApi.grouping.aggregateColumn('TotalIncrease', uiGridGroupingConstants.aggregation.AVG);
    //            $scope.gridApi.grouping.aggregateColumn('TotalPercIncrease', uiGridGroupingConstants.aggregation.AVG);
    //            $scope.gridApi.grouping.aggregateColumn('IncreasePerYear', uiGridGroupingConstants.aggregation.AVG);
    //            //$scope.gridApi.grouping.aggregateColumn('AvgIncrease', uiGridGroupingConstants.aggregation.AVG);
    //            $scope.gridApi.grouping.aggregateColumn('MaxIncrease', uiGridGroupingConstants.aggregation.AVG);
    //            $scope.gridApi.grouping.aggregateColumn('MaxPercIncrease', uiGridGroupingConstants.aggregation.AVG);
    //        }
    //        else {
    //            WLColumn.visible = false;
    //        }
    //    };

    //    $scope.favoritFilters = {
    //        favorit1: false
    //    };

    //    $scope.$watch('favoritFilters.favorit1', function (newvalue, oldvalue) {
    //        if (newvalue !== oldvalue) {
    //            if (newvalue === true) {
    //                $scope.movedOutRentChangesOptions.data = _.filter($scope.movedOutRentChangesOptions.data, function (item) {
    //                    return item.DaysTillMoveOut <= 64 || (item.DaysToScheduleChange >= -15 && item.DaysToScheduleChange);
    //                });
    //            }
    //            else {
    //                $scope.movedOutRentChangesOptions.data = angular.copy(list);
    //            }
    //        }
    //    });

    //    var sliderMenuItem = new (gridUIFactory.Filter('SliderMenuItem'))(function (column) {
    //        $scope.slider = colorRangeManager.GetColumn(column.field).slider;
    //        $scope.Status.ColorRangerVisible = true;
    //        angular.element(document.getElementsByClassName('grid')[0]).css('height', '80%');
    //    });
    //    var colorRangeManager = new ColorRangeManager();

    //    var columnDefRegisterColorSlider = function (columndef) {
    //        columndef.menuItems = [sliderMenuItem];
    //        columndef.cellClass = colorRangeManager.AddOrGetColumn(columndef['name'], $scope.movedOutRentChangesOptions.data).cellClasscb;
    //    }

    //    var columnDefRegisterRangeFilter = function (columndef) {
    //        columndef.filters = gridUIFactory.Filter('Range');
    //    }

    //    var columnDefRegisterDropdownFilter = function (columndef) {
    //        columndef.filter = gridUIFactory.Filter('Dropdown');
    //    }

    //    var columnDefCellFilter = function (columndef) {
    //        columndef.filter = gridUIFactory.Filter('Dropdown');
    //        columndef.type = 'date';
    //        columndef.cellFilter = 'date:\'MM/dd/yyyy\'';
    //    }

    //    var columnDefRoundAggregate = function (columndef) {
    //        columndef.customTreeAggregationFinalizerFn = function (aggregation) {
    //            aggregation.rendered = aggregation.type + ' : ' + aggregation.value.toFixed(2);
    //        }
    //    }

    //    var columnDefBuilder = function (columndef, fns) {
    //        if (!fns) return;
    //        fns.forEach(function (fn) {
    //            fn(columndef);
    //        });
    //        return columndef;
    //    }

    //    var columnDefsFactory = function (result) {
    //        return [
    //            { name: 'Name', width: 250 },
    //            { name: 'Unit', width: 100 },
    //            columnDefBuilder({ name: 'UnitType', width: 100 }, [columnDefRegisterDropdownFilter]),
    //            columnDefBuilder({ name: 'W', width: 100 }, [columnDefRegisterColorSlider, columnDefRegisterRangeFilter]),
    //            columnDefBuilder({ name: 'L', width: 100 }, [columnDefRegisterColorSlider, columnDefRegisterRangeFilter]),
    //            columnDefBuilder({ field: 'Area', name: 'Area', aggregationType: uiGridConstants.aggregationTypes.avg, width: 100 }, [columnDefRegisterColorSlider, columnDefRegisterRangeFilter]),
    //            { name: 'WL', width: 100, visible: false },
    //            columnDefBuilder({ name: 'DateMovedOut', width: 200 }, [columnDefRegisterRangeFilter, columnDefCellFilter]),
    //            columnDefBuilder({ name: 'DaysMovedIn', width: 150 }, [columnDefRegisterColorSlider, columnDefRegisterRangeFilter]),
    //            columnDefBuilder({ name: 'FinalRate', displayName: 'FinalRate($)', width: 150 }, [columnDefRegisterColorSlider, columnDefRegisterRangeFilter, columnDefRoundAggregate]),
    //            columnDefBuilder({ name: 'LatestRateIncrease', displayName: 'LatestRateIncrease($)', width: 150 }, [columnDefRegisterColorSlider, columnDefRegisterRangeFilter, columnDefRoundAggregate]),
    //            columnDefBuilder({ name: 'DaysTillMoveOut', width: 150 }, [columnDefRegisterColorSlider, columnDefRegisterRangeFilter, columnDefRoundAggregate]),
    //            columnDefBuilder({ name: 'DaysToScheduleChange', width: 150 }, [columnDefRegisterColorSlider, columnDefRegisterRangeFilter, columnDefRoundAggregate]),
    //            columnDefBuilder({ name: 'NumChanges', width: 150 }, [columnDefRegisterColorSlider, columnDefRegisterRangeFilter, columnDefRoundAggregate]),
    //            columnDefBuilder({ name: 'PERCIncrease', displayName: 'Rent Increase(%)', width: 150, cellTemplate: '<div class="ui-grid-cell-contents">{{ COL_FIELD}}%</div>' }, [columnDefRegisterColorSlider, columnDefRegisterRangeFilter, columnDefRoundAggregate]),
    //            // columnDefBuilder({ name: 'MinIncrease', width: 150 }, [columnDefRegisterColorSlider, columnDefRegisterRangeFilter]),
    //            // columnDefBuilder({ name: 'MinPercIncrease', width: 150, cellTemplate: '<div class="ui-grid-cell-contents">{{ COL_FIELD}}%</div>' }, [columnDefRegisterColorSlider, columnDefRegisterRangeFilter]),
    //            columnDefBuilder({ name: 'MaxIncrease', displayName: 'MaxIncrease($)', width: 150 }, [columnDefRegisterColorSlider, columnDefRegisterRangeFilter, columnDefRoundAggregate]),
    //            columnDefBuilder({ name: 'MaxPercIncrease', displayName: 'MaxPercIncrease(%)', width: 150, cellTemplate: '<div class="ui-grid-cell-contents">{{ COL_FIELD}}%</div>' }, [columnDefRegisterColorSlider, columnDefRegisterRangeFilter, columnDefRoundAggregate]),
    //            //columnDefBuilder({ name: 'AvgIncrease', width: 150 }, [columnDefRegisterColorSlider, columnDefRegisterRangeFilter, columnDefRoundAggregate]),
    //            //columnDefBuilder({ name: 'AvgPercIncrease', width: 150, cellTemplate: '<div class="ui-grid-cell-contents">{{ COL_FIELD}}%</div>' }, [columnDefRegisterColorSlider, columnDefRegisterRangeFilter, columnDefRoundAggregate]),
    //            columnDefBuilder({ name: 'TotalIncrease', displayName: 'TotalIncrease($)', width: 150 }, [columnDefRegisterColorSlider, columnDefRegisterRangeFilter, columnDefRoundAggregate]),
    //            columnDefBuilder({ name: 'TotalPercIncrease', displayName: 'TotalPercIncrease(%)', width: 150, cellTemplate: '<div class="ui-grid-cell-contents">{{ COL_FIELD}}%</div>' }, [columnDefRegisterColorSlider, columnDefRegisterRangeFilter, columnDefRoundAggregate]),
    //            columnDefBuilder({ name: 'IncreasePerYear', displayName: 'IncreasePerYear($)', width: 150 }, [columnDefRegisterColorSlider, columnDefRegisterRangeFilter, columnDefRoundAggregate]),
    //            columnDefBuilder({ name: 'dSchedRentStrt', width: 150 }, [columnDefRegisterRangeFilter, columnDefCellFilter,]),
    //            columnDefBuilder({ name: 'dcSchedRent', width: 150 }, [columnDefRegisterColorSlider, columnDefRegisterRangeFilter]),
    //        ];
    //    }

    //    apiServices.MovedOutRentChanges().then(function (result) {
    //        $scope.movedOutRentChangesOptions.data = result;
    //        list = angular.copy(result);
    //        $scope.movedOutRentChangesOptions.columnDefs = columnDefsFactory(result);
    //        $scope.$on("slideEnded", function () {
    //            $scope.movedOutRentChangesOptions.columnDefs = columnDefsFactory($scope.movedOutRentChangesOptions.data);
    //            $scope.$apply();
    //        });
    //        _.find($scope.movedOutRentChangesOptions.columnDefs, { name: 'UnitType' }).filter.selectOptions = _.chain(result).map(function (item) {
    //            return {
    //                value: item.UnitType,
    //                label: item.UnitType
    //            };
    //        }).uniqBy('value').value();
    //    }, function (error) {
    //        $scope.Status.Error = error;
    //    }).finally(function () {
    //        $scope.Status.Loading = false;
    //    });


    //}]);

    //module.controller('RemainsOrLeftAfterRentIncreaseCtrl', ['$scope', 'apiServices', 'gridUIFactory', 'uiGridConstants', 'colorRangeManager', 'uiGridGroupingConstants', function ($scope, apiServices, gridUIFactory, uiGridConstants, ColorRangeManager, uiGridGroupingConstants) {
    //    function fillFilterDropDowns(result) {
    //        _.find($scope.gridOptions.columnDefs, { name: 'UnitType' }).filter.selectOptions = _.chain(result).map(function (item) {
    //            return {
    //                value: item.UnitType,
    //                label: item.UnitType
    //            };
    //        }).uniqBy('value').value();

    //        _.find($scope.gridOptions.columnDefs, { name: 'MovedOutBetween64DaysOfIncrease' }).filter.selectOptions = _.chain(result).map(function (item) {
    //            return {
    //                value: item.MovedOutBetween64DaysOfIncrease,
    //                label: item.MovedOutBetween64DaysOfIncrease
    //            };
    //        }).uniqBy('value').value();
            
    //         _.find($scope.gridOptions.columnDefs, { name: 'MovedOutBetween15DaysOfScheduled' }).filter.selectOptions = _.chain(result).map(function (item) {
    //            return {
    //                value: item.MovedOutBetween15DaysOfScheduled,
    //                label: item.MovedOutBetween15DaysOfScheduled
    //            };
    //        }).uniqBy('value').value();
    //    }
    //    gridReportBuilder($scope, gridUIFactory, ColorRangeManager, 'RemainsOrLeftAfterRentIncrease', apiServices.RemainsOrLeftAfterRentIncrease, fillFilterDropDowns);
    //    $scope.gridOptions.showColumnFooter = false;
    //    columnDefsFactory = function (result) {
    //        return [
    //            { name: 'Name', width: 250 },
    //            columnDefBuilder({ name: 'UnitType', width: 100 }, [columnDefRegisterDropdownFilter]),
    //            columnDefBuilder({ name: 'W', width: 100 }, [columnDefRegisterColorSlider, columnDefRegisterRangeFilter]),
    //            columnDefBuilder({ name: 'L', width: 100 }, [columnDefRegisterColorSlider, columnDefRegisterRangeFilter]),
    //            columnDefBuilder({ name: 'dcOldRate', displayName: 'OldRate($)', width: 150 }, [columnDefRegisterColorSlider, columnDefRegisterRangeFilter]),
    //            columnDefBuilder({ name: 'dcNewRate', displayName: 'NewRate($)', width: 150 }, [columnDefRegisterColorSlider, columnDefRegisterRangeFilter]),
    //            columnDefBuilder({ name: 'IncreaseAmount', displayName: 'IncreaseAmount($)', width: 150 }, [columnDefRegisterColorSlider, columnDefRegisterRangeFilter]),
    //            columnDefBuilder({ name: 'IncreasePerc', displayName: 'Rent Increase(%)', width: 150, cellTemplate: '<div class="ui-grid-cell-contents">{{ COL_FIELD}}%</div>' }, [columnDefRegisterColorSlider, columnDefRegisterRangeFilter]),
    //            columnDefBuilder({ name: 'dcSchedRent', displayName: 'SchedRent($)', width: 150 }, [columnDefRegisterColorSlider, columnDefRegisterRangeFilter]),
    //            columnDefBuilder({ name: 'DateOfChange', width: 200 }, [columnDefRegisterRangeFilter, columnDefCellFilter]),
    //            columnDefBuilder({ name: 'dMovedIn', displayName: 'Date MovedIn', width: 200 }, [columnDefRegisterRangeFilter, columnDefCellFilter]),
    //            columnDefBuilder({ name: 'dMovedOut', displayName: 'Date MovedOut', width: 200 }, [columnDefRegisterRangeFilter, columnDefCellFilter]),
    //            columnDefBuilder({ name: 'dSchedRentStrt', width: 200 }, [columnDefRegisterRangeFilter, columnDefCellFilter]),
    //            columnDefBuilder({ name: 'DaysInUnitAsAtRentChange', width: 150 }, [columnDefRegisterColorSlider, columnDefRegisterRangeFilter]),
    //            columnDefBuilder({ name: 'MovedOutBetween64DaysOfIncrease', width: 200 }, [columnDefRegisterDropdownFilter]),
    //            columnDefBuilder({ name: 'MovedOutBetween15DaysOfScheduled', width: 200 }, [columnDefRegisterDropdownFilter])
    //        ];
    //    }
    //}]);


})(angular.module('lotteryresult'));