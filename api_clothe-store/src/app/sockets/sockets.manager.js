
let onlineUsers = new Set()


export function setupSocket(io){

    io.on('connection', (socket) =>{

        onlineUsers.add(socket.id)
        console.log('✅ user connected. Online users ', onlineUsers.size)
        
        io.emit('Online-users', onlineUsers.size)
        

        socket.on('disconnect', () =>{
            console.log(socket.id, ' disconnect')
            onlineUsers.delete(socket.id)
            io.emit("Online-users", onlineUsers.size)
        })

    })
    
}

