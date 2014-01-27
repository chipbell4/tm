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
	var spawn = require('child_process').spawn;

}
