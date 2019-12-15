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

router.get("/characterFight/fightResults/:worldId/:youId/:enemyId", (req, res, next) => {
    var worldId = req.params.worldId;
    var youId = req.params.youId;
    var enemyId = req.params.enemyId;
    
    var you = Character.getCharacter(youId);
    var enemy = Character.getCharacter(enemyId);
    var world = World.getWorld(worldId);
    
    var enemyPower = enemy.attackPoints*5 + enemy.defencePoints*3 + enemy.level*3 + world.difficulty*5;
    var youPower = you.attackPoints*5 + you.defencePoints*3 + you.level*3 + world.difficulty*3;
    
    var fight = null;
    var player = Player.getPlayer(Player.loggedPlayer);
    
    if(youPower<enemyPower){
        fight = new Fight(you, enemy, world, "Lost");
    }else{
        fight = new Fight(you, enemy, world, "Won");
    }
    
    player.addFight(fight);
    
    res.render('fight/fightScreen', {fight: fight});
});

router.get("/characterFight/fightResults/:worldId/:youId/:enemyId/like", (req, res, next) => {
    var worldId = req.params.worldId;
    var youId = req.params.youId;
    var enemyId = req.params.enemyId;
    
    var world = World.getWorld(worldId);
    world.like();
    
    res.render("fightResults/"+ worldId +"/" + youId + "/" + enemyId);
});


router.get("/monsterFightResults/:youId/:monsterId", (req, res, next) => {
    
    res.render('fight/monsterFightScreen', {monsterFight: monsterFight});
});

router.post("/characterFight/new", (req, res, next) => {
    var worldId = req.body.world;
    var you = req.body.user;
    var enemy = req.body.enemy;
    res.redirect("fightResults/"+ worldId +"/" + you + "/" + enemy);
});

router.post("/monsterFight/new", (req, res, next) => {
    res.redirect("monsterFightResults/:character1Id/:monsterId");
});



module.exports.route = router;
