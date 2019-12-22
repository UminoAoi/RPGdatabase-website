const express = require('express');
const router = express.Router();

const Player = require('../model/player');
const Character = require('../model/character');
const Weapon= require('../model/weapon');
const World = require('../model/world');

router.get("/", (req, res, next) => {
    player = Player.getList();
    res.render('user/userProfile', {
        user: player[0]
        //characterList: player[0].getCharacters(),
        //weaponList: player[0].getWeapons(),
        //worldList: player[0].getWorld()
    });
});

router.get("/:playerId", (req, res, next) => {
    var updateMessage = null;
    //const player = req.session.loggedUser;
    //console.log(player.getStrongestCharacter()); //CZEMU NIE DZIAŁA???
    
    const player = Player.getPlayer(req.session.loggedUser.id);
    res.render('user/userProfile', {
        player: player,
        updateMessage: updateMessage
    });
});

router.get("/delete/character", (req, res, next) => {
    var c = req.query.character_id;
    var player = Player.getPlayer(req.session.loggedUser.id);
    player.deleteCharacter(c);
    res.redirect("/player/" + player.id);
});

router.get("/delete/weapon", (req, res, next) => {
    var c = req.query.weapon_id;
    var player = Player.getPlayer(req.session.loggedUser.id);
    player.deleteWeapon(c);
    res.redirect("/player/" + player.id);
});

router.get("/delete/world", (req, res, next) => {
    var c = req.query.world_id;
    var player = Player.getPlayer(req.session.loggedUser.id);
    player.deleteWorld(c);
    res.redirect("/player/" + player.id);
});


module.exports.route = router;
