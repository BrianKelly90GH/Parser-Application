/**
 * Export function to be used in the parser.js file
 */
exports.printFunction = (userSentence, sentence) => {

    if (Object.keys(userSentence).length == 2) {

        console.log(`Bracketed phrasal structure : S[NP[DT[${userSentence.DET[0].root}]N[${userSentence.Word[0].root}]]]`);

        console.log(`\x1b[32m`, `You entered [${sentence}] [Sentence Valid]`);
    }

    if (Object.keys(userSentence).length == 3) {

        console.log(`Bracketed phrasal structure : S[NP[DT[${userSentence.DET[0].root}]JJ[${userSentence.ADJ[0].root}]N[${userSentence.Word[0].root}]]]`);

        console.log(`\x1b[32m`, `You entered [${sentence}] [Sentence Valid]`);
    }
    if (Object.keys(userSentence).length == 4) {

        if (userSentence.start_noun_phrase.ADJ) {
            print(sentence);
            console.log(`\x1b[32m`, `S[NP[DT[${userSentence.DET[0].root}]JJ[${userSentence.ADJ[0].root}]N[${userSentence.Word[0].root}]]]`);
        } else {

        }
    }
};