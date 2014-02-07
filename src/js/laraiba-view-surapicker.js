(function(Lr, $) {
    var Lrq = Lr.Quran;
    
    Lrq.ViewManager.SuraPicker = {
        init: function() {
            var $this = this;
            this.element = $('<div id="sura-picker" class="content sura-picker-content"><div><a id="sura-picker-back-btn" href="#" class="btn btn-default">&lt; Back</a></div><ul></ul><select id="select-aya"></select></div>');
            
            var suraIndex = Lrq.Metadata.suras;
            var $ul = this.element.children('ul');
            
            for (var i = 0; i < suraIndex.length; i++) {
                $('<li data-sura-index="' + suraIndex[i].index + '"><span class="sura-index">' + suraIndex[i].index + '.</span>' +
                    '<a data-sura-index="' + suraIndex[i].index + '" class="sura-ename" href="#">' + suraIndex[i].tname + '</a>' +
                    '<span class="aya-count" title="' + suraIndex[i].ayas + ' aya">' + suraIndex[i].ayas + '</span>' +
                    '<span class="sura-name">' + suraIndex[i].name + '</span>' +
                    '</li>').appendTo($ul);
            }
            
            $ul.children('li[data-sura-index=' + Lrq.ViewManager.AyaViewManager.activeSura + ']').addClass('active');
            
            this.element.on('click', '#sura-picker-back-btn', function(e) {
                e.preventDefault();
                $this.hide();
            });
            
            this.element.on('click', 'li a.sura-ename', function(e) {
                e.preventDefault();
                
                if (Lrq.ViewManager.AyaViewManager.showAya) {
                    Lrq.ViewManager.AyaViewManager.showAya($(this).attr('data-sura-index') + ':1');
                }
            });
            
            this.element.on('click', 'li', function(e) {
                e.preventDefault();
                
                if (Lrq.ViewManager.AyaViewManager.showAya) {
                    Lrq.ViewManager.AyaViewManager.showAya($(this).children('a.sura-ename').attr('data-sura-index') + ':1');
                }
            });
            
            var $triggerSelectAya;
            
            this.element.on('click', '.aya-count', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                var ayaCount = parseInt($(this).html(), 10);
                var strOptions = '';
                
                for (var i = 1; i <= ayaCount; i++) {
                    strOptions += '<option value="' + i + '">' + i + '</option>';
                }
                
                var $selectAya = $this.element.find('#select-aya');
                $selectAya.html('');
                $(strOptions).appendTo($selectAya);
                $selectAya.css('top', $(this).offset().top);
                $triggerSelectAya = $(this);
                $selectAya.focus();
            });
            
            this.element.on('change', '#select-aya', function(e) {
                var ayaId = $triggerSelectAya.siblings('a.sura-ename').attr('data-sura-index') + ':' + $(this).val();
                
                if (Lrq.ViewManager.AyaViewManager.showAya) {
                    Lrq.ViewManager.AyaViewManager.showAya(ayaId);
                }
            });
            
            this.element.appendTo('#wrap');
        },
        show: function() {
            
            var $this = this;
            
            $('#quran-content').hide();
            
            if (!this.element) {
                this.init();
            }
            
            this.element.fadeIn('fast', function(e) {
                var $active = $this.element.find('li.active');
            
                if ($active.length <= 0) {
                    return;
                }
                
                var offset = $active.offset();
                
                $(window).scrollTop(offset.top - $active.outerHeight() * 5);
            });
        },
        
        hide: function() {
            this.element.hide();
            $('#quran-content').fadeIn();
        }
    };

})(LaRaiba, jQuery);
