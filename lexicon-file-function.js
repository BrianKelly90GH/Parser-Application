/**
 * Import the file system module from node.js core
 * This module provides an API for interacting with the file system
 * Documentation at (https://nodejs.org/api/fs.html#fs_file_system)
 */
const fileSystem = require('fs');


/**
 * Export function to be used in the parser.js file
 */
exports.getFile = () => {

    /**
     * Return a new promise so that an asynchronous action can be called
     * If there is an error in reading in the file reject in the promise(return the error)
     * If the operation is successful resolve in the promise(return the file)
     */
    return new Promise((resolve, reject) => {

        //read in the lexicon file
        fileSystem.readFile('./lexicon.txt', 'utf8', (err, file) => {

            //if error return the error
            if (err) {
                reject({
                    error: err
                })
            } else {
                /**
                 * if success base array object format on 
                 * the AHLT lecture 4 Lexicon entries for a simple parser
                 * then return the lexicon file
                 */
                resolve(
                    file.split('\n').map(filter => filter.split(' '))
                    .map(filther => ({
                        part_of_speech: filther[0],
                        root: filther[1],
                        number: filther[2],
                    }))
                )
            }
        });
    });
};