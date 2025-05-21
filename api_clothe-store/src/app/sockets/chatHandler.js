
export default function chatHandler(socket, io) {
  socket.on('chatMessage', (msg) => {
    console.log(`💬 [${socket.user.email}]: ${msg}`);
    io.to(`user_${socket.user.id}`).emit('chatResponse', msg);
  });
}