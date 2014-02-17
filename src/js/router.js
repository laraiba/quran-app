(function(Lrq) {
    
    var routed = false;
    
    Lrq.router = { 
        init: function() {
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
                        LaRaiba.Quran.ViewManager.page.about.show();
                        routed = true;
                    }
                },
                '/search': {
                    '/(.*)': {
                        on: function(keyword) {
                            LaRaiba.Quran.ViewManager.page.search.search(keyword);
                            routed = true;
                        }
                    },
                    on: function() {
                        LaRaiba.Quran.ViewManager.page.search.show();
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
        }
    };    

})(LaRaiba.Quran);
