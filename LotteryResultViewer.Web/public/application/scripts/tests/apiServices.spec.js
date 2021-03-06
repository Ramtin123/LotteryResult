﻿describe('Api services test', () => {
    var apiServices, $httpBackend, locationCode,thenFns,errorMessage;
    beforeEach(module('lotteryresult'));
    beforeEach(inject(($injector, _apiServices_) => {
        var errorMessage={err:'Error1'}
        apiServices = _apiServices_;
        $httpBackend = $injector.get('$httpBackend');
        thenFns={
            success:(result)=>{},
            error:(err)=>{}
        };

    }));
    it('Test GetLotteryPrograms', (done) => {
        $httpBackend
            .when('GET', '/api/LotteryPrograms')
            .respond(200, ['program1', 'program2']);
        apiServices.GetLotteryPrograms().then((result) => {
            expect(result.length).toBe(2);
            let [item1,item2] =result;
            expect(item2).toBe('program2');
            done();
        });
        $httpBackend.flush();
    });
    it('Test GetLotteryWinners', (done) => {
        var programId = 123;
        $httpBackend
             .when('GET', `/api/LotteryWinners/${programId}`)
             .respond(200, ['w1', 'w2','w3']);
        apiServices.GetLotteryWinners(programId).then((result) => {
            let [item1,item2,item3] =result;
            expect(result.length).toBe(3);
            expect(item2).toBe('w2');
            done();
        });
        $httpBackend.flush();
    });

    it('GetLotteryPrograms can pass error', (done) => {
        $httpBackend
            .when('GET', '/api/LotteryPrograms')
            .respond(500,errorMessage );
        spyOn(thenFns,'error');
        apiServices.GetLotteryPrograms().then(thenFns.success,thenFns.error).finally(()=>{
            expect(thenFns.error).toHaveBeenCalled();
            done();
        });
        $httpBackend.flush();
       
    });

    it('GetLotteryWinners can pass error', (done) => {
        var programId = 123;
        $httpBackend
             .when('GET', `/api/LotteryWinners/${programId}`)
              .respond(500,errorMessage );
        spyOn(thenFns,'error');
        apiServices.GetLotteryWinners(programId).then(thenFns.success,thenFns.error).finally(()=>{
            expect(thenFns.error).toHaveBeenCalled();
            done();
        });
        $httpBackend.flush();
    });




});