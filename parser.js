/**
 * Import the  readline module from node.js core
 * This module provides an interface for reading data from a Readable stream
 * Documentation at (https://nodejs.org/api/readline.html#readline_readline)
 */
// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

//Import the lexicon-file-function
const lexiconFile = require('./lexicon-file-function');

//Import the noun-phrase-function
const nounPhrase = require('./noun-phrase-function');

//Import the noun-phrase-function
const verbPhrase = require('./verb-phrase-function');

//Import the print-function
const print = require('./print-function');

/**
 * Export function to be used in the parser.js file
 */
exports.parseFunction = (sentence) => {

    /**
     * Return a new promise so that an asynchronous action can be called
     * If there is an error in the users input reject (return the error message)
     * If the operation is successful resolve in the promise(return the users sentence)
     */
    return new Promise((resolve, reject) => {


        /**
         * call the getfile method in the lexicon-file-function file
         * once the function is executed(.then (used the returned data) ) 
         */
        lexiconFile.getFileFunction().then(lexiFile => {

            //Words the user can input
            //console.log('\nAcceptable Words: [ The/a man/men/woman/women bite(s)/like(s) the green dog ]')

            /**
             * TODO: if there is time use express generator to create a simple web-app using pug
             * for now ask the user a question
             */
            //readline.question(`\nPlease enter a sentence from the words above to be parsed:  `, sentence => {

            //sentenceArray for storing the users sentence split up into array segments
            let sentenceArray;

            //split the sentence in to an array of string of testing it against the lexicon entries
            sentenceArray = sentence.toLowerCase().replace(/  +/g, ' ').replace('.', ' ').trim().split(' ');


            if (sentenceArray.length <= 3) {
                nounPhrase.nounPhraseFunction(sentenceArray, lexiFile).then(noun_phrase => {
                    let result = print.printFunction(noun_phrase, sentence);
                    resolve(result);
                }).catch((err) => {
                    console.log(`\x1b[31m`, `You entered [${sentence}] [${err}]`);
                    reject(`You entered [${sentence}] [${err}]`);
                })
            } else if (sentenceArray.length > 3) {
                nounPhrase.nounPhraseFunction(sentenceArray, lexiFile).then(noun_phrase => {

                    let finalSentence = [];

                    finalSentence.start_noun_phrase = noun_phrase;

                    verbPhrase.verbPhraseFunction(sentenceArray, finalSentence, lexiFile).then(final_sentence => {
                        if (final_sentence.start_noun_phrase.Word[0].number === 'singular' && final_sentence.verb_phrase[0].number === 'singular') {
                            console.log(`\x1b[31m`, `You entered [${sentence}] [Sentence is not correct]`);
                            reject(`You entered [${sentence}] [Sentence is not correct]`);
                        } else {
                            final_sentence.done = true;
                            let result = print.printFunction(final_sentence, sentence);
                            resolve(result);
                        }

                    }).catch((err) => {
                        console.log(`\x1b[31m`, `You entered [${sentence}] [${err}]`);
                        reject(`You entered [${sentence}] [${err}]`);
                    })

                }).catch((err) => {
                    console.log(`\x1b[31m`, `You entered [${sentence}] [${err}]`);
                    reject(`You entered [${sentence}] [${err}]`);
                })
            }
            //readline.close();
            //});
        }).catch((err) => {
            console.log(err);
        })
    });
}