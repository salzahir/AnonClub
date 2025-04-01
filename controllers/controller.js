const {body, validationResult} = require('express-validator');
const db = require('../db/queries');

function getHome(req, res) {
    res.render('index', { title: 'Home', user: null }); // Merge both into one object
}


module.exports = {
    getHome
};