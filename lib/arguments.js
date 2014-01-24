/*
 * Wraps the optimist libraries for a single "validation-style" approach
 */
var optimist = require('optimist');

var ArgumentValidator = (function() {
	var argv;

	return {

		/**
		 * Creates a new validator from the command line arguments
		 */
		make : function() {
			argv = optimist.argv;
			validate();
		},

	 	/**
		 * Returns true if the validation passes
		 */
		passes : function() {
			return false;
		},

	 	/**
		 * Returns an array with all of the error messages
		 */
	 	errorMessage: function() {
			return [];
		},

		/**
		 * Gets the arguments passed to the program from the command line
		 */
		getArguments: function() {
			return {};
		}	  
	};
})();
