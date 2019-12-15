const express = require('express');
const router = express.Router();

const Player = require('../model/player');

router.get("/", (req, res, next) => {
    res.render('user/loginScreen');
});


router.get("/userProfile", (req, res, next) => {
    res.render('user/userProfile');
});

router.post("/register", (req, res, next) => {
    const newUser = new Player(req.body.userName, req.body.password, req.body.email);
    Player.add(newUser);
    Player.loggedPlayer = newUser;
    res.redirect("/player/" + newUser.id); //JAK WYRENDEROWAĆ W PLAYERCONTROLLER DLA DANEGO NUMERU? JAK PRZESŁAĆ ZMIENNĄ DANEGO UŻYTKOWNIKA Z REDIRECT DO KONTROLERA?

    //res.redirect("/player");
});

router.post("/login", (req, res, next) => {
    var player = Player.checkAndGetPlayer(req.body.loginName, req.body.loginPassword);
    Player.loggedPlayer = player;
    var error = "";
    if (player != null) 
        res.redirect("/player/" + player.id);
    else{
        error = "Wrong username or password.";
        res.render("user/loginScreen", {error: error});
    }
});
    
module.exports.route = router;
