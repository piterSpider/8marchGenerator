let compliments = [
    "Ты самая добрая!",
    "Ты самая заботливая!",
    "Ты самая красивая",
    "Ты чудесная женщина!",
    "Ты как весенний цветок!",
    "Ты наполняешь мир светом!"
];

let images = [
    "пингвин.gif",
    "розы.webp",
    "сердце.webp",
    "томхарди.jpg",
    "тюльпаны.webp",
    "тюльпаны8.webp",
    "шрек.webp"
];

function generate() {
    let name = document.getElementById("name").value;
    let role = document.getElementById("role").value;

    let randomText = compliments[Math.floor(Math.random() * compliments.length)];
    let randomImage = images[Math.floor(Math.random() * images.length)];

    let message = `<p>С 8 Марта, ${role} ${name}! 🎉 ${randomText}</p>`;
    let imgTag = `<img src="images/${randomImage}" style="width: 200px; border-radius: 15px; margin-bottom: 15px;" onerror="this.src='https://via.placeholder.com/200x200?text=🌸'">`
    document.getElementById("output").innerHTML = (imgTag + message);

    createConfetti();
}

function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#ffd93d', '#6c5ce7', '#a8e6cf', '#ff8a5c', '#f8a5c2', '#f3a683'];
    
    // Создаем контейнер для конфетти, если его нет
    let confettiContainer = document.getElementById('confetti-container');
    if (!confettiContainer) {
        confettiContainer = document.createElement('div');
        confettiContainer.id = 'confetti-container';
        confettiContainer.style.position = 'fixed';
        confettiContainer.style.top = '0';
        confettiContainer.style.left = '0';
        confettiContainer.style.width = '100%';
        confettiContainer.style.height = '100%';
        confettiContainer.style.pointerEvents = 'none';
        confettiContainer.style.zIndex = '9999';
        document.body.appendChild(confettiContainer);
    }
    
    // Очищаем старые конфетти
    confettiContainer.innerHTML = '';
    
    // Количество конфетти
    const confettiCount = 150;
    
    for (let i = 0; i < confettiCount; i++) {
        createConfettiPiece(confettiContainer, colors);
    }
    
    // Удаляем конфетти через 5 секунд
    setTimeout(() => {
        if (confettiContainer) {
            confettiContainer.innerHTML = '';
        }
    }, 5000);
}

function createConfettiPiece(container, colors) {
    const confetti = document.createElement('div');
    
    // Случайные характеристики
    const size = Math.random() * 10 + 5; // от 5 до 15px
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100; // от 0 до 100%
    const animationDuration = Math.random() * 3 + 2; // от 2 до 5 секунд
    const rotation = Math.random() * 360;
    const shape = Math.random() > 0.5 ? '50%' : '0'; // круглые или квадратные
    
    // Стили для конфетти
    confetti.style.position = 'absolute';
    confetti.style.left = left + '%';
    confetti.style.top = '-20px';
    confetti.style.width = size + 'px';
    confetti.style.height = size + 'px';
    confetti.style.backgroundColor = color;
    confetti.style.borderRadius = shape;
    confetti.style.transform = `rotate(${rotation}deg)`;
    confetti.style.opacity = Math.random() * 0.7 + 0.3; // от 0.3 до 1
    confetti.style.boxShadow = '0 0 5px rgba(0,0,0,0.1)';
    
    // Анимация
    confetti.style.animation = `confetti-fall ${animationDuration}s ease-out forwards`;
    
    // Добавляем уникальную анимацию для каждого элемента
    const driftX = (Math.random() - 0.5) * 200; // случайное смещение по горизонтали
    
    // Создаем ключевые кадры для этого конкретного конфетти
    const keyframes = `
        @keyframes confetti-fall-${Date.now()}-${Math.random()} {
            0% {
                transform: translate(0, 0) rotate(${rotation}deg);
                opacity: ${Math.random() * 0.7 + 0.3};
            }
            100% {
                transform: translate(${driftX}px, 120vh) rotate(${rotation + 360}deg);
                opacity: 0;
            }
        }
    `;
    
    // Добавляем стиль с ключевыми кадрами
    const styleSheet = document.createElement('style');
    styleSheet.textContent = keyframes;
    document.head.appendChild(styleSheet);
    
    // Применяем анимацию
    const animationName = keyframes.match(/confetti-fall-.*?(?=\s*\{)/)[0];
    confetti.style.animation = `${animationName} ${animationDuration}s ease-out forwards`;
    
    container.appendChild(confetti);
    
    // Удаляем стиль после завершения анимации
    setTimeout(() => {
        styleSheet.remove();
    }, animationDuration * 1000);
}