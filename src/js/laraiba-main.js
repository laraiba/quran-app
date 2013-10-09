$(function() {
    var $topNavbar = $('<div id="top-navbar" class="navbar navbar-top"></div>');
    $('<a href="#" class="btn" id="main-menu-btn">=</a><a href="#">2. Al Baqarah</a><a href="#" style="float: right">Juz 1</a>').appendTo($topNavbar);
    $topNavbar.appendTo('#wrap');

    var $quranContent = $('<div id="quran-content" class="content"></div>');
    var $quran = $('<ul class="quran"></ul>');

    
    for (var i = 0; i < 30; i++) {
        $('<li class="verse clearfix"><p class="arabic-text">ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ</p><p class="translation">2. Kitab (Al Quran) ini tidak ada keraguan padanya; petunjuk bagi mereka yang bertakwa,</p></li>').appendTo($quran);
    }

    $quran.appendTo($quranContent);
    $quranContent.appendTo('#wrap');
});
