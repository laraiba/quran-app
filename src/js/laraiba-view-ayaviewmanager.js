(function(Lr, $) {
    var Lrq = Lr.Quran;
    
    Lrq.ViewManager.AyaViewManager = (function() {
    
        var ayaViewModelTable = [];
        
        var ayaViewModelLoad = function() {
            var aya = Lrq.Text.Uthmani[this.id];
            
            this.arabicText = Lrq.ViewManager.Util.normalizeArabicText(aya.arabicText);
            this.suraNumber = aya.suraNumber;
            this.ayaNumber = aya.ayaNumber;
            this.translationText = Lrq.Translations.indonesia[this.id].text;
            this.render();
        };
        
        var renderViewModel = function() {
            
            if (!this.renderTo) {
                return;
            }
            
            var ayaId = this.id;
            
            this.element = $('<li class="verse clearfix" data-aya-index="' + this.ayaNumber + '"><p class="arabic-text"></p><p class="translation"></p></li>');
            this.element.appendTo(this.renderTo);
            
            this.element.children('.arabic-text').html(this.arabicText);
            this.element.children('.translation').html(this.ayaNumber + '. ' + this.translationText);
        };
        
        var suraIndex = Lrq.Metadata.suras;
        var ayaId = '';
        for (i = 0; i < suraIndex.length; i++) {
            for (var j = 0; j < suraIndex[i].ayas; j++) {
                ayaId = suraIndex[i].index + ':' + (j + 1);
                ayaViewModelTable[ayaId] = {
                    id: ayaId,
                    suraNumber: false,
                    ayaNumber: false,
                    arabicText: false,
                    translationText: false,
                    load: ayaViewModelLoad,
                    renderTo: false,
                    render: renderViewModel
                };
            }
        }
        ayaId = null;
        
        return {
            getViewModel: function(ayaId) {
                return ayaViewModelTable[ayaId];
            },
            showAya: function(ayaId) {
                var ayaInfo = Lrq.Util.parseAyaId(ayaId);
                this.activeSura = ayaInfo.suraIndex;
                var suraData  = Lrq.Metadata.suras[ayaInfo.suraIndex-1];
                
                $('.content').hide();
                
                var $quranContent = $('#quran-content');
                $quranContent.html('');
                
                var $header = $('<div class="sura-header"><h2 class="sura-name">' + suraData.index + '. ' +
                    suraData.tname + ' ( <span class="sura-tname">' + suraData.name + '</span> ) ' + '</h2>' +
                    '<h3 class="sura-ename">' + suraData.ename + '</h3>' +
                    '<p class="clearfix"><span class="sura-ayas">' + suraData.type + ', ' + suraData.ayas + ' aya</span>' + 
                    '<span class="sura-order">Revelation order : ' + suraData.order + '</span>' +
                    '</p></div>'
                );
                
                $header.appendTo($quranContent);
                
                var $quran = $('<ul class="quran"></ul>');
                $quran.on('click', 'li', function(e) {
                    e.preventDefault();
                    $quran.find('li.active').removeClass('active');
                    $(this).addClass('active');
                });
                $quran.appendTo($quranContent);
                
                var ayaCursor = '';
                for (var j = 0; j < suraData.ayas; j++) {
                    ayaCursor = suraData.index + ':' + (j + 1);
                    var viewModel = Lrq.ViewManager.AyaViewManager.getViewModel(ayaCursor);
                    viewModel.renderTo = $quran;
                    viewModel.load();
                }
                ayaCursor = null;
                
                $quranContent.fadeIn();
                
                $('#top-navbar .sura-navigator').html(suraData.index + '. ' + suraData.tname + ' ( ' + suraData.name + ' )');
                $('#sura-picker li').removeClass('active');
                $('#sura-picker li[data-sura-index=' + this.activeSura + ']').addClass('active');
                
                var $selectedAya = $quranContent.find('li[data-aya-index=' + ayaInfo.ayaIndex + ']');
                
                if (!$selectedAya || ayaInfo.ayaIndex <= 2) {
                    $('body').scrollTop(0);
                } else {
                    $('body').scrollTop($selectedAya.offset().top - 36);
                }
            }
        };
    
    })();

})(LaRaiba, jQuery);
