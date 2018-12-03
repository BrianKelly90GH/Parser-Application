/**
 * Export function to be used in the parser.js file
 */
exports.nounPhraseFunction = (userSentence, lexiEntries) => {

    /**
     * Return a new promise so that an asynchronous action can be called
     * If there is an error in the users input reject (return the error message)
     * If the operation is successful resolve in the promise(return the users sentence)
     */
    return new Promise((resolve, reject) => {

        let noun_phrase = [];

        let determiner;

        let word;

        determiner = lexiEntries.filter(entries => entries.root === userSentence[0]);

        if (determiner.length === 0) {

            reject('Sentence is not correct');
        }

        if (determiner[0].part_of_speech.includes('DET')) {

            userSentence.shift();

            noun_phrase.DET = determiner;

        } else {

            reject('Sentence is not correct');
        }

        word = lexiEntries.filter(entries => entries.root === userSentence[0]);

        if (word.length === 0) {

            reject('Sentence is not correct');
        }

        if (word[0].part_of_speech.includes('ADJ')) {

            userSentence.shift();

            noun_phrase.ADJ = word;
        }

        word = lexiEntries.filter(entries => entries.root === userSentence[0]);

        if (word.length === 0) {

            reject('Sentence is not correct');
        }

        if (word[0].part_of_speech.includes('N') && userSentence.length == 2) {

            reject('Sentence is not correct');
        }

        if (word[0].number.includes('plural') && noun_phrase.DET[0].root.includes('a')) {

            reject('Sentence is not correct');
        }

        if (word[0].part_of_speech.includes('N')) {

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