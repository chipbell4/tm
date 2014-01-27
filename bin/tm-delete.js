#! /usr/bin/env node

exports.command = {
	description: "Destroys a template, if it exists"
};

if(require.main === module) {
	/*
	 * Read in command line arguments
	 */
	var args = require('../lib/arguments.js');

	/*
	 * Other libraries we'll need
	 */
	var FileResolver = require('../lib/file_resolver.js').FileResolver;

	var template_full_path = FileResolver.resolve(args.template);

	/*
	 * If the file wasn't found, bail out
	 */
	if(template_full_path == null) {
		console.log(FileResolver.errorMessage());
		process.exit(0);
	}

	/*
	 * Remove the file
	 */
	require('fs').unlink(template_full_path);

	console.log("Removed template successfully");
}
