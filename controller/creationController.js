const express = require('express');
const router = express.Router();

const Player = require('../model/player');
const Character = require('../model/character');

router.get("/character", (req, res, next) => {
    var character = null;
    res.render('userItems/characterCreation', {character:character});
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

router.get("/editWeapon", (req, res, next) => {
    var c = req.query.weapon_id;
    var player = Player.getPlayer(Player.loggedPlayer);
    console.log(player);
    var weapons = player.getWeapons();
    var weapon = null;
    for (var i = 0; i < weapons.length; i++) {
            if (weapons[i].id == c) {
                weapon = weapons[i];
            }
    }
    res.render('userItems/weaponCreation', {
        weapon: weapon
    });
});

router.get("/editWorld", (req, res, next) => {
    var c = req.query.weapon_id;
    var player = Player.getPlayer(Player.loggedPlayer);
    console.log(player);
    var weapons = player.getWeapons();
    var weapon = null;
    for (var i = 0; i < weapons.length; i++) {
            if (weapons[i].id == c) {
                weapon = weapons[i];
            }
    }
    res.render('userItems/weaponCreation', {
        weapon: weapon
    });
});

module.exports.route = router;
