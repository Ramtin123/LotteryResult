describe('resultViewerCtrl', function () {
    var $controller, $rootScope, $scope, apiServices = {}, $q, gridUiFactory, programs, winners, gridOptions, deferred, getWinners, generateController,resolve,reject;
    beforeEach(module('lotteryresult'));

    beforeEach(inject(function (_$controller_, _$rootScope_, _$q_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $q = _$q_;
        deferred = $q.defer();
        programs = [{ Id: 1, ProgramName: 'Program1' }, { Id: 2, ProgramName: 'Program2' }];
        winners = [{ Id: 1, Name: 'Damian', ProgramId: 1 }, { Id: 2, Name: 'David', ProgramId: 1 }, { Id: 3, Name: 'Ramtin', ProgramId: 2 }];
        getWinners = (programId) => {
            return _.filter(winners, { 'ProgramId': programId })
        };

        apiServices.GetLotteryPrograms = () => { };
        spyOn(apiServices, 'GetLotteryPrograms').and.callFake(() => {
            return deferred.promise;
        });

        apiServices.GetLotteryWinners = (programId) => { };
        
        gridUiFactory = (data) => {
            return {
                Build: (scope, varname) => {

                }
            }

        }
        generateController = () => {
            return $controller('resultViewerCtrl', { $scope: $scope, apiServices: apiServices, gridUiFactory: gridUiFactory });
        }
        resolve=(result)=>{
            deferred.resolve(result);
            $scope.$digest();
        };
        reject=(err)=>{
            deferred.reject(err);
            $scope.$digest();
        };
    }));

    it('resultViewerCtrl was initiated successfuly', function () {
        var ctrl = generateController();
        resolve(programs);
        expect(apiServices.GetLotteryPrograms).toHaveBeenCalled();
        expect($scope.LotteryPrograms.length).toBe(programs.length);
        var [item1]=$scope.LotteryPrograms;
        expect(item1).toBe(programs[0]);
    });

        
        
});