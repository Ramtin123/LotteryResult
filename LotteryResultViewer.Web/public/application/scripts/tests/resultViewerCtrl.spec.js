describe('resultViewerCtrl', function () {
    var $controller, $rootScope, $scope, apiServices = {}, $q, gridUiFactory,gridUiFactoryBuild, programs, winners, gridOptions, deferred, getWinners, generateController,resolve,reject,controller;
    beforeEach(module('lotteryresult'));

    beforeEach(inject(function (_$controller_, _$rootScope_, _$q_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $q = _$q_;
        
        programs = [{ Id: 1, ProgramName: 'Program1' }, { Id: 2, ProgramName: 'Program2' }];
        winners = [{ Id: 1, Name: 'Damian', ProgramId: 1 }, { Id: 2, Name: 'David', ProgramId: 1 }, { Id: 3, Name: 'Ramtin', ProgramId: 2 }];
        getWinners = (programId) => {
            return _.filter(winners, { 'ProgramId': programId })
        };

        apiServices.GetLotteryPrograms = () => { };
        spyOn(apiServices, 'GetLotteryPrograms').and.callFake(() => {
            deferred = $q.defer();
            return deferred.promise;
        });

        apiServices.GetLotteryWinners = (programId) => { };
        spyOn(apiServices, 'GetLotteryWinners').and.callFake(() => {
            deferred = $q.defer();
            return deferred.promise;
        });
        gridUiFactoryBuild=(scope, varname) => {

        };
        gridUiFactory = (data) => {
            return {
                Build: jasmine.createSpy("gridUiFactoryBuild spy")
            }
        }
        spyOn()
        generateController = () => {
            return $controller('resultViewerCtrl', { $scope: $scope, apiServices: apiServices, gridUiFactory: gridUiFactory });
        }
        controller = generateController();
        resolve=(result)=>{
            deferred.resolve(result);
            $scope.$digest();
        };
        reject=(err)=>{
            deferred.reject(err);
            $scope.$digest();
        };
    }));

    it('LotteryPrograms can be loaded successfuly', function () {
        resolve(programs);
        expect(apiServices.GetLotteryPrograms).toHaveBeenCalled();
        expect($scope.LotteryPrograms.length).toBe(programs.length);
        var [item1]=$scope.LotteryPrograms;
        expect(item1).toBe(programs[0]);
    });

    it('LotteryPrograms with error', function () {
        expect($scope.Status.Error).not.toBeDefined();
        var error={error:'error1'};
        reject(error);
        expect($scope.Status.Error).toBeDefined()
    });


    it('LoadingPrograms Status is set correctly', function () {
        expect($scope.Status.LoadingPrograms).toBe(true);
        resolve(programs);
        expect($scope.Status.LoadingPrograms).not.toBe(true);
    });   

    it('LotteryWinners can be loaded successfuly', function () {
        let programId=programs[0].Id;
        $scope.lotteryProgramChanged(programId);
        resolve(getWinners(programId));
        expect(apiServices.GetLotteryWinners).toHaveBeenCalledWith(programId);
    });  
        
});