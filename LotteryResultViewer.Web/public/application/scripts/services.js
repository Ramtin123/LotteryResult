(function (module) {
    module.factory('apiServices', ['$http', '$q', function ($http, $q) {
       
        function _getLotteryPrograms() {
            var deferred = $q.defer();
            $http.get("/api/LotteryPrograms")
                .then(function (result) {
                    deferred.resolve(result.data);
                },
                function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function _getLotteryWinners(lotteryProgramId) {
            var deferred = $q.defer();
            $http.get("/api/LotteryWinners/" + lotteryProgramId)
                .then(function (result) {
                    deferred.resolve(result.data);
                },
                function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }
        
        return {
            GetLotteryPrograms: _getLotteryPrograms,
            GetLotteryWinners: _getLotteryWinners,
        }
    }]);

    module.factory('gridUiFactory', [function () {
        var _data;
        function _factory(data) {
            function _build($scope, scopeVar) {
                $scope[(scopeVar ? scopeVar : 'grid') + 'Options'] = {
                    data: data,
                    enableFiltering: true,
                    enableSorting: true,
                    onRegisterApi: function ($scope) {
                        $scope[(scopeVar ? scopeVar : 'grid') + 'Api'] = gridApi;
                    },
                    columnDefs: [
                        { name: "Name", field: "Name", width: 150 }
                    ]
                }
            }
            return {
                Build:_build
            }
        }
        
        return _factory;
    }]);

})(angular.module('lotteryresult'));