#! /usr/bin/env node

exports.command = {
	description: "Renders the template with the provided parameters"
};

if(require.main === module) {
	var fs = require('fs');
	var underscore = require('underscore');
	var FileManager = require('../lib/file_manager.js').FileManager; 
	var TemplatePathBuilder = require('../lib/template_path_builder.js').TemplatePathBuilder;
	var FileListFormatter = require('../lib/file_list_formatter.js').FileListFormatter; 
	var Templater = require('../lib/templater.js').Templater;

	/*
	 * Read in command line arguments
	 */
	var args = require('../lib/arguments.js');

	/*
	 * Make sure args are provided
	 */
	if(args.template == null) {
		console.log("Usage tm render <template_name> [<parameter_list>]");
		process.exit(0);
	}

	/*
	 * Build a full path from the template parameter
	 */
	var wildcard_template = TemplatePathBuilder.build(args.template);

	/*
	 * Get all of the files that match this template suggestion
	 */
	var matches = FileManager.getMatches(wildcard_template);

	/*
	 * If there are no matches, let the user know, and then die
	 */
	if(matches.length == 0) {
		console.log("Couldn't find any templates matching " + args.template);
		process.exit(0);
	}

	/*
	 * If there are multiple matches, let the user know and print them out
	 */
	if(matches.length > 1) {
		console.log("Found many matches.");
		console.log("Be sure to pick unique names for templates.");
		console.log("Here are the matches:");
		console.log(FileListFormatter.format(matches));
		process.exit(0);
	}

	/*
	 * If its a directory, inform the user, and give suggestions
	 */
	if(matches.length == 1 && matches[0].is_directory) {
		console.log("The path you provided is a directory. Here's the children:");
		var directory_path = matches[0].full_path + "/*";
		var sub_matches = FileManager.getMatches(directory_path);
		console.log(FileListFormatter.format(sub_matches));
		process.exit(0);
	}

	/*
	 * Otherwise we have a single match. Lets open it up and template it
	 */
	var file_contents = fs.readFileSync(matches[0].full_path).toString();
	console.log(Templater.template(file_contents, args.parameters));

}
