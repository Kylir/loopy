/* jshint undef: true, node: true */
"use strict";

var spawn = require('child_process').spawn;
var chalk = require('chalk');

var delay = 1000 * 60 * 10; // 10 minutes
var MAX_DELAY = 20 * 60 * 1000; //20 minutes
var MIN_DELAY = 60 * 1000; //1 minute

var command = 'node';
var args = [ './node_modules/karma/bin/karma', 'start', './public/spec/karma_conf.js', '--reporters', 'dots', '--single-run' ];
var options = {
    cwd: '/projects/mercurial/charting/server'
};
var errorPattern = /FAILED/;

var loopFunction = function(){
    var child = spawn(command, args, options);
    var date = new Date().toISOString().replace('T', ' ').substr(11, 8);
    var output = "";
    child.stdout.on('data', function (data) {
        output += data;
    });
    child.on('exit', function(){
        if( output.match(errorPattern) ){
            console.log( chalk.red(date) + " " + chalk.blue("Error!") );
            console.log(output);
        } else {
            console.log( chalk.red(date) + " " + chalk.green('OK') );
        }
    });
};

var testLoop = setInterval(loopFunction, delay);
console.log("Loopy started. Delay is: " + delay/60000 + " mins.");

//Now let's defined some listeners so that the user can change the delay on the fly
process.stdin.on('data', function(inputBuffer){
    var input = inputBuffer.toString();
    //Display current delay
    if( input.match(/delay/) ){
        console.log("Current delay is " + (delay/60000) + " min(s).");
    //Increase delay by 1 min
    } else if( input.match(/\+/) ){
        delay = changeDelayAndResetInterval( delay, 60000 );
    //Decrease delay by 1 min
    } else if( input.match(/\-/) ){
        delay = changeDelayAndResetInterval( delay, -60000 );
    //Stop the program
    } else if( input.match(/quit/) ){
        console.log("Exiting.");
        clearInterval(testLoop);
        process.exit();
    //Run the tests now
    } else if( input.match(/now/) ){
        console.log("Running command now.");
        clearInterval(testLoop);
        loopFunction();
        testLoop = setInterval(loopFunction, delay);
    //Unknown command
    } else {
        console.log( chalk.blue("Error!") + " Unknonw command. Use delay, +, -, quit or now.");
    }
});

/**
 * Function to change the value of the delay and reset the timer function.
 * Can be used to reset the function if inc is equals to 0.
 *
 * @param delay The value of the current delay
 * @param inc The value of the increase (can be negative)
 */
function changeDelayAndResetInterval( delay, inc ){
    var newDelay = delay + inc;
    if( newDelay < MIN_DELAY ){
        console.log( chalk.blue("Error: Delay can't be below " + MIN_DELAY/60000 + " minutes.") );
        return delay;
    } else if( newDelay > MAX_DELAY ){
        console.log( chalk.blue("Error: Delay can't exceed " + MAX_DELAY/60000 + " minutes.") );
        return delay;
    } else {
        if( inc !== 0 ) {
            console.log(chalk.green('OK!') + " Changing delay to " + newDelay / 60000 + " minutes");
        }
        clearInterval(testLoop);
        testLoop = setInterval(loopFunction, newDelay);
        return newDelay;
    }
}
