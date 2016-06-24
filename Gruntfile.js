'use strict';


module.exports = function(grunt) {

  var incrementSubSubVersion = function(versionNum) {
    var versionArray = versionNum.split('.');
    versionArray[2] = parseInt(versionArray[2]);
    versionArray[2] += 1;
    return versionArray.join('.');
  };

  /*
   *
   * load all grunt tasks
   *
   */

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint'); // jshint for linting files during dev
  grunt.loadNpmTasks('grunt-contrib-clean'); // cleans dist folder
  grunt.loadNpmTasks('grunt-contrib-copy'); // copy to release folder
  grunt.loadNpmTasks('grunt-contrib-concat'); // concats multiple files from src to dist
  grunt.loadNpmTasks('grunt-contrib-uglify'); // used for making the minified file option
  grunt.loadNpmTasks('grunt-bump'); // bump any files like package.json in version number
  grunt.loadNpmTasks('grunt-karma'); // main test runner
  grunt.loadNpmTasks('grunt-open'); // opens test report
  grunt.loadNpmTasks('grunt-contrib-watch');

  /*
   *
   * Configuration json for all grunt tasks
   *
   */

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    pkgNewVersion: incrementSubSubVersion(grunt.file.readJSON('package.json').version),

    // configuration for 'grunt-bump'
    // used in `grunt release` to bump version in package.json & bower.json
    // also commits a new commit with those version bumps
    //   also commits minified file version since only created during release process
    // tags that commit with the version number in (e.g. "v0.0.18")
    // then pushes that commit to origin
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        commitFiles: ['package.json',
                      'bower.json',
                      'dist/ng-dynamic-title.min.js'],
        pushTo: 'origin'
      }
    },

    // config for 'grunt-contrib-jshint'
    jshint: {
      dist: {
        src: ['dist/ng-dynamic-title.js']
      }
    },

    // set up for 'grunt-karma'
    // main test runner
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },

    // set up for 'grunt-open'
    // USE: opens the main 'index.html' from the istanbul UT coverage
    // report in your browser after the tests have finished
    // NOTE: typically should not need to edit this configuration
    open: {
      report: {
        url: 'file://'+process.cwd()+'/coverage/htmlreport/index.html'
      }
    },

    // set up for 'grunt-contrib-copy'
    // USE: copies the files from `./coverage/html/PhantomJS 1.9.8 .../src/....html`
    // to `./coverage/htmlreport/src/...html` to normalize the path for different OS's
    // NOTE: typically should not need to edit this configuration
    copy: {
      report: {
        files: [
          {
            src: 'coverage/clover/*/clover.xml',
            dest: 'coverage/clover.xml'
          },
          {
            cwd: 'coverage/html',
            expand: true,
            src: '*/**/*',
            dest: 'coverage/htmlreport',
            rename: function(dest, src) {
              var path = require('path');
              // removing the first folder /Phantom X.X.X .... from the path that goes into htmlreport
              var wobase = src.split(path.sep).slice(1).join(path.sep);
              var dest1 = path.join(dest, wobase);
              return dest1;
            }
          },
          {
            cwd: 'coverage/text',
            expand: true,
            src: '*/**/*',
            dest: 'coverage/textreport',
            rename: function(dest, src) {
              var path = require('path');
              // removing the first folder /Phantom X.X.X .... from the path that goes into htmlreport
              var wobase = src.split(path.sep).slice(1).join(path.sep);
              var dest1 = path.join(dest, wobase);
              return dest1;
            }
          }
        ]
      }
    },

    // set up for 'grunt-contrib-concat'
    // used to copy and concatinate all the files from `src/` folder into a single file `dist/` folder
    // this is one half of the "build" process for distribution - the other half is to uglify and minify
    // for the minified file option
    concat: {
      dist: {
        src: ['src/module.js', // typically keep module.js file first since that will define the angular module
              'src/update-page-title-directive.js',
              'src/update-page-title-service.js'],
        dest: 'dist/ng-dynamic-title.js',
      },
    },

    // clean the `dist` folder on each build from `src` folder
    clean: {
      dist: ['./dist']
    },

    // USE: create a minified version of the main dist file during release process
    // gives user option to use this a project instead
    uglify: {
      dist: {
        options: {
            banner: '/*! <%= pkg.name %> <%= pkgNewVersion %> | MIT License | github.com/clamstew */'
        },
        files: {
          'dist/ng-dynamic-title.min.js': ['dist/ng-dynamic-title.js']
        }
      }
    },

    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['build:dist']
      }
    }

  });

  /*
   *
   * Register tasks to be used by grunt command
   *
   */

  grunt.registerTask('default', ['jshint']);

  grunt.registerTask('build:dist',[
    'clean:dist', // clean old files from 'dist/' folder
    'concat:dist', // concat all files based on "concat:dist" setup above into `dist` folder in one file
    'uglify:dist'
  ]);

  grunt.registerTask('test', [
    'build:dist', // build from source to dist before testing (also cleans out dist folder)
    'jshint:dist', // run js hint on src before attempting to test
    'karma:unit', // run the jasmin tests
    'copy:report', // copy the reports to an OS safe html folder
    'open:report' // open generated html report files in a browser to view
  ]);

  // for those times when you are repetitively running tests,
  // and having your browser pop up each time would be super annoying
  // grunt - test - no coverage reports that open up on browser
  grunt.registerTask('testnc', [
    'build:dist', // build from source to dist before testing (also cleans out dist folder)
    'jshint:dist', // run js hint on src before attempting to test
    'karma:unit' // run the jasmin tests
  ]);

  grunt.registerTask('release',[
    'uglify:dist', // make a minified version of the latest in dist folder for release
    'bump' // main release script - bumps versions, tags versions, commits, and pushes to remote
  ]);

};