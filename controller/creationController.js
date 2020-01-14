const express = require('express');
const router = express.Router();

const Player = require('../model/player');
const Character = require('../model/character');
const World = require('../model/world');
const Weapon = require('../model/weapon');

router.get("/character", (req, res, next) => {
    var character = null;
    const player = Player.makePlayerFrom(req.session.loggedUser);
    player.getWeapons().then(result => {
        var weapons = result;
        res.render('userItems/characterCreation', {character:character, weapons:weapons, player:player});
    });
    
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
    Character.getCharacter(c).then(result => {
        var character = result;
        const player = Player.makePlayerFrom(req.session.loggedUser);
        player.getWeapons().then(result => {
            var weapons = result;
            res.render('userItems/characterCreation', {
            character: character,
            weapons: weapons,
            player:player
            });
        })
    });
    
});

router.get("/editWeapon", (req, res, next) => {
    var c = req.query.weapon_id;
    const player = Player.makePlayerFrom(req.session.loggedUser);
    Weapon.getWeapon(c).then(result => {
        var weapon = result;
        res.render('userItems/weaponCreation', {
        weapon: weapon,
        player:player
        });
    });
});

router.get("/editWorld", (req, res, next) => {
    var c = req.query.world_id;
    const player = Player.makePlayerFrom(req.session.loggedUser);
    World.getWorld(c).then(result => {
        var world = result;
        res.render('userItems/worldCreation', {
        world: world,
        player:player
        });
    });
});

router.post("/character/post", (req, res, next) => {
    var dateFormat = req.body.charDate.split("-");
    var date = new Date(dateFormat[2], dateFormat[0]-1, dateFormat[1]);
    const player = Player.makePlayerFrom(req.session.loggedUser);
    //console.log(req.body.weapon);
    Weapon.getWeapon(req.body.weapon).then(result => {
        var weapon = result;
        const newCharacter = new Character(req.body.charName, req.body.charSpecies, req.body.attackPoints, req.body.defencePoints, req.body.charImage, date, weapon, player.id);
        player.addCharacter(newCharacter)
            res.redirect("/player");
    });
});

router.post("/editCharacter/post", (req, res, next) => {
    var c = req.query.character_id;
    var dateFormat = req.body.charDate.split("-");
    var date = new Date(dateFormat[2], dateFormat[0]-1, dateFormat[1]);
    const player = Player.makePlayerFrom(req.session.loggedUser);
    Weapon.getWeapon(req.body.weapon).then(result => {   
        var weapon = result;
        Character.edit(c, req.body.charName, req.body.charSpecies, req.body.attackPoints, req.body.defencePoints, req.body.charImage, date, weapon).then(result => {    
            res.redirect("/player");
       });
    })

});

router.post("/weapon/post", (req, res, next) => {
    const player = Player.makePlayerFrom(req.session.loggedUser);
    console.log(req.session.loggedUser.id);
    
    const newWeapon = new Weapon(req.body.weapName, req.body.attackPoints, req.body.defencePoints, req.session.loggedUser.id);
    
    player.addWeapon(newWeapon);
    res.redirect("/player");
});

router.post("/editWeapon/post", (req, res, next) => {
    var c = req.query.weapon_id;
    const player = Player.makePlayerFrom(req.session.loggedUser);
    var weapons = player.getWeapons();
    
   Weapon.edit(c, req.body.weapName, req.body.attackPoints, req.body.defencePoints).then(result =>{
        res.redirect("/player");
   });
    
});

router.post("/world/post", (req, res, next) => {
    const player = Player.makePlayerFrom(req.session.loggedUser);
    
    const newWorld = new World(req.body.worldName, req.body.worldDifficulty, player.id);
    
    player.addWorld(newWorld);
    res.redirect("/player");
});

router.post("/editWorld/post", (req, res, next) => {
    var c = req.query.world_id;
    const player = Player.makePlayerFrom(req.session.loggedUser);
    
    World.edit(c, req.body.worldName, req.body.worldDifficulty).then(result => {
        res.redirect("/player");
    });
    
});

module.exports.route = router;
