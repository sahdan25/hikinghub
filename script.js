// Dapatkan elemen modal
var modal = document.getElementById("imageModal");
var modalImg = document.getElementById("modalImage");
var captionText = document.getElementById("captionText");

/**
 * Fungsi untuk membuka modal dan menampilkan gambar yang diklik.
 * @param {string} imgSrc - Path gambar.
 * @param {string} desc - Deskripsi gambar/pendakian.
 */
function openModal(imgSrc, desc) {
    modal.style.display = "block";
    modalImg.src = imgSrc;
    captionText.innerHTML = desc;
}

/**
 * Fungsi untuk menutup modal.
 */
function closeModal() {
    modal.style.display = "none";
}

// Tambahan: Tutup modal jika pengguna mengklik di luar gambar (di area gelap)
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

const searchBox = document.getElementById('searchBox');
searchBox.addEventListener('input', () => {
  const keyword = searchBox.value.toLowerCase();
  document.querySelectorAll('.photo-card').forEach(card => {
    const caption = card.querySelector('.caption').textContent.toLowerCase();
    card.style.display = caption.includes(keyword) ? '' : 'none';
  });
});


// Inisialisasi peta
const map = L.map('map').setView([-7.3, 109.9], 7);

// Tambahkan layer peta dasar
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 13,
  attribution: '© OpenStreetMap'
}).addTo(map);

// Data lokasi gunung
const gunungData = [
  {
    nama: "Gunung Sumbing",
    lokasi: [-7.382, 109.992],
    info: "📍 Jalur Gajah Mungkur, Wonosobo<br>🗓️ 20 Juni 2025<br>🌤️ Cuaca: Cerah"
  },
  {
    nama: "Gunung Ciremai",
    lokasi: [-6.892, 108.407],
    info: "📍 Jalur Sadarehe, Majalengka<br>🗓️ 14 Juni 2024<br>🌤️ Cuaca: Berkabut"
  },
  {
    nama: "Gunung Buthak",
    lokasi: [-7.841, 112.518],
    info: "📍 Jalur Panderman, Batu<br>🗓️ 5 September 2025<br>🌤️ Cuaca: Cerah"
  },
  {
    nama: "Gunung Cikuray",
    lokasi: [-7.321, 107.868],
    info: "📍 Jalur Tapak Gerot, Garut<br>🗓️ 11 Januari 2025<br>🌤️ Cerah Berawan"
  },
  {
    nama: "Gunung Papandayan",
    lokasi: [-7.319, 107.730],
    info: "📍 Jalur TWA Papandayan, Garut<br>🗓️ 11 Januari 2025<br>🌤️ Berawan"
  },
  {
    nama: "Gunung Patuha",
    lokasi: [-7.166, 107.402],
    info: "📍 Jalur Gunung Sepuh, Ciwidey<br>🗓️ 23 Juni 2025<br>🌤️ Berkabut"
  },
  {
    nama: "Gunung Pamoroan",
    lokasi: [-7.013, 108.309],
    info: "📍 Jalur Cingambul, Majalengka<br>🗓️ 03 Agustus 2025<br>🌤️ Cerah"
  }
];

// Tampilkan semua marker di peta
gunungData.forEach(g => {
  L.marker(g.lokasi)
    .addTo(map)
    .bindPopup(`<b>${g.nama}</b><br>${g.info}`);
});

