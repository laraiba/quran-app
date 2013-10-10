// init namespace
var LaRaiba = LaRaiba || {};
LaRaiba.Quran = LaRaiba.Quran || {};

(function(Lr) {
    var Lrq = Lr.Quran;
    
    Lrq.Text = Lrq.Text || {};
    Lrq.Translations = Lrq.Translations || {};
    Lrq.Util = Lrq.Util || {};
    
    Lrq.Util.parseAyaId = function(ayaId) {
        var split = ayaId.split(':');
        
        return {
            suraIndex: split[0],
            ayaIndex: split[1]
        };
    };
    

})(LaRaiba);
