
let onlineUsers = new Set()

export function setupSocket(io){
    console.log('came here')

    try{
        io.on('connection', (socket) =>{

        console.log('but no here! ', socket.id)
        const userId = socket.handshake.auth.userId

        if (!userId) {
            console.warn('⚠️ Connection attempt without userId');
            socket.disconnect();
            return;
        }

        console.log(userId,' connected')
        onlineUsers.add(userId)
        io.emit('Online-users', Array.from(onlineUsers))

        socket.on('disconnect', () =>{
            console.log(userId, ' disconnect')
            onlineUsers.delete(userId)
            io.emit("Online-users", Array.from(onlineUsers))
        })

    })
    }catch(err){
        console.log('error: ',err.message)
    }
}

