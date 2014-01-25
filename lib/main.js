#! /usr/bin/env node

var ArgumentParser = require('./arguments.js').ArgumentParser;
var FileManager = require('./file_manager.js').FileManager; 
var TemplatePathBuilder = require('./template_path_builder.js').TemplatePathBuilder;

/*
 * Read in command line arguments
 */
ArgumentParser.make();
var parameters = ArgumentParser.parameters();
var template = ArgumentParser.template();

/*
 * Build a full path from the template parameter
 */
var wildcard_template = TemplatePathBuilder.build(template);

/*
 * Get all of the files that match this template suggestion
 */
var matches = FileManager.getMatches(wildcard_template);

/*
 * If there are no matches, let the user know, and then die
 */
if(matches.length == 0) {
	console.log("Couldn't find any templates matching " + template);
	process.exit(0);
}

/*
 * If there are multiple matches, let the user know and print them out
 */
if(matches.length > 1) {
	console.log("Found many matches.");
	console.log("Be sure to pick unique names for templates.");
	console.log("Here are the matches:");
	var N = matches.length;
	for(var i=0; i<N; i++) {
		// format a string for directories
		var directory_string = matches[i].is_directory ? " (directory)" : "";
		console.log("\t- " + matches[i].name + directory_string);
	}
	process.exit(0);
}

/*
 * If its a directory, inform the user, and give suggestions
 */
if(matches.length == 1 && matches[0].is_directory) {
	console.log("The path you provided is a directory. Here's the children:");
	process.exit(0);
}
