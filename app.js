
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));

const loginController = require('./controller/loginController');
app.use('/login', loginController.route);

const playerController = require('./controller/playerController');
app.use('/player', playerController.route);

const fightController = require('./controller/fightController');
app.use('/fight', fightController.route);

const creationController = require('./controller/creationController');
app.use('/creation', creationController.route);

app.listen(port, () => {
    console.log(`App is listening at port ${port}`);
});
