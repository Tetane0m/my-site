
// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Smooth scrolling for navbar links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Retype effect for Hero section (already included in previous chunk)
const phrases = ["Linux System Administrator", "Network Enthusiast", "Full-Stack Hobbyist", "Ethical Hacking Learner"];
let index = 0, charIndex = 0, deleting = false;
const typedText = document.getElementById("typed-text");
function type() {
    const current = phrases[index % phrases.length];
    if (!deleting) {
        typedText.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) { deleting = true; setTimeout(type, 1200); return; }
    } else {
        typedText.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) { deleting = false; index++; }
    }
    setTimeout(type, deleting ? 50 : 90);
}
type();

// Dark/Light theme toggle (already included in previous chunk)
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.getElementById("themeToggle").innerHTML = document.body.classList.contains("dark-mode") ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon"></i>';
});






// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Optional hover effect on cards
const cards = document.querySelectorAll('.contact-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-5px)');
    card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');
});






const searchInput = document.getElementById("map-search");
const mapFrame = document.getElementById("map-frame");

let typingTimer;
searchInput.addEventListener("input", () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        const query = searchInput.value.trim();
        if (query.length > 2) {
            const url = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
            mapFrame.src = url;
        }
    }, 700); // 700ms debounce
});







// Linux Quiz Data
const quizQuestions = [
    { q: "List all files in current directory", a: "ls" },
    { q: "Show current directory", a: "pwd" },
    { q: "Show disk usage", a: "df" },
    { q: "View running processes", a: "ps" },
    { q: "Change directory to home", a: "cd ~" },
    { q: "Create new directory 'test'", a: "mkdir test" },
    { q: "Remove file 'file.txt'", a: "rm file.txt" },
    { q: "Copy file1.txt to file2.txt", a: "cp file1.txt file2.txt" },
    { q: "Move file1.txt to /tmp", a: "mv file1.txt /tmp" },
    { q: "Display content of file.txt", a: "cat file.txt" },
    { q: "Show last 10 lines of a file", a: "tail file.txt" },
    { q: "Show first 10 lines of a file", a: "head file.txt" },
    { q: "Find files containing 'hello'", a: "grep 'hello' *" },
    { q: "Display manual for ls", a: "man ls" },
    { q: "Change file permissions to 755", a: "chmod 755 file.txt" },
    { q: "Change file owner to user 'root'", a: "chown root file.txt" },
    { q: "Check free memory", a: "free -h" },
    { q: "List all active network connections", a: "netstat -tuln" },
    { q: "Display environment variables", a: "env" },
    { q: "Search for a package with apt", a: "apt search package_name" },
    { q: "Install a package using apt", a: "apt install package_name" },
    { q: "Update package list", a: "apt update" },
    { q: "Upgrade all packages", a: "apt upgrade" },
    { q: "Show disk space usage of directories", a: "du -h" },
    { q: "Compress file.txt using gzip", a: "gzip file.txt" },
    { q: "Extract file.tar.gz", a: "tar -xzvf file.tar.gz" },
    { q: "Display current logged in users", a: "who" },
    { q: "Check system uptime", a: "uptime" },
    { q: "Kill process with PID 1234", a: "kill 1234" },
    { q: "Search command history for 'ls'", a: "history | grep ls" }
];


let currentQuiz = {};
const quizQuestion = document.getElementById("quiz-question");
const quizAnswer = document.getElementById("quiz-answer");
const quizFeedback = document.getElementById("quiz-feedback");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const rosesContainer = document.getElementById("falling-roses-container");

function loadQuiz() {
    currentQuiz = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
    quizQuestion.textContent = currentQuiz.q;
    quizAnswer.value = "";
    quizFeedback.textContent = "";
    rosesContainer.innerHTML = "";
}
loadQuiz();

// Create falling rose
function createRose(x) {
    const rose = document.createElement("div");
    rose.textContent = "🌹";
    rose.style.position = "absolute";
    rose.style.left = x + "px";
    rose.style.top = "-40px";
    rose.style.fontSize = (Math.random() * 30 + 20) + "px";
    rose.style.animation = "fall-rose " + (Math.random() * 2 + 2) + "s linear forwards";
    rosesContainer.appendChild(rose);
    setTimeout(() => rose.remove(), 4000);
}

// Run button event
document.getElementById("run-btn").addEventListener("click", () => {
    const ans = quizAnswer.value.trim().toLowerCase();
    if (ans === currentQuiz.a.toLowerCase()) {
        quizFeedback.textContent = "Correct! 🎉";
        quizFeedback.style.color = "green";
        correctSound.play();
        for (let i = 0; i < 20; i++) createRose(Math.random() * 800);
    } else {
        quizFeedback.textContent = "Incorrect! ❌";
        quizFeedback.style.color = "red";
        wrongSound.play();
    }
    setTimeout(loadQuiz, 2500);
});

// Enter key also runs
quizAnswer.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        document.getElementById("run-btn").click();
    }
});









const scrollContainer = document.querySelector('.scroll-wrapper');
const scrollLeftBtn = document.getElementById('scrollLeft');
const scrollRightBtn = document.getElementById('scrollRight');

// Scroll on button click
scrollLeftBtn.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: -920, behavior: 'smooth' });
});
scrollRightBtn.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: 920, behavior: 'smooth' });
});

// Drag to scroll
let isDown = false;
let startX;
let scrollLeft;

scrollContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    scrollContainer.classList.add('active');
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
});
scrollContainer.addEventListener('mouseleave', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
});
scrollContainer.addEventListener('mouseup', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
});
scrollContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 1; //scroll-fast
    scrollContainer.scrollLeft = scrollLeft - walk;
});
