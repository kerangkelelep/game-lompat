// Pilih elemen yang kita butuhkan
const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");

let gameRunning = true; // Status untuk menghentikan game

// 1. FUNGSI UNTUK MELOMPAT
// GANTI FUNGSI JUMP YANG LAMA DENGAN YANG INI:
function jump(event) {
    // 1. PERUBAHAN DI SINI:
    // Kita cek 'Space' (spasi) menggunakan 'event.code' yang lebih modern
    // bukan lagi 'event.keyCode'
    if (event.code !== 'Space' || !gameRunning) {
        return;
    }

    // 2. Mencegah 'scroll' (jika halaman panjang, spasi akan scroll ke bawah)
    event.preventDefault(); 

    if (!player.classList.contains("jump-animation")) {
        player.classList.add("jump-animation");

        setTimeout(() => {
            player.classList.remove("jump-animation");
        }, 500); 
    }
}

// 2. FUNGSI UNTUK MENGECEK TABRAKAN
function checkCollision() {
    if (!gameRunning) return; // Hentikan jika game sudah berakhir

    // Dapatkan posisi 'live' dari pemain dan rintangan
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    // Logika deteksi tabrakan (sederhana)
    // Cek apakah kotak-kotak ini tumpang tindih
    const isColliding = (
        playerRect.right > obstacleRect.left &&
        playerRect.left < obstacleRect.right &&
        playerRect.bottom > obstacleRect.top &&
        playerRect.top < obstacleRect.bottom
    );

    if (isColliding) {
        // HENTIKAN GAME
        gameRunning = false;
        
        // Hentikan animasi rintangan
        obstacle.style.animation = "none";
        
        alert("GAME OVER! Coba lagi? (Refresh halaman)");
    }
}

// === MEMULAI GAME ===

// Dengarkan input keyboard di seluruh halaman
document.addEventListener("keydown", jump);

// Jalankan fungsi checkCollision setiap 10 milidetik (Jantungnya game)
// Ini adalah "Game Loop" kita yang sangat sederhana
setInterval(checkCollision, 10);
