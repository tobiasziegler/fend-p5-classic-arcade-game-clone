module.exports = function(grunt) {
	// Reminder - run 'npm install' to install packages before first use

	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'js/**/*.js'
			]
		},
		jsbeautifier: {
			files: [
				'Gruntfile.js',
				'js/**/*.js',
				'css/**/*.css',
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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jsbeautifier');
};
