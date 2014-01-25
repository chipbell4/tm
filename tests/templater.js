var Templater = require('../lib/templater.js').Templater;
var expect = require('chai').expect;

describe("Templater", function() {
	it("Should return the templated file if all variables are provided", function() {
		
		var result = Templater.template("Hello <%= x %>", { x : 1 });

		expect(result).to.equal("Hello 1");
	});

	it("Should return a reasonable message if a variable is missing", function() {
	
		var result = Templater.template("Hello <%= x %>", {});

		expect(result).to.be.ok;
		
	});
});
