var ParameterSplitter = require('../lib/parameter_splitter.js').ParameterSplitter;
var expect = require('chai').expect;

describe("ParameterSplitter", function() {
	it("Should return an empty hash for an empty string", function() {
		
		expect(ParameterSplitter.split('')).to.be.empty;
	});

	it("Should split by comma and then equals to parse apart parameters", function() {
		
		var parameter_string = 'apple=1,banana=2';

		expect(ParameterSplitter.split(parameter_string))
			.to.deep.equal({ apple:'1', banana:'2' });

	});
	
	it("Should throw an exception for invalidly formatted parameters", function() {
		
		var parameter_string = 'apple=1,banana';

		expect(function() { ParameterSplitter.split(parameter_string); }).to.throw(Error);

		parameter_string = 'apple=1,banana==2';
		
		expect(function() { ParameterSplitter.split(parameter_string); }).to.throw(Error);

	});
});
