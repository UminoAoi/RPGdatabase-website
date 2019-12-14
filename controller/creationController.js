const express = require('express');
const router = express.Router();

const Player = require('../model/player');

router.get("/character", (req, res, next) => {
    res.render('userItems/characterCreation');
});

router.get("/weapon", (req, res, next) => {
    res.render('userItems/weaponCreation');
});

router.get("/world", (req, res, next) => {
    res.render('userItems/worldCreation');
});

module.exports.route = router;
