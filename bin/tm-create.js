#! /usr/bin/env node

exports.command = {
	description: "Creates a new template matching the provided name"
}

if(require.main === module) {
	/*
	 * Read in command line arguments
	 */
	var args = require('../lib/arguments.js');
	
	/*
	 * Other libraries we'll need
	 */
	var mkdirp = require('mkdirp');
	var path = require('path');
	var spawn = require('child_process').spawn;
	var TemplatePathBuilder = require('../lib/template_path_builder.js').TemplatePathBuilder;

	/*
	 * If no template is provided, bail out
	 */
	if(args.template == null) {
		console.log("You must provide a template");
		process.exit(0);
	}

	/*
	 * Build the full path, removing any wildcards
	 */
	var template_full_path = TemplatePathBuilder.build(args.template);
	template_full_path = template_full_path.replace(/\*/g, '');

	/*
	 * Create the directory name
	 */
	var dir_name = path.dirname(template_full_path);
	mkdirp.sync(dir_name);

	/*
	 * Open the file up for editing (if possible)
	 */
	if(process.env.EDITOR == null) {
		// they don't have an editor defined. Report and bail
		console.log("You don't have an editor defined. set the EDITOR env variable and then try again");
		process.exit(0);
	}

	spawn(process.env.EDITOR, [template_full_path], {stdio: 'inherit'});	
}
