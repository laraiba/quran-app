(function(Lrq) {
    
    var _ayaLoading = false,
        _ayaDones = [],

        _translationLoading = false,
        _translationDones = [];

    Lrq.Data = {
        loadAya: function(ayaId, done) {
            if (!Lrq.Text.Uthmani || !Lrq.Text.Uthmani[ayaId]) {
            
                // TODO : improve this code to be more stable when connection problem occurs
                if (!_ayaLoading) {
                    _ayaLoading = true;
                    
                    $.ajax({
                        url: 'js/quran-uthmani.js',
                        type: "GET",
                        dataType: "script",
                        cache: true,
                        success: function(data) {
                            Lrq.Data.cache.storeQuranText(Lrq.Text.Uthmani);

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
        },

        loadTranslation: function(ayaId, done) {
            if (!LaRaiba.Quran.Translations.indonesia || !LaRaiba.Quran.Translations.indonesia[ayaId]) {
            
                if (!_translationLoading) {
                    _translationLoading = true;

                    $.ajax({
                        url: 'js/quran-translation-id.js',
                        type: "GET",
                        dataType: "script",
                        cache: true,
                        success: function(data) {
                            Lrq.Data.cache.storeTranslationText(LaRaiba.Quran.Translations.indonesia);

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

        }
    };

})(LaRaiba.Quran);
