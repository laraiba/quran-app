(function(Lrq, $) {

    Lrq.ViewManager.widget.topNavBar = {
        init: function() {
            var $topNavbar = $('<div id="top-navbar" class="navbar navbar-inverse navbar-fixed-top"></div>');
            $('<a href="#/about" id="main-menu-btn" title="Menu"><span class="glyphicon glyphicon-list"></span></a>' +
                '<a class="sura-navigator" href="#/sura-picker"></a><a class="search-nav" href="#/search"><span class="glyphicon glyphicon-search"></span></a>' +
                '').appendTo($topNavbar);
            $topNavbar.appendTo('#wrap');
        }
    }
    
})(LaRaiba.Quran, jQuery);
