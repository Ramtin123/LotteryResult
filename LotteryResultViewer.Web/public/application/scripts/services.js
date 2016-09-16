(function (module) {
    module.factory('apiServices', ['$http', '$q', '$cookies', function ($http, $q, $cookies) {
        function login(username, password, location) {
            ///authenticate
            var deferred = $q.defer();
            $http.post("/authenticate", JSON.stringify({ username: username, password: password, location: location }))
                .then(function (result) {
                    //$cookies.put('location', location);  TODO
                    $cookies.put('token', result.data.token);
                    _parameters.location = location;
                    deferred.resolve(result.data.success);
                },
                function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }


        function _movedOutRentChanges() {
            var deferred = $q.defer();
            var locationId = localStorage.getItem('LocationId');
            $http.get((locationId === 'all' ? "/api/MovedOutRentChanges/all" : "/api/MovedOutRentChanges"))
                .then(function (result) {
                    _.map(result.data, function (item) {
                        item.WL = item.W + ',' + item.L;
                        item.Area = item.W * item.L;
                        return item;
                    });
                    deferred.resolve(result.data);
                },
                function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }
        
        function _remainsOrLeftAfterRentIncrease() {
            var deferred = $q.defer();
            var locationId = localStorage.getItem('LocationId');
            $http.get((locationId === 'all' ? "/api/RemainsOrLeftAfterRentIncrease/all" : "/api/RemainsOrLeftAfterRentIncrease"))
                .then(function (result) {
                    _.map(result.data, function (item) {
                        item.WL = item.W + ',' + item.L;
                        item.Area = item.W * item.L;
                        return item;
                    });
                    deferred.resolve(result.data);
                },
                function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function _movedOutRentChangesPerTime(dateRange) {
            var deferred = $q.defer();
            var locationId = localStorage.getItem('LocationId');
            $http.get((locationId === 'all' ? "/api/moveOutRentChangesPerTime/all" : "/api/moveOutRentChangesPerTime"), dateRange)
                .then(function (result) {
                    deferred.resolve(result.data);
                },
                function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function _locations() {
            var deferred = $q.defer();
            $http.get("/api/Lookup/Locations")
                .then(function (result) {
                    deferred.resolve(result.data);
                },
                function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        return {
            Login: login,
            MovedOutRentChanges: _movedOutRentChanges,
            MovedOutRentChangesPerTime: _movedOutRentChangesPerTime,
            RemainsOrLeftAfterRentIncrease:_remainsOrLeftAfterRentIncrease,
            Locations: _locations
        }
    }]);

    module.factory('gridUIFactory', ['uiGridConstants', function (uiGridConstants) {
        function filter(filtertype, options) {
            if (filtertype === 'Range') {
                return [
                    {
                        condition: uiGridConstants.filter.GREATER_THAN,
                        placeholder: 'greater than'
                    },
                    {
                        condition: uiGridConstants.filter.LESS_THAN,
                        placeholder: 'less than'
                    }];
            }
            else if (filtertype === 'Dropdown') {
                return { selectOptions: [], type: uiGridConstants.filter.SELECT };
            }
            else if (filtertype === 'SliderMenuItem') {
                return function (cb) {
                    this.title = 'Color Range';
                    this.icon = 'ui-grid-icon-info-circled';
                    this.action = function () {
                        cb(this.context.col);
                    };
                }
            }
        }
        return {
            Filter: filter
        }
    }]);

    module.factory('colorRangeManager', [function () {
        function colorRangeManager() {
            this.ColorRanges = {};
        }
        function _column(columnName, list) {
            var self = this;
            this.columnName = columnName;
            var min = _.minBy(list, columnName)[columnName];
            var max = _.maxBy(list, columnName)[columnName];
            this.slider = {
                min: 0,
                max: 0,
                options: {
                    floor: min,
                    ceil: max
                }
            };
            this.cellClasscb = function (grid, row, col, rowRenderIndex, colRenderIndex) {
                var cellValue = Number(grid.getCellValue(row, col));
                if (cellValue && self.slider.min != self.slider.max && cellValue >= self.slider.min && cellValue <= self.slider.max) {
                    return 'grid-cell-colorslider-selected';
                }
                return '';
            };
        }
        colorRangeManager.prototype.AddOrGetColumn = function (columnName, list) {
            if (this.ColorRanges.hasOwnProperty(columnName)) {
                return this.ColorRanges[columnName];
            }
            this.ColorRanges[columnName] = new _column(columnName, list);
            return this.ColorRanges[columnName];
        }
        colorRangeManager.prototype.GetColumn = function (columnName) {
            return this.ColorRanges[columnName];
        }
        return colorRangeManager;
    }]);

    module.factory('timeFrameFactory', [function () {
        function timeFrameCbFactory($scope, fns) {
            return function (result) {
                $scope.calculatorFuncs=fns;
                var LocationId = localStorage.getItem('LocationId');
                if (LocationId !== 'all') {
                    $scope.dateRange = {};
                    setupTimeFrame(result, null, null, $scope, fns);
                    $scope.dateRangeChanged = function () {
                        setupTimeFrame(result, $scope.dateRange.From, $scope.dateRange.To, $scope, fns);
                    }
                }
                else{
                    $scope.list=result;
                }
            }
        }
        function setupTimeFrame(list, from, to, $scope, fns) {
            function compareDateRange(date1, date2) {
                var date1Parts = date1.split('/');
                var date1Y = date1Parts[0];
                var date1M = (date1Parts[1].length > 1 ? date1Parts[1] : '0' + date1Parts[1]);
                date1 = date1Y + '/' + date1M;
                var date2Parts = date2.split('/');
                var date2Y = date2Parts[0];
                var date2M = (date2Parts[1].length > 1 ? date2Parts[1] : '0' + date2Parts[1]);
                date2 = date2Y + '/' + date2M;
                if (date1 > date2) {
                    return 1;
                }
                else if (date1 < date2) {
                    return -1;
                }
                else {
                    return 0;
                }
            }
            if (!list || list.length < 1) return;
            $scope.labels = [];
            $scope.data = [];
            $scope.dateRangeList = [];
            for (i = 0; i < fns.length; i++) {
                $scope.data.push([]);
            }

            var data = [];
            list.forEach(function (item) {
                var YM = item.Y1 + '/' + item.M1;
                $scope.dateRangeList.push(YM);
                if ((!from || compareDateRange(from, YM) <= 0) && (!to || compareDateRange(to, YM) >= 0)) {
                    $scope.labels.push(YM);
                    for (i = 0; i < fns.length; i++) {
                        $scope.data[i].push(fns[i](item));
                    }
                }
            });
            // $scope.data = [data];
        }
        return {
            SetupTimeFrame:setupTimeFrame,
            TimeFrameCbFactory:timeFrameCbFactory
        }
    }]);

})(angular.module('districtmanagerapp'));