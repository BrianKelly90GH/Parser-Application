/**
 * Import the file system module from node.js core
 * This module provides an API for interacting with the file system
 * Documentation at (https://nodejs.org/api/fs.html#fs_file_system)
 */
const fileSystem = require('fs');


/**
 * Export function to be used in the parser.js file
 */
exports.getFileFunction = () => {

    /**
     * Return a new promise so that an asynchronous action can be called
     * If there is an error in reading in the file reject in the promise(return the error)
     * If the operation is successful resolve in the promise(return the file)
     */
    return new Promise((resolve, reject) => {

        //read in the lexicon file
        fileSystem.readFile('./lexicon.txt', 'utf8', (err, file) => {

            //if error return the error message
            if (err) {
                reject('There was an error reading in the file')
            } else {
                /**
                 * if success base lexicon array object format on 
                 * the AHLT lecture 4 Lexicon entries for a simple parser
                 * part_of_speech = determiner, verb, adjective or noun
                 * root = the word
                 * number = singular or  plural
                 * then return the object structured lexicon entries
                 */
                resolve(
                    file.split('\n').map(entries => entries.split(' ')).map(entries => ({
                        part_of_speech: entries[0],
                        root: entries[1],
                        number: entries[2],
                    }))
                )
            }
        });
    });
};