//Import the lexicon-file-function
const lexiconFile = require('./lexicon-file-function');

//Import the noun-phrase-function
const nounPhrase = require('./noun-phrase-function');

//Import the noun-phrase-function
const verbPhrase = require('./verb-phrase-function');

//Import the print-function
const print = require('./print-function');

/**
 * Export function to be used in the index-route.js file
 */
exports.parseFunction = (sentence) => {

    /**
     * Return a new promise so that an asynchronous action can be called
     * If there is an error in the users input reject (return the error message)
     * If the operation is successful resolve in the promise(return the bracketed phrasal structure)
     */
    return new Promise((resolve, reject) => {


        /**
         * call the getfile method in the lexicon-file-function file which returns a promise
         * which in turn returns array of objects based on the lexiEntries
         * once the function is executed(.then (used the returned arrayobject) ) 
         */
        lexiconFile.getFileFunction().then(lexiFile => {

            //sentenceArray for storing the users sentence split up into array segments
            let sentenceArray;

            //split the sentence into an array of string for testing it against the lexicon entries
            sentenceArray = sentence.toLowerCase().replace(/  +/g, ' ').replace('.', ' ').trim().split(' ');

            /**
             * the rules for a sentence containing 3 words or less are based on 
             * psuedo-code/rules-for-sentence<=3.txt
             * 
             * call the nounPhraseFunction which returns a promise
             * 
             * which in turn returns a valid or invalid noun_phrase
             * 
             * if (vaild)
             *      function/promise is complete then (.then)
             * 
             *      call the print function which returns a string in the bracketed phrasal structure
             * 
             *      then let results be equeal to the returned string
             * 
             *      then resolve this functions promise (return the string)
             * 
             * if (invaild)
             *      the catch block is fired
             *      then reject this functions promise
             */
            if (sentenceArray.length <= 3) {

                //call the nounPhraseFunction and pass in the sentenceArray and lexiFile
                nounPhrase.nounPhraseFunction(sentenceArray, lexiFile).then(noun_phrase => {

                    //result = be equeal to the returned string
                    let result = print.printFunction(noun_phrase, sentence);

                    //resolve this fuctions promise (return result)
                    resolve(result);

                    //if the nounPhraseFunctions promise was rejected 
                    //this functions promise also must be rejected
                }).catch((err) => {

                    reject(`You entered [${sentence}] [${err}]`);
                })
            }

            /**
             * the rules of a sentence containing more than 3 words or less are based on 
             * psuedo-code/rules-for-sentence>3.txt
             * 
             * call the nounPhraseFunction which returns a promise
             * 
             * which in turn returns a valid or invalid noun_phrase
             * 
             * if (vaild)
             *      function/promise is complete then (.then)
             *      let the finalSentence.start_noun_phrase = to the returned noun_phrase
             *      then call the verbPhraseFunction which returns a promise and pass in finalSentence 
             *      which in turn returns a valid or invalid finalSentence
             * 
             *          if(vaild)
             *              check against singular and plural in the sentence
             *              if these are ok resolve this functions promise
             *              if not reject this functions promise
             * 
             *          if(invalid)
             *              reject this functions promise
             * 
             * if (invaild)
             *      the catch block is called
             *      then reject this fuctions promise
             */
            else if (sentenceArray.length > 3) {

                //call the nounPhraseFunction and pass in the sentenceArray and lexiFile
                nounPhrase.nounPhraseFunction(sentenceArray, lexiFile).then(noun_phrase => {

                    //declare finalSentence array
                    let finalSentence = [];

                    //finalSentence.start_noun_phrase = to the noun_phrase;
                    finalSentence.start_noun_phrase = noun_phrase;

                    //call the verbPhraseFunction and pass in the sentenceArray,finalSentence, and lexiFile
                    verbPhrase.verbPhraseFunction(sentenceArray, finalSentence, lexiFile).then(final_sentence => {

                        //check to see are both noun and verb singular
                        //if yes reject this functions promise
                        if (final_sentence.start_noun_phrase.Word[0].number === 'singular' && final_sentence.verb_phrase[0].number === 'singular') {
                            console.log(`[${sentence}] [Sentence is not correct]`);
                            reject(`You entered [${sentence}] [Sentence is not correct]`);
                        }

                        //check to see are both noun and verb plural
                        //if yes reject this functions promise
                        if (final_sentence.start_noun_phrase.Word[0].number === 'plural' && final_sentence.verb_phrase[0].number === 'plural') {
                            console.log(`[${sentence}] [Sentence is not correct]`);
                            reject(`You entered [${sentence}] [Sentence is not correct]`);
                        }
                        //else resolve this functions promise
                        else {
                            final_sentence.done = true;
                            let result = print.printFunction(final_sentence, sentence);
                            resolve(result);
                        }

                        //if the verbPhraseFunction promise was rejected 
                        //this functions promise also must be rejected
                    }).catch((err) => {
                        console.log(`[${sentence}] [${err}]`);
                        reject(`You entered [${sentence}] [${err}]`);
                    })

                    //if the nounPhraseFunctions promise was rejected 
                    //this functions promise also must be rejected
                }).catch((err) => {
                    console.log(`[${sentence}] [${err}]`);
                    reject(`You entered [${sentence}] [${err}]`);
                })
            }

            //if the getFileFunction promise was rejected 
            //log the error to the console
        }).catch((err) => {
            console.log(err);
        })
    });
}