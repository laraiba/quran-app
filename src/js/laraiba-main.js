$(function() {
    var Lrq = LaRaiba.Quran;
        
    var $topNavbar = $('<div id="top-navbar" class="navbar navbar-inverse navbar-top"></div>');
    $('<a href="#" class="dropdown-toggle" data-toggle="dropdown" id="main-menu-btn" title="Menu"><span class="glyphicon glyphicon-list"></span></a>' +
    '<ul class="dropdown-menu" role="menu"><li><a href="#">Tentang LaRaiba</a></li><li><a href="#">Development</a></li></ul>' +
    '<a class="sura-navigator" href="#"></a>' +
    '<a href="#" title="Pencarian" id="btn-main-search" class="pull-right"><span class="glyphicon glyphicon-search"></span></a>').appendTo($topNavbar);
    $topNavbar.appendTo('#wrap');

    var $quranContent = $('<div id="quran-content" class="content"></div>');
    $quranContent.appendTo('#wrap');
    
    Lrq.ViewManager.AyaViewManager.showAya('1:1');
});


$(document).on('click', '.aya-load-btn', function(e) {
    e.preventDefault();
    var $this = $(this);
    LaRaiba.Quran.AyaViewManager.getViewModel($this.attr('data-aya-id')).load();
});

$(document).on('click', '.sura-navigator', function(e) {
    e.preventDefault();
    LaRaiba.Quran.ViewManager.SuraPicker.show();
});
