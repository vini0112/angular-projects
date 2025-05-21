
export default function userHandler(socket, io) {
    socket.on('getProfile', () => {

        socket.emit('profileData', {
            name: socket.user.name,
            email: socket.user.email
        });

    });
}
