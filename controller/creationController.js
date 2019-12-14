const express = require('express');
const router = express.Router();

const Player = require('../model/player');
const Character = require('../model/character');

router.get("/character", (req, res, next) => {
    res.render('userItems/characterCreation');
});

router.get("/weapon", (req, res, next) => {
    res.render('userItems/weaponCreation');
});

router.get("/world", (req, res, next) => {
    res.render('userItems/worldCreation');
});

router.get("/editCharacter", (req, res, next) => {
    var c = req.query.character_id;
    var character = Character.getCharacter(c);
    res.render('userItems/characterCreation', {
        character: character
    });
});

module.exports.route = router;
