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
     * If there is an error in reading in the file reject(return the error)
     * If the operation is successful resolve(return the file)
     */
    return new Promise((resolve, reject) => {

        //read in the lexicon file
        fileSystem.readFile('./lexicon.txt', 'utf8', (err, file) => {
            if (err) {
                reject({
                    error: err
                })
            } else {
                resolve(file)
            }
        });
    });
};