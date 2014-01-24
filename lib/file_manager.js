
var fs = require('fs');

/**
 * A simple wrapper around file operations to provide
 * messaging
 */
exports.FileManager = (function() {

	// the root directory of templates
	var template_root = "~/.tm/";

	return {
		/**
		 * Gets a template provided by the path
		 */
		getTemplate: function(path) {
			var full_path = template_root + path;
			return fs.readFileSync(full_path);
		},

		/**
		 * Returns true if the file provided is a template
		 */
		isDirectory: function(path) {
			var full_path = template_root + path;
			var stat = fs.lstatSync(full_path);
			return stat.isDirectory();
		},

		/**
		 * Returns true if file passed exists (directory or file)
		 */
		exists: function(path) {
			var full_path = template_root + path;
			var exists = true;
			try {
				fs.lstatSync(full_path);
			}
			catch(e) {
				exists = false;
			}
			return exists;
		},

		/**
		 * Returns template suggestions for a given file (if its a directory)
		 */
		suggestions: function(path) {
			return fs.readdirSync(full_path);
		}
	};
})();
