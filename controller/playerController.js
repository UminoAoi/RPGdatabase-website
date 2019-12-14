const express = require('express');
const router = express.Router();

const Player = require('../model/player');
var loggedPlayer;

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
    loggedPlayer = req.params.playerId;
    const playerId = req.params.playerId;
    const player = Player.getPlayer(playerId);
    res.render('user/userProfile', {
        player: player,
        updateMessage: updateMessage
    });
});

module.exports.route = router;