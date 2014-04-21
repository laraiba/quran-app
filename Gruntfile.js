module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: ['build']
        },
        copy: {
            debug: {
                files: [
                    {
                        src: ['src/index.dev.html'], 
                        dest: 'build/debug/index.html'
                    },
                    {
                        src: ['*.html', '*.php'], 
                        dest: 'build/debug/',
                        expand: true,
                        cwd: 'src/'
                    },
                    {
                        src: ['**'], 
                        dest: 'build/debug/style/',
                        expand: true,
                        cwd: 'src/style'
                    },
                    {
                        src: ['**'], 
                        dest: 'build/debug/js/',
                        expand: true,
                        cwd: 'src/js'
                    },
                    {
                        src: ['**'], 
                        dest: 'build/debug/data/',
                        expand: true,
                        cwd: 'src/data'
                    },
                    
                    {
                        src: ['**'], 
                        dest: 'build/debug/search/',
                        expand: true,
                        cwd: 'src/search'
                    }
                    
                ]
            },
            dist: {
                files: [
                    {
                        src: ['src/index.html'], 
                        dest: 'build/dist/index.html'
                    },
                    {
                        src: ['*.html', '*.php'], 
                        dest: 'build/dist/',
                        expand: true,
                        cwd: 'src/'
                    },
                    {
                        src: ['**'], 
                        dest: 'build/dist/style/',
                        expand: true,
                        cwd: 'src/style'
                    },
                    {
                        src: ['**'], 
                        dest: 'build/dist/js/',
                        expand: true,
                        cwd: 'src/js'
                    },
                    {
                        src: ['**'], 
                        dest: 'build/dist/data/',
                        expand: true,
                        cwd: 'src/data'
                    },
                    
                    {
                        src: ['**'], 
                        dest: 'build/dist/search/',
                        expand: true,
                        cwd: 'src/search'
                    }
                    
                ]
            }

        },
        jshint: {
            all: ['Gruntfile.js', 'src/**/laraiba*.js', 'tests/**/*.js']
        },
        concat: {
            options: {
                separator: ";\n\n",
            },
            dist: {
                src: [
                        'src/js/core.js', 'src/js/data/metadata.js', 'src/js/data/quran.metadata.js', 'src/js/data/data.js',
                        'src/js/data/data.cache.js', 'src/js/view/viewmanager.js', 'src/js/view/util.js', 'src/js/view/ayaviewmanager.js',
                        'src/js/view/page.qurancontent.js', 'src/js/view/page.surapicker.js', 'src/js/view/page.search.js',
                        'src/js/view/page.about.js', 'src/js/view/widget.topnavbar.js', 'src/js/router.js', 'src/js/main.js'
                     ],
                dest: 'build/dist/js/la-raiba.js',
            },
            "dist-all": {
                src: ['build/dist/js/vendor/jquery.min.js', 'build/dist/js/vendor/director.min.js', 'build/dist/js/la-raiba.min.js'],
                dest: 'build/dist/js/la-raiba.all.js',
            },
            "dist-css": {
                options: {
                    separator: "\n\n",
                },
                src: ['build/dist/style/css/reset.css', 'build/dist/style/css/bootstrap.min.css', 'build/dist/style/css/bootstrap-theme.min.css', 'build/dist/style/css/style.css'],
                dest: 'build/dist/style/css/style.all.css',
            },
        },
        uglify: {
            laraiba: {
                files: {
                    'build/dist/js/la-raiba.min.js': [
                        'src/js/core.js', 'src/js/data/metadata.js', 'src/js/data/quran.metadata.js', 'src/js/data/data.js',
                        'src/js/data/data.cache.js', 'src/js/view/viewmanager.js', 'src/js/view/util.js', 'src/js/view/ayaviewmanager.js',
                        'src/js/view/page.qurancontent.js', 'src/js/view/page.surapicker.js', 'src/js/view/page.search.js',
                        'src/js/view/page.about.js', 'src/js/view/widget.topnavbar.js', 'src/js/router.js', 'src/js/main.js'
                     ],
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify'); 
    grunt.registerTask('default', ['clean', 'jshint', 'copy', 'uglify', 'concat']);
};
