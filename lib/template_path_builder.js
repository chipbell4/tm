/**
 * A handy function for building the path to a template
 */
exports.TemplatePathBuilder = (function() {
	return {
		/**
		 * Takes a path string, and converts
		 * it to a "glob"-style file matching string for templates
		 */
		build: function(path_string) {
			// check for the empty string/true case
			if(path_string === '' || path_string === true) {
				return process.env.HOME + '/.tm';
			}

			// replace any double /'s with singles
			path_string = path_string.replace(/\/+/g, '/');

			// join with the home directory, and add the wildcard
			return process.env.HOME + '/.tm/' + path_string + '*';
		},
	};
})();
