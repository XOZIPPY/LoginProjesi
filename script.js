const socket = io();

// Sayfa yüklendiğinde veya giriş yapıldığında kullanıcıyı bildir
function joinChat(username, avatarUrl) {
    socket.emit('user_join', username);
}

// Genel mesel gönderme fonksiyonu
function sendGlobalMessage(sender, avatar, message) {
    socket.emit('send_global_message', {
        sender: sender,
        avatar: avatar,
        message: message
    });
}

// Sunucudan gelen mesajları dinle
socket.on('receive_global_message', (data) => {
    console.log(`${data.sender}: ${data.message}`);
    // Buraya ekranına mesajı yazdıran HTML/DOM eklemelerini yapabilirsin
});
