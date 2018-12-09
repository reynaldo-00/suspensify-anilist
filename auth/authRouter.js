const express = require('express');
const bcrypt = require('bcrypt');

const generateToken = require('./generateToken');
const router = express.Router();

router.get('/login', login);
router.get('/register', register);

module.exports = router;

function login (req, res) {
    // implement user login
    const creds = req.body;

    if(!creds.username || !creds.password) {
        res.status(422).json({message: 'username and password both required'});
        return;
    }

    db('users').where({username: creds.username}).first()
    .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)){
            const token = generateToken(user);
            res.status(200).json({message: 'success', token})
        } else {
            res.status(401).json({ message: 'error loggin in' });
        }
    })
    .catch(err => res.json(err))
}

function register (req, res) {
    // implement user registration
    const creds = req.body;

    if(!creds.username || !creds.password) {
        res.status(422).json({message: 'username and password both required'});
        return;
    }
    creds.password = bcrypt.hashSync(creds.password, 8);

    db('users')
        .insert(creds)
        .then(ids => {
            const token = generateToken(creds);
            res.status(201).json({ids, token})
        })
        .catch(err => res.json(err));
}
