module.exports = function(grunt){
  grunt.initConfig({
    watch:{
      js: {
        files: ['models/*.js','controllers/*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      }
    },
    jshint:{
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['app/**/*.js']
    },
    nodemon: {
      dev: {
        options: {
          file: 'server.js',
          args: [],
          ignoredFiles: ['README.md','node_modules/**','DS_store'],
          watchedExtensions: ['js'],
          watchedFolders: ['app'],
          debug: true,
          delayTime: 1,
          env: {
            PORT:8000
          },
          cwd:__dirname
        }
      }
    },
    concurrent: {
      tasks: ['nodemon','watch'],
      options: {
        logConcurrentOutput:true
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.option('force',true);
  grunt.registerTask('default',['concurrent']);
};