// Typewriter effect
const phrases = [
    "مهندس نظم وشبكات يكتب كود بسرعة الضوء",
    "مطور ويب يبني تجارب غامرة وآمنة",
    "Ethical Hacker يحول التهديدات إلى فرص تعلم",
    "Full-stack جاهز لتسليم منتجك القادم"
];
let phraseIndex = 0, charIndex = 0, deleting = false;
const typedText = document.getElementById("typed-text");

function type() {
    const current = phrases[phraseIndex % phrases.length];
    if (!deleting) {
        typedText.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) { deleting = true; setTimeout(type, 1200); return; }
    } else {
        typedText.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) { deleting = false; phraseIndex++; }
    }
    setTimeout(type, deleting ? 50 : 90);
}

type();

// Theme toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.innerHTML = document.body.classList.contains("dark-mode") ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon"></i>';
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Map search debounce
const searchInput = document.getElementById("map-search");
const mapFrame = document.getElementById("map-frame");
let typingTimer;
searchInput.addEventListener("input", () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        const query = searchInput.value.trim();
        if (query.length > 2) {
            mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
        }
    }, 600);
});

// Interactive quiz data (multi-discipline)
const quizQuestions = [
    { q: "List all files in current directory", a: "ls", category: "Linux", hint: "عرض محتوى المجلد الحالي", explain: "استخدم ls لاستعراض كل الملفات والمجلدات في المسار الحالي." },
    { q: "Show current directory", a: "pwd", category: "Linux", hint: "اطبع مسار العمل", explain: "pwd يعرض لك المسار الكامل للمجلد الذي تعمل فيه الآن." },
    { q: "Show disk usage", a: "df", category: "Linux", hint: "مساحات الأقراص", explain: "df يعرض استخدام الأقراص والأجزاء بنسب وأحجام." },
    { q: "View running processes", a: "ps", category: "Linux", hint: "العمليات الجارية", explain: "ps يعطيك قائمة بالعمليات النشطة لتتمكن من مراقبتها أو إنهائها." },
    { q: "Trace route to 1.1.1.1", a: "traceroute 1.1.1.1", category: "Networking", hint: "مسار الحزم", explain: "traceroute يكشف العقد التي تمر بها الحزمة للوصول إلى الوجهة." },
    { q: "Create VLAN 20 on Cisco switch", a: "vlan 20", category: "Networking", hint: "من وضع التهيئة", explain: "باستخدام الأمر vlan داخل وضع التهيئة العامة تنشئ شبكة محلية افتراضية جديدة." },
    { q: "Block SSH brute force with ufw", a: "ufw limit ssh", category: "Security", hint: "حماية منفذ 22", explain: "ufw limit ssh يفعّل معدل محدود للاتصالات على SSH لمنع الهجمات المتكررة." },
    { q: "Decode JWT header and payload", a: "base64 -d", category: "Security", hint: "ترميز Base64", explain: "أجزاء JWT مشفرة بـBase64؛ استخدم base64 -d بعد تقسيم التوكن بالنقاط." },
    { q: "Train a classification model with scikit-learn", a: "fit", category: "AI/ML", hint: "استدعاء التدريب", explain: "الدالة fit هي ما يدرّب النموذج على البيانات في scikit-learn." },
    { q: "Prevent XSS in a form field", a: "sanitize input", category: "Web", hint: "تطهير المدخلات", explain: "تنظيف وتشفير المدخلات قبل عرضها يمنع حقن سكربتات خبيثة." },
    { q: "Change directory to home", a: "cd ~", category: "Linux", hint: "المسار الافتراضي", explain: "الرمز ~ يشير إلى مجلد المنزل للمستخدم الحالي." },
    { q: "Compress file.txt using gzip", a: "gzip file.txt", category: "Linux", hint: "ضغط سريع", explain: "gzip يضغط الملف مع الحفاظ على الامتداد .gz لتقليل الحجم." },
    { q: "List listening ports", a: "netstat -tuln", category: "Security", hint: "TCP/UDP", explain: "netstat -tuln يعرض المنافذ في حالة الاستماع مع بروتوكول النقل." },
    { q: "Update package list", a: "apt update", category: "Linux", hint: "إحضار آخر الميتاداتا", explain: "apt update يحدّث معلومات الحزم قبل التثبيت أو الترقية." },
    { q: "Kill process with PID 1234", a: "kill 1234", category: "Linux", hint: "إنهاء PID", explain: "kill متبوعاً بالـPID يرسل إشارة إنهاء للعمليات." },
    { q: "Find files containing 'hello'", a: "grep 'hello' *", category: "Linux", hint: "بحث نصي", explain: "grep يبحث داخل الملفات عن النص المحدد ويعرض الأسطر المطابقة." },
    { q: "Use ML model to predict after training", a: "predict", category: "AI/ML", hint: "مرحلة inference", explain: "بعد التدريب تستخدم predict على البيانات الجديدة لاستخراج النتائج." },
    { q: "Harden cookies against CSRF", a: "sameSite", category: "Web", hint: "خاصية في Set-Cookie", explain: "تحديد SameSite=Lax أو Strict يقلل من إرسال الكوكيز عبر سياقات خارجية." }
];

let currentQuiz = {};
const quizQuestion = document.getElementById("quiz-question");
const quizAnswer = document.getElementById("quiz-answer");
const quizFeedback = document.getElementById("quiz-feedback");
const quizCategory = document.getElementById("quiz-category");
const quizHint = document.getElementById("quiz-hint");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const rosesContainer = document.getElementById("falling-roses-container");

function loadQuiz() {
    currentQuiz = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
    quizQuestion.textContent = currentQuiz.q;
    quizCategory.textContent = currentQuiz.category;
    quizHint.textContent = currentQuiz.hint;
    quizAnswer.value = "";
    quizFeedback.textContent = "";
    rosesContainer.innerHTML = "";
}
loadQuiz();

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

document.getElementById("run-btn").addEventListener("click", () => {
    const ans = quizAnswer.value.trim().toLowerCase();
    if (ans === currentQuiz.a.toLowerCase()) {
        quizFeedback.textContent = `إجابة صحيحة! 🎉 ${currentQuiz.explain}`;
        quizFeedback.style.color = "#00e676";
        correctSound.play();
        for (let i = 0; i < 20; i++) createRose(Math.random() * 800);
    } else {
        quizFeedback.textContent = `إجابة غير دقيقة ❌ — الحل: ${currentQuiz.a} → ${currentQuiz.explain}`;
        quizFeedback.style.color = "#ff6b6b";
        wrongSound.play();
    }
    setTimeout(loadQuiz, 2500);
});

quizAnswer.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        document.getElementById("run-btn").click();
    }
});

// Project carousel controls
const scrollContainer = document.querySelector('.scroll-wrapper');
const scrollLeftBtn = document.getElementById('scrollLeft');
const scrollRightBtn = document.getElementById('scrollRight');

if (scrollContainer && scrollLeftBtn && scrollRightBtn) {
    scrollLeftBtn.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: -820, behavior: 'smooth' });
    });
    scrollRightBtn.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: 820, behavior: 'smooth' });
    });

    let isDown = false;
    let startX;
    let scrollLeft;

    scrollContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
    });
    scrollContainer.addEventListener('mouseleave', () => { isDown = false; });
    scrollContainer.addEventListener('mouseup', () => { isDown = false; });
    scrollContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX);
        scrollContainer.scrollLeft = scrollLeft - walk;
    });
}
