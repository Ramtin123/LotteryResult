(function (module) {
    module.directive('resultViewer', [function () {
            return {
                restrict: 'EA',
                scope:true,
                templateUrl: 'public/application/templates/_resultViewer.html',
                controller: 'resultViewerCtrl'
            }
        }
    ]);
    
})(angular.module('lotteryresult'));