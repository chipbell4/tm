var TemplatePathBuilder = require('../lib/template_path_builder.js').TemplatePathBuilder;
var expect = require('chai').expect;

describe("TemplatePathBuilder", function() {
	
	// old home directory so we can recover it
	var home_directory = null;

	beforeEach(function() {
		/*
		 * save the old home directory, so we can overwrite it
		 * in our tests
		 */
		home_directory = process.env.HOME;

	});

	afterEach(function() {
		/*
		 * Recover the original home directory
		 */
		process.env.HOME = home_directory;
	});

	it("Should form a correct wildcard path", function() {
		/*
		 * Test that the path is built correctly, with a wildcard
		 * for the extension, and including the home directory
		 */
		process.env.HOME = "/home/user";
		
		var template_name = 'path/to/template';

		var actual = TemplatePathBuilder.build(template_name);

		expect(actual).to.equal('/home/user/.tm/path/to/template*');
	});

	it("Should trim double slashes", function() {
		process.env.HOME = '/home/user';

		var template_name = 'path///to//template';

		var actual = TemplatePathBuilder.build(template_name);

		expect(actual).to.equal('/home/user/.tm/path/to/template*');
		var template_n
	});

	it("Should allow non-string types, and still return a valid path", function() {
		process.env.HOME = '/home/user';

		/*
		 * Optimist converts the empty string into a true, so we need to check that
		 * this value still can be passed as a template string
		 */
		var template_name = true;

		var actual = TemplatePathBuilder.build(template_name);

		expect(actual).to.equal('/home/user/.tm');

	});
});
