/**
 * A simple "class" for splitting up a parameter string
 * of the format "a=1,b=2"
 */
exports.ParameterSplitter = (function() {

	return {
		split: function(parameter_string) {
			/*
			 * Trim the string, and return if the string is empty
			 */
			parameter_string = parameter_string.trim();
			if(parameter_string == '') {
				return {};
			}

			/*
			 * Split by comma.
			 */
			var parameter_array = parameter_string.split(',');
			var parameter_count = parameter_array.length;

			/*
			 * Build the parameter object
			 */
			var parameter_obj = {};
			for(var i=0; i<parameter_count; i++) {
				// split up the parameter
				var parameter_tokens = parameter_array[i].split('=');

				/*
				 * If there isn't X=X, then the parameter is formatted
				 * incorrectly, so throw an error 
				 */
				if(parameter_tokens.length != 2) {
					throw new Error("Invalid parameter: " + parameter_array[i]);
				}

				/*
				 * Otherwise, parse and add to the parameter object
				 */
				parameter_obj[ parameter_tokens[0] ] = parameter_tokens[1];
			}

			return parameter_obj;

		}
	}

})();

