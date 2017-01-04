module.exports = function(grunt) {

  var appName = grunt.option('app');
  var platform = grunt.option('platform') || 'all';

  var isJenkins = grunt.option('jenkins') || false;



  var configCloud = grunt.file.readYAML('./src/main/resources/application.yml');

  var path = require("path");

  grunt.initConfig({
    
      ts: {
      default : {
        tsconfig: true
      }
    
     },

    jshint: {
      files: ['Gruntfile.js', 'src/app/**/*.js', 'src/*.js']
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },

    exec: {
     
      'createBuildFolder': {
        command: "mkdir build",
        stdout: true,
        stderror: true
      },

      'createLibsFolder': {
         cwd: './build',
        command: "mkdir libs",
        stdout: true,
        stderror: true
      },
       

      'deleteFolder': {
        command: "RMDIR build /S /Q",
        stdout: true,
        stderror: true
      },

      'generateJar': {
        cwd: "./dist/bundled/",
        command: "jar -cvf ../../build/libs/SampleApp-" + configCloud.releaseNumber + "-RELEASE.jar *",
        stdout: true,
        stderror: true
      },

       'appArtifactoryPublish': {
        command: "C:\fptools\gradle-2.13\bin\gradle artifactoryPublish",
        stdout: true,
        stderror: true
      },
      

      serve: {
        command: "npm run start",
        stdout: true,
        stderror: true
      },
  
      'appBuild': {
        cwd: './',
        command: "npm run build:prod",
        stdout: true,
        stderror: true,
        maxBuffer: 400 * 1024 * 1024
      },

      'appBuild_aot': {
        cwd: './',
        command: "npm run build_aot:prod",
        stdout: true,
        stderror: true,
         maxBuffer: 400 * 1024 * 1024
      }
    },

    copy: {

    },

    clean: {
      options: {
        force: true
      },
      'cordova-android-out': {
        files: [{
          dot: true,
          src: [
            './build/*'
          ]
        }]
      }
    },

    replace: {
    },

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-text-replace');
  // grunt.loadNpmTasks('grunt-git');

  grunt.registerTask('default', ['jshint']);


  grunt.registerTask('generateJar', [
    'exec:createBuildFolder',
    'exec:createLibsFolder',
    'exec:generateJar'
  ]);

   grunt.registerTask('compile_aot', function() {
    grunt.task.run([
      'exec:appBuild_aot',
    ]);
  });

  grunt.registerTask('serve', ['exec:serve']);
  grunt.registerTask('test', ['exec:unitTest']);
};