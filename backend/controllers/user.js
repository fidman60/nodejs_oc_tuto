const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email.toLowerCase()})
        .then(user => {
            if (!user) return res.status(401).json({error: "User not found"});
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (valid) return res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            "RANDOM_TOKEN_SECRET",
                            {expiresIn: '24h'}
                        ),
                    });
                    else return res.status(401).json({error: "Invalid password"})
                })
                .then(error => res.status(500).json({error}))
        })
        .catch(error => res.status(500).json({error}));
};

exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email.toLowerCase(),
                password: hash,
            });
            user.save()
                .then(() => res.status(201).json({message: "Utilisatuer créé !"}))
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}))
};
