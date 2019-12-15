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
    var worlds = World.getWorlds();
    res.render('fight/enemiesList', {player:player, enemyList:enemyList, worlds:worlds});
});

router.get("/monsterFight", (req, res, next) => {
    res.render('fight/monsterList');
});

router.get("/fightResults/:worldId/:youId/:enemyId", (req, res, next) => {
    var result = null;
    var worldId = req.params.worldId;
    var youId = req.params.youId;
    var enemyId = req.params.enemyId;
    
    var you = Character.getCharacter(youId);
    var enemyPower = Character.getCharacter(enemyId);
    var world = World.getWorld(worldId);
    
    const player = Player.getPlayer(playerId);
    res.render('user/userProfile', {
        player: player,
        updateMessage: updateMessage
    });
    res.render('fight/fightScreen');
});

router.get("/fightResults/:youId/:monsterId", (req, res, next) => {
    
});

router.post("/characterFight/new", (req, res, next) => {
    var worldId = req.body.world;
    var you = req.body.user;
    var enemy = req.body.enemy;
    res.redirect("/fightResults/"+ worldId +"/" + you + "/" + enemy);
});

router.post("/monsterFight/new", (req, res, next) => {
    res.redirect("/fightResults/:character1Id/:monsterId");
});



module.exports.route = router;
