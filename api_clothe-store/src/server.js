import http from 'http'
import { Server } from 'socket.io'
import app from './app.js'
import connection from './app/database/connection.js';
import {setupSocket} from './app/sockets/sockets.manager.js';




const server = http.createServer(app)
const port = 3000

const io = new Server(server,{
    cors: {
        origin: ['http://localhost:4200'], 
        methods: ['GET', 'POST'],
    }
})



setupSocket(io)


connection.connect((error) => {
    if(error){
        console.log('Database connection error:', error)
    }else{
        console.log('Success Connection!')
        server.listen(port , () => console.log(`Running in port ${port}`))
    }
})




