# Loopy - the dummy program to run a command every 10 minutes

## What is it?

Loopy is a ModeJS script to run a command line in a loop and alert you if a special pattern is found in the output.

The default delay is to run the command every 10 minutes but it can be changed while the program is running.

Every time the command is performed, its standard ouput is scanned and if a particular error pattern is matched, the program will display a red error and the output received. If the pattern is not found, the program will display a green ok. In any scenario the program will display the hours and minutes.

I am using Loopy to run my client side tests and alert me if some are failing.

## Installation

Clone the repo: `git clone https://github.com/Kylir/loopy.git`

Install the depencies: `npm install`

Edit the command in the code:
```
var command = 'ls';
var args = [ '-l', /dev'];
var options = { cwd: '/path/you/want' };
```

Edit the error pattern:
```
var errorPattern = /FAILED/;
```

## Usage

Start the program with: `node index.js`

While the script is running it is possible to enter some commands:

* \+ : will increase the delay by 1 minute.
* \- : will decrease the delay by 1 minute.
* delay : will display the current delay.
* now : will run the command at once and restart the timer.
* quit : will stop the program.
* anything else: will display the list of available commands.



