/**
 * Import the  readline module from node.js core
 * This module provides an interface for reading data from a Readable stream
 * Documentation at (https://nodejs.org/api/readline.html#readline_readline)
 */
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Import the lexicon-file-function
 */
const getLexiconFile = require('./lexicon-file-function');

/**
 * TODO: if there is time use express generator to create a simple web-app using pug
 * Ask the user a question
 */
readline.question(`Please enter a sentence to be parsed:  `, (sentence) => {
    console.log(`${sentence}`);
    readline.close();
})

//get the lexiccon file for testing
getLexiconFile.getFile().then(file => {
    console.log(file);
})