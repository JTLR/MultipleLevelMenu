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
        watch: {
            javascript: {
                files: ['jquery.multiplelevelmenu.js'],
                tasks: ['uglify:build']
            },
            sass: {
                files: ['multiplelevelmenu.scss', 'demo.scss'],
                tasks: ['sass']
            }
        }
    });

    // Load npm tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
};