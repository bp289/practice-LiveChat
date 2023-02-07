const express = require('express');
const app =  express();
const http = require('http');
const { Server } = require("socket.io")
const cors = require('cors') 
const {userJoin, getCurrentUser} = require('./utils/users')
app.use(cors());

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`)

    socket.on("join_room", (data) => {
        const user = userJoin(socket.id, data)
        console.log(user)
        socket.join(user.room)
        socket.emit("join_room", user)
    })

    socket.on("leave_room", (data) => {
        socket.leave(data.room)
        io.to(data).emit("user_left_room", data)
    })

    socket.on("send_message", (data) => {
        console.log(data)
        io.to(data.room).emit("receive_message", data);
    })
    
})

server.listen(3001, () => {
    console.log("SERVER IS RUNNING")
})