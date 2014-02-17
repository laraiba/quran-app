(function(Lrq) {
    
    var _ayaLoading = false,
        _ayaDones = [],

        _translationLoading = false,
        _translationDones = [];
       
    Lrq.Metadata = {};
    
    Lrq.cache = {
        
        loadQuranText: function() {
            if (window.localStorage) {
                if (localStorage.getItem('LaRaiba.QuranText')) {
                    try {
                        Lrq.Text.Uthmani = JSON.parse(localStorage.getItem('LaRaiba.QuranText'));
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        },

        loadTranslationText: function() {
            if (window.localStorage) {
                if (localStorage.getItem('LaRaiba.TranslationText')) {
                    try {
                        LaRaiba.Quran.Translations.indonesia = JSON.parse(localStorage.getItem('LaRaiba.TranslationText'));
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        },

        storeQuranText: function(quranText) {
            if (window.localStorage) {
                try {
                    localStorage.setItem('LaRaiba.QuranText', JSON.stringify(quranText));
                } catch (e) {
                    console.log(e.message);
                }
            }
        },

        storeTranslationText: function(translationText) {
            if (window.localStorage) {
                try {
                    localStorage.setItem('LaRaiba.TranslationText', JSON.stringify(translationText));
                }
                catch (e) {
                    console.log(e.message);
                }
            }
        }
       
    };
    
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
                            Lrq.cache.storeQuranText(Lrq.Text.Uthmani);

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
                            Lrq.cache.storeTranslationText(LaRaiba.Quran.Translations.indonesia); 

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
