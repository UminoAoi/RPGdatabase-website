const express = require('express');
const router = express.Router();

const Player = require('../model/player');
const Character = require('../model/character');
const World = require('../model/world');

router.get("/character", (req, res, next) => {
    var character = null;
    res.render('userItems/characterCreation', {character:character});
});

router.get("/weapon", (req, res, next) => {
    var weapon = null;
    res.render('userItems/weaponCreation', {weapon:weapon});
});

router.get("/world", (req, res, next) => {
    var world = null;
    res.render('userItems/worldCreation', {world:world});
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
    var c = req.query.world_id;
    var world = World.getWorld(c);
    res.render('userItems/worldCreation', {
        world: world
    });
});

router.post("/character/post", (req, res, next) => {
    var dateFormat = req.body.charDate.split("-");
    console.log(dateFormat);
    var date = new Date(dateFormat[2], dateFormat[0], dateFormat[1]);
    var player = Player.getPlayer(Player.loggedPlayer);
    
    const newCharacter = new Character(req.body.charName, req.body.charSpecies, req.body.attackPoints, req.body.defencePoints, req.body.charImage, date, player);
    
    player.addCharacter(newCharacter);
    res.redirect("/player/" + player.id);
});

router.post("/editCharacter/post", (req, res, next) => {
    var player = Player.checkAndGetPlayer(req.body.loginName, req.body.loginPassword);
    Player.loggedPlayer = player;
    var error = "";
    if (player != null) 
        res.redirect("/player/" + player.id);
    else{
        error = "Wrong username or password.";
        res.render("user/loginScreen", {error: error});
    }
});

module.exports.route = router;
