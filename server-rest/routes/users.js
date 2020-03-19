const router = require('express').Router();
//const { Router } = require('express');
//const router = Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {  //puede ser sin el /add post y get /
    const { username } = req.body;  

    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User addded!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;