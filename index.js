/* jshint undef: true, node: true */
"use strict";

var spawn = require('child_process').spawn;
var chalk = require('chalk');

var delay = 1000 * 60 * 10; // Every 10 minutes

var command = 'node';
var args = [ './node_modules/karma/bin/karma', 'start', './public/spec/karma_conf.js', '--reporters', 'dots', '--single-run' ];
var options = {
    cwd: '/projects/mercurial/charting/server'
};

//Infinite Loop!
setInterval(function(){
    var child = spawn(command, args, options);
    var date = new Date().toISOString().replace('T', ' ').substr(11, 8);
    var output = "";

    child.stdout.on('data', function (data) {
        output += data;
    });

    child.on('exit', function(){
        if( output.match(/FAILED/) ){
            console.log( chalk.red(date) + " " + chalk.blue("Error!") );
            console.log(output);
        } else {
            console.log( chalk.red(date) + " " + chalk.green('OK') );
        }
    });

}, delay);
