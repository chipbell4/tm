
var expect = require('chai').expect;

describe("File List Formatter", function() {
	
	it("Should format nicely", function() {
		
		var file_list = [
			{ name: 'a', is_directory: true },
			{ name: 'b', is_directory: false },
			{ name: 'c', is_directory: true }
		];

		var FileListFormatter = require('../lib/file_list_formatter.js').FileListFormatter;
	
		var actual = FileListFormatter.format(file_list);

		var expected = "\t- a (Directory)\n";
		expected += "\t- b\n";
		expected += "\t- c (Directory)";

		expect(actual).to.equal(expected);

	});
});
