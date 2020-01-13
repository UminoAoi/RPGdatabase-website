//W  USERPROFILE WYŚWIETLA [OBJECT PROMISE] ZAMIAST 0 W STATYSTYKACH
//HASHOWANIE HASEŁ NIE DZIAŁA
//W USERPROFILE NIE WYŚWIETLA SIĘ LIST POSTACI, JAKIŚ PROBLEM Z DODAWANIEM POSTACI I WSZYSTKIEGO INNEGO, ZŁA LICZBA KOLUMN??? W BAZIE DODAJĄ SIĘ OK
//CZY SPOSÓB ŻE ODDZIELNA METODA NA JSON I DRUGA KTÓRA JEJ UŻYWA I ZWRACA NORMALNY WYNIK JEST OK

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
    
    /* Player.getPlayer(req.session.loggedUser.id).then(result => {
        console.log(result[0]["Username"]);
        const player = new Player(result[0]["Username"], result[0]["Password"], result[0]["Email"], result[0]["UserId"], result[0]["UserRank"], result[0]["RegistrationDate"]);
        console.log(player); //jak zrobić z tego Playera na którym można używać metod? model playera? da się bez tworzenia nowego?
    */
    
        res.render('user/userProfile', {
            player: player,
            updateMessage: updateMessage
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
