const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const port = process.env.PORT || 5000;
const server = http.createServer(app);


const { Server, Socket } = require("socket.io");



const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection', socket => {
    console.log('a user has connect with id', socket.id);


    socket.on('ourMessage', data => {
        console.log(data);
        socket.broadcast.emit('getMessage', data);
    })

    socket.on('disconnect', socket => {
        console.log('leave user');
    })
})

app.use(cors());

app.get('/', (req, res) => {
    res.send('all good')
})



server.listen(port, () => {
    console.log("server is listening");
})