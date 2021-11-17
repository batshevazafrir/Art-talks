const express = require('express')
const app = express()
const http = require('http')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const bodyParser = require('body-parser')
const router = require('./routes/api')
const cors = require("cors")
const server = http.createServer(app)
const socketio = require('socket.io')
// const WebSocket = require('websocket');
const io = socketio(server)


const connectionParams = {
    // useFindAndModify: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useCreateIndex: true,
}

mongoose.connect(process.env.DB_CONNECT, connectionParams).then(() => {
    console.log('Connected!!!');
}).catch(err => {
    console.log(err);
})
app.use(cors())
app.use(bodyParser.json())


// app.get('/cors', (req, res) => {
//     res.set('Access-Control-Allow-Origin', '*');
//     res.send({ "msg": "This has CORS enabled " })
//     })


// Add headers before the routes are defined

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT")
        return res.status(200).json({})
    }
    next();
});

io.on('connection', (socket) => {
    console.log('connection');

    //when the user send message
    socket.on('sendMessage', (message, callback) => {
        console.log('Recevied:' + message);
        io.emit('message', message, { 'connected': true })
    })
    socket.on('disconnect', () => {
        console.log('i lost a client');
    })
})

app.use('/', router)
server.listen(3002, () => {
    console.log('listen to 3002!');
})

