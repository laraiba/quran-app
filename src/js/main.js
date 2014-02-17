$(function() {
    
    var Lrq = LaRaiba.Quran;
    
    Lrq.Data.cache.loadQuranText();
    Lrq.Data.cache.loadTranslationText();

    Lrq.ViewManager.widget.topNavBar.init();
    Lrq.ViewManager.page.quranContent.init();

    Lrq.router.init();
 
});
