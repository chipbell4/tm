#! /usr/bin/env node

var ArgumentParser = require('./arguments.js').ArgumentParser;
var FileManager = require('./file_manager.js').FileManager; 

/*
 * Read in command line arguments
 */
ArgumentParser.make();
var parameters = ArgumentParser.parameters();
var template = ArgumentParser.template();

/*
 * If the provided template doesn't exist, report and bail
 */
if(! FileManager.exists(template) ) {
	console.log("TEMPLATE DOESN'T EXIST");
	process.exit();
}

/*
 * If its a directory, provide suggestions
 */
if( FileManager.isDirectory(template) ) {
	console.log("DIRECTORY");
	process.exit();
}

/*
 * Otherwise, get file contents and template out with underscore
 */
