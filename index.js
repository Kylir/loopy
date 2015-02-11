/* jshint undef: true, node: true */
"use strict";

var spawn = require('child_process').spawn;
var chalk = require('chalk');

var delay = 1000 * 60 * 5; // Every 5 minutes

var command = 'node';
var args = [ './node_modules/karma/bin/karma', 'start', './public/spec/karma_conf.js', '--reporters', 'dots', '--single-run' ];
var options = {
    cwd: '/projects/mercurial/charting/server'
};

//Infinite Loop!
setInterval(function(){
    var child = spawn(command, args, options);
    var date = new Date().toISOString().replace('T', ' ').substr(11, 8);
    var errorOutput = "";

    child.stderr.on('data', function (data) {
        errorOutput += data;
    });

    child.on('exit', function(){
        if( errorOutput.length > 0 ){
            console.log( chalk.red(date) + " " + chalk.blue("Error!") );
            console.log(errorOutput);
        } else {
            console.log( chalk.red(date) + " " + chalk.green('OK') );
        }
    });

}, delay);
