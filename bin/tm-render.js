#! /usr/bin/env node

exports.command = {
	description: "Renders the template with the provided parameters"
};

if(require.main === module) {
	/*
	 * Read in command line arguments
	 */
	var args = require('../lib/arguments.js');
	/*
	 * Other libraries we'll need
	 */
	var fs = require('fs');
	var FileResolver = require('../lib/file_resolver.js').FileResolver;
	var Templater = require('../lib/templater.js').Templater;

	var template_full_path = FileResolver.resolve(args.template);

	/*
	 * If we couldn't resolve the template, print the error message
	 * and die
	 */
	if(template_full_path == null) {
		console.log(FileResolver.errorMessage());
		process.exit(0);
	}


	/*
	 * If we made it this far, we have a single match.
	 * Lets open it up and template it
	 */
	var file_contents = fs.readFileSync(template_full_path).toString();
	console.log(Templater.template(file_contents, args.parameters));

}
