(function (module) {
    module.controller('resultViewerCtrl', ['$scope', 'apiServices', 'gridUiFactory', function ($scope, apiServices, gridUiFactory) {
        $scope.Status = {};
        $scope.data = {};
        (function LoadLotteryPrograms() {
            $scope.Status.LoadingPrograms = true;
            apiServices.GetLotteryPrograms().then(function (result) {
                $scope.LotteryPrograms = result;
            }, function () {
                $scope.Status.Error = 'LoadingPrograms';
            }).finally(function () {
                $scope.Status.LoadingPrograms = false;
            });
        })();
        $scope.lotteryProgramChanged = function (programId) {
            if (!programId) return;
            $scope.Status.LoadingWinners = true;
            apiServices.GetLotteryWinners(programId).then(function (result) {
                gridUiFactory(result).Build($scope, 'LotteryWinners');
            }, function () {
                $scope.Status.Error = 'LoadingWinners';
            }).finally(function () {
                $scope.Status.LoadingWinners = false;
            });

        }


    }]);
})(angular.module('lotteryresult'));