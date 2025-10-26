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
