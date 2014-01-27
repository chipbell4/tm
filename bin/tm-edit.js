#! /usr/bin/env node

exports.command = {
	description: "Opens the provided template to be editted"
};

if(require.main === module) {
	/*
	 * Read in command line arguments
	 */
	var args = require('../lib/arguments.js');
	/*
	 * Other libraries we'll need
	 */
	var spawn = require('child_process').spawn;
	var FileResolver = require('../lib/file_resolver.js').FileResolver;

	var template_full_path = FileResolver.resolve(args.template);

	/*
	 * If we couldn't resolve it, print the error message and die
	 */
	if(template_full_path == null) {
		console.log(FileResolver.errorMessage());
		process.exit(0);
	}

	/*
	 * Otherwise we have a single match. Let's edit it
	 */
	if(process.env.EDITOR == null) {
		// they don't have an editor defined. Report and bail
		console.log("You don't have an editor defined. set the EDITOR env variable and then try again");
		process.exit(0);
	}

	spawn(process.env.EDITOR, [template_full_path], {stdio: 'inherit'});	

}
