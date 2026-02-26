/**
 * Arquitetura SPA - O País das Maravilhas
 * Utiliza o Pattern Module para encapsular lógica e evitar vazamento de memória.
 */
const App = (function() {
    
    // 1. Cache do DOM
    const DOM = {
        preloader: document.getElementById('preloader'),
        act1: document.getElementById('act-1'),
        act2: document.getElementById('act-2'),
        act3: document.getElementById('act-3'),
        act4: document.getElementById('act-4'),
        globalBg: document.getElementById('global-bg'),
        lines: document.querySelectorAll('.poetic-line'),
        doorWrapper: document.querySelector('.door-wrapper'),
        floatingItems: document.getElementById('floating-items-container'),
        form: document.getElementById('rsvp-form'),
        btnConfirm: document.getElementById('btn-confirm'),
        inputs: document.querySelectorAll('.glass-input'),
        bgAudio: document.getElementById('bg-music'),
        audioToggle: document.getElementById('audio-toggle'),
        iconSoundOn: document.getElementById('icon-sound-on'),
        iconSoundOff: document.getElementById('icon-sound-off'),
        bgVideo: document.getElementById('bg-video'),
        tiltPanels: document.querySelectorAll('.tilt-effect')
    };

    const CONFIG = {
        whatsappNumber: "5511999999999", // SUBSTITUIR PELO NÚMERO DA ANFITRIÃ
        tiltLimit: 12,
        isDesktop: window.innerWidth > 768
    };

    // Ícones Temáticos (Relógio, Cartola, Coração de Copas)
    const SVGS = [
        '<svg viewBox="0 0 24 24" style="fill:#FFD700"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20ZM13,7H11v6l5.2,3.2,1-1.6L13,12Z"/></svg>',
        '<svg viewBox="0 0 100 100" style="fill:#D4AF37"><path d="M20,70 L30,30 L70,30 L80,70 L90,70 L90,80 L10,80 L10,70 Z M35,40 L35,60 L65,60 L65,40 Z" /></svg>',
        '<svg viewBox="0 0 24 24" style="fill:#FFF7D6"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
    ];

    let isMusicPlaying = false;

    // 2. Controladores de Áudio
    const setupAudio = () => {
        DOM.bgAudio.volume = 0.4;
        DOM.audioToggle.addEventListener('click', toggleAudio);
    };

    const toggleAudio = () => {
        if (isMusicPlaying) {
            DOM.bgAudio.pause();
            DOM.iconSoundOn.style.display = 'none';
            DOM.iconSoundOff.style.display = 'block';
        } else {
            DOM.bgAudio.play().catch(() => {});
            DOM.iconSoundOn.style.display = 'block';
            DOM.iconSoundOff.style.display = 'none';
        }
        isMusicPlaying = !isMusicPlaying;
    };

    // 3. Validação de Interface Visual
    const validateForm = () => {
        let isValid = true;
        DOM.inputs.forEach(input => {
            if(input.classList.contains('pix-key')) return; // Ignora o PIX no loop de validação

            input.classList.remove('is-invalid', 'is-valid');
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                isValid = false;
            } else if (input.type === 'number') {
                const val = parseInt(input.value);
                if (isNaN(val) || val < 0 || val > 5) {
                    input.classList.add('is-invalid');
                    isValid = false;
                } else {
                    input.classList.add('is-valid');
                }
            } else {
                input.classList.add('is-valid');
            }
        });
        return isValid;
    };

    // 4. Motor de Física 3D (Parallax)
    const initTiltEffect = () => {
        if (!CONFIG.isDesktop) return; // Roda apenas em Desktop para poupar bateria no celular
        
        DOM.tiltPanels.forEach(panel => {
            panel.addEventListener('mousemove', (e) => {
                const rect = panel.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateX = ((y - (rect.height / 2)) / (rect.height / 2)) * -CONFIG.tiltLimit;
                const rotateY = ((x - (rect.width / 2)) / (rect.width / 2)) * CONFIG.tiltLimit;
                
                panel.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02) translateZ(30px)`;
            });
            
            panel.addEventListener('mouseleave', () => {
                panel.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(30px)`;
                panel.style.transition = 'transform 0.5s ease-out';
            });
            
            panel.addEventListener('mouseenter', () => { 
                panel.style.transition = 'none'; 
            });
        });
    };

    // 5. Máquina de Estados (Atos)
    const startPrologue = () => {
        DOM.act1.classList.add('is-active');
        let delay = 500;
        
        DOM.lines.forEach((line) => {
            setTimeout(() => { line.style.animation = `magicalFade 4s forwards`; }, delay);
            delay += 3500; 
        });

        // Transição automática para a Porta
        setTimeout(() => {
            DOM.act1.classList.remove('is-active');
            setTimeout(() => { 
                DOM.act2.classList.add('is-active'); 
                DOM.doorWrapper.focus(); 
            }, 1000);
        }, delay + 500);
    };

    const generateFloatingItems = () => {
        for (let i = 0; i < 15; i++) {
            const item = document.createElement('div');
            item.classList.add('floating-item');
            item.innerHTML = SVGS[Math.floor(Math.random() * SVGS.length)];
            
            const size = Math.random() * 25 + 15; 
            const left = Math.random() * 100; 
            const duration = Math.random() * 15 + 15; 
            const delay = Math.random() * 10; 
            const opacity = Math.random() * 0.4 + 0.1; 
            const drift = (Math.random() - 0.5) * 80; 
            const rotateEnd = Math.random() * 360;

            item.style.cssText = `width: ${size}px; height: ${size}px; left: ${left}%; --duration: ${duration}s; --delay: ${delay}s; --opacity: ${opacity}; --drift: ${drift}px; --rotate-end: ${rotateEnd}deg;`;
            DOM.floatingItems.appendChild(item);
        }
    };

    const transitionToVIP = (family, total) => {
        // Despede-se do Convite
        DOM.act3.classList.remove('is-active');
        DOM.act3.classList.add('is-leaving');

        // Revela a Área VIP e envia o WhatsApp
        setTimeout(() => {
            DOM.act3.style.display = 'none'; 
            DOM.act4.classList.add('is-active');
            
            const text = `🎩 *O Coelho Branco me guiou!*\n\nConfirmamos nossa presença no País das Maravilhas.\n\n*Convidado:* ${family}\n*Mesa para:* ${total}`;
            window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
        }, 1500);
    };

    // 6. Manipuladores de Eventos
    const handleRSVP = (e) => {
        e.preventDefault();
        
        if (!validateForm()) return; // Bloqueia se o formulário estiver vazio/inválido

        const family = document.getElementById('familyName').value;
        const guests = document.getElementById('guests').value;
        const total = parseInt(guests) + 1; // Soma o titular aos acompanhantes
        
        DOM.btnConfirm.innerHTML = "<span class='spinner-magico' style='width: 20px; height: 20px; border-width: 2px; display: inline-block; margin-right: 10px; vertical-align: middle;'></span> Entrando na Toca...";
        DOM.btnConfirm.disabled = true;

        setTimeout(() => {
            transitionToVIP(family, total);
        }, 1500);
    };

    // 7. API Pública
    return {
        init: () => {
            // Só tira o Preloader quando a página estiver totalmente carregada
            DOM.preloader.style.opacity = '0';
            setTimeout(() => {
                DOM.preloader.style.display = 'none';
                setupAudio();
                startPrologue();
                initTiltEffect();
            }, 1000);

            DOM.form.addEventListener('submit', handleRSVP);
            
            // Limpa o aviso de erro assim que o usuário digita
            DOM.inputs.forEach(input => {
                input.addEventListener('input', () => input.classList.remove('is-invalid'));
            });
        },
        
        transitionToWonderland: () => {
            // Tenta tocar o áudio na primeira interação segura do usuário
            if (!isMusicPlaying) {
                DOM.bgAudio.play().then(() => {
                    isMusicPlaying = true;
                    DOM.audioToggle.style.display = 'flex';
                }).catch(() => {
                    DOM.audioToggle.style.display = 'flex';
                    DOM.iconSoundOn.style.display = 'none';
                    DOM.iconSoundOff.style.display = 'block';
                });
            }

            // O Zoom Extremo na Fechadura
            DOM.doorWrapper.classList.add('zoom-through');
            
            // Após o Zoom, revela o Ato 3
            setTimeout(() => {
                DOM.act2.classList.remove('is-active');
                DOM.globalBg.style.display = 'block'; 
                DOM.act3.classList.add('is-active');
                DOM.bgVideo.play(); 
                generateFloatingItems();
                document.body.style.overflow = 'auto'; // Libera o scroll
            }, 1800); 
        },
        
        copyPix: () => {
            const pixKey = document.querySelector('.pix-key').value;
            navigator.clipboard.writeText(pixKey).then(() => {
                alert("A Rainha de Copas autorizou! Chave mágica copiada com sucesso.");
            }).catch(err => console.error("Erro ao copiar", err));
        }
    };
})();

// O Gatilho Inicial Seguro
window.addEventListener('load', App.init);