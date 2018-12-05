const parser = require('../parser');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Parser-Application'
    });
})

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