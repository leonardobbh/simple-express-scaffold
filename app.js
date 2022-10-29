const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const config = require("./config");
const { mongodb } = require("./databases/mongodb");

const app = express();
app.set('port', config.service.port);

// Mongoose
mongodb.Connect();

// Auth Token
const authToken = require('./middlewares/authToken');

// Routes
const indexController = require('./controllers/indexController');
const accountController = require('./controllers/accountController');
const userController = require('./controllers/userController');

app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());

app.get('/', (req, res, next) => {
    return res.status(200).json({ message: "ONLINE" });
});

// Index Routes
app.get('/api/', authToken, indexController.getIndex);

// Account Routes
app.post('/api/account/login', accountController.postLogin);

// User Routes
app.get('/api/user', authToken, userController.getAllUser);
app.get('/api/user/:id', authToken, userController.getOneUser);
app.post('/api/user', authToken, userController.postUser);
app.put('/api/user/:id', authToken, userController.updateUser);
app.delete('/api/user/:id', authToken, userController.deleteUser);

app.listen(config.service.port, () => {
    console.log("Aulinha - Backend Service");
    console.log("Running on port: " + config.service.port);
});