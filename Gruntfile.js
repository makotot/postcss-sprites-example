module.exports = function (grunt) {

  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);

  grunt.initConfig({

    path: {
      src: './src',
      dist: './dist'
    },

    clean: {
      all: ['<%= path.dist %>']
    },

    copy: {
      all: {
        files: [
          {
            expand: true,
            cwd: '<%= path.src %>/img/',
            src: '**/*.*',
            dest: '<%= path.dist %>/img/'
          }
        ]
      }
    },

    sass: {
      all: {
        files: [
          {
            expand: true,
            cwd: '<%= path.src %>/scss',
            src: '*.scss',
            dest: '<%= path.dist %>/css',
            ext: '.css'
          }
        ]
      }
    },

    postcss: {
      options: {
        sourcemap: true,
        processors: [
          require('postcss-sprites')({
            stylesheetPath: './dist/css',
            spritePath: './dist/img/sprites.png'
          })
        ]
      },
      dist: {
        src: '<%= path.dist %>/css/index.css'
      }
    }
  });

  grunt.registerTask('default', ['clean']);
  grunt.registerTask('build', ['clean', 'copy', 'sass', 'postcss']);
};
