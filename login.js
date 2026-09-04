document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const hataKutusu = document.getElementById('hata-mesaji');

    // KAYIT OLMA İŞLEMİ
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;

            // Kullanıcı verisini tarayıcıya kaydet
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userPassword', password);

            alert('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.');
            window.location.href = 'index.html';
        });
    }

    // GİRİŞ YAPMA İŞLEMİ
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = document.getElementById('email').value;
            const passwordInput = document.getElementById('password').value;

            // Kayıtlı verileri al
            const kayitliEmail = localStorage.getItem('userEmail');
            const kayitliSifre = localStorage.getItem('userPassword');

            if (emailInput === kayitliEmail && passwordInput === kayitliSifre) {
                window.location.href = 'anasayfa.html';
            } else {
                hataKutusu.style.display = 'block';
                hataKutusu.innerText = '❌ E-posta veya şifre hatalı!';
            }
        });
    }
});