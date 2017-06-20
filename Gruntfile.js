module.exports = function(grunt) {
	// Reminder - run 'npm install' to install packages before first use

	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'js/**/*.js',
				'!js/vendor/*.js'
			]
		},
		jsbeautifier: {
			files: [
				'Gruntfile.js',
				'js/**/*.js',
				'!js/vendor/*.js',
				'css/**/*.css',
				'!css/vendor/*.css',
				'*.html'
			],
			options: {
				js: {
					endWithNewline: true,
					indentWithTabs: true
				},
				css: {
					endWithNewline: true,
					indentWithTabs: true
				},
				html: {
					endWithNewline: true,
					indentWithTabs: true
				}
			}
		},
		watch: {
			js: {
				files: [
					'Gruntfile.js',
					'js/**/*.js'
				],
				tasks: ['jshint', 'jsbeautifier']
			},
			other: {
				files: [
					'css/**/*.css',
					'*.html'
				],
				tasks: ['jsbeautifier']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jsbeautifier');

	grunt.registerTask('default', ['jshint', 'jsbeautifier']);
};
