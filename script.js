const enterBtn = document.getElementById('enterBtn');
const audio = document.getElementById('bgMusic');
const noBtn = document.getElementById('noBtn');

enterBtn.onclick = () => {
    audio.play();
    nextPage(1);
};

function nextPage(pageNum) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    if (pageNum === 1) {
        document.getElementById('page1').classList.add('active');
    } else {
        document.getElementById('page' + pageNum).classList.add('active');
    }
}

function showFinal() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    document.getElementById('finalPage').classList.add('active');
}

noBtn.addEventListener('click', () => {
    const frame = document.querySelector('.mobile-frame');

    const maxX = frame.clientWidth - noBtn.offsetWidth - 30;
    const maxY = frame.clientHeight - noBtn.offsetHeight - 180;

    const x = Math.random() * maxX;
    const y = 250 + Math.random() * (maxY - 250);

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
});
