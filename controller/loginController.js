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
    
    newUser.add().then(result => {
        let insertUserId = result.insertId
        newUser.id = insertUserId
        req.session.isUserLoggedIn = true;
        req.session.loggedUser = newUser;
        //console.log("ID: " + insertUserId)
        res.redirect("/player");//+ insertUserId);
    });
});

router.post("/login", (req, res, next) => {
    var player = Player.checkAndGetPlayer(req.body.loginName, req.body.loginPassword);
    var error = "";
    if (player != null){ 
        req.session.isUserLoggedIn = true;
        req.session.loggedUser = player;
        res.redirect("/player");
    }
    else{
        error = "Wrong username or password.";
        res.render("user/loginScreen", {error: error});
    }
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});
    
module.exports.route = router;
