import http from 'http'
import {Server} from 'socket.io'
import app from './app.js'
import connection from './app/database/connection.js';
import {setupSocket} from './app/sockets/sockets.manager.js';


const server = http.createServer(app)
const port = 3000

const io = new Server(server ,{
    cors: {origin: '*'}
})

setupSocket(io)


connection.connect((error) => {
    if(error){
        console.log(error)
    }else{
        console.log('Success Connection!')
        app.listen(port, () => console.log(`Running in port ${port}`))
    }
})



