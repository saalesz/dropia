// 1. Registro Único de Plugins
gsap.registerPlugin(ScrollTrigger);

// --- 2. INICIALIZAÇÃO DO SMOOTH SCROLL (LENIS) ---
// Configura o motor de rolagem suave para rodar em sincronia com o GSAP
const lenis = new Lenis({
    duration: 1.2,       // Duração do efeito de scroll (em segundos)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva de suavidade
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    infinite: false,
});

// Sincroniza o Lenis para atualizar o ScrollTrigger a cada frame do scroll
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);


// --- 3. ANIMAÇÕES DA PÁGINA (Aguardando o DOM) ---
document.addEventListener("DOMContentLoaded", () => {

    // --- HEADER: Efeito de Scroll ---
    const header = document.querySelector(".main-header");
    if (header) {
        ScrollTrigger.create({
            start: "top -50",
            onUpdate: (self) => {
                if (self.direction === 1) { // Descendo
                    header.style.background = "rgba(255, 255, 255, 0.7)";
                    header.style.backdropFilter = "blur(12px)";
                    header.classList.add("header-active");
                } else if (self.scroll() < 50) { // No topo
                    header.style.background = "transparent";
                    header.style.backdropFilter = "none";
                    header.classList.remove("header-active");
                }
            }
        });
    }

    // --- HERO: Animação de Entrada ---
    const tlHero = gsap.timeline();
    tlHero.from(".hero-content h1", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out"
    })
    .from(".hero-content p", {
        y: 20,
        opacity: 0,
        duration: 1
    }, "-=0.8")
    .from(".btn-primary", {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.6");

    // --- SEÇÃO: O Problema ---
    const tlProblema = gsap.timeline({
        scrollTrigger: {
            trigger: ".problema-container",
            start: "top 80%",
            toggleActions: "play none none reverse",
        }
    });

    tlProblema.from(".section-1", {
        x: -30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    })
    .from(".card", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "expo.out"
    }, "-=0.8")
    .from(".text-problema span", {
        color: "var(--text-sub)",
        duration: 1,
        stagger: 0.1
    }, "-=0.5");

    // --- SEÇÃO: Solução (IA DROP / WAVE) ---
    const tlSolucao = gsap.timeline({
        scrollTrigger: {
            trigger: "#solucao",
            start: "top 75%",
            toggleActions: "play none none none",
        }
    });

    tlSolucao.from(".tittle-section, .text-conheca h1, .text-conheca p", {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
    })
    .fromTo(".mobile img",
        { scale: 0.9, opacity: 0, y: 50, rotationX: 10 },
        { scale: 1, opacity: 1, y: 0, rotationX: 0, duration: 1.5, ease: "expo.out" },
        "-=0.8"
    )
    .fromTo(".card-infoapp",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" },
        "-=1"
    );

    // --- EXTRA: Paralaxe Suave no Celular ---
    gsap.to(".mobile img", {
        scrollTrigger: {
            trigger: "#solucao",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
        },
        y: -60,
        ease: "none"
    });

    // --- SEÇÃO FINAL (Movida para dentro do DOMContentLoaded) ---
    const tlFinal = gsap.timeline({
        scrollTrigger: {
            trigger: "#final",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    tlFinal.from(".ballon", {
        y: -30,
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: "back.out(1.7)"
    })
    .from(".text-final h1, .text-final p", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    }, "-=0.3")
    .from(".form", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.4")
    .from(".fundo", {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: "power1.out"
    }, "-=0.8")
    .from(".footer", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.4");
});

// Mantido como global caso seja disparado por algum evento externo do seu app
window.animarConquistas = function () {
    const tlConquistas = gsap.timeline({
        scrollTrigger: {
            trigger: "#cards-container",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    tlConquistas.from(".card-conquista", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.2,
        ease: "expo.out"
    })
    .to(".progress-bar-fill", {
        width: (index, target) => {
            const percent = target.getAttribute("data-percentage");
            return `${percent}%`;
        },
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.15
    }, "-=0.6");
};



