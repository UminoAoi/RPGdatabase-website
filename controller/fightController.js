const express = require('express');
const router = express.Router();

const Fight = require('../model/fight');

router.get("/", (req, res, next) => {
    res.render('fight/fightList');
});


router.get("/characterFight", (req, res, next) => {
    res.render('user/enemiesList');
});

router.get("/monsterFight", (req, res, next) => {
    res.render('user/monsterList');
});

router.get("/fightResults", (req, res, next) => {
    res.render('user/monsterList');
});


router.post("/characterFight/new", (req, res, next) => {
    res.redirect("/fightResults");
});

router.post("/monsterFight/new", (req, res, next) => {
    res.redirect("/fightResults");
});



module.exports.route = router;
