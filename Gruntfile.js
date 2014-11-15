module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
	
		clean: ['build/'],
		
		browserify: {
			build: {
				browserifyOptions: {
					debug: true
				},
				src: ['src/**/*.js'],
				dest: 'build/smart-tv.js'
			}
		},

		uglify: {
			options: {
				sourceMap: true
			},
			build: {
				files: {
					'build/smart-tv.min.js': 'build/smart-tv.js'
				}
			}
		},

		jshint: {
			options: {
				jshintrc: true
			},
			files: ['src/**/*.js']
		},

		watch: {
			build: {
				files: ['src/**/*.js'],
				tasks: ['jshint', 'browserify', 'uglify']
			}
		}

	});

	grunt.registerTask('build', ['clean', 'jshint', 'browserify', 'uglify']);
};
