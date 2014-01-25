
var fs = require('fs');
var path = require('path');

/**
 * A simple wrapper around file operations to provide
 * messaging
 */
exports.FileManager = (function() {

	/*
	 * A helper function for formatting paths
	 */
	var buildPath = function(template_path) {
		var full_path = path.join(process.env.HOME, '.tm', template_path);
		return path.normalize(full_path);
	}

	return {
		/**
		 * Gets a template provided by the path
		 */
		getTemplate: function(template_path) {
			return fs.readFileSync(buildPath(template_path));
		},

		/**
		 * Returns true if the file provided is a template
		 */
		isDirectory: function(template_path) {
			var stat = fs.lstatSync(buildPath(template_path));
			return stat.isDirectory();
		},

		/**
		 * Returns true if file passed exists (directory or file)
		 */
		exists: function(template_path) {
			var exists = true;
			try {
				fs.lstatSync(buildPath(template_path));
			}
			catch(e) {
				console.log(e);
				exists = false;
			}
			return exists;
		},

		/**
		 * Returns template suggestions for a given file (if its a directory)
		 */
		suggestions: function(template_path) {
			return fs.readdirSync(buildPath(template_path));
		}
	};
})();
