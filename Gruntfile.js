module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  //import globals
  eval(grunt.file.read('public/js/app-globals.js'));

  //compile templates to an array that handlebars can process:
  var template_paths = [];
  for (i in TEMPLATES) {
    template_paths.push(TEMPLATES[i].id);
    grunt.log.write("\n-----\nAdding template " + TEMPLATES[i].id + '\n');
  }
  for (i in SITES){
    if (SITES[i].templates){
      for (t in SITES[i].templates){
        template_paths.push(SITES[i].templates[t].id);
        grunt.log.write("\n-----\nAdding template " + SITES[i].templates[t].id + '\n');
      }
    }
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['lib/**/*.js', 'public/js/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        mangle: false
      },
      build: {
        files: {
          'public/js/dist/login.min.js': ['public/js/app-globals.js','public/js/login.js'],
          'public/js/dist/app.min.js': [  'public/js/app-globals.js',
                                          'public/js/app.js',
                                          'public/js/data-types/helpers.js'],
          'public/js/dist/dodgercms.min.js': 'lib/**/*.js'
        }
      }
    },
    sass: { //default Sass configuration
        options: {
            sourceMap: true,
            relativeAssets: false,
            outputStyle: 'expanded'//,
            //sassDir: 'public/css/sass',
            //cssDir: 'public/css'
        },
        build: {
            files: [{
                expand: true,
                cwd: 'public/css/sass',
                src: ['**/*.{scss,sass}'],
                dest: 'public/css',
                ext: '.css'
            },
            {
                expand: true,
                cwd: 'templates/css/sass',
                src: ['**/*.{scss,sass}'],
                dest: 'templates/css',
                ext: '.css'
            }]
        }
    },
    cssmin: {
      combine: {
        files: {
          'public/css/dist/login.min.css': 'public/css/login.css',
          'public/css/dist/app.min.css': 'public/css/app.css',
          'public/css/vendor/jstree.proton.min.css': 'public/css/vendor/jstree.proton.css'
        }
      }
    },
    handlebars: {
      compile: {
        options: {
          namespace: "dodgercms.templates",
          processName: function(filePath) {
            return filePath;
          }
        },
        files: {
          "public/js/dist/entry.min.js": template_paths
        }
      }
    },
    mocha: {
      all: {
        src: ['test/runner.html'],
      },
      options: {
        run: true
      }
    },
    watch: {
      scripts: {
        files: ['lib/**/*.js', 'public/js/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: false,
        }
      }
    },
    aws: grunt.file.readJSON('./grunt-aws.json'),
    aws_s3: {
      options: {
        accessKeyId: '<%= aws.key %>',
        secretAccessKey: '<%= aws.secret %>',
        uploadConcurrency: 5,
        region: 'us-east-1',
        debug: false
      },
      //deploy drafty to the cloud
      production: {
        options: {
            bucket: '<%= aws.bucket %>'
        },
        files: [
          {action: 'upload', expand: true, cwd: '', src: ['*.html'], dest: '/'},
          {action: 'upload', expand: true, cwd: 'public/', src: ['**'], dest: 'public/'}
        ]
      },
      templates: {
        options: {
          bucket: '<%= grunt.option("site") %>',
          debug: false
        },
        files: [{action: 'upload', expand: true, cwd: 'templates/', src: ['**'], dest: '.templates/'}]
      }
    }
  });

  grunt.registerTask('default', ['handlebars', 'mocha', 'jshint', 'sass', 'cssmin', 'uglify']);
  grunt.registerTask('deploy', ['default', 'aws_s3:production']);

  // Deploy template files to the sites for use of CSS, images, etc.
  // specify the site when executing the task:
  //   $ grunt deploy-templates --site dev-site
  // If you wish to use this, the CMS admin IAM role will need access to the site buckets.
  grunt.registerTask('deploy-templates', ['default', 'aws_s3:templates']);
};
