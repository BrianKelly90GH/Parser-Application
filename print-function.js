/**
 * Export function to be used in the parser.js file
 * This function takes in a vaild sentence structure
 * This function takes in the users sentence
 * Returns a string in the form of the bracketed phrasal structure
 */
exports.printFunction = (userSentence, sentence) => {

    //if the array object has 2 elements return bracketed phrasal structure
    //Based on the structure of the array object
    if (Object.keys(userSentence).length == 2) {
        console.log(`[${sentence}] [Sentence Valid]`);

        return (`Bracketed phrasal structure : S[NP[DT[${userSentence.DET[0].root}]N[${userSentence.Word[0].root}]]]`);
    }

    //if the array object has 3 elements return bracketed phrasal structure
    //Based on the structure of the array object
    if (Object.keys(userSentence).length == 3) {
        console.log(`[${sentence}] [Sentence Valid]`);

        return (`Bracketed phrasal structure : S[NP[DT[${userSentence.DET[0].root}]JJ[${userSentence.ADJ[0].root}]N[${userSentence.Word[0].root}]]]`);
    }
    //if the array object has 4 elements return bracketed phrasal structure
    if (Object.keys(userSentence).length == 4) {

        //if the array object start noun_phrase has an adjective (green)
        //And the array object end noun_phrase has an adjective (green)
        //Return bracketed phrasal structure based on the structure of the array object
        if (userSentence.start_noun_phrase.ADJ && userSentence.end_noun_phrase.ADJ) {
            console.log(`[${sentence}] [Sentence Valid]`);

            return (`Bracketed phrasal structure : S[NP[DT[${userSentence.start_noun_phrase.DET[0].root}]JJ[${userSentence.start_noun_phrase.ADJ[0].root}]N[${userSentence.start_noun_phrase.Word[0].root}]VP[V[${userSentence.verb_phrase[0].root}]NP[DT[${userSentence.end_noun_phrase.DET[0].root}]JJ[${userSentence.end_noun_phrase.ADJ[0].root}]N[${userSentence.end_noun_phrase.Word[0].root}]]]]`);
        }
        //if the array object start noun_phrase has an adjective (green)
        //Return bracketed phrasal structure based on the structure of the array object
        if (userSentence.start_noun_phrase.ADJ) {
            console.log(`[${sentence}] [Sentence Valid]`);

            return (`Bracketed phrasal structure : S[NP[DT[${userSentence.start_noun_phrase.DET[0].root}]JJ[${userSentence.start_noun_phrase.ADJ[0].root}]N[${userSentence.start_noun_phrase.Word[0].root}]VP[V[${userSentence.verb_phrase[0].root}]NP[DT[${userSentence.end_noun_phrase.DET[0].root}]N[${userSentence.end_noun_phrase.Word[0].root}]]]]`);

        }
        //if the array object end noun_phrase has an adjective (green)
        //Return bracketed phrasal structure based on the structure of the array object
        if (userSentence.end_noun_phrase.ADJ) {
            console.log(`[${sentence}] [Sentence Valid]`);

            return (`Bracketed phrasal structure : S[NP[DT[${userSentence.start_noun_phrase.DET[0].root}]N[${userSentence.start_noun_phrase.Word[0].root}]VP[V[${userSentence.verb_phrase[0].root}]NP[DT[${userSentence.end_noun_phrase.DET[0].root}]JJ[${userSentence.end_noun_phrase.ADJ[0].root}]N[${userSentence.end_noun_phrase.Word[0].root}]]]]`);

        }
        //else if neither the array object start noun_phrase or end noun_phrase has no adjective (green)
        //Return bracketed phrasal structure based on the structure of the array object
        else {
            console.log(`[${sentence}] [Sentence Valid]`);

            return (`Bracketed phrasal structure : S[NP[DT[${userSentence.start_noun_phrase.DET[0].root}]N[${userSentence.start_noun_phrase.Word[0].root}]VP[V[${userSentence.verb_phrase[0].root}]NP[DT[${userSentence.end_noun_phrase.DET[0].root}]N[${userSentence.end_noun_phrase.Word[0].root}]]]]`);
        }
    }
};