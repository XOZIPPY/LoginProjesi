const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
    maxHttpBufferSize: 1e8
});

// Body Parser Middleware (POST verilerini okumak için)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statik dosyaları dışa aktar
app.use(express.static(path.join(__dirname)));

// Ana sayfa yönlendirmesi
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Kayıt Ol Formu POST İsteği
app.post('/register', (req, res) => {
    const { email, password } = req.body;
    console.log("Yeni Kayıt Yapıldı:", email);

    // Kayıt başarılı olduğunda anasayfaya yönlendir
    res.redirect('/anasayfa.html');
});

// Socket.io Canlı Sohbet Dinleyicisi
io.on('connection', (socket) => {
    console.log('Bir kullanıcı bağlandı:', socket.id);

    socket.on('send_global_message', (data) => {
        io.emit('receive_global_message', data);
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Kullanıcı ayrıldı:', socket.id);
    });
});

// Sunucuyu Çalıştır
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda aktif!`);
});