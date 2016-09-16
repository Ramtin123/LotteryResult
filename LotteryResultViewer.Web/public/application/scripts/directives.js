(function (module) {
    module.directive('timeFrameChart', ['timeFrameFactory',
        function (timeFrameFactory) {
            return {
                restrict: 'EA',
                scope:{
                  chartData:'=',
                  series:'=',
                  caluclatorFuncs:'='
                } ,
                link:function(scope, element, attrs) {
                    timeFrameFactory.SetupTimeFrame(scope.chartData.data,null,null,scope,scope.caluclatorFuncs);
                },
                templateUrl: 'public/application/templates/_timeFrameChart.html'
            }
        }
    ]);
    
     module.directive('bubbleMessage', [
        function () {
            return {
                restrict: 'EA',
                scope:{
                  messagetype:'@',
                  popseconds:'@'  
                },
                link:function(scope, element, attrs) {
                    
                },
                transclude:true,
                replace: true,
                templateUrl: 'public/application/templates/_bubbleMessage.html'
            }
        }
    ]);
    
    
    
})(angular.module('districtmanagerapp'));