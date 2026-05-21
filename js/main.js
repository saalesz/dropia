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

    // --- HEADER: Efeito de Scroll Padrão ---
    const header = document.querySelector(".main-header");
    if (header) {
        ScrollTrigger.create({
            start: "top -50",
            onUpdate: (self) => {
                // Só aplica o efeito padrão se a animação do Dropia NÃO estiver ativa
                if (!header.classList.contains("header-hidden")) {
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

    // --- SEÇÃO FINAL ---
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

// Registra o plugin de scroll do GSAP
gsap.registerPlugin(ScrollTrigger);

// Cria a timeline master baseada no scroll da seção principal
const dropiaTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: "#como-funciona",
        start: "top top",
        end: "+=5000", // Distância de scroll para controlar a velocidade das transições
        scrub: 1.2,    // Suavidade do arraste do scroll
        pin: true,     // Trava o elemento na tela
        pinSpacing: true,
        invalidateOnRefresh: true,

        // --- AQUI ESTÁ O TRUQUE: O CONTROLE DA HEADER ---
        // Quando a seção fixada começar, nós forçamos a remoção/injeção da classe
        onToggle: (self) => {
            const header = document.querySelector(".main-header");
            if (header) {
                if (self.isActive) {
                    header.classList.add("header-hidden");
                } else {
                    header.classList.remove("header-hidden");
                }
            }
        }
    }
});

// --- PASSO 1: Transição da Screen 1 para a Screen 2 ---
dropiaTimeline
    // Sumir com os textos iniciais da Screen 1 jogando-os para cima
    .to(".screen-1 .text-subtittle, .screen-1 .scroll", { opacity: 0, y: -40, duration: 0.8 }, 0)
    // Zoom no título principal estilo impacto do exemplo original
    .to(".screen-1 .text-tittle", { scale: 2.5, opacity: 0, duration: 1.5, ease: "power2.inOut" }, 0)
    // Fade out no background estático cinza/luminoso da screen-1
    .to(".screen-1", { opacity: 0, visibility: "hidden", duration: 0.6 }, "-=0.5")

    // --- PASSO 2: Entrada e Saída da Screen 2 (Etapa 1) ---
    .to(".screen-2", { opacity: 1, visibility: "visible", duration: 0.5 }, "-=0.2")
    .fromTo(".screen-2 .container-etapa", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" })
    // Tempo de leitura da etapa 1 antes de sair
    .to(".screen-2 .container-etapa", { y: -50, opacity: 0, duration: 1, ease: "power3.in" }, "+=2.0")
    .to(".screen-2", { opacity: 0, visibility: "hidden", duration: 0.3 })

    // --- PASSO 3: Entrada e Saída da Screen 3 (Etapa 2) ---
    .to(".screen-3", { opacity: 1, visibility: "visible", duration: 0.5 }, "-=0.2")
    .fromTo(".screen-3 .container-etapa", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" })
    // Tempo de leitura da etapa 2 antes de sair
    .to(".screen-3 .container-etapa", { y: -50, opacity: 0, duration: 1, ease: "power3.in" }, "+=2.0")
    .to(".screen-3", { opacity: 0, visibility: "hidden", duration: 0.3 })

    // --- PASSO 4: Entrada da Screen 4 (Etapa 3 - Final) ---
    .to(".screen-4", { opacity: 1, visibility: "visible", duration: 0.5 }, "-=0.2")
    .fromTo(".screen-4 .container-etapa", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" });

// Sincroniza os cálculos de altura assim que a página terminar o carregamento total
window.addEventListener("load", () => {
    ScrollTrigger.refresh();
});