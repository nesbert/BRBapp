module.exports = function(grunt) {

  grunt.initConfig({

    dirs: {
      "root"    : __dirname,
      "src"     : __dirname + "/src",
      "dist"    : __dirname + "/app",
      "archive" : __dirname + "/archive"
    },

    jshint: {
      // http://www.jshint.com/docs/#options
      options: {
        "asi": true,
        "boss": true,
        "browser": true,
        "camelcase": true,
        "curly": false,
        "debug": false,
        "devel": true,
        "eqeqeq": true,
        "eqnull": true,
        "es5": false,
        "evil": false,
        "immed": false,
        // "indent": 2,
        "jquery": true,
        "latedef": true,
        "laxbreak": true,
        "laxcomma": true,
        "maxcomplexity": 6,
        "maxdepth": 4,
        // "maxlen": 80,
        "maxstatements": 25,
        "newcap": true,
        "node": false,
        "noempty": false,
        "nonew": true,
        "quotmark": null,
        "smarttabs": true,
        "strict": true,
        "trailing": false,
        "undef": false,
        "unused": true
      },
      beforeconcat: ["<%= dirs.src %>/scripts/**/*.js"]
    },

    requirejs: {
      compile: {
        // https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          appDir: "<%= dirs.src %>",
          baseUrl: 'scripts',
          dir: "<%= dirs.dist %>",
          mainConfigFile: "<%= dirs.src %>/scripts/main.js",
          fileExclusionRegExp: /(^\.|app.build.js|test(|s)|doc(|s)|example(|s)|demo(|s)|dist|jquery|underscore|backbone|bootstrap)/,
          modules: [
              { name: "jquery" },
              {
                name: "bootstrap",
                exclude: ["jquery"]
              },
              {
                name: "underscore",
                exclude: ["jquery"]
              },
              {
                name: "backbone",
                exclude: ["jquery","underscore"]
              },
              {
                name: "main",
                exclude: ["jquery","bootstrap","underscore","backbone","text","tpl"]
              }
            ],
          optimizeCss: "standard"
        }
      }
    },

    exec: {
      "postbuild-scripts"   : { cmd: "cd <%= dirs.dist %> && mkdir -v scripts.tmp && mv -v scripts/main.js scripts.tmp && echo 'deleting...' && rm -rfv scripts build build.txt && mv -v scripts.tmp scripts" },
      "postbuild-css"       : { cmd: "cd <%= dirs.dist %> && mv -v css/main.css main.css && echo 'deleting...' && rm -rfv css/* && mv -v main.css css/main.css" },
      "postbuild-bootstrap" : { cmd: "cd <%= dirs.dist %> && mkdir -v vendor/bootstrap/css && cp -fv ../src/vendor/bootstrap/css/*.min.css vendor/bootstrap/css/ && mkdir -v vendor/bootstrap/img && cp -fv ../src/vendor/bootstrap/img/*.png vendor/bootstrap/img/"},
      "postbuild-requirejs" : { cmd: "cd <%= dirs.dist %> && mv -v vendor/requirejs/require.js require.js && mv -v vendor/requirejs-text/text.js text.js && mv -v vendor/requirejs-tpl/tpl.js tpl.js && echo 'deleting...' && rm -rfv vendor/requirejs* && mkdir vendor/requirejs && mv -v require.js vendor/requirejs/require.js && mkdir vendor/requirejs-text && mv -v text.js vendor/requirejs-text/text.js && mkdir vendor/requirejs-tpl && mv -v tpl.js vendor/requirejs-tpl/tpl.js"}
    },

    compress: {
      app: {
        options: {
          archive: "<%= dirs.archive %>/<%= pkg.name %>.v<%= pkg.version %>.zip",
          pretty: true
        },
        files: [
          { src: "app/**", dest: "<%= pkg.name %>/" }
        ]
      },
      src: {
        options: {
          archive: "<%= dirs.archive %>/<%= pkg.name %>.v<%= pkg.version %>-src.zip",
          pretty: true
        },
        files: [
          { src: "src/**", dest: "<%= pkg.name %>/" }
        ]
      }
    },

    pkg: grunt.file.readJSON('package.json')

  });

  // dependencies
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy'); // TODO
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // register tasks
  grunt.registerTask('default', ['build']);
  grunt.registerTask('test', 'Run tests and lint source files.', ['jshint']);
  grunt.registerTask('lint', 'Lint project source files.', ['jshint']);
  grunt.registerTask('build', 'Build project.', ['test', 'requirejs','postbuild']);
  grunt.registerTask('postbuild', 'Post build routine.', ['exec:postbuild-requirejs', 'exec:postbuild-scripts','exec:postbuild-css','exec:postbuild-bootstrap']);
  grunt.registerTask('build-zip', 'Build and compress for distrubution.', ['build', 'compress:app']);

};