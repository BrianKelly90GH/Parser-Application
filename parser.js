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
const lexiconFile = require('./lexicon-file-function');

/**
 * Import the lnoun-phrase-function
 */
const nounPhrase = require('./noun-phrase-function');



/**
 * call the getfile method in the lexicon-file-function file
 * once the function is executed(.then (used the returned data) ) 
 */
lexiconFile.getFileFunction().then(lexiFile => {

    /**
     * Words the user can input
     */
    console.log('The/a man/men/woman/women bite(s)/like(s) the green dog\n')

    /**
     * TODO: if there is time use express generator to create a simple web-app using pug
     * Ask the user a question
     */
    readline.question(`Please enter a sentence from the words above to be parsed:  `, sentence => {

        //sentenceArray for storing the users sentence split up into array segments
        let sentenceArray;

        //split the sentence in to an array of string of testing it against the lexicon entries
        sentenceArray = sentence
            .toLowerCase()
            .replace(/  +/g, ' ')
            .replace('.', ' ')
            .trim()
            .split(' ');

        /**
         * Psuedo-code for the grammar. Based on rules_1.png
         * 
         * if sentenceArray < 4 it has to be a noun phase
         * check against the lexicon entries
         * 
         * if error print failure
         * 
         * else print success
         */

        if (sentenceArray.length < 4) {
            nounPhrase.nounPhraseFunction(sentenceArray, lexiFile).then(noun_phrase => {
                if (noun_phrase === 'Sentence is not correct') {
                    console.log(noun_phrase);
                } else {
                    console.log(`your sentence [${sentence}] is correct`);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
        readline.close();
    });
}).catch((err) => {
    console.log(err);
});