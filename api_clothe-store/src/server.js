import http from 'http'
import {Server} from 'socket.io'
import app from './app.js'
import connection from './app/database/connection.js';
import {setupSocket} from './app/sockets/sockets.manager.js';
// http://localhost:3000

const server = http.createServer(app)
const port = 3000

const io = new Server(server ,{
    cors: {
        origin: 'http://localhost:4200', 
        methods: ['GET', 'POST'],
        credentials: true
    }
})

io.on('connection', (socket) => {
    console.log('✅ Client connected via WebSocket');
});

// io.on('connection', (socket) =>{
    
//     console.log('but no here!')
//     const userId = socket.handshake.auth.userId

//     if (!userId) {
//         console.warn('⚠️ Connection attempt without userId');
//         socket.disconnect();
//         return;
//     }

//     console.log(userId,' connected')
//     onlineUsers.add(userId)
//     io.emit('Online-users', Array.from(onlineUsers))

//     socket.on('disconnect', () =>{
//         console.log(userId, ' disconnect')
//         onlineUsers.delete(userId)
//         io.emit("Online-users", Array.from(onlineUsers))
//     })

// })

// setupSocket(io)


connection.connect((error) => {
    if(error){
        console.log(error)
    }else{
        console.log('Success Connection!')
        app.listen(port, () => console.log(`Running in port ${port}`))
    }
})



