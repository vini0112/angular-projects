
import sokectAuth from "../middleware/socketAuth.js"
import userHandler from "./userHandler.js"

let onlineUsers = new Set()


export function setupSocket(io){
    
    io.use(sokectAuth) // AUTH middleware
    
    io.on('connect', (socket) =>{
        
        console.log(`✅ ${socket.user.email} connected!`)

        // io.emit('Online-users', onlineUsers.size)
        
        userHandler(socket, io); 

        socket.on('disconnect', () =>{
            console.log('❌ ',socket.user.email, ' disconnect')
            io.emit("Online-users", onlineUsers.size)
        })

    })
    
}

