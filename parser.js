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
 * call the getfile method in the lexicon-file-function file
 * once the function is executed(.then (used the returned data) ) 
 */
getLexiconFile.getFile().then(lexiFile => {

    console.log(lexiFile);

    /**
     * TODO: if there is time use express generator to create a simple web-app using pug
     * Ask the user a question
     */
    readline.question(`Please enter a sentence to be parsed:  `, sentence => {

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
            /**
             * Psuedo-code for the grammar of a noun phase. Based on rules_1.png
             * 
             * if the first segment in the sentenceArray is = to one of the Determiners
             * set the noun_phase array fist segment to the article
             * 
             * else print failure
             */

            //for storing a noun phase sentence or section of sentence
            let noun_phase;

            //for storing the start of the sentence Determiners /articles (the or a)
            let article;

            article = lexiFile.filter(entries => entries.root === sentenceArray[0]);

            if (article.length === 0) {
                console.log('Sentence is not correct')
            } else if (article[0].part_of_speech.includes('DET')) {
                console.log(article);
            } else {
                console.log('Sentence is not correct')
            }
        }
        readline.close();
    });
});