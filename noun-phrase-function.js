/**
 * Export function to be used in the parser.js file
 */
exports.nounPhraseFunction = (userSentence, lexiEntries) => {

    console.log(userSentence);

    /**
     * Return a new promise so that an asynchronous action can be called
     * If there is an error in the users input reject (return the error message)
     * If the operation is successful resolve in the promise(return the users sentence)
     */
    return new Promise((resolve, reject) => {
        /**
         * Psuedo-code for the grammar of a noun phase. Based on rules_1.png
         * 
         * if the first segment in the sentenceArray is = to one of the Determiners in the lexicon file
         * set the noun_phase array fist segment to the article
         * 
         * else return failure message
         */

        //for storing a noun phase sentence or section of sentence
        let noun_phrase = [];

        //for storing the start of the sentence determiners (the or a)
        let determiner;

        determiner = lexiEntries.filter(entries => entries.root === userSentence[0]);

        console.log(determiner);

        if (determiner.length === 0) {

            reject('Sentence is not correct');
        } else if (determiner[0].part_of_speech.includes('DET')) {
            userSentence.shift();
            noun_phrase.DET = determiner;
        } else {

            reject('Sentence is not correct');
        }

        //for storing words of the userSentence
        let word;
        word = lexiEntries.filter(entries => entries.root === userSentence[0]);

        if (word.length === 0) {
            reject('Sentence is not correct');
        }
        if (word[0].part_of_speech.includes('ADJ')) {
            userSentence.shift();
            noun_phrase.ADJ = word;
        }
        word = lexiEntries.filter(entries => entries.root === userSentence[0]);
        console.log(word)

        if (word.length === 0) {
            reject('Sentence is not correct');
        } else if (word[0].part_of_speech.includes('N')) {
            noun_phrase.Word = word;
            if (noun_phrase.DET[0].root.includes('the')) {
                noun_phrase.DET[0].number = noun_phrase.Word[0].number;
            }
            userSentence.shift();
            resolve(noun_phrase);
        } else {
            reject('Sentence is not correct');
        }
    });
};