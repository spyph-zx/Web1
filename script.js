const enterBtn = document.getElementById('enterBtn');
const audio = document.getElementById('bgMusic');
const noBtn = document.getElementById('noBtn');

enterBtn.onclick = () => {
    audio.play();
    nextPage(1);
};

function nextPage(pageNum) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    if(pageNum === 1){
        document.getElementById('page1').classList.add('active');
    } else {
        document.getElementById('page' + pageNum).classList.add('active');
    }
}

function showFinal() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('finalPage').classList.add('active');
}

noBtn.addEventListener('click', () => {
    const container = document.querySelector('.container');

    const maxX = container.clientWidth - noBtn.offsetWidth - 20;
    const maxY = container.clientHeight - noBtn.offsetHeight - 20;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
});
