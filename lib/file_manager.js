
var fs = require('fs');
var glob = require('glob');
var path = require('path');

/**
 * A simple wrapper around file operations to provide
 * messaging
 */
exports.FileManager = (function() {

	return {
		/**
		 * Gets a list of matching files for a path. Each entry is an
		 * object, with the object having the template name and a flag
		 * if its a directory or not
		 */
		getMatches: function(full_path) {			
			var files = glob.sync(full_path);

			/*
			 * Loop over the files, check if its a directory, and shortening
			 * the path
			 */
			return files.map(function(file_path) {
				return {
					name: path.basename(file_path),
					is_directory: fs.lstatSync(file_path).isDirectory()
				};
			});
		},
	};
})();
