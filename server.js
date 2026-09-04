const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" },
    maxHttpBufferSize: 1e8 // 100MB Base64 resim limiti
});

app.use(express.static('./'));

io.on('connection', (socket) => {
    socket.on('user_join', (username) => {
        socket.username = username || 'Anonim';
        io.emit('receive_global_message', {
            sender: 'Sistem',
            message: `${socket.username} sohbetine katıldı! 🚀`
        });
    });

    socket.on('send_global_message', (data) => {
        io.emit('receive_global_message', {
            sender: data.sender,
            avatar: data.avatar,
            message: data.message
        });
    });
});

server.listen(3000, () => {
    console.log('Sunucu 3000 portunda çalışıyor...');
});