// 1. Generate Partikel Bunga & Hati di Background
const particleIcons = ['🌸', '🎀', '💖', '🧸', '🧁', '🤍'];
const particleContainer = document.getElementById('particle-container');

for (let i = 0; i < 16; i++) {
  const particle = document.createElement('div');
  particle.className = 'floating-item text-xl md:text-2xl select-none';
  particle.innerText = particleIcons[i % particleIcons.length];
  particle.style.left = `${(i * 6.5) % 96}vw`;
  particle.style.animationDuration = `${8 + (i % 6) * 2}s`;
  particle.style.animationDelay = `${i * 0.6}s`;
  particleContainer.appendChild(particle);
}

// 2. Global Click Effect: Muncul Emot Hati saat Mengklik Layar
document.addEventListener('click', (e) => {
  const heart = document.createElement('div');
  heart.className = 'click-heart text-2xl select-none';
  heart.innerText = '💖';
  heart.style.left = `${e.clientX}px`;
  heart.style.top = `${e.clientY}px`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 800);
});

// 3. Logika Membuka Amplop Surat dengan Transisi Halus
function openEnvelope() {
  const envelope = document.getElementById('envelope');
  const envelopeWrapper = document.getElementById('envelope-wrapper');
  const letterModal = document.getElementById('letter-modal');
  const bgm = document.getElementById('bgm');

  // Putar lagu saat amplop dibuka
  if (bgm) {
    bgm.volume = 0.5; // Atur volume agar tidak terlalu kencang
    bgm.play().catch(() => {
      console.log("Autoplay dicegah browser, perlu interaksi klik lagi");
    });
  }

  // Trigger animasi amplop buka
  envelope.classList.add('open');

  // Confetti
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#FF69B4', '#FFB6C1', '#FFE4E1', '#A3E635', '#ffffff']
  });

  setTimeout(() => {
    envelopeWrapper.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    envelopeWrapper.style.opacity = '0';
    envelopeWrapper.style.transform = 'scale(0.85)';

    setTimeout(() => {
      envelopeWrapper.classList.add('hidden');
      letterModal.classList.remove('hidden');

      requestAnimationFrame(() => {
        letterModal.classList.remove('opacity-0', 'translate-y-6');
        letterModal.classList.add('opacity-100', 'translate-y-0');
      });
    }, 400);
  }, 1000);
}

// 4. Redirect WhatsApp Langsung ke Nomor Kevv
function sendReplyToWhatsApp() {
  const myWhatsAppNumber = "6281228824127";
  const replyMessage = 
`Happy 2nd Month Anniversary juga yaa sayangkuu Kevv! 🥺🤍✨

Suratnya manis banget dan udah aku baca semuanya.. Makasih yaa udah selalu ada, sabar, dan berjuang bareng aku selama 2 bulan ini.. Semoga kita makin kompak, saling ngertiin, dan langgeng terus ke depannya sampai mimpi kita terwujud.. Love you more bee! 🥰🌸💍`;

  const encodedUrl = encodeURIComponent(replyMessage);
  window.location.href = `https://wa.me/${myWhatsAppNumber}?text=${encodedUrl}`;
}