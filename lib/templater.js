var underscore = require('underscore');

exports.Templater = (function() {
	return {
		template: function(text, parameters) {
			var template_function = underscore.template(text);

			var return_message = "";
			try {
				return_message = template_function(parameters);
			}
			catch(e) {
				return_message = e.message;
			}
			return return_message;
		}
	};
})();
