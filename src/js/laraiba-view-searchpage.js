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
                    $(this).blur();
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

            $this.element.find('#input-search-keyword').val(unescape(keyword));

            var $searchResult = $('<div class="search-result-list-group list-group"></div>');
            
            if (LaRaiba.Quran.Translations.indonesia[keyword]) {
                var aya  = LaRaiba.Quran.Translations.indonesia[keyword];
                var suraData  = Lrq.Metadata.suras[aya.suraNumber-1];
                var text = aya.text;
                $searchResult.append('<a class="list-group-item" href="#/verse/' +  aya._id + '"><h4 class="list-group-item-heading">' + suraData.tname + ' ( QS '+ aya._id + ' )'  + '</h4><p class="list-group-item-text">' + text  + '</p></a>');
            } else {
                $.ajax({
                    url: 'apisearch.php',
                    data: {"keyword": keyword},
                    method: 'GET',
                    beforeSend: function() {
                        $searchResult.append('<span class="loading">Sedang mencari...</span>');
                    },
                    success: function(data) {
                        var searchResults = JSON.parse(data);
                        for (var i in searchResults) {
                             var aya  = LaRaiba.Quran.Translations.indonesia[i];
                             var suraData  = Lrq.Metadata.suras[aya.suraNumber-1];
                             var text = aya.text;
                             $searchResult.append('<a class="list-group-item" href="#/verse/' +  aya._id + '"><h4 class="list-group-item-heading">' + suraData.tname + ' ( QS '+ aya._id + ' )'  + '</h4><p class="list-group-item-text">' + text  + '</p></a>');
                        }
                    },
                    error: function(error) {
                        alert('Ada masalah dengan koneksi, silahkan coba lagi setelah koneksi tersambung.');
                    },
                    complete: function() {
                        $searchResult.find('.loading').remove();
                    }
                });
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
