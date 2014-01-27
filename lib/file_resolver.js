module.exports.FileResolver = (function() {
	
	// Pull in the libraries
	var FileManager = require('./file_manager.js').FileManager;
	var FileListFormatter = require('./file_list_formatter.js').FileListFormatter;
	var TemplatePathBuilder = require('./template_path_builder.js').TemplatePathBuilder;

	// the current error message
	var error_message = null;

	return {
		/**
		 * Gets the current error message, if there is one
		 */
		errorMessage: function() {
			return error_message;
		},

		/**
		 * Returns the resolved filename passed through the command
		 * line arguments. If the template provided doesn't match a
		 * single file (0, 2 or more), it returns null.
		 */
		resolve: function(template) {
			/*
			 * reset the error message
			 */
			error_message = null;

			/*
			 * Make sure args are provided
			 */
			if(template == null) {
				error_message = "Usage tm edit <template_name>";
				return null;
			}

			var wildcard_template = TemplatePathBuilder.build(template)

			/*
			 * Get all of the files that match this template suggestion
			 */
			var matches = FileManager.getMatches(wildcard_template);

			/*
			 * If there are no matches, let the user know, and then die
			 */
			if(matches.length == 0) {
				error_message = "Couldn't find any templates matching " + template;
				return null;
			}

			/*
			 * If there are multiple matches, let the user know and print them out
			 */
			if(matches.length > 1) {
				error_message = "Found many matches.\n";
				error_message += "Be sure to pick unique names for templates.\n";
				error_message += "Here are the matches:\n";
				error_message += FileListFormatter.format(matches);
				return null;
			}

			/*
			 * If its a directory, inform the user, and give suggestions
			 */
			if(matches.length == 1 && matches[0].is_directory) {
				error_message = "The path you provided is a directory. Here's the children:\n";
				var directory_path = matches[0].full_path + "/*";
				var sub_matches = FileManager.getMatches(directory_path);
				error_message += FileListFormatter.format(sub_matches);
				return null;
			}

			return matches[0].full_path;
		}
	};

})();
