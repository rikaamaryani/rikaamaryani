// Hilangkan Preloader saat halaman selesai dimuat
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 3000); // Tampil selama 0.8 detik sebelum menghilang halus
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // 1. Fitur Role Changing Animation di Hero
    const roles = ["HR Generalist", "Talent Acquisition", "HR Administration"];
    let roleIndex = 0;
    const roleElement = document.getElementById("changing-role");

    if (roleElement) {
        setInterval(() => {
            roleElement.classList.add("fade-out");

            setTimeout(() => {
                roleIndex = (roleIndex + 1) % roles.length;
                roleElement.textContent = roles[roleIndex];
                roleElement.classList.remove("fade-out");
            }, 300);
        }, 2500);
    }

    // 2. Fitur Tab Switching (Pindah Halaman Section)
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll(".section-container");

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);

            // Sembunyikan semua section
            sections.forEach(sec => sec.classList.remove("active"));

            // Tampilkan section yang diklik
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add("active");
            }
        });
    });

    // Default: Tampilkan About Me pertama kali
    if (document.getElementById("about")) {
        document.getElementById("about").classList.add("active");
    }
});

window.addEventListener("scroll", () => {
    let current = "";
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-item");

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach((item) => {
        item.classList.remove("active");
        if (item.getAttribute("href").includes(current)) {
            item.classList.add("active");
        }
    });
});

// =========================================================
// Background Hero Minimalis: Titik Bintang Halus & Komet Berkala
// =========================================================
const canvas = document.getElementById('hero-canvas');

if (canvas) {
    const ctx = canvas.getContext('2d');
    let dots = [];
    let comets = [];

    // Menyesuaikan ukuran canvas dengan area hero
    function resizeCanvas() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
        initDots();
    }

    // Membuat titik-titik kecil yang tenang & tidak terlalu ramai
    function initDots() {
        dots = [];
        // Kepadatan titik dibuat renggang & minimalis
        const dotCount = Math.floor((canvas.width * canvas.height) / 5000); 
        for (let i = 0; i < dotCount; i++) {
            dots.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 1.2 + 0.4, // Ukuran bintik sangat kecil
                opacity: Math.random() * 0.4 + 0.2 // Redup agar fokus tetap ke teks
            });
        }
    }

    // Class untuk Komet Kecil
    class Comet {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * (canvas.width * 0.8);
            this.y = -10;
            this.length = 60; // Panjang jejak komet yang tipis
            this.speed = 4.5;
            this.angle = Math.PI / 4; // Sudut meluncur 45 derajat
            this.opacity = 0.8;
            this.active = true;
        }

        update() {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            this.opacity -= 0.009; // Memudar perlahan

            if (this.opacity <= 0 || this.y > canvas.height || this.x > canvas.width) {
                this.active = false;
            }
        }

        draw() {
            if (!this.active) return;
            const tailX = this.x - Math.cos(this.angle) * this.length;
            const tailY = this.y - Math.sin(this.angle) * this.length;

            const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
            gradient.addColorStop(0.4, `rgba(56, 189, 248, ${this.opacity * 0.6})`); // Aksen Electric Blue
            gradient.addColorStop(1, 'rgba(56, 189, 248, 0)');

            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(tailX, tailY);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.2;
            ctx.stroke();
        }
    }

    // Komet meluncur 1 kali setiap 5 detik
    setInterval(() => {
        if (comets.length < 1) {
            comets.push(new Comet());
        }
    }, 4000);

    // Loop animasi
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Gambar bintik-bintik tenang
        dots.forEach(dot => {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity})`;
            ctx.fill();
        });

        // Update dan gambar komet
        comets.forEach((comet, index) => {
            comet.update();
            comet.draw();
            if (!comet.active) {
                comets.splice(index, 1);
            }
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
}