// Particle System Configuration
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.angle = Math.random() * Math.PI * 2;
        this.spinSpeed = Math.random() * 0.05 + 0.02;
        this.orbitRadius = this.size * 4;
        this.type = Math.random() > 0.5 ? 'green' : 'purple';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.spinSpeed;

        if (this.x < -20 || this.x > canvas.width + 20 || this.y < -20 || this.y > canvas.height + 20) {
            this.reset();
        }
    }
    draw() {
        const color = this.type === 'green' ? `rgba(34, 197, 94, ${this.opacity})` : `rgba(168, 85, 247, ${this.opacity})`;

        // Nucleus
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Electron Orbits
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.orbitRadius, this.orbitRadius / 2, this.angle, 0, Math.PI * 2);
        ctx.stroke();

        // Electron
        const ex = this.x + Math.cos(this.angle * 2) * this.orbitRadius;
        const ey = this.y + Math.sin(this.angle * 2) * (this.orbitRadius / 2);
        ctx.beginPath();
        ctx.arc(ex, ey, 1.5, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 60; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

// Profile Management
const nameEl = document.getElementById('user-name');
const gradeEl = document.getElementById('user-grade');
const toggleEditBtn = document.getElementById('toggle-edit');
const saveBtn = document.getElementById('save-profile');

function loadProfile() {
    const savedName = localStorage.getItem('moises_name');
    const savedGrade = localStorage.getItem('moises_grade');
    if (savedName) nameEl.innerText = savedName;
    if (savedGrade) gradeEl.innerText = savedGrade;
}

toggleEditBtn.addEventListener('click', () => {
    nameEl.contentEditable = "true";
    gradeEl.contentEditable = "true";
    nameEl.style.borderBottom = "1px dashed var(--accent-green)";
    gradeEl.style.borderBottom = "1px dashed var(--accent-green)";
    toggleEditBtn.style.display = "none";
    saveBtn.style.display = "inline-block";
    nameEl.focus();
});

saveBtn.addEventListener('click', () => {
    nameEl.contentEditable = "false";
    gradeEl.contentEditable = "false";
    nameEl.style.borderBottom = "none";
    gradeEl.style.borderBottom = "none";
    toggleEditBtn.style.display = "inline-block";
    saveBtn.style.display = "none";

    localStorage.setItem('moises_name', nameEl.innerText);
    localStorage.setItem('moises_grade', gradeEl.innerText);
});

// Fibonacci Tool Logic
const pythonSource = `# Fibonacci Sequence Generator with Value Limit

print("--- Fibonacci Sequence Generator ---")

user_input = input("Enter the value limit for the sequence: ")

if user_input.isdigit():
    limit = int(user_input)
    
    if limit <= 0:
        print("Sequence:")
    else:
        # We use simple variables only
        a = 0
        b = 1
        print("Sequence:", end="")
        
        while a < limit:
            # Print leading comma and space if it's not the first number
            if a == 0:
                print(f" {a}", end="")
            else:
                print(f", {a}", end="")
            
            # Update values
            a, b = b, a + b
        print() # New line at the end
else:
    print("Invalid input. Please enter a positive integer.")`;

function showTool(toolId) {
    const section = document.getElementById('tool-view');
    section.style.display = 'block';

    if (toolId === 'fibonacci') {
        document.getElementById('source-code').innerText = pythonSource;
    }

    section.scrollIntoView({ behavior: 'smooth' });
}

function generateFibonacci() {
    const input = document.getElementById('fib-input');
    const resultArea = document.getElementById('fib-result');
    const n = parseInt(input.value);

    if (isNaN(n) || n < 1) {
        resultArea.innerText = "Please enter a valid number of terms (n >= 1).";
        return;
    }

    let sequence = [];
    let a = 0, b = 1;

    for (let i = 0; i < n; i++) {
        sequence.push(a);
        let temp = a + b;
        a = b;
        b = temp;
    }

    resultArea.innerHTML = `<span style="color: var(--accent-green);">Analytical Result:</span><br>${sequence.join(', ')}`;
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    animateParticles();
    loadProfile();
});
