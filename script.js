/**
 * Romantic Website Logic
 * AI Fiesta - Professional & Romantic
 */

// 1. Configuration: Add your sentences and file paths here
const config = {
  pages: [
    {
      text: "From the moment I met you, my world became a lot more beautiful... ✨",
      gif: "assets/gifs/1.gif",
      bg: "assets/bg/bg1.jpg"
    },
    {
      text: "Every smile of yours feels like a blossom in my heart. 🌸",
      gif: "assets/gifs/2.gif",
      bg: "assets/bg/bg2.jpg"
    },
    {
      text: "I was wondering... would you like to stay by my side forever? 🏹",
      gif: "assets/gifs/3.gif",
      bg: "assets/bg/bg3.jpg"
    },
    {
      text: "Wait, are you sure? You can't say No to this face, can you? 🥺",
      gif: "assets/gifs/4.gif",
      bg: "assets/bg/bg4.jpg"
    }
  ],
  final: {
    text: "I knew you'd say Yes! You've made me the happiest person alive! 💖💍",
    gif: "assets/gifs/final.gif",
    bg: "assets/bg/final.jpg"
  }
};

let currentPage = 0;
const audio = document.getElementById('bgAudio');

// --- Elements ---
const gate = document.getElementById('gate');
const app = document.getElementById('app');
const finalSection = document.getElementById('final');
const bg = document.getElementById('bg');
const pageText = document.getElementById('pageText');
const pageGif = document.getElementById('pageGif');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const hearts = document.querySelectorAll('.heart');

// --- 2. Landing & Audio Logic ---
document.getElementById('enterPlayBtn').addEventListener('click', () => {
  // Play Audio
  audio.play().catch(err => {
    console.log("Audio play blocked or failed:", err);
    document.getElementById('audioHint').innerText = "Tap again to hear the music 🎵";
  });

  // Transition to App
  gate.classList.add('hidden');
  app.classList.remove('hidden');
  
  updatePage();
  startBlossoms();
});

// --- 3. Page Update Logic ---
function updatePage() {
  const data = config.pages[currentPage];
  
  // Update Content
  pageText.innerText = data.text;
  pageGif.src = data.gif;
  bg.style.backgroundImage = `url('${data.bg}')`;

  // Update Progress Hearts
  hearts.forEach((h, idx) => {
    h.classList.toggle('active', idx <= currentPage);
  });

  // Reset No Button style (in case it was floating)
  noBtn.style.position = 'static';
  noBtn.style.transform = 'none';
}

// --- 4. Button Interactions ---

// YES Button: Always goes to final page
yesBtn.addEventListener('click', () => {
  showFinalPage();
});

// NO Button Logic
noBtn.addEventListener('click', (e) => {
  if (currentPage === 3) {
    // 4th Page Logic: Make button float/teleport
    moveButtonRandomly(noBtn);
  } else {
    // Other pages: Just move to next page
    if (currentPage < 3) {
      currentPage++;
      updatePage();
    }
  }
});

function moveButtonRandomly(btn) {
  // Get container dimensions (the phone frame)
  const container = document.querySelector('.phone');
  const rect = container.getBoundingClientRect();
  
  const btnWidth = btn.offsetWidth;
  const btnHeight = btn.offsetHeight;

  // Calculate random position within the frame
  const maxX = rect.width - btnWidth - 20;
  const maxY = rect.height - btnHeight - 80; // keep away from header/footer

  const randomX = Math.floor(Math.random() * maxX) + 10;
  const randomY = Math.floor(Math.random() * maxY) + 40;

  btn.style.position = 'absolute';
  btn.style.left = `${randomX}px`;
  btn.style.top = `${randomY}px`;
  btn.style.zIndex = '100';
}

function showFinalPage() {
  app.classList.add('hidden');
  finalSection.classList.remove('hidden');
  
  document.getElementById('finalText').innerText = config.final.text;
  document.getElementById('finalGif').src = config.final.gif;
  bg.style.backgroundImage = `url('${config.final.bg}')`;
}

// Replay
document.getElementById('replayBtn').addEventListener('click', () => {
  currentPage = 0;
  finalSection.classList.add('hidden');
  app.classList.remove('hidden');
  updatePage();
});

// --- 5. Falling Blossoms Animation ---
function startBlossoms() {
  const layer = document.getElementById('petals-layer');
  const petalCount = 25;

  for (let i = 0; i < petalCount; i++) {
    createPetal(layer);
  }
}

function createPetal(parent) {
  const petal = document.createElement('div');
  petal.className = 'petal';
  petal.innerHTML = '🌸'; // You can use 🌸, 💮, or 🍃
  
  const startLeft = Math.random() * 100;
  const duration = Math.random() * 5 + 5;
  const delay = Math.random() * 5;
  const size = Math.random() * 10 + 15;

  petal.style.cssText = `
    position: fixed;
    top: -50px;
    left: ${startLeft}%;
    font-size: ${size}px;
    opacity: ${Math.random() * 0.5 + 0.3};
    user-select: none;
    pointer-events: none;
    z-index: -1;
    animation: fall ${duration}s linear ${delay}s infinite;
  `;

  parent.appendChild(petal);
}

// CSS Animation for blossoms (Injected via JS for convenience)
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fall {
    0% { transform: translateY(0) rotate(0deg); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
  }
  .petal {
    filter: drop-shadow(0 0 5px rgba(255,182,193,0.5));
  }
`;
document.head.appendChild(style);
