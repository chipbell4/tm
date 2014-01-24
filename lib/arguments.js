/*
 * Wraps the optimist libraries for a single "validation-style" approach
 */
var optimist = require('optimist');
var ParameterSplitter = require('./parameter_splitter').ParameterSplitter;

var ArgumentParser = (function() {
	var argv;

	return {

		/**
		 * Creates a new validator from the command line arguments
		 */
		make : function() {
			argv = optimist
				
				// the usage string
				.usage('Usage: $0 -t <template_name> [-p parameter_values]')

				// Enforce that a template name is provided
				.demand(['t'])

				// Provide a default value for the parameter string (no parameters)
				.default({ p : '' })

				.argv;
		},
		
		/**
		 * Gets the template parameters passed in the command line
		 */
		parameters: function() {
			return ParameterSplitter.split(argv.p);
		},

		/**
		 * Gets a path to the passed template
		 */
		template: function() {
			/*
			 * replace dots with / to get a path
			 */
			return argv.t.replace(/\./g, '/');
		}
	};

})();

exports.ArgumentParser = ArgumentParser;
