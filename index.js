import express from 'express'

import { createServer } from 'node:http'
import {Server} from 'socket.io'
import { fileURLToPath } from 'node:url'
import { dirname,join } from 'node:path'

const app = express()
const server = createServer(app)
const io = new Server(server)
const list_clients=[]
io.on('connection',(socket)=>{
    list_clients.push(socket.id)
    console.log("a user connected")
    socket.on('mensaje',(arg)=>{
        console.log("mensaje desde el cliente: " + arg)
        io.emit('mensaje desde el servidor',arg)
    })
    socket.on('disconnect',()=>{
        console.log("user disconnected")
    })
})

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});
server.listen(3000,()=>{
    console.log("server running on http://localhost:3000")
})