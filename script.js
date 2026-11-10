// ==========================================
// 1. Inisialisasi Audio Global
// ==========================================
const bgm = document.getElementById("bgm");
const musicBtn = document.getElementById("music-btn");
const musicIcon = document.getElementById("music-icon");
const musicText = document.getElementById("music-text");
let isPlaying = false;

function toggleMusic() {
  if (!bgm) return;
  if (isPlaying) {
    bgm.pause();
    isPlaying = false;
    if (musicIcon) musicIcon.innerText = "🔇";
    if (musicText) musicText.innerText = "MUTE";
  } else {
    bgm.play().then(() => {
      isPlaying = true;
      if (musicIcon) musicIcon.innerText = "🎵";
      if (musicText) musicText.innerText = "PLAYING";
    }).catch((err) => console.log("Autoplay dicegah:", err));
  }
}

// ==========================================
// 2. Generate Partikel Bunga & Hati
// ==========================================
const particleIcons = ["🌸", "🎀", "💖", "🧸", "🧁", "🤍"];
const particleContainer = document.getElementById("particle-container");

if (particleContainer) {
  for (let i = 0; i < 16; i++) {
    const particle = document.createElement("div");
    particle.className = "floating-item text-xl md:text-2xl select-none";
    particle.innerText = particleIcons[i % particleIcons.length];
    particle.style.left = `${(i * 6.5) % 96}vw`;
    particle.style.animationDuration = `${8 + (i % 6) * 2}s`;
    particle.style.animationDelay = `${i * 0.6}s`;
    particleContainer.appendChild(particle);
  }
}

// ==========================================
// 3. Global Click Effect: Muncul Emot Hati
// ==========================================
document.addEventListener("click", (e) => {
  const heart = document.createElement("div");
  heart.className = "click-heart text-2xl select-none";
  heart.innerText = "💖";
  heart.style.left = `${e.clientX}px`;
  heart.style.top = `${e.clientY}px`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 800);
});

// ==========================================
// 4. FASE 1 -> FASE 2: Buka Amplop & Putar Musik
// ==========================================
function openEnvelope() {
  const envelope = document.getElementById("envelope");
  const envelopeWrapper = document.getElementById("envelope-wrapper");
  const photoModal = document.getElementById("photo-modal");

  // Animasi buka flap
  envelope.classList.add("open");

  // Putar lagu saat amplop diklik
  if (bgm && !isPlaying) {
    bgm.play().then(() => {
      isPlaying = true;
      if (musicIcon) musicIcon.innerText = "🎵";
      if (musicText) musicText.innerText = "PLAYING";
    }).catch((e) => console.log("Gagal memutar audio:", e));
  }

  // Efek confetti
  confetti({
    particleCount: 130,
    spread: 85,
    origin: { y: 0.6 },
    colors: ["#FF69B4", "#FFB6C1", "#FFE4E1", "#A3E635", "#ffffff"],
  });

  // Transisi ke galeri foto
  setTimeout(() => {
    envelopeWrapper.style.opacity = "0";
    envelopeWrapper.style.transform = "scale(0.85)";

    setTimeout(() => {
      envelopeWrapper.classList.add("hidden");
      photoModal.classList.remove("hidden");

      requestAnimationFrame(() => {
        photoModal.classList.remove("opacity-0", "translate-y-6");
        photoModal.classList.add("opacity-100", "translate-y-0");
      });
    }, 400);
  }, 1000);
}

// ==========================================
// 5. FASE 2 -> FASE 3: Galeri Foto ke Surat Cinta
// ==========================================
function goToLetterModal() {
  const photoModal = document.getElementById("photo-modal");
  const letterModal = document.getElementById("letter-modal");

  confetti({
    particleCount: 90,
    spread: 70,
    origin: { y: 0.5 },
    colors: ["#FF69B4", "#FFE4E1", "#ffffff"],
  });

  photoModal.style.opacity = "0";
  photoModal.style.transform = "scale(0.9)";

  setTimeout(() => {
    photoModal.classList.add("hidden");
    letterModal.classList.remove("hidden");

    requestAnimationFrame(() => {
      letterModal.classList.remove("opacity-0", "translate-y-6");
      letterModal.classList.add("opacity-100", "translate-y-0");
    });
  }, 400);
}

// ==========================================
// 6. Direct WhatsApp
// ==========================================
function sendReplyToWhatsApp() {
  const myWhatsAppNumber = "6281228824127";
  const replyMessage = `Happy 2nd Month Anniversary juga yaa sayangkuu Kevv! 🥺🤍✨

Foto-foto kita lucu banget dan suratnya manis banget udah aku baca semuanya.. Makasih yaa udah selalu ada, sabar, dan berjuang bareng aku selama 2 bulan ini.. Semoga kita makin kompak, saling ngertiin, dan langgeng terus ke depannya sampai mimpi kita terwujud.. Love you more bee! 🥰🌸💍`;

  const encodedUrl = encodeURIComponent(replyMessage);
  window.location.href = `https://wa.me/${myWhatsAppNumber}?text=${encodedUrl}`;
}