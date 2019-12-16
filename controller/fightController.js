const express = require('express');
const router = express.Router();

const Fight = require('../model/fight');
const MonsterFight = require('../model/monsterFight');
const Player = require('../model/player');
const Character = require('../model/character');
const World = require('../model/world');
const Monster = require('../model/monster');

router.get("/", (req, res, next) => {
    var player = Player.getPlayer(Player.loggedPlayer);
    var enemyFights = player.fights;
    var monsterFights = player.monsterFights;
    res.render('fight/fightList', {enemyFights:enemyFights, monsterFights:monsterFights, player:player});
});


router.get("/characterFight", (req, res, next) => {
    var player = Player.getPlayer(Player.loggedPlayer);
    
    var enemyList= Character.enemyList(player);
    var worlds = World.getWorlds();
    res.render('fight/enemiesList', {player:player, enemyList:enemyList, worlds:worlds});
});

router.get("/delete", (req, res, next) => {
    var fightId = req.query.fight_id;
    
    var player = Player.getPlayer(Player.loggedPlayer);
    player.deleteFight(fightId);
    
    res.redirect("/fight");
});

router.get("/monsterFight", (req, res, next) => {
    var player = Player.getPlayer(Player.loggedPlayer);
    var monsterList = Monster.getMonsters();
    
    res.render('fight/monsterList', {player:player, monsterList:monsterList});
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
        you.fightPoints += enemyPower * 0.1;
    }
    
    player.addFight(fight);
    
    res.render('fight/fightScreen', {fight: fight, player:player});
});

router.get("/characterFight/fightResults/:worldId/:youId/:enemyId/like", (req, res, next) => {
    var worldId = req.params.worldId;
    var youId = req.params.youId;
    var enemyId = req.params.enemyId;
    
    var world = World.getWorld(worldId);
    world.like();
    
    res.render("fightResults/"+ worldId +"/" + youId + "/" + enemyId);
});


router.get("/monsterFight/monsterFightResults/:youId/:monsterId", (req, res, next) => {
    var youId = req.params.youId;
    var monsterId = req.params.monsterId;
    
    var you = Character.getCharacter(youId);
    var monster = Monster.getMonster(monsterId);
    
    var monsterPower = monster.attackPoints*5 + monster.defencePoints*3 + monster.level*3;
    var youPower = you.attackPoints*5 + you.defencePoints*3 + you.level*3;
    
    var monsterFight = null;
    var player = Player.getPlayer(Player.loggedPlayer);
    
    if(youPower<monsterPower){
        monsterFight = new MonsterFight(you, monster, "Lost");
    }else{
        monsterFight = new MonsterFight(you, monster, "Won");
        you.fightPoints += monsterPower * 0.1;
    }
    
    player.addMonsterFight(monsterFight);
    
    res.render('fight/monsterFightScreen', {monsterFight: monsterFight, player:player});
});

router.post("/characterFight/new", (req, res, next) => {
    var worldId = req.body.world;
    var you = req.body.user;
    var enemy = req.body.enemy;
    res.redirect("fightResults/"+ worldId +"/" + you + "/" + enemy);
});

router.post("/monsterFight/new", (req, res, next) => {
    var you = req.body.user;
    var monster = req.body.monster;
    res.redirect("monsterFightResults/" + you + "/" + monster);
});



module.exports.route = router;
