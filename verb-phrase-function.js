/**
 * Import the noun-phrase-function
 */
const nounPhrase = require('./noun-phrase-function');

/**
 * Export function to be used in the parser.js file
 * This function takes in the userSentence(in array form)
 * This function takes in a finalSentence array object
 * This function takes in a lexiEntries array object
 */
exports.verbPhraseFunction = (userSentence, finalSentence, lexiEntries) => {

    /**
     * Return a new promise so that an asynchronous action can be called
     * If there is an error in the users input reject promise (return the error message)
     * If the operation is successful resolve in the promise(return a vaild finalSentence)
     */
    return new Promise((resolve, reject) => {

        //declare verb this stores verb segment in the lexiEntries that match the verb in the sentence
        let verb;

        //filther through the lexiEntries and return the verb segment that matches the verb in the sentence
        verb = lexiEntries.filter(entries => entries.root === userSentence[0]);

        //if the verb is empty the verb does not exist in the lexiEntries
        //reject the promise
        if (verb.length === 0) {
            reject('Sentence is not correct');
        }
        //if the verb exists 
        //set the finalSentence.verb_phrase = to the verb
        if (verb[0].part_of_speech.includes('V')) {
            userSentence.shift();
            finalSentence.verb_phrase = verb;
        }
        //else reject the promise
        else {
            reject('Sentence is not correct');
        }

        //call the nounPhraseFunction to get the noun_phrase after the verb
        nounPhrase.nounPhraseFunction(userSentence, lexiEntries).then(noun_phrase => {
            finalSentence.end_noun_phrase = noun_phrase;
            resolve(finalSentence);
        }).catch((err) => {
            reject(err);
        });
    });
};