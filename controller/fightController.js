const express = require('express');
const router = express.Router();

const Fight = require('../model/fight');
const MonsterFight = require('../model/monsterFight');
const Player = require('../model/player');
const Character = require('../model/character');
const World = require('../model/world');
const Monster = require('../model/monster');

router.get("/", (req, res, next) => {
    const player = Player.makePlayerFrom(req.session.loggedUser);
    
    var enemyFights = [];
    var monsterFights = [];
    
    var getEnemiesPromise = player.getEnemyFights();
    var getMonstersPromise = player.getMonsterFights();
    
    Promise.all([getEnemiesPromise, getMonstersPromise]).then(function(values) {
        enemyFights = values[0];
        monsterFights = values[1];
        res.render('fight/fightList', {
            enemyFights:enemyFights, 
            monsterFights:monsterFights, 
            player:player});
    }).catch(r => {
        res.status(404).send("Not found.");
    });
});


router.get("/characterFight", (req, res, next) => {
    const player = Player.makePlayerFrom(req.session.loggedUser);
    
    var enemyList = [];
    var worlds = [];
    var characterList = [];
    
    var getEnemiesPromise = Character.enemyList(player.id);
    var getWorldsPromise = World.getWorlds();
    var getCharactersPromise = player.getCharacters();
    
    Promise.all([getCharactersPromise, getEnemiesPromise, getWorldsPromise]).then(function(values) {
        characterList = values[0];
        enemyList = values [1];
        worlds = values[2];
        res.render('fight/enemiesList', {
            player:player, 
            characterList: characterList,
            enemyList:enemyList, 
            worlds:worlds});
    }).catch(r => {
        res.status(404).send("Not found.");
    });    
});

router.get("/delete", (req, res, next) => {
    var fightDate = req.query.fight_date;
    var fightYou = req.query.you_id;
    var fightEnemy = req.query.enemy_id;
    
    const player = Player.makePlayerFrom(req.session.loggedUser);
    player.deleteFight(fightDate, fightYou, fightEnemy);
    
    res.redirect("/fight");
});

router.get("/monsterFight", (req, res, next) => {
    const player = Player.makePlayerFrom(req.session.loggedUser);
    var monsterList = [];
    var characterList = [];
    
    var getMonstersPromise = Monster.getMonsters();
    var getCharactersPromise = player.getCharacters();
    
    Promise.all([getMonstersPromise, getCharactersPromise]).then(function(values) {
        monsterList = values[0];
        characterList = values[1];
        res.render('fight/monsterList', {player:player, monsterList:monsterList, characterList:characterList});
    }).catch(r => {
        res.status(404).send("Not found.");
    });
});

router.get("/characterFight/fightResults/:worldId/:youId/:enemyId", (req, res, next) => {
    var worldId = req.params.worldId;
    var youId = req.params.youId;
    var enemyId = req.params.enemyId;
    
    Character.getCharacter(youId).then(result => {
        var you = result;
        Character.getCharacter(enemyId).then(result => {
            var enemy = result;
            World.getWorld(worldId).then(result => {
                var world = result;
                
                 var enemyPower = enemy.attackPoints*5 + enemy.defencePoints*3 + enemy.level*3 + world.difficulty*5;
                var youPower = you.attackPoints*5 + you.defencePoints*3 + you.level*3 + world.difficulty*3;

                var fight = null;
                const player = Player.makePlayerFrom(req.session.loggedUser);
                
                if(youPower<enemyPower){
                fight = new Fight(you, enemy, world, "Lost");
                }else{
                    fight = new Fight(you, enemy, world, "Won");
                    you.fightPoints += enemyPower * 0.1;
                }
                
                player.addFight(fight);
    
                res.render('fight/fightScreen', {fight: fight, player:player});
            }).catch(r => {
        res.status(404).send("Not found.");
    });
        }).catch(r => {
        res.status(404).send("Not found.");
    });
    }).catch(r => {
        res.status(404).send("Not found.");
    });
});

router.get("/characterFight/fightResults/:worldId/:youId/:enemyId/like", (req, res, next) => {
    var worldId = req.params.worldId;
    var youId = req.params.youId;
    var enemyId = req.params.enemyId;
    
    var world = World.getWorld(worldId).then(result => {
        world.like();
        res.render("fightResults/"+ worldId +"/" + youId + "/" + enemyId);
    }).catch(r => {
        res.status(404).send("Not found.");
    });
});

router.get("/monsterFight/monsterFightResults/:youId/:monsterId", (req, res, next) => {
    var youId = req.params.youId;
    var monsterId = req.params.monsterId;
    
    Character.getCharacter(youId).then( result => {
        var you = result;
        Monster.getMonster(monsterId).then(result => {
            var monster = result;
            var monsterPower = monster.attackPoints*5 + monster.defencePoints*3 + monster.level*3;
            var youPower = you.attackPoints*5 + you.defencePoints*3 + you.level*3;

            var monsterFight = null;
            const player = Player.makePlayerFrom(req.session.loggedUser);

            if(youPower<monsterPower){
                monsterFight = new MonsterFight(you, monster, "Lost");
            }else{
                monsterFight = new MonsterFight(you, monster, "Won");
                you.fightPoints += monsterPower * 0.1;
            }

            player.addMonsterFight(monsterFight);

            res.render('fight/monsterFightScreen', {monsterFight: monsterFight, player:player});
        }).catch(r => {
        res.status(404).send("Not found.");
    });
    }).catch(r => {
        res.status(404).send("Not found.");
    });
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
