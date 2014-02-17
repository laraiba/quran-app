$(function() {
    var Lrq = LaRaiba.Quran;
    
    Lrq.Data.cache.loadQuranText();
    Lrq.Data.cache.loadTranslationText();

    var $topNavbar = $('<div id="top-navbar" class="navbar navbar-inverse navbar-fixed-top"></div>');
    $('<a href="#/about" id="main-menu-btn" title="Menu"><span class="glyphicon glyphicon-list"></span></a>' +
    '<a class="sura-navigator" href="#/sura-picker"></a><a class="search-nav" href="#/search"><span class="glyphicon glyphicon-search"></span></a>' +
    '').appendTo($topNavbar);
    $topNavbar.appendTo('#wrap');

    var $quranContent = $('<div id="quran-content" class="content"></div>');
    $quranContent.appendTo('#wrap');

    var routed = false;
    
    var routes = {
        '/': {
            on: function() {
                Lrq.ViewManager.AyaViewManager.showAya('1:1');
                routed = true;
            }
        },
        '/verse': {
            '/(.*)': {
                on: function(id) {
                    Lrq.ViewManager.AyaViewManager.showAya(id);
                    routed = true;
                }
            }
        },
        '/sura-picker': {
            on: function() {
                LaRaiba.Quran.ViewManager.SuraPicker.show();
                routed = true;
            }
        },
        '/about': {
            on: function() {
                LaRaiba.Quran.ViewManager.AboutPage.show();
                routed = true;
            }
        },
        '/search': {
            '/(.*)': {
                on: function(keyword) {
                    LaRaiba.Quran.ViewManager.SearchPage.search(keyword);
                    routed = true;
                }
            },
            on: function() {
                LaRaiba.Quran.ViewManager.SearchPage.show();
                routed = true;
            }
        }
    };

    var router = Router(routes);
    router.configure({
    });
        
    router.init();
    
    if (!routed) {
        window.location.href = '#/';
    }
});
