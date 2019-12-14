//https://www.geeksforgeeks.org/model-view-controllermvc-architecture-for-node-applications/
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// parsuje dane typu application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

//app.set('views', 'views');

//app.use(express.static('views'));

//app.use(express.static(path.join(__dirname, 'public')));
//app.set('views', __dirname + '/views');

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