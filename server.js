const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const cluster = require('cluster');

const http = require('http');
const socketIO = require('socket.io');

let workers = [];

const setupWorkerProcesses = () => {
    // to read number of cores on system
    let numCores = require('os').cpus().length;
    console.log('Master cluster setting up ' + numCores + ' workers');

    // iterate on number of cores need to be utilized by an application
    // current example will utilize all of them
    for (let i = 0; i < numCores; i++) {
        // creating workers and pushing reference in an array
        // these references can be used to receive messages from workers
        workers.push(cluster.fork());

        // to receive messages from worker process
        workers[i].on('message', function (message) {
            console.log(message);
        });
    }

    // process is clustered on a core and process id is assigned
    cluster.on('online', function (worker) {
        console.log('Worker ' + worker.process.pid + ' is listening');
    });

    // if any of the worker process dies then start a new one by simply forking another one
    cluster.on('exit', function (worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
        workers.push(cluster.fork());
        // to receive messages from worker process
        workers[workers.length - 1].on('message', function (message) {
            console.log(message);
        });
    });
};

const setUpExpress = () => {
    // IMPORT MODELS
    const agenceModel = require('./models/Agence');
    const bonModel = require('./models/Bon');
    const clientModel = require('./models/Client');
    const devisModel = require('./models/Devis');
    const employeModel = require('./models/Employe');
    const factureModel = require('./models/Facture');
    const fournisseurModel = require('./models/Fournisseur');
    const passagerModel = require('./models/Passager');
    const permissionModel = require('./models/Permission');
    const posteModel = require('./models/Poste');
    const produitModel = require('./models/Produit');
    const reservationModel = require('./models/Reservation');
    const revueDePerformanceModel = require('./models/RevueDePerformance');
    const societeModel = require('./models/Societe');
    const stockModel = require('./models/Stock');
    const vehiculeModel = require('./models/Vehicule');
    const voyageModel = require('./models/Voyage');

    //On définit notre objet express nommé app
    const app = express();
    app.use(cors());

    //Connexion à la base de donnée
    mongoose.Promise = global.Promise;
    mongoose.set('useFindAndModify', false);
    mongoose
        .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/erp_db", { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
        .then(() => {
            console.log("Connected to mongoDB");
        })
        .catch((e) => {
            console.log("Error while DB connecting");
            console.log(e);
        });
    mongoose.set('debug', true);

    var db = mongoose.connection;
    db.on('error', () => { console.log('---FAILED to connect to mongoose') });
    db.once('open', () => { console.log('+++Connected to mongoose') });

    app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(require('morgan')('dev'));
    app.use(session({ secret: 'erp_lukus', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

    //Définition du routeur
    const router = express.Router();
    app.use("/user", router);
    require(__dirname + "/controllers/userController")(router);
    app.use(require('./routes'));

    /*Adds the react production build to serve react requests*/
    app.use(express.static(path.join(__dirname, "./client/build")));

    /*React root*/
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static('client/build'));

        const path = require('path');
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
        })
    }

    //Définition et mise en place du port d'écoute
    const port = process.env.PORT || 8800;

    //our server instance
    const server = http.createServer(app);

    //This creates our socket using the instance of the server
    const io = socketIO(server);

    const types = [
        'VEHICULE_PAGE_LOADED',
        'USER_PAGE_LOADED',
        'SET_EDIT_USER'
    ];
    io.on('connection', function (socket) {

        socket.on('action', (action) => {
            if(!types.includes(action.type)) {
                if(action.type == 'SUBMIT_VEHICULE' || action.type == 'DELETE_VEHICULE' || action.type == 'EDIT_VEHICULE') {
                    db.collection("vehicules").find({}).toArray(function(err, docs){
                        io.sockets.emit('action', { type:'VEHICULE_PAGE_LOADED', data: { _vehicules: docs} });
                    });
                    console.log('/*****************'+(action.type).toUpperCase()+' ACTION FIRED*****************/');
                }
            }
        });
        socket.on('USER_UPDATED', (data) => {
            console.log('/*****************USER_UPDATED*****************/');
            io.sockets.emit('USER_UPDATED_GET', 'GET_USERS' );
        });

        socket.on('disconnect', () => {
            console.log('user disconnected')
        });
    });

    server.listen(port, () => console.log(`Listening on port ${port}`));
};

/**
 * Setup server either with clustering or without it
 * @param isClusterRequired
 * @constructor
 *
 **/

const setupServer = (isClusterRequired) => {

    // if it is a master process then call setting up worker process
    if (isClusterRequired && cluster.isMaster) {
        setupWorkerProcesses();
    } else {
        // to setup server configurations and share port address for incoming requests
        setUpExpress();
    }
};

setupServer(true);