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
        inputs: document.querySelectorAll('.mad-input'),
        hatContainer: document.getElementById('hat-container')
    };

    const CONFIG = {
        whatsappNumber: "5511999999999", // NÚMERO DO WHATSAPP DA ANFITRIÃ
    };

    let isAudioPlaying = false;

    // A Queda na Toca do Coelho (Zoom Invertido Maluco)
    const fallDownTheHole = () => {
        // Tenta tocar a música ao primeiro clique
        if (!isAudioPlaying) {
            DOM.audio.volume = 0.5;
            DOM.audio.play().catch(() => console.log("Áudio bloqueado"));
            isAudioPlaying = true;
        }

        // Aplica a classe que faz a tela girar e dar zoom
        DOM.act1.classList.add('falling');

        // Após a "queda", acorda no reino do Gato
        setTimeout(() => {
            DOM.act1.classList.remove('is-active', 'falling');
            DOM.act2.classList.add('is-active');
        }, 1000); // Sincronizado com o CSS
    };

    // Passagem para a Mesa do Chapeleiro
    const goToHatter = () => {
        DOM.act2.classList.remove('is-active');
        DOM.act3.classList.add('is-active');
        document.body.style.overflow = 'auto'; // Libera a rolagem se a tela for pequena
        generateHats();
    };

    // Gera os chapéus flutuantes no fundo da Seção 3
    const generateHats = () => {
        if(DOM.hatContainer.innerHTML !== "") return; // Evita duplicar

        const svgHat = `<svg viewBox="0 0 100 100"><path d="M15,75 L85,75 L85,85 L15,85 Z" fill="#FFD700"/><path d="M25,35 L75,35 L80,75 L20,75 Z" fill="#0a2e1f"/><path d="M25,35 C25,20 75,20 75,35" fill="#0a2e1f"/></svg>`;
        
        for (let i = 0; i < 12; i++) {
            let hat = document.createElement('div');
            hat.classList.add('floating-hat');
            hat.innerHTML = svgHat;
            hat.style.left = `${Math.random() * 90}%`;
            hat.style.setProperty('--dur', `${Math.random() * 10 + 10}s`);
            hat.style.animationDelay = `${Math.random() * 5}s`;
            DOM.hatContainer.appendChild(hat);
        }
    };

    // Validação surrealista
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

    // Confirmar Presença e liberar a Chave
    const handleRSVP = (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        const name = document.getElementById('familyName').value;
        const guests = parseInt(document.getElementById('guests').value) + 1; // +1 do titular
        
        DOM.btnConfirm.innerText = "Servindo o Chá...";
        DOM.btnConfirm.disabled = true;

        setTimeout(() => {
            // Troca o visual de RSVP para o Mimo
            DOM.rsvpStep.style.display = 'none';
            DOM.vipStep.style.display = 'block';

            // Abre o WhatsApp
            const msg = `🎩 *Reserva na Mesa do Chapeleiro!*\n\nOlá, vim confirmar nossa presença na loucura dos 15 anos.\n\n*Nome:* ${name}\n*Total de Xícaras:* ${guests}`;
            window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
            
        }, 1500);
    };

    // Função de Copiar o PIX
    const copyPix = () => {
        const pix = document.querySelector('.pix-key').value;
        navigator.clipboard.writeText(pix).then(() => {
            alert("A Rainha Branca aprovou! Chave copiada.");
        });
    };

    // Eventos
    DOM.form.addEventListener('submit', handleRSVP);
    DOM.inputs.forEach(inp => inp.addEventListener('input', () => inp.classList.remove('error')));

    return { fallDownTheHole, goToHatter, copyPix };
})();