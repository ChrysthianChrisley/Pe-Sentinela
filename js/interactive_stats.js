document.addEventListener('DOMContentLoaded', function() {

    // Função para animar a contagem de um número
    function animateCounter(element, start, end, duration, prefix = '', suffix = '') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3); // Efeito de desaceleração
            const currentNumber = Math.floor(easedProgress * (end - start) + start);
            
            element.innerHTML = `${prefix}${currentNumber.toLocaleString('pt-BR')}${suffix}`;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Garante que o número final seja exibido ao terminar a animação
                element.innerHTML = `${prefix}${end.toLocaleString('pt-BR')}${suffix}`;
            }
        };
        window.requestAnimationFrame(step);
    }

    // Função para animar a barra de progresso
    function animateProgressBar(barElement, textElement, endPercentage, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            textElement.textContent = Math.floor(progress * endPercentage);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                textElement.textContent = endPercentage;
            }
        };
        window.requestAnimationFrame(step);
        
        setTimeout(() => {
            barElement.style.width = `${endPercentage}%`;
        }, 100); 
    }

    // Lógica para iniciar as animações apenas quando a seção se torna visível
    const statsSection = document.getElementById('problema');
    let hasAnimated = false; 

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true; 

                const amputacoesCounter = document.getElementById('amputacoes-counter');
                const prevencaoBar = document.getElementById('prevencao-bar');
                const prevencaoCounter = document.getElementById('prevencao-counter');
                const custoHeading = document.getElementById('custo-heading');
                
                // Animação de Amputações
                animateCounter(amputacoesCounter, 0, 282000, 2000, '+', ' mil');

                // Animação da Barra de Progresso
                animateProgressBar(prevencaoBar, prevencaoCounter, 85, 2000);

                // --- LÓGICA CORRIGIDA PARA O CONTADOR DE CUSTO ---
                // 1. Anima o contador de Custo até 1 bilhão.
                animateCounter(custoHeading, 0, 1000000000, 2500, 'R$ ');

                // 2. Agenda a troca de texto para um instante DEPOIS do final da animação.
                //    Isso garante que a troca seja a última operação.
                setTimeout(() => {
                    custoHeading.innerHTML = "R$ 1 Bilhão";
                }, 2550); // Aumentamos o tempo em 50ms para garantir que a animação terminou

                observer.unobserve(statsSection);
            }
        });
    }, {
        threshold: 0.5 
    });

    if (statsSection) {
        observer.observe(statsSection);
    }

});