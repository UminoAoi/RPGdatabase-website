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
    Player.hashPassword(req.body.password).then(result => {
       var hash = result; 
        const newUser = new Player(req.body.userName, hash, req.body.email);
    
        newUser.add().then(result => {
            let insertUserId = result.insertId
            newUser.id = insertUserId
            req.session.isUserLoggedIn = true;
            req.session.loggedUser = newUser;
            res.redirect("/player");//+ insertUserId);
        }).catch(r => {
        res.status(404).send("Not found.");
        });
    }).catch(r => {
        res.status(404).send("Not found.");
    });
    
});

router.post("/login", (req, res, next) => {
    Player.checkAndGetPlayer(req.body.loginName).then(result => {
            var player = result;
            player.comparePassword(req.body.loginPassword).then(result => {
                req.session.isUserLoggedIn = true;
            req.session.loggedUser = player;
            res.redirect("/player");
            });
        }).catch(rej => { 
            error = "Wrong username or password.";
            res.render("user/loginScreen", {error: error});
        });
    
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});
    
module.exports.route = router;
