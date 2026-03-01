const App = (function() {
    
    const DOM = {
        act1: document.getElementById('act-1'),
        act2: document.getElementById('act-2'),
        act3: document.getElementById('act-3'),
        bgContainer: document.getElementById('cinematic-bg'),
        video: document.getElementById('bg-video'),
        audio: document.getElementById('bg-music'),
        credits: [
            document.getElementById('credit-1'),
            document.getElementById('credit-2'),
            document.getElementById('credit-3')
        ],
        sections: {
            'main-menu': document.getElementById('main-menu'),
            'rsvp-step': document.getElementById('rsvp-step'),
            'vip-step': document.getElementById('vip-step')
        },
        form: document.getElementById('rsvp-form'),
        btnConfirm: document.getElementById('btn-confirm'),
        inputs: document.querySelectorAll('.cine-input-group input')
    };

    const CONFIG = {
        whatsappNumber: "5511999999999", // SEU NÚMERO
        targetDate: new Date("Apr 25, 2026 20:00:00").getTime() // A Data da Festa da Mônica
    };

    // --- LÓGICA DO CRONÔMETRO ---
    const startCountdown = () => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = CONFIG.targetDate - now;

            if (distance < 0) {
                clearInterval(timer);
                document.getElementById("countdown").innerHTML = "<div class='cd-box' style='width:100%'><span style='font-size: 1rem; letter-spacing: 4px;'>A Magia Começou!</span></div>";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("cd-days").innerText = days.toString().padStart(2, '0');
            document.getElementById("cd-hours").innerText = hours.toString().padStart(2, '0');
            document.getElementById("cd-minutes").innerText = minutes.toString().padStart(2, '0');
            document.getElementById("cd-seconds").innerText = seconds.toString().padStart(2, '0');
        }, 1000);
    };

    const playTitleSequence = () => {
        let delay = 1000;
        DOM.bgContainer.style.opacity = '1';
        DOM.video.play().catch(() => {});
        setTimeout(() => { DOM.video.style.transform = 'scale(1)'; }, 100);

        DOM.credits.forEach((credit, index) => {
            setTimeout(() => { credit.classList.add('is-showing'); }, delay);
            let holdTime = (index === 1) ? 3500 : 2500; 
            setTimeout(() => { credit.classList.remove('is-showing'); }, delay + holdTime);
            delay += holdTime + 1000;
        });

        setTimeout(() => {
            DOM.act2.classList.remove('is-active');
            DOM.act3.classList.add('is-active');
            startCountdown(); // Inicia o relógio assim que o convite aparece
        }, delay + 500);
    };

    const startTheFilm = () => {
        DOM.audio.volume = 0.5;
        DOM.audio.play().catch(() => console.log("Áudio bloqueado"));
        document.body.classList.add('film-started');
        DOM.act1.style.opacity = '0';
        
        setTimeout(() => {
            DOM.act1.classList.remove('is-active');
            DOM.act2.classList.add('is-active');
            playTitleSequence();
        }, 1500);
    };

    const switchSection = (sectionId) => {
        Object.values(DOM.sections).forEach(section => {
            section.classList.remove('is-visible');
        });
        
        setTimeout(() => {
            DOM.sections[sectionId].classList.add('is-visible');
        }, 300);
    };

    const validateForm = () => {
        let valid = true;
        DOM.inputs.forEach(input => {
            if(input.classList.contains('pix-key')) return;
            
            input.classList.remove('error');
            if (!input.value.trim()) {
                input.classList.add('error');
                valid = false;
            }
        });
        return valid;
    };

    const handleRSVP = (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        const name = document.getElementById('guestName').value.trim();
        const originalText = DOM.btnConfirm.innerText;
        
        DOM.btnConfirm.innerText = "Confirmando...";
        DOM.btnConfirm.disabled = true;

        setTimeout(() => {
            const msg = `✅ *CONFIRMAÇÃO DE PRESENÇA*\n\nNOME: ${name}\nEVENTO: 15 Anos - Mônica`;
            window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
            
            DOM.btnConfirm.innerText = originalText;
            DOM.btnConfirm.disabled = false;
            switchSection('main-menu');
        }, 1000);
    };

    const copyPix = () => {
        const pix = document.querySelector('.pix-key').value;
        navigator.clipboard.writeText(pix).then(() => {
            const btn = document.querySelector('.btn-director.outline');
            const oldText = btn.innerText;
            btn.innerText = "PIX Copiado com Sucesso!";
            setTimeout(() => { btn.innerText = oldText; }, 3000);
        });
    };

    DOM.form.addEventListener('submit', handleRSVP);
    DOM.inputs.forEach(inp => inp.addEventListener('input', () => inp.classList.remove('error')));

    return { startTheFilm, switchSection, copyPix };
})();