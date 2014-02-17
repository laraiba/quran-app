// init namespaces

var LaRaiba = LaRaiba || {};
LaRaiba.Quran = LaRaiba.Quran || {};

(function(Lrq) {
    Lrq.Text = {};
    Lrq.Translations = {};
    
    Lrq.Util = {
        parseAyaId: function(ayaId) {
            var split = ayaId.split(':');

            return {
                suraIndex: split[0],
                ayaIndex: split[1]
            };
        }
    };    

})(LaRaiba.Quran);
