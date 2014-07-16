module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                compress: {
                    drop_console: true
                }
            },
            build: {
                src: 'jquery.multiplelevelmenu.js',
                dest: 'jquery.multiplelevelmenu.min.js'
            }
        },
        sass: {
            dev: {
                files: {
                    'multiplelevelmenu.css': 'multiplelevelmenu.scss',
                    'demo.css': 'demo.scss'
                }
            },
            prod: {
                files: {
                    'multiplelevelmenu.min.css': 'multiplelevelmenu.scss',
                    'demo.min.css': 'demo.scss'
                },
                options: {
                    outputStyle: 'compressed'
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie 8', 'ie 9']
            },
            'multiplelevelmenu.css': 'multiplelevelmenu.css',
            'multiplelevelmenu.min.css': 'multiplelevelmenu.min.css',
            'demo.css': 'demo.css',
            'demo.min.css': 'demo.min.css'
        },
        watch: {
            javascript: {
                files: ['jquery.multiplelevelmenu.js'],
                tasks: ['uglify:build']
            },
            sass: {
                files: ['multiplelevelmenu.scss', 'demo.scss'],
                tasks: ['sass', 'autoprefixer']
            }
        }
    });

    // Load npm tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-sass');
};