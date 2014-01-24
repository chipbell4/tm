#! /usr/bin/env node

var ArgumentParser = require('./arguments.js').ArgumentParser;

/*
 * Read in command line arguments
 */
ArgumentParser.make();

console.log(ArgumentParser.parameters());
console.log(ArgumentParser.template());
