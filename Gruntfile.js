module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: ['build']
        },
        copy: {
            main: {
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
                        dest: 'build/debug/js/',
                        expand: true,
                        cwd: 'vendor/js'
                    },
                    {
                        src: ['**'], 
                        dest: 'build/debug/data/',
                        expand: true,
                        cwd: 'src/data'
                    },
                    {
                        src: ['**'], 
                        dest: 'build/debug/zendsearch/',
                        expand: true,
                        cwd: 'src/zendsearch'
                    }
                ]
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'src/**/laraiba*.js', 'tests/**/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify'); 
    grunt.registerTask('default', ['clean', 'copy', 'jshint']);
};
