(function(Lr, $) {
    var Lrq = Lr.Quran;
    
    Lrq.ViewManager.AboutPage = {
        init: function() {
            var $this = this;
            this.element = $('<div id="about-page" class="container content about-page-content"><div class="row"><div class="col-md-6"><a id="about-page-back-btn" href="#" class="btn btn-default">&lt; Back</a>' +
            
            '<h1>Tentang LaRaiba</h1>' +
            '<p>LaRaiba adalah Al-Quran digital berbentuk web, dibuat untuk mempermudah umat muslim Indonesia mengakses Al-Quran <strong>di mana saja</strong>. Saat ini, LaRaiba sedang dalam tahap awal pembangunan. Misi utama LaRaiba adalah:</p>' +
            '<blockquote>Al-Quran mudah diakses di mana saja selama ada internet. Tidak perlu install aplikasi, cukup arahkan web browser ke <a href="http://la-raiba.com">la-raiba.com</a></blockquote>' +
            

            '<h2>Apakah LaRaiba Valid?</h2>' +
            '<p>LaRaiba adalah projek independen yang tidak tergantung oleh kelompok / organisasi tertentu. Kami tidak menyalin mushaf Al-Quran ke dalam bentuk digital, melainkan menggunakan metode-metode berikut: </p>' +
            '<ul>' +
                '<li>Text Al-Quran yang kami gunakan adalah The Medina Mushaf. Bentuk digitalnya kami ambil dari <a href="http://tanzil.net">tanzil.net</a></li>' +
                '<li>Text Al-Quran dari tanzil, kami proses untuk dijadikan potongan2 ayat dalam format json, agar mudah digunakan untuk web</li>' +
                '<li>Terjemahan Al-Quran berbahasa Indonesia (Indonesian Ministry of Religious Affairs) juga kami ambil dari <a href="http://tanzil.net/trans">Tanzil Translation Repository</a></li>' +
                '<li>Quran Metadata (jumlah surat, jumlah ayat, juz, dan sebagainya) kami ambil dari <a href="http://tanzil.net/wiki/Quran_Metadata">Tanzil Quran Metadata</a></li>' +
            '</ul>' +
            '<p>' +
                'Namun, jika anda menemukan ada kesalahan dalam text Al-Quran kami, bantu kami untuk mengoreksinya.' +
            '</p>' +
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

})(LaRaiba, jQuery);
