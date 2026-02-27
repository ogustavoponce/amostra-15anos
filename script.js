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
        form: document.getElementById('rsvp-form'),
        rsvpStep: document.querySelector('.rsvp-director-cut'),
        vipStep: document.getElementById('vip-step'),
        btnConfirm: document.getElementById('btn-confirm'),
        inputs: document.querySelectorAll('.cine-input-group input')
    };

    const CONFIG = {
        whatsappNumber: "5511999999999"
    };

    // A Mágica Cinematográfica: Controla o tempo de cada texto na tela
    const playTitleSequence = () => {
        let delay = 1000; // Tempo inicial após a tela ficar preta

        // Revela o Fundo Cinematográfico
        DOM.bgContainer.style.opacity = '1';
        DOM.video.play().catch(() => {});
        
        // Efeito Ken Burns no vídeo (Zoom lento contínuo)
        setTimeout(() => { DOM.video.style.transform = 'scale(1)'; }, 100);

        // Sequência de Créditos
        DOM.credits.forEach((credit, index) => {
            // Entra o crédito
            setTimeout(() => {
                credit.classList.add('is-showing');
            }, delay);

            // Tempo que o crédito fica na tela (Título principal fica mais tempo)
            let holdTime = (index === 1) ? 3500 : 2500; 
            
            // Sai o crédito
            setTimeout(() => {
                credit.classList.remove('is-showing');
            }, delay + holdTime);

            delay += holdTime + 1000; // Soma o tempo para o próximo crédito
        });

        // Após a sequência inteira terminar, entra o Ato 3 (O Convite)
        setTimeout(() => {
            DOM.act2.classList.remove('is-active');
            DOM.act3.classList.add('is-active');
        }, delay + 500);
    };

    const startTheFilm = () => {
        // Áudio
        DOM.audio.volume = 0.5;
        DOM.audio.play().catch(() => console.log("Áudio bloqueado"));
        
        // Aplica o Letterbox de cinema
        document.body.classList.add('film-started');

        // Apaga o Teaser
        DOM.act1.style.opacity = '0';
        
        setTimeout(() => {
            DOM.act1.classList.remove('is-active');
            DOM.act2.classList.add('is-active');
            
            // Inicia a coreografia dos textos
            playTitleSequence();
        }, 1500);
    };

    // Validação
    const validateForm = () => {
        let valid = true;
        DOM.inputs.forEach(input => {
            if(input.classList.contains('pix-key')) return;
            
            input.classList.remove('error');
            if (!input.value.trim() || (input.type === 'number' && (input.value < 0 || input.value > 5))) {
                input.classList.add('error');
                valid = false;
            }
        });
        return valid;
    };

    // RSVP e WhatsApp
    const handleRSVP = (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        const name = document.getElementById('familyName').value;
        const guests = parseInt(document.getElementById('guests').value) + 1;
        
        DOM.btnConfirm.innerText = "Emitindo Ingressos...";
        DOM.btnConfirm.disabled = true;

        setTimeout(() => {
            // Crossfade suave entre Formulário e PIX
            DOM.rsvpStep.style.transition = 'opacity 1s ease';
            DOM.rsvpStep.style.opacity = '0';
            
            setTimeout(() => {
                DOM.rsvpStep.style.display = 'none';
                DOM.vipStep.style.display = 'block';
                DOM.vipStep.style.opacity = '0';
                
                void DOM.vipStep.offsetWidth; // Reflow
                DOM.vipStep.style.transition = 'opacity 1s ease';
                DOM.vipStep.style.opacity = '1';

                const msg = `🎟️ *Première - Confirmação*\n\nNossos lugares na plateia estão garantidos.\n\n*Protagonista:* ${name}\n*Total (Elenco):* ${guests}`;
                window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
            }, 1000);
            
        }, 1500);
    };

    const copyPix = () => {
        const pix = document.querySelector('.pix-key').value;
        navigator.clipboard.writeText(pix).then(() => {
            const btn = document.querySelector('.btn-director.outline');
            btn.innerText = "Bilheteria Copiada";
        });
    };

    // Listeners
    DOM.form.addEventListener('submit', handleRSVP);
    DOM.inputs.forEach(inp => inp.addEventListener('input', () => inp.classList.remove('error')));

    return { startTheFilm, copyPix };
})();