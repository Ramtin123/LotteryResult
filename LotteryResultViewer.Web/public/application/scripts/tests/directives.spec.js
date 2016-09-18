describe('result viewer test', function () {
    var $compile,
        $rootScope, $scope,$httpBackend, element;
    beforeEach(module('templates'));
    beforeEach(module('lotteryresult'));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$httpBackend_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $httpBackend = _$httpBackend_;
        $httpBackend
            .when('GET', '/api/LotteryPrograms')
            .respond(200, [{ Id: '1', ProgramName: 'program1' }, { Id: '2', ProgramName: 'program2' }]);
        element = $compile("<result-viewer></result-viewer>")($scope);
        $httpBackend.flush();
        $scope.$digest();
    }));

    it('loading lottery programs', function () {
        expect(element.html()).toContain("program1", "program2");
    });
    it('Loading lottery winners', function () {
        var programId = 1;
        $httpBackend
             .when('GET', `/api/LotteryWinners/${programId}`)
             .respond(200, [{ Id: '1', Name: 'Ramtin' }]);
        var selectelm = element.find('[name=lotteryprogram]').controller('ngModel');
        selectelm.$setViewValue(programId);
        $httpBackend.flush();
        $scope.$digest();
        expect(element.html()).toContain("Ramtin");
    });

});