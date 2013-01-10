
var $ticker = $('#news-ticker').newsTicker({
      debug: true
    , animationType: 'scroll'
});

console.log($ticker);

describe('jQuery.newsTicker', function() {

    it('getConfg', function() {
        expect($ticker.getConfig().debug).toBeTruthy();
        expect($ticker.getConfig().scrollStep).toEqual(5);
        expect($ticker.getConfig().scrollSecond).toEqual(0.07);
        expect($ticker.getConfig().interval).toEqual(2000);
        expect($ticker.getConfig().animationType).toEqual('scroll');
        expect($ticker.getConfig().classNamePrefix).toEqual('jq-news-ticker-');
    });
});


