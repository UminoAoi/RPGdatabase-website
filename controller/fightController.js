const express = require('express');
const router = express.Router();

const Fight = require('../model/fight');
const Player = require('../model/player');
const Character = require('../model/character');
const World = require('../model/world');

router.get("/", (req, res, next) => {
    var player = Player.getPlayer(Player.loggedPlayer);
    var enemyFights = player.fights;
    var monsterFights = player.monsterFights;
    res.render('fight/fightList', {enemyFights:enemyFights, monsterFights:monsterFights});
});


router.get("/characterFight", (req, res, next) => {
    var player = Player.getPlayer(Player.loggedPlayer);
    
    var enemyList= Character.enemyList(player);
    var worlds = World.allWorldList;
    res.render('fight/enemiesList', {player:player, enemyList:enemyList, worlds:worlds});
});

router.get("/monsterFight", (req, res, next) => {
    res.render('fight/monsterList');
});

router.get("/fightResults", (req, res, next) => {
    res.render('fight/monsterList');
});


router.post("/characterFight/new", (req, res, next) => {
    res.redirect("/fightResults");
});

router.post("/monsterFight/new", (req, res, next) => {
    res.redirect("/fightResults");
});



module.exports.route = router;
