(function(Lrq, $) {
    
    Lrq.ViewManager.page.about = {
        init: function() {
            var $this = this;
            this.element = $('<div id="about-page" class="container content about-page-content"><div class="row"><div class="col-md-6"><a id="about-page-back-btn" href="#" class="btn btn-default">&lt; Back</a>' +
            
            '<h1>Tentang LaRaiba</h1>' +
            '<p>LaRaiba adalah Al-Quran digital berbentuk web, dibuat untuk mempermudah umat muslim Indonesia mengakses Al-Quran <strong>di mana saja</strong>. Saat ini, LaRaiba sedang dalam tahap awal pembangunan. Misi utama LaRaiba adalah:</p>' +
            '<blockquote>Al-Quran mudah diakses di mana saja selama ada internet. Tidak perlu install aplikasi, cukup arahkan web browser ke <a href="http://la-raiba.com">la-raiba.com</a></blockquote>' +            
            '</div>' +
            '</div>' +
            '</div>');
                        
            this.element.on('click', '#about-page-back-btn', function(e) {
                e.preventDefault();
                $this.hide();
                history.go(-1);
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

            this.element.fadeIn();
            $(window).scrollTop(0);
        },
        
        hide: function() {
            this.element.hide();
            $('#quran-content').fadeIn();
        }
    };

})(LaRaiba.Quran, jQuery);
