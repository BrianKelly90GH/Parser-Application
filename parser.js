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
readline.question(`Please enter a sentence to be parsed:  `, sentence => {

    //sentenceArray for storing the users sentence split up into array segments
    let sentenceArray;

    //lexiFile for string the lexicon parser rules
    let lexiFile;

    //get the lexicon entries formated the array of objects on the lecture 4 notes
    getLexiconFile.getFile().then(file => {

        //formated the array of objects on the lecture notes
        lexiFile = file;

        console.log(lexiFile);
    });

    //split the sentence in to an array of string of testing it against the lexicon entries
    sentenceArray = sentence
        .toLowerCase()
        .split('.')
        .join('')
        .split(' ');

    console.log(sentenceArray);

    readline.close();
});