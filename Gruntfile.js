/*global __dirname, module */
module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    dirs: {
      'root'    : __dirname,
      'src'     : __dirname + '/src',
      'dist'    : __dirname + '/app',
      'archive' : __dirname + '/archive'
    },

    clean: {
      build: ['<%= dirs.dist %>']
    },

    compress: {
      app: {
        options: {
          archive: '<%= dirs.archive %>/<%= pkg.name %>.v<%= pkg.version %>.zip',
          pretty: true
        },
        files: [
          { src: 'app/**', dest: '<%= pkg.name %>/' }
        ]
      },
      src: {
        options: {
          archive: '<%= dirs.archive %>/<%= pkg.name %>.v<%= pkg.version %>-src.zip',
          pretty: true
        },
        files: [
          { src: 'src/**', dest: '<%= pkg.name %>/' }
        ]
      },
      dev: {
        options: {
          archive: '<%= dirs.archive %>/<%= pkg.name %>.v<%= pkg.version %>-dev.zip',
          pretty: true
        },
        files: [
          { dest: '<%= pkg.name %>/', src: 'src/**' },
          { dest: '<%= pkg.name %>/', src: '.bowerrc' },
          { dest: '<%= pkg.name %>/', src: '.gitignore' },
          { dest: '<%= pkg.name %>/', src: '.jshintrc' },
          { dest: '<%= pkg.name %>/', src: '*.json' },
          { dest: '<%= pkg.name %>/', src: '*.js' },
          { dest: '<%= pkg.name %>/', src: 'README.md' }
        ]
      }
    },

    exec: {
      'postbuild-css'       : { cmd: 'cd <%= dirs.dist %> && mv -v css/main.css main.css && echo "cleaning css source files..." && rm -rfv css/* && mv -v main.css css/main.css' },
      'postbuild-scripts'   : { cmd: 'cd <%= dirs.dist %> && mkdir -v scripts.tmp && mv -v scripts/main.js scripts.tmp && echo "cleaning scripts sources..." && rm -rfv scripts build build.txt && mv -v scripts.tmp scripts' },
      'postbuild-bootstrap' : { cmd: 'cd <%= dirs.dist %> && mkdir -v assets.tmp && echo "copying bootstrap assets..." && cp -rf vendor/bootstrap/docs/assets/* assets.tmp && echo "deleting bootstrap source files..." && rm -rf vendor/bootstrap && mkdir -vp vendor/bootstrap/docs && mv -v assets.tmp vendor/bootstrap/docs/assets && cd vendor/bootstrap/docs/assets && rm -rf ico && cd js && rm -rf bootstrap-* app* *.min.js jquery.js READ*' },
      'postbuild-requirejs' : { cmd: 'cd <%= dirs.dist %>&& mv -v vendor/requirejs/require.js require.js && echo "cleaning requirejs source files..." && rm -rf vendor/requirejs* && mkdir vendor/requirejs && mv -v require.js vendor/requirejs/require.js' },
      'postbuild-backbone'  : { cmd: 'cd <%= dirs.dist %> && mv -v vendor/backbone/backbone.js backbone.js && echo "cleaning backbone source files..." && rm -rf vendor/backbone && mkdir -v vendor/backbone && mv -v backbone.js vendor/backbone/backbone.js' },
      'postbuild-underscore': { cmd: 'cd <%= dirs.dist %> && mv -v vendor/underscore/underscore.js underscore.js && echo "cleaning underscore source files..." && rm -rf vendor/underscore && mkdir -v vendor/underscore && mv -v underscore.js vendor/underscore/underscore.js' },
      'postbuild-jquery'    : { cmd: 'cd <%= dirs.dist %> && mv -v vendor/jquery/jquery.js jquery.js && echo "cleaning jquery source files..." && rm -rf vendor/jquery && mkdir -v vendor/jquery && mv -v jquery.js vendor/jquery/jquery.js' }
    },

    jshint: {
      options: { jshintrc: '.jshintrc' },
      files: ['Gruntfile.js', '<%= dirs.src %>/scripts/**/*.js']
    },

    replace: {
      build: {
        src: ['<%= dirs.dist %>/scripts/main.js'],
        overwrite: true,
        replacements: [
          { from: '<version>', to: '<%= pkg.version %>' },
          { from: 'urlArgs:"v="+(new Date).getTime()', to: 'urlArgs:"v=<%= pkg.version %>"' },
          { from: 'this.debug=window&&window.location&&window.location.hostname&&(window.location.hostname==="127.0.0.1"||window.location.hostname==="localhost"),', to: '' }
        ]
      }
    },

    requirejs: {
      compile: {
        // https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          appDir: '<%= dirs.src %>',
          baseUrl: 'scripts',
          dir: '<%= dirs.dist %>',
          inlineText: true,
          mainConfigFile: '<%= dirs.src %>/scripts/main.js',
          modules: [
              { name: 'jquery' },
              {
                name: 'bootstrap',
                exclude: ['jquery']
              },
              {
                name: 'underscore',
                exclude: ['jquery']
              },
              {
                name: 'backbone',
                exclude: ['jquery','underscore']
              },
              {
                name: 'main',
                exclude: ['jquery','bootstrap','underscore','backbone']
              }
            ],
          optimize: 'uglify',
          optimizeCss: 'standard',
          preserveLicenseComments: false,
          skipDirOptimize: true
        }
      }
    },

    uglify: {
      requirejs: {
        files: {
          '<%= dirs.dist %>/vendor/requirejs/require.js': ['<%= dirs.dist %>/vendor/requirejs/require.js']
        }
      }
    }

  });

  // dependencies
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy'); // TODO
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-text-replace');

  // register tasks
  grunt.registerTask('default', ['build']);
  grunt.registerTask('test', 'Run tests and lint source files.', ['jshint']);
  grunt.registerTask('lint', 'Lint project source files.', ['jshint']);
  grunt.registerTask('build', 'Build project.', ['test', 'clean:build', 'requirejs','postbuild']);
  grunt.registerTask('postbuild', 'Post build routine.', ['exec:postbuild-jquery','exec:postbuild-underscore','exec:postbuild-backbone','exec:postbuild-requirejs','uglify:requirejs','exec:postbuild-bootstrap','exec:postbuild-scripts','exec:postbuild-css','replace:build']);
  grunt.registerTask('build-zip', 'Build and compress for distrubution.', ['build', 'compress:app']);

};