
var $ticker1 = $('#news-ticker-1').newsTicker({
    animationType: 'scroll',
    debug: true
});
console.log($ticker1);
describe('jQuery.newsTicker - 1', function() {
    it('getConfg', function() {
        expect($ticker1.getConfig().debug).toBeTruthy();
        expect($ticker1.getConfig().scrollStep).toEqual(5);
        expect($ticker1.getConfig().scrollSecond).toEqual(0.07);
        expect($ticker1.getConfig().interval).toEqual(2000);
        expect($ticker1.getConfig().animationType).toEqual('scroll');
        expect($ticker1.getConfig().classNamePrefix).toEqual('jq-news-ticker-');
    });
});


/*
var hoge = function() {
    return a + 1;
};

describe('Other Tests', function() {

    it('threw hoge exception', function() {
        //expect(hoge).toThrow();
    });

    it('threw hoge exception', function() {
        expect(hoge).toThrow();
        expect(hoge).toThrow('Can\'t find variable: a');
    });

    it('threw hoge exception', function() {
        try {
            hoge();
        } catch (e) {
            expect(e.message).toEqual('Can\'t find variable: a');
        }
    });

    it('threw hoge exception', function() {
        try {
            hoge();
        } catch (e) {
            expect(e.message).toMatch('Can\'t find variable');
        }
    });

    it('threw fuga exception', function() {
        try {
            fuga;
        } catch (e) {
            expect(e.message).toEqual('Can\'t find variable: fuga');
        }
    });

    it('threw moga exception', function() {
        //expect(moga).toThrow();
    });

    //console.log(hoge());
    //console.log(fuga);
});
*/

