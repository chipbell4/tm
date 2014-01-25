/**
 * A handy function for building the path to a template
 */
exports.TemplatePathBuilder = (function() {
	return {
		/**
		 * Takes a dotted path string, and converts
		 * it to a "glob"-style file matching string
		 */
		build: function(dotted_path_string) {
			// replace any double .'s with singles
			dotted_path_string = dotted_path_string.replace(/\.+/g, '.');

			// convert dotted path to "real" path
			var real_path = dotted_path_string.replace(/\./g, '/');

			// join with the home directory, and add the wildcard
			return process.env.HOME + '/' + real_path + '.*';
		},
	};
})();
