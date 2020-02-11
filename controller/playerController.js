const express = require('express');
const router = express.Router();

const Player = require('../model/player');
const Character = require('../model/character');
const Weapon= require('../model/weapon');
const World = require('../model/world');

router.get("/", (req, res, next) => {
    var updateMessage = null;
    console.log("ID: " + req.session.loggedUser["id"]);
    const player = Player.makePlayerFrom(req.session.loggedUser);

    var characterList = [];
    var weaponList = [];
    var worldList = [];
    var strongestCharacter = "";
    
    var getCharactersPromise = player.getCharacters();
    var getStrongestCharacterPromise = player.getStrongestCharacter();
    var getWeaponsPromise = player.getWeapons();
    var getWorldsPromise = player.getWorlds();
    
    Promise.all([getCharactersPromise, getStrongestCharacterPromise, getWeaponsPromise, getWorldsPromise]).then(function(values) {
        characterList = values[0];
        if(values[1][0] != undefined)
            strongestCharacter = values[1][0]["CharacterName"];
        weaponList = values[2];
        worldList = values[3];
        res.render('user/userProfile', {
                    player: player,
                    strongestCharacter:strongestCharacter,
                    characterList:characterList,
                    weaponList:weaponList,
                    worldList:worldList,
                    updateMessage: updateMessage
                });
    }).catch(r => {
        res.status(404).send("Not found.");
    });
});

router.get("/delete/character", (req, res, next) => {
    var c = req.query.character_id;
    const player = Player.makePlayerFrom(req.session.loggedUser);
    player.deleteCharacter(c);
    res.redirect("/player");
});

router.get("/delete/weapon", (req, res, next) => {
    var c = req.query.weapon_id;
    const player = Player.makePlayerFrom(req.session.loggedUser);
    player.deleteWeapon(c);
    res.redirect("/player");
});

router.get("/delete/world", (req, res, next) => {
    var c = req.query.world_id;
    const player = Player.makePlayerFrom(req.session.loggedUser);
    player.deleteWorld(c);
    res.redirect("/player");
});


module.exports.route = router;
