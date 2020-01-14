

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
    player.getEnemyFights().then(result => {
        var enemyFights = result;
        player.getMonsterFights().then(result => {
            var monsterFights = result;
            res.render('fight/fightList', {enemyFights:enemyFights, monsterFights:monsterFights, player:player});
        });
    });
});


router.get("/characterFight", (req, res, next) => {
    const player = Player.makePlayerFrom(req.session.loggedUser);
    
    var enemyList= Character.enemyList(player);
    World.getWorlds().then(result => {
        var worlds = result;
        res.render('fight/enemiesList', {player:player, enemyList:enemyList, worlds:worlds});
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
    Monster.getMonsters().then(result => {
        var monsterList = result;
        res.render('fight/monsterList', {player:player, monsterList:monsterList});
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
            });
        });
    });
});

router.get("/characterFight/fightResults/:worldId/:youId/:enemyId/like", (req, res, next) => {
    var worldId = req.params.worldId;
    var youId = req.params.youId;
    var enemyId = req.params.enemyId;
    
    var world = World.getWorld(worldId).then(result => {
        world.like();
        res.render("fightResults/"+ worldId +"/" + youId + "/" + enemyId);
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
        });
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
