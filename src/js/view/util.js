(function(Lrq, $) {
    
    Lrq.ViewManager.Util = {
        normalizeArabicText: function(arabicText) {
            var normalized = arabicText.replace(/\u0671/g, "\u0627");
            return normalized;
        }
    };
    
})(LaRaiba.Quran, jQuery);
