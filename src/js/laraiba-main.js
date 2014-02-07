$(function() {
    var Lrq = LaRaiba.Quran;
        
    var $topNavbar = $('<div id="top-navbar" class="navbar navbar-inverse navbar-top"></div>');
    $('<a href="#" class="btn" id="main-menu-btn">=</a><a class="sura-navigator" href="#">2. Al Baqarah</a><a href="#" style="float: right">Juz 1</a>').appendTo($topNavbar);
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
