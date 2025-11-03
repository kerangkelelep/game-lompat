// Pilih elemen yang kita butuhkan
const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");

let gameRunning = true; // Status untuk menghentikan game

// 1. FUNGSI UNTUK MELOMPAT
function jump(event) {
    // Hanya lompat jika menekan spasi (kode 32)
    // dan jika game masih berjalan
    if (event.keyCode !== 32 || !gameRunning) {
        return;
    }

    // Cek apakah pemain sedang melompat
    // Jika tidak ada kelas 'jump-animation', maka tambahkan
    if (!player.classList.contains("jump-animation")) {
        player.classList.add("jump-animation");

        // Hapus kelas setelah 500ms (sesuai durasi animasi CSS)
        // agar pemain bisa melompat lagi
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
