// src/scripts/scroll-animate.js

// Tunggu hingga DOM siap (Astro akan inject <script> di akhir <body> kalau pakai is:inline)
document.addEventListener("DOMContentLoaded", () => {
  // Opsi observer: kita ingin trigger saat 10% elemen terlihat
  const options = { threshold: 0.1 };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Saat elemen masuk viewport, tambahkan kelas animasi + hapus class opacity-0
        entry.target.classList.remove("opacity-0");
        entry.target.classList.add("animate-fade-in-up");
        // Setelah di-animate sekali, cabut observer untuk elemen ini
        obs.unobserve(entry.target);
      }
    });
  }, options);

  // Ambil semua elemen yang punya kelas 'scroll-animate'
  document.querySelectorAll(".scroll-animate").forEach(el => {
    observer.observe(el);
  });
});
