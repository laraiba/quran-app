(function(Lr, $) {
    var Lrq = Lr.Quran;
    
    Lrq.ViewManager.AyaViewManager = (function() {
    
        var ayaViewModelTable = [];
        
        var ayaViewModelLoad = function() {
            
            var ayaViewModel = this;
            
            Lrq.Data.loadAya(this.id, function(aya) {
                ayaViewModel.arabicText = Lrq.ViewManager.Util.normalizeArabicText(aya.arabicText);
                ayaViewModel.suraNumber = aya.suraNumber;
                ayaViewModel.ayaNumber = aya.ayaNumber;

                ayaViewModel.renderArabicText();
            });

            Lrq.Data.loadTranslation(this.id, function(ayaTranslation) {
                ayaViewModel.translationText = ayaTranslation.text;

                ayaViewModel.renderTranslationText();
            });

            ayaViewModel.render();
        };
        
        var renderViewModel = function() {
            
            if (!this.renderTo) {
                return;
            }
            
            var ayaId = this.id;
            
            this.element = $('<li class="verse clearfix"><p class="arabic-text"></p><p class="translation"><span class="aya-number"></span> <span class="translation-text"></span></p></li>');
            this.element.appendTo(this.renderTo);
            
            this.renderArabicText();
            this.renderTranslationText();
        };

        var renderViewModelArabicText = function() { 
            if (!this.element) {
                return;
            }
            this.element.children('.arabic-text').html(this.arabicText);
            
            if (this.ayaNumber) {
                this.element.find('.aya-number').html(this.ayaNumber + '.');
            }
            this.element.attr('data-aya-index', this.ayaNumber);
            this.element.attr('data-sura-index', this.suraNumber);
        };
        
        var renderViewModelTranslationText = function() { 
            if (!this.element) {
                return;
            }
            this.element.find('.translation-text').html(this.translationText);
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
                    render: renderViewModel,
                    renderArabicText: renderViewModelArabicText,
                    renderTranslationText: renderViewModelTranslationText
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
                    suraData.tname + ' ( <span class="sura-tname arabic-text">' + suraData.name + '</span> ) ' + '</h2>' +
                    '<h3 class="sura-ename">' + suraData.ename + '</h3>' +
                    '<p class="clearfix"><span class="sura-ayas">' + suraData.type + ', ' + suraData.ayas + ' aya</span>' + 
                    '<span class="sura-order">Revelation order : ' + suraData.order + '</span>' +
                    '</p></div>'
                );
                
                $header.appendTo($quranContent);
                
                var $quran = $('<ul class="quran"></ul>');
                $quran.on('click', 'li', function(e) {
                    $quran.find('li.active').removeClass('active');
                    $quran.find('.aya-toolbar').remove();
                    $quran.find('.aya-select-info').remove();
                    $(this).addClass('active');
                    $(this).append('<div class="aya-toolbar"><br class="clear" /><a class="select-aya" href="#">Select</a> | <a class="fb-share-button" href="https://www.facebook.com/sharer/sharer.php?u=' + escape('http://la-raiba.com/verse.php?i=' + $(this).attr('data-sura-index') + ':' + $(this).attr('data-aya-index')) + '" data-type="icon_link" target="_blank">Share on facebook</a></div>');
                });

                $quran.on('click', '.select-aya', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    $quran.find('.aya-select-info').remove();
                    var $verse = $(this).parentsUntil('.verse').parent();

                    var suraIndex = $verse.attr('data-sura-index');
                    var ayaIndex = $verse.attr('data-aya-index');
                    var $translationText = $(this).parentsUntil('.verse').parent().find('.translation-text');

                    
                    $translationText.prepend('<span class="aya-select-info">"</span>');
                    $translationText.append('<span class="aya-select-info">"</span>');
                    $translationText.append(' <span class="aya-select-info">(QS ' + suraIndex + ':' + ayaIndex + ')</span><br class="aya-select-info"/><br class="aya-select-info"/><a class="aya-select-info" href="http://la-raiba.com/#/verse/' + suraIndex + ':' + ayaIndex + '">http://la-raiba.com/#/verse/' + suraIndex + ':' + ayaIndex + '</a>');

                    var range = document.createRange();
                    var node = $translationText.get(0);
                    range.setStart(node.firstChild, 0);
                    range.setEnd(node.lastChild.firstChild, node.lastChild.firstChild.length);

                    var selection = window.getSelection();
                    selection.removeAllRanges();
                    selection.addRange(range);
                });
                $quran.appendTo($quranContent);

                $quranContent.show(); 
                $('#top-navbar .sura-navigator').html('<span>' + suraData.index + '. ' + suraData.tname + ' ( <span class="sura-tname arabic-text">' + suraData.name + '</span> ) ' + '</span><span class="caret"></span>');
                
                var ayaCursor = '';
                var viewModels = [];
                for (var j = 0; j < suraData.ayas; j++) {
                    ayaCursor = suraData.index + ':' + (j + 1);
                    var viewModel = Lrq.ViewManager.AyaViewManager.getViewModel(ayaCursor);
                    viewModel.renderTo = $quran;
                    viewModels.push(viewModel);
                }
                ayaCursor = null;

                var loadViewModels = function() {
                    for (var i in viewModels) {
                        viewModels[i].load();
                    }

                    var $selectedAya = $quranContent.find('li[data-aya-index=' + ayaInfo.ayaIndex + ']');
                    $selectedAya.addClass('active');
                    
                    if (!$selectedAya || ayaInfo.ayaIndex <= 2) {
                        $('html, body').scrollTop(0);
                    } else {
                        $('html, body').scrollTop($selectedAya.offset().top - 160);
                    }
                };
                setTimeout(loadViewModels, 10);
                 
                $('#sura-picker li').removeClass('active');
                $('#sura-picker li[data-sura-index=' + this.activeSura + ']').addClass('active');
            }
        };
    
    })();

})(LaRaiba, jQuery);
