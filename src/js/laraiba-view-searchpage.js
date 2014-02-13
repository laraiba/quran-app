(function(Lr, $) {
    var Lrq = Lr.Quran;
    
    Lrq.ViewManager.SearchPage = {
        init: function() {
            var $this = this;
            this.element = $('<div id="search-page" class="container content search-page-content"><div class="row"><div class="col-md-6">' +
                '<div class="input-group">' +
                    '<input id="input-search-keyword" type="text" class="form-control" placeholder="Cari sesuatu di Al Quran" />' +
                        '<span class="input-group-btn">' +
                            '<button id="btn-search" class="btn btn-default" type="button" title="Cari"><span class="glyphicon glyphicon-search"></span></button>' +
                        '</span>' +
                '</div>' +
            '</div>');

            this.element.on('click', '#btn-search', function(e) {
                var keyword = $this.element.find('#input-search-keyword').val();
                window.location.href = '#/search/' + keyword;
            });

            this.element.on('keypress', '#input-search-keyword', function(e) {
                if (e.keyCode == '13') {
                    e.preventDefault();
                    var keyword = $this.element.find('#input-search-keyword').val();
                    window.location.href = '#/search/' + keyword;
                }
            }); 

            this.element.appendTo('#wrap');
        },
        show: function() {
            
            var $this = this;
            
            $('#quran-content').hide();
            $('.content').hide();
            
            if (!this.element) {
                this.init();
            }

            this.element.show();
            $(window).scrollTop(0);
        },
        search: function(keyword) {
            this.show();
            var $this = this;

            $this.element.find('#input-search-keyword').val(keyword);

            var $searchResult = $('<div class="search-result-list-group list-group"></div>');
            
            if (LaRaiba.Quran.Translations.indonesia[keyword]) {
                var text = LaRaiba.Quran.Translations.indonesia[keyword]['text'];
                $searchResult.append('<a class="list-group-item" href="#/verse/' +  LaRaiba.Quran.Translations.indonesia[keyword]['_id'] + '"><h4 class="list-group-item-heading">' + keyword + '</h4><p class="list-group-item-text">' + text  + '</p></a>');
            }
            
            $this.element.find('.search-result-row').remove();
            var $row = $('<div class="row search-result-row"></div>')
                .append('<div class="col-md-6"></div>')
                .appendTo($this.element);
            $row.find('.col-md-6').append($searchResult);

        },
        hide: function() {
            this.element.hide();
            $('#quran-content').fadeIn();
        }
    };

})(LaRaiba, jQuery);
