# 🎩 Convite Digital Interativo | O País das Maravilhas

Um projeto de Convite Digital Premium de 15 anos (Single Page Application), projetado para entregar uma experiência imersiva e impecável inspirada no universo de *Alice no País das Maravilhas*.

## 🌟 Sobre o Projeto

Este projeto foge do modelo tradicional de convites estáticos. Ele foi estruturado como uma **Jornada de Usuário em 4 Atos**, utilizando controle de estado via JavaScript (Machine State) para guiar o convidado através de uma experiência sensorial e mágica, sem nunca recarregar a página.

### 🎭 A Jornada (Os 4 Atos)
1. **O Prólogo:** Preloader imersivo e frases poéticas que introduzem a narrativa (Hook).
2. **A Travessia:** Interação com uma fechadura vitoriana central. O clique aciona o áudio (contornando bloqueios de navegadores) e aplica um zoom extremo, atravessando a fechadura.
3. **O Convite Real:** Interface limpa com *Glassmorphism 2.0*. Efeitos Parallax/Tilt 3D no desktop, animações fluídas (60fps) e um formulário de RSVP com validação UX em tempo real.
4. **A Área VIP (O Chá do Chapeleiro):** Revelada apenas após a confirmação. Libera os mimos (Chave PIX) de forma elegante e dispara a confirmação formatada diretamente para a API do WhatsApp.

## 🚀 Tecnologias e Arquitetura

O projeto foi construído com foco em **Performance, Acessibilidade (A11y) e Design System Robusto**, utilizando apenas tecnologias nativas (Vanilla):

* **HTML5 Semântico:** Estrutura limpa, tags ARIA para acessibilidade e organização lógica de seções.
* **CSS3 Avançado:** * Variáveis (`:root`) para consistência de paleta (Azul Noite, Dourado Disney).
    * Efeitos de *Backdrop Filter* para vidro fosco.
    * `transform-style: preserve-3d` forçando aceleração de GPU para animações suaves e efeito Parallax.
* **JavaScript (ES6+):** * Padrão **Module Pattern** (Objeto `App`) para evitar poluição do escopo global.
    * Gerenciamento de DOM eficiente (Cache de seletores).
    * Controle customizado de fluxo de áudio e validações nativas.

## 📂 Estrutura de Arquivos

\`\`\`text
amostra-15anos/
├── index.html           # Estrutura principal da SPA
├── style.css            # Design System e animações
├── script.js            # Lógica de negócio e Machine State
├── README.md            # Documentação do projeto
└── assets/              # Recursos estáticos
    ├── img/             # Imagens e texturas
    ├── media/           # Áudios e vídeos de fundo
    └── icons/           # Ícones vetoriais (SVG)
\`\`\`

## ⚙️ Como Executar o Projeto

1. Clone este repositório:
   \`\`\`bash
   git clone https://github.com/SEU-USUARIO/amostra-15anos.git
   \`\`\`
2. Abra a pasta do projeto.
3. Como é um projeto *Vanilla*, basta abrir o arquivo `index.html` em qualquer navegador moderno. Não requer Node.js, NPM ou servidores locais para rodar.

## 🌐 Deploy

Este projeto está configurado para ser hospedado gratuitamente via **GitHub Pages**. 
Para publicar:
1. Vá na aba `Settings` do repositório no GitHub.
2. Acesse `Pages`.
3. Em `Source`, escolha `Deploy from a branch`.
4. Selecione a branch `main` e a pasta `/root` e salve.
5. O link estará disponível em alguns minutos!

---
*Desenvolvido com muita mágica e código limpo.* ✨