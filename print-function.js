/**
 * Export function to be used in the parser.js file
 */
exports.printFunction = (userSentence) => {

    console.log(userSentence);

    if (Object.keys(userSentence).length == 2) {
        console.log(`S[NP[DT[${userSentence.DET[0].root}]N[${userSentence.Word[0].root}]]]`);
    }

    if (Object.keys(userSentence).length == 3) {
        console.log(`S[NP[DT[${userSentence.DET[0].root}]JJ[${userSentence.ADJ[0].root}]N[${userSentence.Word[0].root}]]]`);
    }
};