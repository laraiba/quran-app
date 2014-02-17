(function(Lrq) {
    
    var _ayaLoading = false,
        _ayaDones = [],

        _translationLoading = false,
        _translationDones = [];
       
    Lrq.Data.cache = {
        
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
     
})(LaRaiba.Quran);
