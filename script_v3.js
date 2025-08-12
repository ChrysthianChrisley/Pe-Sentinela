document.addEventListener('DOMContentLoaded', function() {

    // --- Seleciona todos os elementos da interface ---
    const inputs = {
        tempD: document.getElementById('temp-d'),
        pressD: document.getElementById('press-d'),
        umidD: document.getElementById('umid-d'),
        tempE: document.getElementById('temp-e'),
        pressE: document.getElementById('press-e'),
        umidE: document.getElementById('umid-e')
    };

    const values = {
        tempD: document.getElementById('temp-d-value'),
        pressD: document.getElementById('press-d-value'),
        umidD: document.getElementById('umid-d-value'),
        tempE: document.getElementById('temp-e-value'),
        pressE: document.getElementById('press-e-value'),
        umidE: document.getElementById('umid-e-value')
    };

    const displays = {
        tempD: document.getElementById('display-temp-d'),
        pressD: document.getElementById('display-press-d'),
        umidD: document.getElementById('display-umid-d'),
        tempE: document.getElementById('display-temp-e'),
        pressE: document.getElementById('display-press-e'),
        umidE: document.getElementById('display-umid-e')
    };

    const cards = {
        tempD: document.getElementById('card-temp-d'),
        pressD: document.getElementById('card-press-d'),
        umidD: document.getElementById('card-umid-d'),
        tempE: document.getElementById('card-temp-e'),
        pressE: document.getElementById('card-press-e'),
        umidE: document.getElementById('card-umid-e')
    };

    const statusGeral = {
        container: document.getElementById('status-geral'),
        icon: document.getElementById('status-geral-icon'),
        titulo: document.getElementById('status-geral-titulo'),
        texto: document.getElementById('status-geral-texto')
    };
    
    const recommendation = {
        container: document.getElementById('recommendation-card'),
        text: document.getElementById('recommendation-text')
    };

    // --- Funções de Lógica de Risco ---

    function getTempStatus(temp, outroTemp) {
        const diff = Math.abs(temp - outroTemp);
        if (temp >= 35 || temp <= 22) return 'danger'; // Risco sério
        if (diff >= 2.2 || temp > 33.5 || temp < 25) return 'warning'; // Alerta
        if (temp >= 28 && temp <= 33) return 'ok'; // Normal
        return 'warning'; // Faixa intermediária de cuidado
    }

    function getPressStatus(press) {
        if (press > 700) return 'danger';
        if (press > 500) return 'warning'; // Ajustado para dar mais granularidade
        return 'ok';
    }
    
    function getUmidStatus(umid) {
        if (umid > 80 || umid < 20) return 'danger';
        if (umid > 60 || umid < 30) return 'warning';
        return 'ok';
    }

    // --- Função Principal de Atualização ---

    function updateUI() {
        // 1. Pega os valores atuais dos sliders
        const currentValues = {
            tempD: parseFloat(inputs.tempD.value),
            pressD: parseInt(inputs.pressD.value),
            umidD: parseInt(inputs.umidD.value),
            tempE: parseFloat(inputs.tempE.value),
            pressE: parseInt(inputs.pressE.value),
            umidE: parseInt(inputs.umidE.value),
        };

        // 2. Atualiza os textos ao lado dos sliders
        values.tempD.textContent = currentValues.tempD.toFixed(1);
        values.pressD.textContent = currentValues.pressD;
        values.umidD.textContent = currentValues.umidD;
        values.tempE.textContent = currentValues.tempE.toFixed(1);
        values.pressE.textContent = currentValues.pressE;
        values.umidE.textContent = currentValues.umidE;

        // 3. Atualiza os displays no "app"
        displays.tempD.textContent = `${currentValues.tempD.toFixed(1)} °C`;
        displays.pressD.textContent = `${currentValues.pressD} kPa`;
        displays.umidD.textContent = `${currentValues.umidD} %`;
        displays.tempE.textContent = `${currentValues.tempE.toFixed(1)} °C`;
        displays.pressE.textContent = `${currentValues.pressE} kPa`;
        displays.umidE.textContent = `${currentValues.umidE} %`;
        
        // 4. Calcula o status de cada métrica
        const statuses = {
            tempD: getTempStatus(currentValues.tempD, currentValues.tempE),
            tempE: getTempStatus(currentValues.tempE, currentValues.tempD),
            pressD: getPressStatus(currentValues.pressD),
            pressE: getPressStatus(currentValues.pressE),
            umidD: getUmidStatus(currentValues.umidD),
            umidE: getUmidStatus(currentValues.umidE),
        };
        
        // 5. Atualiza as classes de cor de cada card
        const statusClasses = ['status-ok', 'status-warning', 'status-danger'];
        for (const key in cards) {
            cards[key].classList.remove(...statusClasses);
            cards[key].classList.add(`status-${statuses[key]}`);
        }
        
        // 6. Determina o status geral e a recomendação
        const allStatuses = Object.values(statuses);
        let overallStatus = 'ok';
        if (allStatuses.includes('danger')) {
            overallStatus = 'danger';
        } else if (allStatuses.includes('warning')) {
            overallStatus = 'warning';
        }
        
        statusGeral.container.classList.remove(...statusClasses);
        statusGeral.container.classList.add(`status-${overallStatus}`);
        recommendation.container.classList.remove(...statusClasses);
        recommendation.container.classList.add(`status-${overallStatus}`);

        switch (overallStatus) {
            case 'danger':
                statusGeral.icon.textContent = '🚨';
                statusGeral.titulo.textContent = 'Risco Elevado Detectado';
                statusGeral.texto.textContent = 'Um ou mais parâmetros estão em nível crítico. Ação imediata é necessária.';
                recommendation.text.textContent = 'Ação Urgente: Entre em contato com sua equipe de saúde imediatamente. Mantenha o pé em repouso e siga as orientações médicas.';
                break;
            case 'warning':
                statusGeral.icon.textContent = '⚠️';
                statusGeral.titulo.textContent = 'Sinal de Alerta';
                statusGeral.texto.textContent = 'Detectamos parâmetros fora da faixa de normalidade. Monitore com atenção.';
                recommendation.text.textContent = 'Recomendação: Inspecione seus pés cuidadosamente em busca de alterações. Reduza atividades de alto impacto e observe a evolução nas próximas horas.';
                break;
            default: // ok
                statusGeral.icon.textContent = '✔️';
                statusGeral.titulo.textContent = 'Monitoramento Normal';
                statusGeral.texto.textContent = 'Nenhum risco detectado. Os parâmetros estão dentro da faixa de segurança.';
                recommendation.text.textContent = 'Continue com os bons cuidados e mantenha a rotina de inspeção dos pés.';
        }
    }

    // --- Adiciona os 'event listeners' para os sliders ---
    for (const key in inputs) {
        inputs[key].addEventListener('input', updateUI);
    }

    // --- Inicia a UI com os valores padrão ---
    updateUI();
});