exports.FileListFormatter = (function() {
	return {
		format: function(file_list) {
			var formatted_elements = file_list.map(function(file) {
				// format different if its a directory
				var directory_string = file.is_directory ? " (Directory)" : "";

				return "\t- " + file.relative_path + directory_string;
			});

			return formatted_elements.join('\n');
		}
	};
})();
