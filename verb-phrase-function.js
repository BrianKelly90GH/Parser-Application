/**
 * Import the noun-phrase-function
 */
const nounPhrase = require('./noun-phrase-function');

/**
 * Export function to be used in the parser.js file
 */
exports.verbPhraseFunction = (userSentence, finalSentence, lexiEntries) => {

    /**
     * Return a new promise so that an asynchronous action can be called
     * If there is an error in the users input reject (return the error message)
     * If the operation is successful resolve in the promise(return the users sentence)
     */
    return new Promise((resolve, reject) => {

        let verb;

        verb = lexiEntries.filter(entries => entries.root === userSentence[0]);

        if (verb.length === 0) {
            reject('Sentence is not correct');
        }

        if (verb[0].part_of_speech.includes('V')) {
            userSentence.shift();
            finalSentence.verb_phrase = verb;
        } else {
            reject('Sentence is not correct');
        }

        nounPhrase.nounPhraseFunction(userSentence, lexiEntries).then(noun_phrase => {
            finalSentence.end_noun_phrase = noun_phrase;
            resolve(finalSentence);
        }).catch((err) => {
            reject(err);
        });
    });
};