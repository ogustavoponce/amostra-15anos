const App = (function() {
    
    const DOM = {
        act1: document.getElementById('act-1'),
        act2: document.getElementById('act-2'),
        act3: document.getElementById('act-3'),
        audio: document.getElementById('bg-music'),
        form: document.getElementById('rsvp-form'),
        rsvpStep: document.getElementById('rsvp-step'),
        vipStep: document.getElementById('vip-step'),
        btnConfirm: document.getElementById('btn-confirm'),
        inputs: document.querySelectorAll('.chic-input-group input')
    };

    const CONFIG = {
        whatsappNumber: "5511999999999", // INSERIR O NÚMERO
    };

    let isAudioPlaying = false;

    // Transição suave de entrada
    const unlockExperience = () => {
        if (!isAudioPlaying) {
            DOM.audio.volume = 0.3; // Volume baixo, música elegante
            DOM.audio.play().catch(() => console.log("Áudio bloqueado"));
            isAudioPlaying = true;
        }

        DOM.act1.classList.remove('is-active');
        DOM.act1.classList.add('is-hidden');
        
        setTimeout(() => {
            DOM.act2.classList.add('is-active');
        }, 800);
    };

    // Navegação entre Convite e RSVP
    const showRSVP = () => {
        DOM.act2.classList.remove('is-active');
        setTimeout(() => {
            DOM.act3.classList.add('is-active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 800);
    };

    const backToInvite = () => {
        DOM.act3.classList.remove('is-active');
        setTimeout(() => {
            DOM.act2.classList.add('is-active');
        }, 800);
    };

    // Validação Elegante
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

    // Submissão do R.S.V.P.
    const handleRSVP = (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        const name = document.getElementById('familyName').value;
        const guests = parseInt(document.getElementById('guests').value) + 1;
        
        DOM.btnConfirm.innerText = "Processando...";
        DOM.btnConfirm.disabled = true;

        setTimeout(() => {
            // Fade suave para a área VIP
            DOM.rsvpStep.style.opacity = '0';
            
            setTimeout(() => {
                DOM.rsvpStep.style.display = 'none';
                DOM.vipStep.style.display = 'block';
                DOM.vipStep.style.opacity = '0';
                
                // Força reflow
                void DOM.vipStep.offsetWidth;
                DOM.vipStep.style.transition = 'opacity 1s ease';
                DOM.vipStep.style.opacity = '1';

                // Dispara o WhatsApp
                const msg = `🥂 *R.S.V.P. - Confirmação de Presença*\n\nÉ com grande satisfação que confirmamos nossa presença neste evento inesquecível.\n\n*Convidado:* ${name}\n*Total de Pessoas:* ${guests}`;
                window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
            }, 500);
            
        }, 1200);
    };

    const copyPix = () => {
        const pix = document.querySelector('.pix-key').value;
        navigator.clipboard.writeText(pix).then(() => {
            // Modifica o texto do botão temporariamente para feedback sutil
            const btn = document.querySelector('.btn-chic.outline');
            const originalText = btn.innerText;
            btn.innerText = "Copiado com sucesso";
            setTimeout(() => btn.innerText = originalText, 3000);
        });
    };

    // Event Listeners
    DOM.form.addEventListener('submit', handleRSVP);
    DOM.inputs.forEach(inp => inp.addEventListener('input', () => inp.classList.remove('error')));

    return { unlockExperience, showRSVP, backToInvite, copyPix };
})();