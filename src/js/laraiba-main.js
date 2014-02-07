$(function() {
    var Lrq = LaRaiba.Quran;
        
    var $topNavbar = $('<div id="top-navbar" class="navbar navbar-inverse navbar-top"></div>');
    $('<a href="#" id="main-menu-btn" title="Menu"><span class="glyphicon glyphicon-list"></span></a>' +
    '<a class="sura-navigator" href="#"></a>' +
    '').appendTo($topNavbar);
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
