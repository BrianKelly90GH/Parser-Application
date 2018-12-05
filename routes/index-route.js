/**
 * Import the parseFunction
 */
const parser = require('../parser');

/**
 * Import the express router from node_modules
 */
const router = require('express').Router();


//serve up the index page on /
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Parser-Application'
    });
})

//serve up the index page on /parse/:sentence and pass in the result
router.post('/parse/:sentence', (req, res) => {

    parser.parseFunction(req.body.sentence).then(result => {
        console.log(result);
        res.render('index', {
            title: 'Parser-Application',
            result: result
        });
    }).catch((err) => {
        console.log(`${err}`);
        res.render('index', {
            title: 'Parser-Application',
            error: err
        });
    })
})

module.exports = router;