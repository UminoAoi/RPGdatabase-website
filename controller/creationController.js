const express = require('express');
const router = express.Router();

const Player = require('../model/player');
const Character = require('../model/character');
const World = require('../model/world');
const Weapon = require('../model/weapon');

router.get("/character", (req, res, next) => {
    var character = null;
    const player = Player.makePlayerFrom(req.session.loggedUser);
    var weapons = player.getWeapons();
    res.render('userItems/characterCreation', {character:character, weapons:weapons, player:player});
});

router.get("/weapon", (req, res, next) => {
    var weapon = null;
    const player = Player.makePlayerFrom(req.session.loggedUser);
    res.render('userItems/weaponCreation', {weapon:weapon, player:player});
});

router.get("/world", (req, res, next) => {
    var world = null;
    const player = Player.makePlayerFrom(req.session.loggedUser);
    res.render('userItems/worldCreation', {world:world, player:player});
});

router.get("/editCharacter", (req, res, next) => {
    var c = req.query.character_id;
    var character = Character.getCharacter(c);
    const player = Player.makePlayerFrom(req.session.loggedUser);
    var weapons = player.getWeapons();
    res.render('userItems/characterCreation', {
        character: character,
        weapons: weapons,
        player:player
    });
});

router.get("/editWeapon", (req, res, next) => {
    var c = req.query.weapon_id;
    const player = Player.makePlayerFrom(req.session.loggedUser);
    var weapons = player.getWeapons();
    var weapon = null;
    for (var i = 0; i < weapons.length; i++) {
            if (weapons[i].id == c) {
                weapon = weapons[i];
            }
    }
    res.render('userItems/weaponCreation', {
        weapon: weapon,
        player:player
    });
});

router.get("/editWorld", (req, res, next) => {
    var c = req.query.world_id;
    var world = World.getWorld(c);
    const player = Player.makePlayerFrom(req.session.loggedUser);
    res.render('userItems/worldCreation', {
        world: world,
        player:player
    });
});

router.post("/character/post", (req, res, next) => {
    var dateFormat = req.body.charDate.split("-");
    var date = new Date(dateFormat[2], dateFormat[0]-1, dateFormat[1]);
    const player = Player.makePlayerFrom(req.session.loggedUser);
    var weapon = Weapon.getWeapon(req.body.weapon);
    
    const newCharacter = new Character(req.body.charName, req.body.charSpecies, req.body.attackPoints, req.body.defencePoints, req.body.charImage, date, weapon, player.id);
    
    player.addCharacter(newCharacter);
    res.redirect("/player");
});

router.post("/editCharacter/post", (req, res, next) => {
    var c = req.query.character_id;
    var dateFormat = req.body.charDate.split("-");
    var date = new Date(dateFormat[2], dateFormat[0]-1, dateFormat[1]);
    const player = Player.makePlayerFrom(req.session.loggedUser);
    var weapon = player.getWeapon(req.body.weapon)
    
   Character.edit(c, req.body.charName, req.body.charSpecies, req.body.attackPoints, req.body.defencePoints, req.body.charImage, date, weapon);
    
    res.redirect("/player");
    
});

router.post("/weapon/post", (req, res, next) => {
    const player = Player.makePlayerFrom(req.session.loggedUser);
    
    const newWeapon = new Weapon(req.body.weapName, req.body.bonusAttack, req.body.bonusDefence, player);
    
    player.addWeapon(newWeapon);
    res.redirect("/player");
});

router.post("/editWeapon/post", (req, res, next) => {
    var c = req.query.weapon_id;
    const player = Player.makePlayerFrom(req.session.loggedUser);
    var weapons = player.getWeapons();
    
   Weapon.edit(c, req.body.weapName, req.body.bonusAttack, req.body.bonusDefence, weapons);
    
    res.redirect("/player");
    
});

router.post("/world/post", (req, res, next) => {
    const player = Player.makePlayerFrom(req.session.loggedUser);
    
    const newWorld = new World(req.body.worldName, req.body.worldDifficulty, player);
    
    player.addWorld(newWorld);
    res.redirect("/player");
});

router.post("/editWorld/post", (req, res, next) => {
    var c = req.query.world_id;
    const player = Player.makePlayerFrom(req.session.loggedUser);
    
   World.edit(c, req.body.worldName, req.body.worldDifficulty);
    
    res.redirect("/player");
    
});

module.exports.route = router;
