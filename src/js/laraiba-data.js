(function(Lr) {
    var Lrq = Lr.Quran;

    Lrq.Metadata = Lrq.Metadata || {};
    Lrq.Data = Lrq.Data || {};

    var _ayaLoading = false;
    var _ayaDones = [];

    var _translationLoading = false;
    var _translationDones = [];

    Lrq.Data.loadAya = function(ayaId, done) {
        if (!Lrq.Text.Uthmani || !Lrq.Text.Uthmani[ayaId]) {
            
            if (!_ayaLoading) {
                _ayaLoading = true;
                
                $.ajax({
                    url: 'js/quran-uthmani.js',
                    type: "GET",
                    dataType: "script",
                    cache: true,
                    success: function(data) {
                        for (var i = 0; i < _ayaDones.length; i++) {
                            _ayaDones[i].callback(Lrq.Text.Uthmani[_ayaDones[i].ayaId]);
                        }
                    }
                });
            }

            _ayaDones.push({"ayaId": ayaId, "callback": done});
        } else {
            done(Lrq.Text.Uthmani[ayaId]);
        }
    };
    
    Lrq.Data.loadTranslation = function(ayaId, done) {
        if (!LaRaiba.Quran.Translations.indonesia || !LaRaiba.Quran.Translations.indonesia[ayaId]) {
            
            if (!_translationLoading) {
                _translationLoading = true;

                $.ajax({
                    url: 'js/quran-translation-id.js',
                    type: "GET",
                    dataType: "script",
                    cache: true,
                    success: function(data) {
                        for (var i = 0; i < _translationDones.length; i++) {
                            _translationDones[i].callback(LaRaiba.Quran.Translations.indonesia[_translationDones[i].ayaId]);
                        }
                    }
                });
            }

            _translationDones.push({"ayaId": ayaId, "callback": done});
        } else {
            done(LaRaiba.Quran.Translations.indonesia[ayaId]);
        }
    };


})(LaRaiba);
