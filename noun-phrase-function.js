/**
 * Export function to be used in the parser.js file
 * This function takes in the userSentence(in array form)
 * This function takes in a lexiEntries array object
 */
exports.nounPhraseFunction = (userSentence, lexiEntries) => {

    /**
     * Return a new promise so that an asynchronous action can be called
     * If there is an error in the users input reject (return the error message)
     * If the operation is successful resolve in the promise(return a vilid noun_phrase)
     */
    return new Promise((resolve, reject) => {

        let noun_phrase = [];

        //declare determiner this stores determiner segment in the lexiEntries 
        //that match the determiner in the sentence
        let determiner;

        //declare word this stores either the adjective or noun segment in the lexiEntries 
        //that match either the adjective or noun in the sentence
        let word;

        //filther through the lexiEntries and return the determiner segment 
        //that matches the determiner in the sentence
        determiner = lexiEntries.filter(entries => entries.root === userSentence[0]);

        //if the determiner is empty the determiner does not exist in the lexiEntries
        //reject the promise
        if (determiner.length === 0) {
            reject('Sentence is not correct');
        }

        //if the determiner exists 
        //set the noun_phrase.DET(determiner) = to the determiner 
        if (determiner[0].part_of_speech.includes('DET')) {
            userSentence.shift();
            noun_phrase.DET = determiner;

        }
        //else reject the promise
        else {
            reject('Sentence is not correct');
        }

        //filther through the lexiEntries and return the adjective segment 
        //that matches the adjective in the sentence
        word = lexiEntries.filter(entries => entries.root === userSentence[0]);

        //if the word is empty
        //reject the promise
        if (word.length === 0) {
            reject('Sentence is not correct');
        }

        //if the word = to an adjective 
        //set the noun_phrase.ADJ(adjective) = to the adjective
        if (word[0].part_of_speech.includes('ADJ')) {
            userSentence.shift();
            noun_phrase.ADJ = word;
        }

        //filther through the lexiEntries and return the noun segment 
        //that matches the adjective in the sentence
        word = lexiEntries.filter(entries => entries.root === userSentence[0]);

        //if the word is empty
        //reject the promise
        if (word.length === 0) {
            reject('Sentence is not correct');
        }

        //if the word = to a noun and there is another word after this the sentence is incorrect
        //reject the promise
        if (word[0].part_of_speech.includes('N') && userSentence.length == 2) {
            reject('Sentence is not correct');
        }

        //if the noun is plural and the determiner = a this the sentence is incorrect
        //example a men or a women
        //reject the promise
        if (word[0].number.includes('plural') && noun_phrase.DET[0].root.includes('a')) {
            reject('Sentence is not correct');
        }

        //if the word = to an noun 
        //set the noun_phrase.Word = to the noun
        //resolve the promise
        if (word[0].part_of_speech.includes('N')) {
            noun_phrase.Word = word;
            userSentence.shift();
            resolve(noun_phrase);

        }
        //else reject the promise
        else {
            reject('Sentence is not correct');
        }
    });
};