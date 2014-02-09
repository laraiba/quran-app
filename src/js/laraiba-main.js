$(function() {
    var Lrq = LaRaiba.Quran;
        
    var $topNavbar = $('<div id="top-navbar" class="navbar navbar-inverse navbar-fixed-top"></div>');
    $('<a href="about.html" id="main-menu-btn" title="Menu"><span class="glyphicon glyphicon-list"></span></a>' +
    '<a class="sura-navigator" href="#/sura-picker"></a>' +
    '').appendTo($topNavbar);
    $topNavbar.appendTo('#wrap');

    var $quranContent = $('<div id="quran-content" class="content"></div>');
    $quranContent.appendTo('#wrap');

    var routed = false;
    
    var routes = {
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
        }
    };

    var router = Router(routes);
    router.configure({
    });

    router.init();
    
    if (!routed) {
        Lrq.ViewManager.AyaViewManager.showAya('1:1');
    }
});
