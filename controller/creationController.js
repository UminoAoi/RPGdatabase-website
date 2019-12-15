const express = require('express');
const router = express.Router();

const Player = require('../model/player');
const Character = require('../model/character');
const World = require('../model/world');
const Weapon = require('../model/weapon');

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
    var date = new Date(dateFormat[2], dateFormat[0]-1, dateFormat[1]);
    var player = Player.getPlayer(Player.loggedPlayer);
    
    const newCharacter = new Character(req.body.charName, req.body.charSpecies, req.body.attackPoints, req.body.defencePoints, req.body.charImage, date, player);
    
    player.addCharacter(newCharacter);
    res.redirect("/player/" + player.id);
});

router.post("/editCharacter/post", (req, res, next) => {
    var c = req.query.character_id;
    var dateFormat = req.body.charDate.split("-");
    var date = new Date(dateFormat[2], dateFormat[0]-1, dateFormat[1]);
    var player = Player.getPlayer(Player.loggedPlayer);
    
   Character.edit(c, req.body.charName, req.body.charSpecies, req.body.attackPoints, req.body.defencePoints, req.body.charImage, date, player);
    
    res.redirect("/player/" + player.id);
    
});

router.post("/weapon/post", (req, res, next) => {
    var player = Player.getPlayer(Player.loggedPlayer);
    
    const newWeapon = new Weapon(req.body.weapName, req.body.bonusAttack, req.body.bonusDefence, player);
    
    player.addWeapon(newWeapon);
    res.redirect("/player/" + player.id);
});

router.post("/editWeapon/post", (req, res, next) => {
    var c = req.query.weapon_id;
    var player = Player.getPlayer(Player.loggedPlayer);
    var weapons = player.getWeapons();
    
   Weapon.edit(c, req.body.weapName, req.body.bonusAttack, req.body.bonusDefence, weapons);
    
    res.redirect("/player/" + player.id);
    
});

module.exports.route = router;
