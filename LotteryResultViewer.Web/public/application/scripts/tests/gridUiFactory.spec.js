describe('griUiFactory test', () => {
    var data,scope,name,optionsName,apiName;
    beforeEach(module('lotteryresult'));
    beforeEach(inject((_gridUiFactory_) => {
        data = ['item1', 'item2', 'item3'];
        scope = {};
        name = 'test';
        optionsName=`${name}Options`;
        apiName=`${name}Api`;
        _gridUiFactory_(data).Build(scope, name);
    }));
    it('it can generate options properly', () => {
        expect(scope[optionsName]).toBeDefined();
        expect(scope[optionsName].data).toBeDefined();
        expect(scope[optionsName].data.length).toBe(data.length);
        var [result1,result2,result3]=scope[optionsName].data;
        expect(result1).toBe(data[0]);
    });
    it('it can generate Api properly', () => {
        var gridapi=()=>{};
        scope[optionsName].onRegisterApi(gridapi);
        expect(scope[apiName]).toBeDefined();
        expect(typeof scope[apiName]).toBe('function');
    });
    it('it can generate columnDefs properly', () => {
        let columnDefs=scope[optionsName].columnDefs;
        expect(columnDefs).toBeDefined();
        expect(_.some(columnDefs,{'name':'Name'})).toBeDefined();
        expect(_.some(columnDefs,{'field':'Name'})).toBeDefined();
    });
});