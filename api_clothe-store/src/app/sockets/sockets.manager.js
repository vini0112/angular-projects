
let onlineUsers = new Set()

export function setupSocket(io){

    io.on('connection', (socket) =>{

        const userId = socket.handshake.query.userId
        console.log(userId,' connected')
        onlineUsers.add(userId)
        io.emit('Online-users ', Array.from(onlineUsers))

        socket.on('disconnect', () =>{
            console.log(userId, ' disconnect')
            onlineUsers.delete(userId)
            io.emit("Online-users ", Array.from(onlineUsers))
        })
    })
}

