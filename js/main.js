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



















// Garanta o registro do ScrollTrigger no escopo global
gsap.registerPlugin(ScrollTrigger);

const MEC_STAGES = [
  { id: 1, progressHeight: "0%" },
  { id: 2, progressHeight: "33%" },
  { id: 3, progressHeight: "66%" },
  { id: 4, progressHeight: "100%" }
];

// 1. Criação da Timeline Mestre com controle do Header e Pin estrito
const mecMasterTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: "#mecanismo-scroller .mec-pin-capture",
    start: "top top",
    end: "+=6000", // Espaço suficiente para o scroll rodar macio
    scrub: 1.1,
    pin: true,
    pinSpacing: true,
    invalidateOnRefresh: true,
    onEnter: () => {
      gsap.to("header", { opacity: 0, y: -50, duration: 0.3, ease: "power2.out" });
    },
    onLeave: () => {
      gsap.to("header", { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
    },
    onEnterBack: () => {
      gsap.to("header", { opacity: 0, y: -50, duration: 0.3, ease: "power2.out" });
    },
    onLeaveBack: () => {
      gsap.to("header", { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
    }
  }
});

// --- FASE 1: ZOOM DO TITULO HERO ---
mecMasterTimeline.to(".mec-fade-subtitle, .mec-tag-premium", { opacity: 0, y: -30, duration: 0.8, ease: "power2.out" }, 0)
                 .to(".mec-zoom-title", { scale: 3, opacity: 0, duration: 1.8, ease: "power2.inOut" }, 0)
                 // Força a timeline lateral a aparecer assim que o título sumir
                 .to(".mec-timeline-nav", { autoAlpha: 1, duration: 0.4 }, "-=0.2")
                 .to(".mec-hero-layer", { display: "none", duration: 0.1 }); // Remove o bloco do título da frente


// --- FASE 2: EXIBIÇÃO FORÇADA DAS ETAPAS ---
MEC_STAGES.forEach((stage, index) => {
  const labelIn = `mec_in_${stage.id}`;
  const labelOut = `mec_out_${stage.id}`;
  
  const navItem = document.querySelector(`[data-mec-step="${stage.id}"]`);
  const currentSlide = document.querySelector(`[data-mec-slide="${stage.id}"]`);
  const isLast = index === MEC_STAGES.length - 1;

  if (currentSlide) {
    // Garante que o slide comece invisível, mas preparado para renderizar
    gsap.set(currentSlide, { y: 30, opacity: 0, visibility: "hidden", display: "none" });

    // ENTRADA DA ETAPA
    mecMasterTimeline.addLabel(labelIn)
      // Força o elemento a existir no DOM mudando o display antes do fade
      .to(currentSlide, { display: "flex", visibility: "visible", duration: 0.01 }, labelIn)
      .to(currentSlide, { y: 0, opacity: 1, autoAlpha: 1, duration: 1.2, ease: "power3.out" }, labelIn)
      .to(navItem, { className: "mec-nav-item is-active", overwrite: "auto" }, labelIn)
      .to(".mec-line-progress", { height: stage.progressHeight, overwrite: "auto" }, labelIn);

    // SAÍDA DA ETAPA (Apenas se não for o último slide)
    if (!isLast) {
      mecMasterTimeline.addLabel(labelOut)
        .to(currentSlide, { y: -30, opacity: 0, autoAlpha: 0, duration: 1, ease: "power3.in" }, `${labelOut}+=2.5`)
        .to(navItem, { className: "mec-nav-item", overwrite: "auto" }, `${labelOut}+=2.5`)
        // Oculta completamente o slide antigo para não quebrar o layout do próximo
        .to(currentSlide, { display: "none", visibility: "hidden", duration: 0.01 }, `${labelOut}+=3.5`);
    }
  }
});

// Força o recálculo global de altura do site para garantir que tudo sincronize perfeitamente
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});