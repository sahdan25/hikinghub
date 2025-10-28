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
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Data lokasi gunung
const gunungData = [
  {
    nama: "Gunung Sumbing",
    lokasi: [-7.384274698307768, 110.07266856494984],
    info: "📍 Jalur Gajah Mungkur, Wonosobo<br>🗓️ 20 Juni 2025<br>🌤️ Cuaca: Cerah"
  },
  {
    nama: "Gunung Ciremai",
    lokasi: [-6.892, 108.407],
    info: "📍 Jalur Sadarehe, Majalengka<br>🗓️ 14 Juni 2024<br>🌤️ Cuaca: Berkabut"
  },
  {
    nama: "Gunung Buthak",
    lokasi: [-7.918125076686742, 112.4492792123533],
    info: "📍 Jalur Panderman, Batu<br>🗓️ 5 September 2025<br>🌤️ Cuaca: Cerah"
  },
  {
    nama: "Gunung Cikuray",
    lokasi: [-7.320456290580792, 107.85991382668442],
    info: "📍 Jalur Tapak Gerot, Garut<br>🗓️ 11 Januari 2025<br>🌤️ Cerah Berawan"
  },
  {
    nama: "Gunung Papandayan",
    lokasi: [-7.318964319763608, 107.73117169649817],
    info: "📍 Jalur TWA Papandayan, Garut<br>🗓️ 11 Januari 2025<br>🌤️ Berawan"
  },
  {
    nama: "Gunung Patuha",
    lokasi: [-7.160281196095474, 107.40006517999811],
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

//cuaca//

// === Cuaca Real-time dari OpenWeatherMap ===

// Ganti dengan API key kamu dari OpenWeatherMap
const API_KEY = "MASUKKAN_API_KEY_KAMU_DI_SINI";

// Ambil dan tampilkan cuaca real-time untuk tiap gunung
gunungData.forEach(g => {
  const [lat, lon] = g.lokasi;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=id&appid=${API_KEY}`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("Gagal ambil data cuaca");
      return res.json();
    })
    .then(data => {
      const suhu = data.main?.temp ?? 0;
      const kondisi = data.weather?.[0]?.description ?? "Tidak diketahui";
      const icon = data.weather?.[0]?.icon ?? "01d";

      // Tambahkan info cuaca ke popup marker yang sudah ada
      const marker = L.marker(g.lokasi).addTo(map);
      const popupContent = `
        <b>${g.nama}</b><br>${g.info}<hr>
        🌡️ Suhu Sekarang: ${suhu.toFixed(1)}°C<br>
        ☁️ Kondisi: ${kondisi}<br>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" width="45">
      `;
      marker.bindPopup(popupContent);
    })
    .catch(err => console.error("Gagal ambil cuaca:", err));
});