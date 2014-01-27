/*
 * Provides convenient access to command line entries
 */
var ParameterSplitter = require('./parameter_splitter').ParameterSplitter;

module.exports = (function() {
	/*
	 * Read the arguments from the command line
	 */
	var args = process.argv;
	var arg_length = process.argv.length;
	return {
	
		// the subcommand (render, edit, etc.)
		subcommand: arg_length > 1 ? args[1] : null,
	
	 	// the template to work with
	 	template: arg_length > 2 ? args[2] : null,

	 	// the parameters for the template (if required)
	 	parameters: arg_length > 3 ? ParameterSplitter.split(args[3]) : {},

	};

})();
