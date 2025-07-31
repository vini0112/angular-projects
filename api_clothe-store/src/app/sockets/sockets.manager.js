
import sokectAuth from "../middleware/socketAuth.js"
import { setupServicesSocket } from "./servicesHandler.js"

let onlineUsers = new Set()


export function setupSocket(io){ 
    
    io.use(sokectAuth) // AUTH middleware
    
    io.on('connect', (socket) =>{
        
        console.log(`✅ ${socket.user.email} connected!`) 
        onlineUsers.add(socket.user.id) 

        io.emit('Online-users', onlineUsers.size)

        setupServicesSocket(io, socket) // Initialize services socket
        
        socket.on('disconnect', () =>{
            console.log('❌ ',socket.user.email, ' disconnect!')
            io.emit("Online-users", onlineUsers.size)
        }) 

    })
    
}

